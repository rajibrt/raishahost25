'use client'
import { useState } from 'react'

export default function ContactForm() {
  const [status, setStatus] = useState<string | undefined>()
  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const form = e.currentTarget as HTMLFormElement
    const data = Object.fromEntries(new FormData(form).entries())
    setStatus('Sending…')
    try {
      const res = await fetch('/contact.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })
      setStatus(res.ok ? "Thanks! We'll be in touch." : 'Something went wrong.')
    } catch {
      setStatus('Network error.')
    }
  }
  return (
    <form onSubmit={submit} className='card grid gap-4 max-w-xl'>
      <input
        name='name'
        placeholder='Name'
        className='border rounded-xl px-4 py-3'
        required
      />
      <input
        type='email'
        name='email'
        placeholder='Email'
        className='border rounded-xl px-4 py-3'
        required
      />
      <input
        name='subject'
        placeholder='Subject'
        className='border rounded-xl px-4 py-3'
      />
      <textarea
        name='message'
        placeholder='Message'
        className='border rounded-xl px-4 py-3 min-h-[140px]'
      ></textarea>
      <button className='btn' type='submit'>
        Send
      </button>
      {status && <p className='text-sm text-slate-600'>{status}</p>}
    </form>
  )
}
