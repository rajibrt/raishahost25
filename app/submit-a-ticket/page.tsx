import Section from "../../components/Section";
export const metadata = { title: "Submit a Ticket" };
export default function Page(){
  return (
    <Section title="Submit a Ticket">
      <p className="mb-4">Please submit tickets via our secure client portal.</p>
      <a href="https://hosting.raishahost.com/submitticket.php" className="btn" target="_blank" rel="noopener noreferrer">Submit a Ticket</a>
    </Section>
  );
}
