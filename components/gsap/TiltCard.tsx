'use client'
import { useRef, useLayoutEffect } from 'react'
import gsap from 'gsap'

export default function TiltCard({
  children,
  strength = 8,
  className = '',
}: {
  children: React.ReactNode
  strength?: number
  className?: string
}) {
  const wrap = useRef<HTMLDivElement>(null)
  const inner = useRef<HTMLDivElement>(null)

  useLayoutEffect(() => {
    const w = wrap.current!,
      i = inner.current!
    const onMove = (e: MouseEvent) => {
      const r = w.getBoundingClientRect()
      const mx = (e.clientX - r.left) / r.width - 0.5
      const my = (e.clientY - r.top) / r.height - 0.5
      gsap.to(i, {
        rotateY: mx * strength,
        rotateX: -my * strength,
        x: mx * 4,
        y: -my * 4,
        duration: 0.2,
        ease: 'power3.out',
        transformPerspective: 800,
      })
    }
    const onEnter = () => gsap.to(i, { scale: 1.02, duration: 0.2 })
    const onLeave = () =>
      gsap.to(i, {
        rotateX: 0,
        rotateY: 0,
        x: 0,
        y: 0,
        scale: 1,
        duration: 0.4,
        ease: 'power3.out',
      })
    w.addEventListener('mousemove', onMove)
    w.addEventListener('mouseenter', onEnter)
    w.addEventListener('mouseleave', onLeave)
    return () => {
      w.removeEventListener('mousemove', onMove)
      w.removeEventListener('mouseenter', onEnter)
      w.removeEventListener('mouseleave', onLeave)
    }
  }, [strength])

  return (
    <div ref={wrap} className={'[perspective:1000px] ' + className}>
      <div ref={inner} className='[transform-style:preserve-3d]'>
        {children}
      </div>
    </div>
  )
}
