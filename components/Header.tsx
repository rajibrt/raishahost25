'use client'
import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { usePathname } from 'next/navigation'

function normalize(p: string) {
  if (!p) return '/'
  if (p.length > 1 && p.endsWith('/')) return p.slice(0, -1)
  return p
}
function isActive(pathname: string, href: string) {
  const cur = normalize(pathname)
  const base = normalize(href)
  if (base === '/') return cur === '/'
  // allow sub-routes like /knowledge/[slug]
  return cur === base || cur.startsWith(base + '/')
}

function NavLink({
  href,
  label,
  onClick,
  active,
  className = '',
}: {
  href: string
  label: string
  onClick?: () => void
  active?: boolean
  className?: string
}) {
  const base =
    'block px-3 py-2 text-base md:text-sm font-medium rounded-lg transition-colors'
  const activeCls =
    'text-brand md:underline md:underline-offset-8 md:decoration-2 bg-brand/5 md:bg-transparent'
  const inactiveCls = 'text-slate-700 hover:text-brand'
  return (
    <Link
      href={href}
      onClick={onClick}
      aria-current={active ? 'page' : undefined}
      className={[base, active ? activeCls : inactiveCls, className].join(' ')}
    >
      {label}
    </Link>
  )
}

export default function Header() {
  const pathname = usePathname() || '/'
  const [open, setOpen] = useState(false)
  const [mounted, setMounted] = useState(false)
  const closeBtnRef = useRef<HTMLButtonElement>(null)

  useEffect(() => setMounted(true), [])

  // ESC + body scroll lock
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false)
    document.addEventListener('keydown', onKey)
    if (open) {
      document.documentElement.classList.add('overflow-hidden')
      closeBtnRef.current?.focus()
    } else {
      document.documentElement.classList.remove('overflow-hidden')
    }
    return () => document.removeEventListener('keydown', onKey)
  }, [open])

  const MobilePortal = mounted
    ? createPortal(
        <div
          className={`fixed inset-0 z-[9999] md:hidden ${
            open
              ? 'opacity-100 pointer-events-auto'
              : 'opacity-0 pointer-events-none'
          } motion-safe:transition-opacity duration-300`}
          onClick={(e) => {
            if (e.target === e.currentTarget) setOpen(false)
          }}
          aria-hidden={!open}
        >
          {/* Backdrop */}
          <div
            className={`absolute inset-0 bg-black/50 ${
              open ? 'opacity-100' : 'opacity-0'
            } motion-safe:transition-opacity duration-300`}
          />
          {/* Drawer (slide-in) */}
          <aside
            role='dialog'
            aria-modal='true'
            onClick={(e) => e.stopPropagation()}
            className={`fixed inset-y-0 right-0 w-full h-full bg-white overflow-y-auto overscroll-contain
                        transform-gpu will-change-transform
                        motion-safe:transition-transform motion-safe:duration-300 motion-safe:ease-in-out
                        ${open ? 'translate-x-0' : 'translate-x-full'}`}
          >
            <div className='sticky top-0 z-20 flex items-center justify-between h-16 px-4 border-b bg-white'>
              <span className='font-semibold'>Menu</span>
              <button
                ref={closeBtnRef}
                className='p-2 rounded-lg ring-1 ring-slate-200'
                onClick={() => setOpen(false)}
                aria-label='Close menu'
              >
                <svg width='22' height='22' viewBox='0 0 24 24' fill='none'>
                  <path
                    d='M6 6l12 12M18 6l-12 12'
                    stroke='currentColor'
                    strokeWidth='2'
                    strokeLinecap='round'
                  />
                </svg>
              </button>
            </div>

            <nav className='p-2 bg-white'>
              <NavLink
                href='/'
                label='Home'
                onClick={() => setOpen(false)}
                active={isActive(pathname, '/')}
              />
              <NavLink
                href='/web-design/'
                label='Web Design'
                onClick={() => setOpen(false)}
                active={isActive(pathname, '/web-design/')}
              />
              <NavLink
                href='/website-packages/'
                label='Website Packages'
                onClick={() => setOpen(false)}
                active={isActive(pathname, '/website-packages/')}
              />
              <NavLink
                href='/logo-design/'
                label='Logo Design'
                onClick={() => setOpen(false)}
                active={isActive(pathname, '/logo-design/')}
              />
              <NavLink
                href='/knowledge/'
                label='Knowledge'
                onClick={() => setOpen(false)}
                active={isActive(pathname, '/knowledge/')}
              />
              <NavLink
                href='/contact-us/'
                label='Contact Us'
                onClick={() => setOpen(false)}
                active={isActive(pathname, '/contact-us/')}
              />
              <a
                href='https://hosting.raishahost.com/'
                className='btn mt-3 block text-center'
                target='_blank'
                rel='noopener noreferrer'
                onClick={() => setOpen(false)}
              >
                Dashboard
              </a>
            </nav>
          </aside>
        </div>,
        document.body
      )
    : null

  return (
    <header className='sticky top-0 z-50 w-full border-b bg-white/80 backdrop-blur'>
      <div className='container flex h-16 items-center justify-between'>
        {/* Brand — only logo visible; name kept for screen readers */}
        <Link href='/' className='flex items-center gap-2 font-semibold'>
          <img
            src='/images/logo.svg'
            alt='Raisha Host'
            className='h-8 w-auto'
          />
          <span className='sr-only'>Raisha Host</span>
        </Link>

        {/* Desktop nav */}
        <nav className='hidden md:flex items-center'>
          <NavLink href='/' label='Home' active={isActive(pathname, '/')} />
          <NavLink
            href='/web-design/'
            label='Web Design'
            active={isActive(pathname, '/web-design/')}
          />
          <NavLink
            href='/website-packages/'
            label='Website Packages'
            active={isActive(pathname, '/website-packages/')}
          />
          <NavLink
            href='/logo-design/'
            label='Logo Design'
            active={isActive(pathname, '/logo-design/')}
          />
          <NavLink
            href='/knowledge/'
            label='Knowledge'
            active={isActive(pathname, '/knowledge/')}
          />
          <NavLink
            href='/contact-us/'
            label='Contact Us'
            active={isActive(pathname, '/contact-us/')}
          />
          <a
            href='https://hosting.raishahost.com/'
            className='ml-2 btn'
            target='_blank'
            rel='noopener noreferrer'
          >
            Dashboard
          </a>
        </nav>

        {/* Mobile trigger — hamburger */}
        <button
          onClick={() => setOpen(true)}
          className='md:hidden p-2 rounded-lg ring-1 ring-slate-200'
          aria-expanded={open}
          aria-label='Open menu'
        >
          <svg width='24' height='24' viewBox='0 0 24 24' fill='none'>
            <path
              d='M4 7h16M4 12h16M4 17h16'
              stroke='currentColor'
              strokeWidth='2'
              strokeLinecap='round'
            />
          </svg>
        </button>
      </div>

      {/* Mobile menu via Portal */}
      {MobilePortal}
    </header>
  )
}
