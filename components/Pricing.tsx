'use client'
import { useMemo, useState, useLayoutEffect, useRef } from 'react'
import Link from 'next/link'
import { formatBDT } from '../lib/pricing'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
gsap.registerPlugin(ScrollTrigger)

export type Plan = {
  key: 'economy' | 'standard' | 'pro'
  name: string
  subtitle: string
  price: number // yearly BDT
  old: number // yearly BDT (strikethrough)
  href: string
  // Hosting matrix fields (optional for non-hosting usage)
  disk?: string
  bandwidth?: string
  sites?: string
  emails?: string
  ssl?: boolean
  cpanel?: boolean
  // Website packages (bulleted features)
  extraFeatures?: string[]
  featured?: boolean
}

const PLANS_HOSTING: readonly Plan[] = [
  {
    key: 'economy',
    name: 'Economy',
    subtitle: 'For small business',
    price: 3800,
    old: 4600,
    href: '/contact-us/',
    disk: '5GB',
    bandwidth: '30GB',
    sites: '3',
    emails: '20',
    ssl: true,
    cpanel: true,
  },
  {
    key: 'standard',
    name: 'Standard',
    subtitle: 'Best for e‑Commerce',
    price: 6000,
    old: 8000,
    href: '/contact-us/',
    disk: '10GB',
    bandwidth: '60GB',
    sites: '4',
    emails: '50',
    ssl: true,
    cpanel: true,
    featured: true,
  },
  {
    key: 'pro',
    name: 'Pro',
    subtitle: 'For corporate',
    price: 12000,
    old: 17000,
    href: '/contact-us/',
    disk: '30GB',
    bandwidth: '100GB',
    sites: '7',
    emails: '100',
    ssl: true,
    cpanel: true,
  },
]

type Period = 'monthly' | 'yearly'

function Icon({
  name,
  className = 'h-4 w-4',
}: {
  name: string
  className?: string
}) {
  switch (name) {
    case 'disk':
      return (
        <svg viewBox='0 0 24 24' fill='none' className={className} aria-hidden>
          <rect
            x='3'
            y='4'
            width='18'
            height='8'
            rx='2'
            stroke='currentColor'
            strokeWidth='2'
          />
          <rect
            x='3'
            y='12'
            width='18'
            height='8'
            rx='2'
            stroke='currentColor'
            strokeWidth='2'
          />
          <circle cx='8' cy='8' r='1' fill='currentColor' />
          <circle cx='8' cy='16' r='1' fill='currentColor' />
        </svg>
      )
    case 'bandwidth':
      return (
        <svg viewBox='0 0 24 24' fill='none' className={className} aria-hidden>
          <path
            d='M4 12h16'
            stroke='currentColor'
            strokeWidth='2'
            strokeLinecap='round'
          />
          <path
            d='M14 6l6 6-6 6'
            stroke='currentColor'
            strokeWidth='2'
            strokeLinecap='round'
            strokeLinejoin='round'
          />
        </svg>
      )
    case 'sites':
      return (
        <svg viewBox='0 0 24 24' fill='none' className={className} aria-hidden>
          <circle cx='12' cy='12' r='9' stroke='currentColor' strokeWidth='2' />
          <path
            d='M3 12h18M12 3a15 15 0 010 18M12 3a15 15 0 000 18'
            stroke='currentColor'
            strokeWidth='2'
          />
        </svg>
      )
    case 'emails':
      return (
        <svg viewBox='0 0 24 24' fill='none' className={className} aria-hidden>
          <rect
            x='3'
            y='5'
            width='18'
            height='14'
            rx='2'
            stroke='currentColor'
            strokeWidth='2'
          />
          <path
            d='M4 7l8 6 8-6'
            stroke='currentColor'
            strokeWidth='2'
            strokeLinecap='round'
            strokeLinejoin='round'
          />
        </svg>
      )
    case 'ssl':
      return (
        <svg viewBox='0 0 24 24' fill='none' className={className} aria-hidden>
          <rect
            x='4'
            y='10'
            width='16'
            height='10'
            rx='2'
            stroke='currentColor'
            strokeWidth='2'
          />
          <path
            d='M8 10V8a4 4 0 118 0v2'
            stroke='currentColor'
            strokeWidth='2'
          />
        </svg>
      )
    case 'cpanel':
      return (
        <svg viewBox='0 0 24 24' fill='none' className={className} aria-hidden>
          <path
            d='M12 8a4 4 0 100 8 4 4 0 000-8z'
            stroke='currentColor'
            strokeWidth='2'
          />
          <path
            d='M12 2v3M12 19v3M2 12h3M19 12h3M4.9 4.9l2.2 2.2M16.9 16.9l2.2 2.2M19.1 4.9l-2.2 2.2M6.9 16.9l-2.2 2.2'
            stroke='currentColor'
            strokeWidth='2'
            strokeLinecap='round'
          />
        </svg>
      )
    default:
      return null
  }
}

