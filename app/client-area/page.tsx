import Section from "../../components/Section";
export const metadata = { title: "Client Area" };
export default function Page(){
  return (
    <Section title="Client Area">
      <p className="mb-4">Access billing, domains and support via our portal.</p>
      <a href="https://hosting.raishahost.com/" className="btn" target="_blank" rel="noopener noreferrer">Open Portal</a>
    </Section>
  );
}
