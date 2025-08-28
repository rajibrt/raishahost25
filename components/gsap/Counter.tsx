'use client'
import { useRef, useLayoutEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
gsap.registerPlugin(ScrollTrigger)

export default function Counter({
  to,
  duration = 1.2,
  prefix = '',
  suffix = '',
  decimals = 0,
}: {
  to: number
  duration?: number
  prefix?: string
  suffix?: string
  decimals?: number
}) {
  const ref = useRef<HTMLSpanElement>(null)
  useLayoutEffect(() => {
    const el = ref.current!
    const obj = { val: 0 }
    const ctx = gsap.context(() => {
      gsap.to(obj, {
        val: to,
        duration,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: el,
          start: 'top 90%',
          toggleActions: 'play none none none',
        },
        onUpdate: () => {
          const v = obj.val.toFixed(decimals)
          el.textContent = `${prefix}${Number(v).toLocaleString()}${suffix}`
        },
      })
    }, ref)
    return () => ctx.revert()
  }, [to, duration, prefix, suffix, decimals])
  return <span ref={ref} />
}
