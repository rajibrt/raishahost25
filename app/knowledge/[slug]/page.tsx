import Section from '../../../components/Section'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'

const POSTS: Record<string, { title: string; body: string }> = {
  'facebook-dependent-business-risk': {
    title: 'আপনার ব্যবসা কি শুধুমাত্র ফেসবুক নির্ভর?',
    body: 'ফেসবুক পেজ বন্ধ হয়ে গেলে বিকল্প কোথায়? নিজস্ব ডোমেইন + হোস্টিং + ওয়েবসাইটই টেকসই সমাধান।',
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
    <Section title={post.title}>
      <div className='prose max-w-none'>{post.body}</div>
    </Section>
  )
}
