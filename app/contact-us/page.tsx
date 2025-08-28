'use client'
import { useMemo, useState } from 'react'
import Link from 'next/link'

function MailIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox='0 0 24 24' fill='none' aria-hidden {...props}>
      <rect x='3' y='5' width='18' height='14' rx='2' stroke='currentColor' strokeWidth='2' />
      <path d='M4 7l8 6 8-6' stroke='currentColor' strokeWidth='2' strokeLinecap='round' strokeLinejoin='round' />
    </svg>
  )
}
function PhoneIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox='0 0 24 24' fill='none' aria-hidden {...props}>
      <path d='M22 16.92v2a2 2 0 01-2.18 2 19.8 19.8 0 01-8.63-3.07 19.5 19.5 0 01-6-6A19.8 19.8 0 012.92 4.2 2 2 0 015 2h2a2 2 0 012 1.72c.12.86.33 1.7.63 2.5a2 2 0 01-.45 2.11L8.1 9.4a16 16 0 006.5 6.5l1.07-1.08a2 2 0 012.11-.45c.8.3 1.64.51 2.5.63A2 2 0 0122 16.92z' stroke='currentColor' strokeWidth='2' strokeLinecap='round' strokeLinejoin='round' />
    </svg>
  )
}
function WhatsAppIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox='0 0 24 24' fill='none' aria-hidden {...props}>
      <path d='M20.52 3.48A11.9 11.9 0 0012.02 0C5.45.03.16 5.33.18 11.9a11.86 11.86 0 001.7 6.13L0 24l6.18-1.83a11.95 11.95 0 005.84 1.55h.01c6.57 0 11.86-5.3 11.89-11.87a11.84 11.84 0 00-3.4-8.37z' fill='#25D366'/>
      <path d='M19.15 17.21c-.28.8-1.65 1.52-2.3 1.62-.62.09-1.4.13-2.26-.14-.52-.17-1.2-.39-2.07-.76-3.64-1.57-6-5.24-6.19-5.49-.18-.24-1.48-1.98-1.48-3.78 0-1.8.95-2.68 1.29-3.04.34-.36.74-.45.98-.45.24 0 .49 0 .7.01.22.01.52-.08.81.62.28.7.95 2.41 1.03 2.59.08.17.14.37.02.6-.12.24-.19.38-.37.58-.19.2-.39.45-.56.6-.18.19-.36.39-.16.76.2.37.9 1.48 1.93 2.4 1.33 1.18 2.45 1.55 2.82 1.73.37.18.59.16.8-.1.2-.25.92-1.07 1.17-1.44.25-.37.49-.3.81-.18.32.12 2.03.96 2.38 1.14.35.18.58.26.67.41.09.15.09.87-.19 1.67z' fill='#fff'/>
    </svg>
  )
}

