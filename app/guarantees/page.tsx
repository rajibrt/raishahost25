import Section from "../../components/Section";
export const metadata = { title: "Guarantees" };
export default function Page(){
  return (
    <Section title="Guarantees">
      <ul className="list-disc pl-6 space-y-2">
        <li>99.9% Uptime SLA</li>
        <li>30 Days Money Back (hosting only)</li>
        <li>24/7/365 Support</li>
      </ul>
    </Section>
  );
}
