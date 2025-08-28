import Section from "../../components/Section";
import Link from "next/link";

export const metadata = { title: "Knowledge" };

const posts = [
  {
    slug: "facebook-dependent-business-risk",
    title: "আপনার ব্যবসা কি শুধুমাত্র ফেসবুক নির্ভর?",
    excerpt:
      "অনলাইন ব্যবসার টেকসই ভিত্তি গড়তে নিজস্ব ওয়েবসাইট কেন জরুরি",
    date: "2025-08-01",
    image: "/images/datacenter.jpg",
  },
  {
    slug: "why-your-business-needs-a-website",
    title: "Why your business needs its own website",
    excerpt:
      "Own your audience, improve trust, and boost conversions beyond social.",
    date: "2025-07-18",
    image: "/images/og-cover.jpg",
  },
  {
    slug: "choose-right-hosting",
    title: "How to choose the right hosting plan",
    excerpt:
      "Uptime, speed, support and scaling — what actually matters.",
    date: "2025-07-05",
    image: "/images/datacenter.jpg",
  },
  {
    slug: "seo-basics-for-small-business",
    title: "SEO basics for small business (বাংলা)",
    excerpt:
      "গুগলে খুঁজলে আপনার ব্যবসা যেন সামনে আসে — কিছু সহজ কৌশল।",
    date: "2025-06-22",
    image: "/images/og-cover.jpg",
  },
  {
    slug: "speed-matters-core-web-vitals",
    title: "Website speed matters: a quick guide",
    excerpt:
      "Core Web Vitals in plain English — and what you can do today.",
    date: "2025-06-10",
    image: "/images/datacenter.jpg",
  },
  {
    slug: "domain-ssl-trust",
    title: "Domain + SSL = Trust",
    excerpt:
      "প্রফেশনাল ডোমেইন ও SSL কেন ক্রেতার আস্থা বাড়ায় — ৫টি কারণ।",
    date: "2025-05-28",
    image: "/images/og-cover.jpg",
  },
];

export default function Page() {
  return (
    <>
      {/* HERO */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[#0F5BD2] via-[#1a66dc] to-[#2b7bf0]" />
        <div className="relative container py-16 md:py-24 text-white">
          <h1 className="text-4xl/tight md:text-5xl/tight font-bold tracking-tight">
            Knowledge
          </h1>
          <p className="mt-4 max-w-2xl text-white/90">
            Articles, tips, and how‑tos to grow your business online — hosting,
            web design, SEO, and more.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              href="#latest"
              className="btn !bg-white !text-[#0F5BD2] hover:!bg-slate-100 ring-2 ring-white/70 shadow-lg"
            >
              Read Latest
            </Link>
            <Link
              href="/contact-us/"
              className="btn bg-[#FF7A00] hover:bg-[#ff6a00]"
            >
              Need Help?
            </Link>
          </div>
        </div>
      </section>

      {/* LATEST POSTS */}
      <Section id="latest" title="Latest Posts">
        <div className="grid gap-6 md:grid-cols-3 items-stretch">
          {posts.map((p) => (
            <article key={p.slug} className="card p-0 overflow-hidden h-full min-h-[360px] flex flex-col">
              <div className="w-full bg-slate-100" style={{ aspectRatio: '3 / 2' }}>
                <img
                  src={p.image || "/images/og-cover.jpg"}
                  alt=""
                  className="h-full w-full object-cover"
                  loading="lazy"
                />
              </div>
              <div className="p-4 flex-1 flex flex-col">
                <h3 className="font-semibold mb-2">
                  <Link href={`/knowledge/${p.slug}/`}>{p.title}</Link>
                </h3>
                <p className="text-sm text-slate-600">{p.excerpt}</p>
                <p className="mt-2 text-xs text-slate-500">{p.date}</p>
              </div>
            </article>
          ))}
        </div>
      </Section>
    </>
  );
}
