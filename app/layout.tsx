import "../styles/globals.css";
import Header from "../components/Header";
import Footer from "../components/Footer";
import type { Metadata } from "next";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.raishahost.com"),
  title: { default: "Raisha Host — Freedom of Host", template: "%s — Raisha Host" },
  description: "Linux SSD Hosting, Domain, Web Design & Development, 24/7 Support, 99.9% Uptime.",
  openGraph: {
    title: "Raisha Host — Freedom of Host",
    description: "Linux SSD Hosting, Domain, Web Design & Development.",
    url: "https://www.raishahost.com",
    siteName: "Raisha Host",
    images: ["/images/og-cover.jpg"],
  },
  twitter: { card: "summary_large_image" },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Header />
        <main>{children}</main>
        <Footer />
        <script
          type="application/ld+json"
          suppressHydrationWarning
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "Raisha Host",
              url: "https://www.raishahost.com",
              logo: "https://www.raishahost.com/images/logo.svg",
              sameAs: ["https://www.facebook.com/RaishaHost"],
              contactPoint: [{
                "@type": "ContactPoint",
                telephone: "+8801711380679",
                contactType: "customer service",
                areaServed: "BD",
                availableLanguage: ["en", "bn"],
              }],
            }),
          }}
        />
      </body>
    </html>
  );
}