const FEATURES_HOSTING: {
  key: keyof Plan
  label: string
  icon: string
  render?: (p: Plan) => React.ReactNode
}[] = [
  { key: 'disk', label: 'Disk Space', icon: 'disk' },
  { key: 'bandwidth', label: 'Bandwidth / Month', icon: 'bandwidth' },
  { key: 'sites', label: 'Websites', icon: 'sites' },
  { key: 'emails', label: 'Email Accounts', icon: 'emails' },
  {
    key: 'ssl',
    label: 'SSL Certificate',
    icon: 'ssl',
    render: (p) =>
      p.ssl ? (
        <span className='text-emerald-600'>✓ Yes</span>
      ) : (
        <span className='text-slate-500'>No</span>
      ),
  },
  {
    key: 'cpanel',
    label: 'cPanel Control Panel',
    icon: 'cpanel',
    render: (p) =>
      p.cpanel ? (
        <span className='text-emerald-600'>✓ Yes</span>
      ) : (
        <span className='text-slate-500'>No</span>
      ),
  },
]

function priceFor(period: Period, yearly: number) {
  if (period === 'yearly') return yearly
  const monthly = Math.max(1, Math.round(yearly / 12))
  return monthly
}

export type PricingProps = {
  plans?: readonly Plan[]
  features?: {
    key: keyof Plan
    label: string
    icon: string
    render?: (p: Plan) => React.ReactNode
  }[]
  mode?: 'matrix' | 'bullets'
  showToggle?: boolean
  defaultPeriod?: Period
  priceLabel?: string
}

