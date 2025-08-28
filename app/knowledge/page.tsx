import Section from "../../components/Section";
import Link from "next/link";

export const metadata = { title: "Knowledge" };
const posts = [
  { slug: "facebook-dependent-business-risk", title: "আপনার ব্যবসা কি শুধুমাত্র ফেসবুক নির্ভর?", excerpt: "অনলাইন ব্যবসার টেকসই ভিত্তি গড়তে নিজস্ব ওয়েবসাইট কেন জরুরি", date: "2025-08-01" },
];
export default function Page(){
  return (
    <Section title="Knowledge (Blog)">
      <div className="grid gap-6 md:grid-cols-3">
        {posts.map(p=> (
          <article key={p.slug} className="card">
            <h3 className="font-semibold mb-2"><Link href={`/knowledge/${p.slug}/`}>{p.title}</Link></h3>
            <p className="text-sm text-slate-600">{p.excerpt}</p>
            <p className="mt-2 text-xs text-slate-500">{p.date}</p>
          </article>
        ))}
      </div>
    </Section>
  );
}
