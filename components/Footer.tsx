import Link from "next/link";
export default function Footer() {
  return (
    <footer className="border-t bg-slate-50">
      <div className="container py-12 grid gap-8 md:grid-cols-4">
        <div>
          <img src="/images/logo.svg" alt="Raisha Host" className="h-8 mb-4" />
          <p className="text-sm">© 2008–{new Date().getFullYear()} RaishaHost.Com. All rights reserved.</p>
        </div>
        <div>
          <h3 className="font-semibold mb-3">Main Menu</h3>
          <ul className="space-y-2 text-sm">
            <li><Link href="/">Home</Link></li>
            <li><Link href="/web-design/">Web Design</Link></li>
            <li><Link href="/website-packages/">Website Packages</Link></li>
            <li><Link href="/logo-design/">Logo Design</Link></li>
            <li><Link href="/knowledge/">Knowledge</Link></li>
            <li><Link href="/contact-us/">Contact Us</Link></li>
          </ul>
        </div>
        <div>
          <h3 className="font-semibold mb-3">About</h3>
          <ul className="space-y-2 text-sm">
            <li><Link href="/terms-conditions/">Terms & Conditions</Link></li>
            <li><Link href="/guarantees/">Guarantees</Link></li>
            <li><Link href="/30-days-money-back/">30 Days Money Back</Link></li>
          </ul>
        </div>
        <div>
          <h3 className="font-semibold mb-3">Support</h3>
          <ul className="space-y-2 text-sm">
            <li><Link href="/client-area/">Client Area</Link></li>
            <li><Link href="/submit-a-ticket/">Submit a Ticket</Link></li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
