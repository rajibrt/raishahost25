import Section from "../../components/Section";
import Link from "next/link";
import Pricing, { Plan } from "../../components/Pricing";

export const metadata = {
  title: "Web Design & Development",
  description:
    "Custom websites, eCommerce, and CMS development using Next.js, React, WordPress and more — fast, accessible, and SEO‑friendly.",
};

function Icon({ name, className = "h-5 w-5" }: { name: string; className?: string }) {
  switch (name) {
    case "landing":
      return (
        <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden>
          <rect x="3" y="4" width="18" height="16" rx="2" stroke="currentColor" strokeWidth="2" />
          <path d="M3 9h18" stroke="currentColor" strokeWidth="2" />
          <rect x="6" y="12" width="6" height="4" rx="1" fill="currentColor" />
        </svg>
      );
    case "commerce":
      return (
        <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden>
          <path d="M6 6h15l-1.5 9a3 3 0 01-3 2.5H9.5A3 3 0 016.6 15L5 4H3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          <circle cx="10" cy="20" r="1.5" fill="currentColor" />
          <circle cx="17" cy="20" r="1.5" fill="currentColor" />
        </svg>
      );
    case "redesign":
      return (
        <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden>
          <path d="M3 7h13M3 12h10M3 17h7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          <path d="M17 7l4 4-8 8H9v-4l8-8z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );
    case "maintenance":
      return (
        <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden>
          <path d="M21 7l-2 2-3-3 2-2a4 4 0 103 3zM3 21l6-2 9.5-9.5-3-3L6 16l-2 6z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );
    case "custom":
      return (
        <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden>
          <rect x="3" y="3" width="7" height="7" rx="2" stroke="currentColor" strokeWidth="2" />
          <rect x="14" y="3" width="7" height="7" rx="2" stroke="currentColor" strokeWidth="2" />
          <rect x="3" y="14" width="7" height="7" rx="2" stroke="currentColor" strokeWidth="2" />
          <rect x="14" y="14" width="7" height="7" rx="2" stroke="currentColor" strokeWidth="2" />
        </svg>
      );
    case "speed":
      return (
        <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden>
          <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2" />
          <path d="M12 12l5-3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        </svg>
      );
    default:
      return null;
  }
}

export default function Page() {
  const webPlans: Plan[] = [
    {
      key: "economy",
      name: "Starter Site",
      subtitle: "Perfect for small businesses",
      price: 15000,
      old: 18000,
      href: "/contact-us/",
      featured: false,
      extraFeatures: [
        "Up to 5 pages",
        "Responsive UI",
        "Basic SEO setup",
        "Contact form",
      ],
    },
    {
      key: "standard",
      name: "Business Site",
      subtitle: "Grow your brand & content",
      price: 35000,
      old: 42000,
      href: "/contact-us/",
      featured: true,
      extraFeatures: [
        "Up to 12 pages",
        "Blog / CMS",
        "On‑page SEO",
        "Speed optimization",
      ],
    },
    {
      key: "pro",
      name: "E‑commerce",
      subtitle: "Sell online with confidence",
      price: 65000,
      old: 78000,
      href: "/contact-us/",
      featured: false,
      extraFeatures: [
        "Product catalog",
        "Checkout & payments",
        "Inventory & coupons",
        "Analytics & training",
      ],
    },
  ];

  return (
    <>
      {/* HERO */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[#0F5BD2] via-[#1a66dc] to-[#2b7bf0]" />
        <div className="relative container py-16 md:py-24 text-white">
          <h1 className="text-4xl/tight md:text-5xl/tight font-bold tracking-tight">Web Design & Development</h1>
          <p className="mt-4 max-w-2xl text-white/90">
            Fast, accessible, SEO‑friendly websites built on modern stacks. From landing
            pages to e‑commerce and custom web apps.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link href="/contact-us/" className="btn !bg-white !text-[#0F5BD2] hover:!bg-slate-100 ring-2 ring-white/70 shadow-lg">Start a Project</Link>
            <Link href="#pricing" className="btn bg-[#FF7A00] hover:bg-[#ff6a00]">See Pricing</Link>
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <Section title="Services">
        <div className="grid gap-6 md:grid-cols-3">
          {[{title:'Landing Pages',desc:'High‑converting, lightweight pages to launch fast.',icon:'landing'},{title:'Business Websites',desc:'Company sites with CMS, blogs & lead forms.',icon:'custom'},{title:'E‑commerce',desc:'Product catalog, checkout, and payment integration.',icon:'commerce'},{title:'Redesign & Migrations',desc:'Modernize legacy sites and move to better stacks.',icon:'redesign'},{title:'Performance & SEO',desc:'Improve Core Web Vitals and search visibility.',icon:'speed'},{title:'Care & Maintenance',desc:'Backups, updates, monitoring, and support.',icon:'maintenance'}].map(s=> (
            <div className="card" key={s.title}>
              <div className="flex items-center gap-3">
                <span className="text-brand"><Icon name={s.icon} /></span>
                <h3 className="font-semibold">{s.title}</h3>
              </div>
              <p className="mt-2 text-sm text-slate-600">{s.desc}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* PROCESS */}
      <Section title="Our Process">
        <ol className="grid gap-4 md:grid-cols-5">
          {["Discovery","UX/UI Design","Development","QA & Launch","Training"].map((t,i)=> (
            <li key={i} className="card text-center">
              <div className="mx-auto mb-2 h-8 w-8 rounded-full bg-brand/10 text-brand grid place-items-center font-semibold">{i+1}</div>
              <div className="font-medium">{t}</div>
            </li>
          ))}
        </ol>
      </Section>

      {/* TECH STACK */}
      <section className="bg-white">
        <div className="container py-10">
          <div className="flex flex-wrap items-center justify-center gap-3 text-sm">
            {["React","Next.js","TypeScript","Tailwind","WordPress","Laravel"].map(t=> (
              <span key={t} className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1">{t}</span>
            ))}
          </div>
        </div>
      </section>

      {/* PRICING */}
      <Section id="pricing" title="Website Packages">
        <p className="mb-6 text-slate-600">Transparent one‑time pricing. Hosting and domain sold separately.</p>
        <Pricing mode="bullets" showToggle={false} priceLabel="one-time" plans={webPlans} />
      </Section>

      {/* FAQ */}
      <Section title="Frequently Asked Questions">
        <div className="grid gap-4 md:grid-cols-2">
          {[{
            q:'How long does a project take?',
            a:'Typical timelines are 2–4 weeks for small sites and 4–8 weeks for complex/e‑commerce projects.'
          },{
            q:'Do you provide content?',
            a:'We can work with your copy and assets, and offer content guidance. Full copywriting is available on request.'
          },{
            q:'Which CMS do you use?',
            a:'We build with Next.js/Headless CMS or WordPress depending on your needs.'
          },{
            q:'Do you offer support after launch?',
            a:'Yes. Care plans include backups, updates, and priority support.'
          }].map(({q,a})=> (
            <div key={q} className="card">
              <h4 className="font-semibold">{q}</h4>
              <p className="mt-1 text-sm text-slate-600">{a}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* FINAL CTA */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[#0F5BD2] to-[#2b7bf0]" />
        <div className="relative container py-12 flex flex-col md:flex-row items-center justify-between gap-6 text-white">
          <h4 className="text-2xl font-semibold">Ready to launch your new website?</h4>
          <Link href="/contact-us/" className="btn !bg-white !text-[#0F5BD2] hover:!bg-slate-100 ring-2 ring-white/70 shadow-lg">Start a Project</Link>
        </div>
      </section>
    </>
  );
}
