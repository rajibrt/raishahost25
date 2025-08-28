'use client'
import { useRef, useLayoutEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
gsap.registerPlugin(ScrollTrigger)

export default function ParallaxImage({
  src,
  alt,
  className = '',
}: {
  src: string
  alt: string
  className?: string
}) {
  const wrap = useRef<HTMLDivElement>(null)
  const img = useRef<HTMLImageElement>(null)

  useLayoutEffect(() => {
    const w = wrap.current!,
      i = img.current!
    const ctx = gsap.context(() => {
      // scroll parallax (subtle)
      gsap.to(i, {
        y: -30,
        ease: 'none',
        scrollTrigger: {
          trigger: w,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1,
        },
      })
      // mouse tilt
      const onMove = (e: MouseEvent) => {
        const r = w.getBoundingClientRect()
        const mx = (e.clientX - r.left) / r.width - 0.5
        const my = (e.clientY - r.top) / r.height - 0.5
        gsap.to(i, {
          rotateY: mx * 6,
          rotateX: -my * 6,
          duration: 0.3,
          transformPerspective: 800,
        })
      }
      const onLeave = () =>
        gsap.to(i, { rotateX: 0, rotateY: 0, duration: 0.4 })
      w.addEventListener('mousemove', onMove)
      w.addEventListener('mouseleave', onLeave)
      return () => {
        w.removeEventListener('mousemove', onMove)
        w.removeEventListener('mouseleave', onLeave)
      }
    }, wrap)
    return () => ctx.revert()
  }, [])

  return (
    <div
      ref={wrap}
      className={
        'rounded-2xl bg-white/10 p-4 ring-1 ring-white/20 shadow-2xl ' +
        className
      }
    >
      <img
        ref={img}
        src={src}
        alt={alt}
        className='w-full rounded-xl will-change-transform'
      />
    </div>
  )
}