export default function ContactPage() {
  const [status, setStatus] = useState<string | undefined>()
  const [loading, setLoading] = useState(false)

  const contacts = useMemo(
    () => ([
      {
        title: 'Email',
        value: 'info@raishahost.com',
        href: 'mailto:info@raishahost.com',
        icon: MailIcon,
      },
      {
        title: 'Mobile (Primary)',
        value: '+8801711380679',
        href: 'tel:+8801711380679',
        icon: PhoneIcon,
      },
      {
        title: 'Mobile (Support)',
        value: '+8801878037803',
        href: 'tel:+8801878037803',
        icon: PhoneIcon,
      },
      {
        title: 'WhatsApp Business',
        value: '+8801711380679',
        href: 'https://wa.me/8801711380679',
        icon: WhatsAppIcon,
      },
    ]),
    []
  )

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const form = e.currentTarget
    const data = Object.fromEntries(new FormData(form).entries())
    setLoading(true)
    setStatus('Sending…')
    try {
      const res = await fetch('/contact.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })
      if (res.ok) {
        setStatus("Thanks! We'll be in touch.")
        ;(form as HTMLFormElement).reset()
      } else {
        setStatus('Something went wrong. Please try again.')
      }
    } catch {
      setStatus('Network error. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      {/* HERO */}
      <section className='relative overflow-hidden'>
        <div className='absolute inset-0 bg-gradient-to-b from-[#0F5BD2] via-[#1a66dc] to-[#2b7bf0]' />
        <div className='relative container py-16 md:py-24 text-white'>
          <h1 className='text-4xl/tight md:text-5xl/tight font-bold tracking-tight'>Contact Us</h1>
          <p className='mt-4 max-w-2xl text-white/90'>We’re here to help. Use the form or reach us directly by email or phone.</p>
          <div className='mt-6 flex flex-wrap gap-3'>
            <Link href='mailto:info@raishahost.com' className='btn !bg-white !text-[#0F5BD2] hover:!bg-slate-100 ring-2 ring-white/70 shadow-lg'>Email Us</Link>
            <Link href='tel:+8801711380679' target='_blank' rel='noopener noreferrer' className='btn bg-[#FF7A00] hover:bg-[#ff6a00]'>Call Now</Link>
            <Link href='https://wa.me/8801711380679' target='_blank' rel='noopener noreferrer' className='btn !bg-[#25D366] hover:!bg-[#1ebe5d]'>WhatsApp</Link>
          </div>
        </div>
      </section>

      {/* CONTENT */}
      <section className='bg-white'>
        <div className='container py-12 grid gap-8 md:grid-cols-2'>
          {/* Contact info */}
          <div>
            <h2 className='h2 mb-4'>Get in touch</h2>
            <p className='text-slate-600 mb-6'>Reach out anytime. We aim to reply within one business day.</p>
            <div className='grid gap-4'>
              {contacts.map(({ title, value, href, icon: Icon }) => {
                const isPhoneOrWa = href.startsWith('tel:') || href.includes('wa.me')
                return (
                <a key={title} href={href} className='card flex items-center gap-4 hover:shadow transition' target={isPhoneOrWa ? '_blank' : undefined} rel={isPhoneOrWa ? 'noopener noreferrer' : undefined}>
                  <span className='h-10 w-10 rounded-xl bg-brand/10 text-brand grid place-items-center overflow-hidden'>
                    <Icon width={20} height={20} />
                  </span>
                  <div>
                    <div className='text-sm text-slate-500'>{title}</div>
                    <div className='font-medium'>{value}</div>
                  </div>
                </a>
              )})}
            </div>
            <div className='mt-6 grid gap-2'>
              <div className='text-sm font-semibold text-slate-700'>Business Hours (BD Time)</div>
              <div className='text-sm text-slate-600'>Saturday – Thursday: 9:00 AM – 5:00 PM</div>
              <div className='text-sm text-slate-600'>Friday: Closed</div>
              <p className='mt-2 text-xs text-slate-500'>For support tickets, please use the Client Area for faster resolution.</p>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={submit} className='card grid gap-4'>
            <div>
              <label className='block text-sm font-medium text-slate-700'>Name<span className='text-rose-600'>*</span></label>
              <input name='name' className='mt-1 w-full border rounded-xl px-4 py-3' required placeholder='Your name' />
            </div>
            <div className='grid gap-4 sm:grid-cols-2'>
              <div>
                <label className='block text-sm font-medium text-slate-700'>Email<span className='text-rose-600'>*</span></label>
                <input type='email' name='email' className='mt-1 w-full border rounded-xl px-4 py-3' required placeholder='you@example.com' />
              </div>
              <div>
                <label className='block text-sm font-medium text-slate-700'>Phone</label>
                <input name='phone' className='mt-1 w-full border rounded-xl px-4 py-3' placeholder='+8801XXXXXXXXX' />
              </div>
            </div>
            <div>
              <label className='block text-sm font-medium text-slate-700'>Subject</label>
              <input name='subject' className='mt-1 w-full border rounded-xl px-4 py-3' placeholder='How can we help?' />
            </div>
            <div>
              <label className='block text-sm font-medium text-slate-700'>Message<span className='text-rose-600'>*</span></label>
              <textarea name='message' className='mt-1 w-full border rounded-xl px-4 py-3 min-h-[140px]' required placeholder='Tell us a bit about your project or issue...' />
            </div>
            <div className='flex items-center gap-3'>
              <button className='btn' type='submit' disabled={loading}>
                {loading ? 'Sending…' : 'Send Message'}
              </button>
              <span className='text-xs text-slate-500'>We’ll never share your details.</span>
            </div>
            {status && (
              <p className='text-sm text-slate-600' aria-live='polite'>
                {status}
              </p>
            )}
          </form>
        </div>
      </section>
    </>
  )
}