export default function Pricing({
  plans = PLANS_HOSTING,
  features = FEATURES_HOSTING,
  mode = 'matrix',
  showToggle = true,
  defaultPeriod = 'yearly',
  priceLabel,
}: PricingProps) {
  const [period, setPeriod] = useState<Period>(defaultPeriod)
  const label = priceLabel ?? (period === 'yearly' ? '/yr' : '/mo')

  // Refs for animations
  const wrapRef = useRef<HTMLDivElement>(null)
  const toggleWrapRef = useRef<HTMLDivElement>(null)
  const indicatorRef = useRef<HTMLDivElement>(null)
  const monthlyBtnRef = useRef<HTMLButtonElement>(null)
  const yearlyBtnRef = useRef<HTMLButtonElement>(null)

  const cards = useMemo(
    () =>
      plans.map((p) => {
        const current = priceFor(period, p.price)
        const old = priceFor(period, p.old)
        const savePct = Math.max(0, Math.round((1 - current / old) * 100))
        return { p, current, old, savePct }
      }),
    [period, plans]
  )

  // Animate cards in on scroll
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const container = wrapRef.current
      if (!container) return
      gsap.from(container.querySelectorAll('.js-card'), {
        y: 24,
        opacity: 0,
        duration: 0.5,
        ease: 'power3.out',
        stagger: 0.08,
        scrollTrigger: {
          trigger: container,
          start: 'top 85%',
          toggleActions: 'play none none none',
        },
      })
    }, wrapRef)
    return () => ctx.revert()
  }, [])

  // Move the toggle indicator under the active button
  useLayoutEffect(() => {
    const move = () => {
      const wrap = toggleWrapRef.current
      const ind = indicatorRef.current
      const active = period === 'monthly' ? monthlyBtnRef.current : yearlyBtnRef.current
      if (!wrap || !ind || !active) return
      const a = active.getBoundingClientRect()
      const w = wrap.getBoundingClientRect()
      const x = a.left - w.left
      const width = a.width
      gsap.to(ind, { x, width, duration: 0.3, ease: 'power3.out' })
      // Subtle pop on active button
      gsap.fromTo(active, { scale: 0.96 }, { scale: 1, duration: 0.2, ease: 'power2.out' })
    }
    move()
    const onResize = () => move()
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [period])

  // Animate price values on period change
  useLayoutEffect(() => {
    const container = wrapRef.current
    if (!container) return
    const prices = container.querySelectorAll('.js-price')
    if (!prices.length) return
    gsap.fromTo(
      prices,
      { y: 8, opacity: 0, filter: 'blur(2px)' },
      { y: 0, opacity: 1, filter: 'blur(0px)', duration: 0.35, ease: 'power3.out', stagger: 0.06 }
    )
  }, [period, cards.length])

  return (
    <div ref={wrapRef} className='relative'>
      {/* Toggle */}
      {showToggle && (
        <div className='mb-6 flex items-center justify-center gap-3'>
          <div
            ref={toggleWrapRef}
            className='relative inline-flex rounded-xl ring-1 ring-brand/25 bg-white p-1 shadow-sm overflow-hidden'
          >
            {/* sliding indicator */}
            <div
              ref={indicatorRef}
              className='absolute top-1 bottom-1 left-1 rounded-lg bg-brand/10 z-0'
              style={{ width: 0, transform: 'translateX(0px)' }}
              aria-hidden
            />
            <button
              type='button'
              onClick={() => setPeriod('monthly')}
              ref={monthlyBtnRef}
              className={[
                'relative z-10 px-4 py-2 text-sm font-semibold rounded-lg transition focus:outline-none focus-visible:ring-2 focus-visible:ring-brand/50',
                period === 'monthly'
                  ? 'bg-brand text-white shadow ring-1 ring-brand/40'
                  : 'bg-white text-brand ring-1 ring-brand/30 hover:bg-brand/10',
              ].join(' ')}
              aria-pressed={period === 'monthly'}
              aria-current={period === 'monthly' ? 'true' : undefined}
            >
              Monthly
            </button>
            <button
              type='button'
              onClick={() => setPeriod('yearly')}
              ref={yearlyBtnRef}
              className={[
                'relative z-10 px-4 py-2 text-sm font-semibold rounded-lg transition focus:outline-none focus-visible:ring-2 focus-visible:ring-brand/50',
                period === 'yearly'
                  ? 'bg-brand-gold text-slate-900 shadow ring-1 ring-brand-gold/40'
                  : 'bg-white text-brand-gold ring-1 ring-brand-gold/30 hover:bg-brand-gold/10',
              ].join(' ')}
              aria-pressed={period === 'yearly'}
              aria-current={period === 'yearly' ? 'true' : undefined}
            >
              Yearly
            </button>
          </div>
          {period === 'yearly' && (
            <span className='text-xs rounded-full px-2.5 py-1 font-semibold bg-emerald-500 text-white ring-1 ring-emerald-600/40'>
              Best value
            </span>
          )}
        </div>
      )}

      {/* Cards */}
      <div className='pointer-events-none absolute inset-0 -z-10 rounded-3xl bg-gradient-to-b from-slate-50 to-transparent' />
      <div className='relative z-10 grid gap-6 md:grid-cols-3'>
        {cards.map(({ p, current, old, savePct }) => (
          <div
            key={p.key}
            className={[
              'group relative rounded-2xl border bg-white shadow-sm transition duration-300',
              'hover:shadow-xl hover:shadow-slate-900/5 hover:-translate-y-0.5',
              p.featured ? 'ring-2 ring-brand' : 'ring-1 ring-slate-200',
            ].join(' ')}
          >
            {p.featured && (
              <div className='absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-brand-gold text-slate-900 px-3 py-1 text-xs font-semibold shadow ring-1 ring-brand-gold/30'>
                Most Popular
              </div>
            )}
            <div className='px-6 pt-6'>
              <div className='flex items-baseline justify-between'>
                <div>
                  <h4 className='text-lg font-semibold'>{p.name}</h4>
                  <p className='text-xs text-slate-500'>{p.subtitle}</p>
                </div>
                {savePct > 0 && (
                  <span className='rounded-full bg-brand/10 text-brand text-xs font-semibold px-2 py-1 border border-brand/20'>
                    Save {savePct}%
                  </span>
                )}
              </div>

              <div className='mt-4 flex items-end gap-2'>
                <div className='text-3xl font-bold text-slate-900 js-price'>
                  {formatBDT(current, false)}
                  <span className='text-base font-normal text-slate-500'>
                    {label}
                  </span>
                </div>
                <div className='text-sm text-slate-400 line-through js-price'>
                  {formatBDT(old, false)}
                </div>
              </div>

              {mode === 'matrix' ? (
                <ul className='mt-5 space-y-3'>
                  {(features || []).map((f) => (
                    <li
                      key={f.label}
                      className='flex items-center justify-between text-sm'
                    >
                      <span className='flex items-center gap-2 text-slate-600'>
                        <span className='text-brand'>
                          <Icon name={f.icon} />
                        </span>
                        {f.label}
                      </span>
                      <span className='font-medium text-slate-800'>
                        {f.render ? f.render(p) : (p as any)[f.key]}
                      </span>
                    </li>
                  ))}
                </ul>
              ) : (
                <ul className='mt-5 space-y-2 text-sm text-slate-700'>
                  {(p.extraFeatures || []).map((f) => (
                    <li key={f} className='flex items-start gap-2'>
                      <span className='mt-1 text-emerald-600'>
                        <svg width='14' height='14' viewBox='0 0 24 24' fill='none'>
                          <path d='M20 6L9 17l-5-5' stroke='currentColor' strokeWidth='2' strokeLinecap='round' strokeLinejoin='round' />
                        </svg>
                      </span>
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            <div className='px-6 pb-6 pt-4'>
              <Link
                href={p.href}
                className={[
                  'w-full inline-flex items-center justify-center rounded-xl px-5 py-3 font-medium transition',
                  p.featured
                    ? 'bg-brand text-white hover:bg-brand-dark'
                    : 'bg-white text-brand ring-1 ring-brand hover:bg-brand/10',
                ].join(' ')}
              >
                Select Plan
              </Link>
              <p className='mt-2 text-center text-xs text-slate-500'>
                30‑day money‑back guarantee
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
