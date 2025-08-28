import Section from "../../components/Section";
export const metadata = { title: "Logo Design" };
export default function Page(){
  return (
    <Section title="Logo Design">
      <div className="grid gap-6 md:grid-cols-3">
        {Array.from({length:6}).map((_,i)=> (
          <div key={i} className="card h-40 flex items-center justify-center">Logo #{i+1}</div>
        ))}
      </div>
    </Section>
  );
}
