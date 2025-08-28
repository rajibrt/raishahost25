import Section from "../../components/Section";
import Link from "next/link";

export const metadata = { title: "Web Design & Development" };
export default function Page(){
  return (
    <>
      <Section title="Web Design & Development">
        <p className="mb-6 max-w-3xl">We build on React, NextJS, TypeScript, Laravel, WordPress, Drupal, Joomla and more — choosing the stack that best fits your requirements.</p>
        <Link href="/website-packages/" className="btn">See Website Packages</Link>
      </Section>
      <Section title="Workflow">
        <ol className="grid gap-4 md:grid-cols-4">
          {[
            "Discovery",
            "Design",
            "Development",
            "Launch",
          ].map((t,i)=> <li key={i} className="card">{t}</li>)}
        </ol>
      </Section>
    </>
  );
}
