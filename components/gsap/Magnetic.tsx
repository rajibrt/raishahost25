'use client'
import { useRef, useLayoutEffect } from 'react'
import gsap from 'gsap'

export default function Magnetic({
  children,
  strength = 0.25,
  className = '',
}: {
  children: React.ReactNode
  strength?: number
  className?: string
}) {
  const ref = useRef<HTMLSpanElement>(null)
  useLayoutEffect(() => {
    const el = ref.current!
    const onMove = (e: MouseEvent) => {
      const r = el.getBoundingClientRect()
      const mx = e.clientX - (r.left + r.width / 2)
      const my = e.clientY - (r.top + r.height / 2)
      gsap.to(el, {
        x: mx * strength,
        y: my * strength,
        duration: 0.25,
        ease: 'power3.out',
      })
    }
    const onEnter = () => gsap.to(el, { scale: 1.03, duration: 0.2 })
    const onLeave = () =>
      gsap.to(el, { x: 0, y: 0, scale: 1, duration: 0.35, ease: 'power3.out' })
    el.addEventListener('mousemove', onMove)
    el.addEventListener('mouseenter', onEnter)
    el.addEventListener('mouseleave', onLeave)
    return () => {
      el.removeEventListener('mousemove', onMove)
      el.removeEventListener('mouseenter', onEnter)
      el.removeEventListener('mouseleave', onLeave)
    }
  }, [strength])
  return (
    <span ref={ref} className={'inline-block ' + className}>
      {children}
    </span>
  )
}
