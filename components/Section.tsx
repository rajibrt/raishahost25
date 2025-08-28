export default function Section({ id, title, children }: { id?: string; title?: string; children: React.ReactNode }) {
  return (
    <section id={id} className="section">
      <div className="container">
        {title && <h2 className="h2 mb-6">{title}</h2>}
        {children}
      </div>
    </section>
  );
}
