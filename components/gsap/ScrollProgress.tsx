'use client'
import { useRef, useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
gsap.registerPlugin(ScrollTrigger)

export default function ScrollProgress({
  color = '#0F5BD2',
  height = 3,
}: {
  color?: string
  height?: number
}) {
  const barRef = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const bar = barRef.current!
    gsap.set(bar, { scaleX: 0, transformOrigin: 'left center' })
    const st = ScrollTrigger.create({
      start: 0,
      end: 'max',
      onUpdate: (self) =>
        gsap.to(bar, { scaleX: self.progress, ease: 'none', duration: 0 }),
    })
    return () => st.kill()
  }, [])
  return (
    <div
      ref={barRef}
      className='fixed top-0 left-0 z-[100]'
      style={{ height, width: '100vw', backgroundColor: color }}
    />
  )
}
