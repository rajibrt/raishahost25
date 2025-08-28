import Section from "../../components/Section";
import Link from "next/link";

export const metadata = { title: "Logo Design" };

export default function Page() {
  const demoLogos = Array.from({ length: 12 }).map((_, i) => i + 1);
  return (
    <>
      {/* HERO */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[#0F5BD2] via-[#1a66dc] to-[#2b7bf0]" />
        <div className="relative container py-16 md:py-24 text-white">
          <h1 className="text-4xl/tight md:text-5xl/tight font-bold tracking-tight">Logo Design</h1>
          <p className="mt-4 max-w-2xl text-white/90">
            Memorable, scalable logos crafted to express your brand. Delivered in
            vector formats with clear usage guidelines.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link href="/contact-us/" className="btn !bg-white !text-[#0F5BD2] hover:!bg-slate-100 ring-2 ring-white/70 shadow-lg">Start a Project</Link>
            <Link href="#showcase" className="btn bg-[#FF7A00] hover:bg-[#ff6a00]">See Samples</Link>
          </div>
        </div>
      </section>

      {/* SHOWCASE */}
      <Section id="showcase" title="Recent Work (Demo)">
        <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {demoLogos.map((n) => (
            <div key={n} className="card aspect-square p-0 overflow-hidden">
              <div className="h-full w-full grid place-items-center bg-slate-50 text-slate-500">
                <div className="text-center">
                  <div className="mx-auto mb-3 h-16 w-16 rounded-xl bg-brand/10 text-brand grid place-items-center text-lg font-bold">
                    RH
                  </div>
                  <p className="text-xs">Logo Placeholder #{n}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* PROCESS */}
      <Section title="Our Process">
        <ol className="grid gap-4 md:grid-cols-5">
          {["Brief","Research","Concepts","Refinement","Delivery"].map((t,i)=> (
            <li key={i} className="card text-center">
              <div className="mx-auto mb-2 h-8 w-8 rounded-full bg-brand/10 text-brand grid place-items-center font-semibold">{i+1}</div>
              <div className="font-medium">{t}</div>
            </li>
          ))}
        </ol>
      </Section>

      {/* FINAL CTA */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[#0F5BD2] to-[#2b7bf0]" />
        <div className="relative container py-12 flex flex-col md:flex-row items-center justify-between gap-6 text-white">
          <h4 className="text-2xl font-semibold">Ready to create a logo you love?</h4>
          <Link href="/contact-us/" className="btn !bg-white !text-[#0F5BD2] hover:!bg-slate-100 ring-2 ring-white/70 shadow-lg">Start a Project</Link>
        </div>
      </section>
    </>
  );
}
