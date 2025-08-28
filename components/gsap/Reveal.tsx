'use client'
import { useRef, useLayoutEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
gsap.registerPlugin(ScrollTrigger)

type Props = React.PropsWithChildren<{
  y?: number
  delay?: number
  duration?: number
  stagger?: number
  once?: boolean
  from?: gsap.TweenVars
  to?: gsap.TweenVars
  className?: string
}>

export default function Reveal({
  children,
  y = 24,
  delay = 0,
  duration = 0.6,
  stagger = 0.08,
  once = true,
  from,
  to,
  className,
}: Props) {
  const ref = useRef<HTMLDivElement>(null)

  useLayoutEffect(() => {
    const el = ref.current!
    const targets = el.children.length ? el.children : [el]

    const ctx = gsap.context(() => {
      gsap.fromTo(
        targets,
        { y, opacity: 0, ...from },
        {
          y: 0,
          opacity: 1,
          duration,
          delay,
          stagger,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: el,
            start: 'top 85%',
            toggleActions: once
              ? 'play none none none'
              : 'play none none reverse',
          },
          ...to,
        }
      )
    }, ref)

    return () => ctx.revert()
  }, [y, delay, duration, stagger, once, from, to])

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  )
}
