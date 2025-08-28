import Section from '../../../components/Section'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'

const POSTS: Record<string, { title: string; body: string; image?: string }> = {
  'facebook-dependent-business-risk': {
    title: 'আপনার ব্যবসা কি শুধুমাত্র ফেসবুক নির্ভর?',
    body:
      'ফেসবুক পেজ বন্ধ হয়ে গেলে বিকল্প কোথায়? নিজস্ব ডোমেইন + হোস্টিং + ওয়েবসাইটই টেকসই সমাধান। আপনি যখন নিজের ওয়েবসাইটে কন্টেন্ট রাখেন, তখন সেটির নিয়ন্ত্রণ থাকে আপনার হাতে — অ্যালগরিদম বা পলিসি পরিবর্তনে ব্যবসা থেমে যায় না।',
    image: '/images/datacenter.jpg',
  },
  'why-your-business-needs-a-website': {
    title: 'Why your business needs its own website',
    body:
      'Owning a website means owning your audience and data. It increases brand trust, enables SEO, and converts visitors without relying on a single platform. Start with a clear structure, fast hosting, and SSL for credibility.',
    image: '/images/og-cover.jpg',
  },
  'choose-right-hosting': {
    title: 'How to choose the right hosting plan',
    body:
      'Prioritize uptime SLAs, real support, and performance (CPU/RAM/IO). Check growth paths (upgrades), backups, and security. For new sites, start small and scale as traffic grows.',
    image: '/images/datacenter.jpg',
  },
  'seo-basics-for-small-business': {
    title: 'SEO basics for small business (বাংলা)',
    body:
      'কীওয়ার্ড রিসার্চ, অন‑পেজ অপ্টিমাইজেশন, দ্রুত লোডিং এবং লোকাল SEO — এই চারটি বিষয়ে নিয়মিত কাজ করলেই ফল পাওয়া যায়। গুগল মাই বিজনেস প্রোফাইল ঠিক করা খুবই গুরুত্বপূর্ণ।',
    image: '/images/og-cover.jpg',
  },
  'speed-matters-core-web-vitals': {
    title: 'Website speed matters: a quick guide',
    body:
      'Core Web Vitals (LCP, CLS, INP) affect both UX and rankings. Optimize images, avoid render‑blocking scripts, and use efficient hosting/CDN for faster delivery.',
    image: '/images/datacenter.jpg',
  },
  'domain-ssl-trust': {
    title: 'Domain + SSL = Trust',
    body:
      'A branded domain and SSL certificate build credibility and protect user data. Modern browsers flag non‑HTTPS pages; show the lock icon to reduce drop‑offs at forms and checkout.',
    image: '/images/og-cover.jpg',
  },
}

export const dynamicParams = false

export function generateStaticParams() {
  return Object.keys(POSTS).map((slug) => ({ slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params // ← Next 15: params is a Promise
  const post = POSTS[slug]
  if (!post) return { title: 'Post not found' }
  const description = post.body.slice(0, 120)
  return {
    title: post.title,
    description,
    openGraph: { title: post.title, description },
  }
}

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params // ← await params
  const post = POSTS[slug]
  if (!post) return notFound()
  return (
    <>
      {/* Banner image on top */}
      <section className='bg-white'>
        <div className='container py-6'>
          <div className='rounded-2xl overflow-hidden border border-slate-200 shadow-sm'>
            <div style={{ aspectRatio: '3 / 2' }} className='w-full'>
              <img
                src={post.image || '/images/og-cover.jpg'}
                alt={post.title}
                className='w-full h-full object-cover'
              />
            </div>
          </div>
        </div>
      </section>

      <Section title={post.title}>
        <div className='prose max-w-none'>{post.body}</div>
      </Section>
    </>
  )
}
