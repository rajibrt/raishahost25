import Link from 'next/link'
import Section from '../components/Section'
import Pricing from '../components/Pricing'

import Reveal from '../components/gsap/Reveal'
import ParallaxImage from '../components/gsap/ParallaxImage'
import Magnetic from '../components/gsap/Magnetic'
import TiltCard from '../components/gsap/TiltCard'
import ScrollProgress from '../components/gsap/ScrollProgress'
import Counter from '../components/gsap/Counter'

export default function Page() {
  const problems = [
    {
      icon: '⏱️',
      title: 'Late Response',
      desc: 'Support replies take too long when you need it most.',
    },
    {
      icon: '🛠️',
      title: 'Using Old Technologies',
      desc: 'Slow sites, poor Lighthouse, outdated stacks.',
    },
    {
      icon: '💸',
      title: 'High Price',
      desc: 'Paying more without visible performance gains.',
    },
  ]

  const mustHave = [
    {
      title: 'Website Builder',
      desc: 'One-click installs so you can build happy.',
    },
    { title: 'WP Accelerator', desc: 'Optimized stack for faster WordPress.' },
    { title: 'DDoS & Malware', desc: 'Active protection & automated scans.' },
    {
      title: 'Free Domain & SSL',
      desc: 'Secure padlock & free domain offers.',
    },
    { title: 'Auto Installer', desc: 'Popular apps ready in a click.' },
    { title: '24/7 Support', desc: 'Always-on help from real humans.' },
  ]

  const plans = [
    {
      name: 'Starter Package',
      price: 300,
      tag: 'Blogging Website',
      featured: false,
    },
    {
      name: 'Business Package',
      price: 500,
      tag: 'E-commerce Website',
      featured: true,
    },
    {
      name: 'Advanced Package',
      price: 1000,
      tag: 'Custom Website',
      featured: false,
    },
  ]

  const faqs = [
    {
      q: 'What is web hosting?',
      a: 'Your website lives on an internet-connected server so anyone can visit it.',
    },
    {
      q: 'How does web hosting work?',
      a: 'Your domain points to a server that serves your site’s files (HTML/CSS/JS/PHP).',
    },
    {
      q: 'What kind of web hosting do I need?',
      a: 'Start with shared hosting; upgrade as traffic grows.',
    },
    {
      q: 'What is cPanel for hosting?',
      a: 'A control panel for files, DB, email, backups and more.',
    },
  ]

  return (
    <>
      {/* Top scroll progress bar */}
      <ScrollProgress />
      {/* HERO — blue gradient, left copy + CTA, right illustration */}
      <section className='relative overflow-hidden'>
        <div className='absolute inset-0 bg-gradient-to-b from-[#0F5BD2] via-[#1a66dc] to-[#2b7bf0]' />
        <div className='relative container grid gap-10 py-16 md:py-24 md:grid-cols-2 text-white'>
          <div className='flex flex-col justify-center'>
            <div className='mb-3 hidden md:flex gap-4 text-xs/none text-white/80'>
              <span>Hosting</span>
              <span>Domain</span>
              <span>Support</span>
              <span>Affiliate</span>
              <span>Partnership</span>
            </div>

            <Reveal
              once={false}
              y={40}
              from={{ opacity: 0, y: 50, filter: 'blur(6px)', scale: 0.98 }}
              to={{ filter: 'blur(0px)', scale: 1 }}
            >
              <h1 className='text-4xl/tight md:text-5xl/tight font-bold tracking-tight'>
                Trust your site to the world’s #1 web host.
              </h1>
              <p className='mt-4 text-white/90 max-w-prose'>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit
                tellus, luctus nec ullamcorper mattis.
              </p>
            </Reveal>

            <Reveal
              once={false}
              y={24}
              stagger={0.06}
              from={{ opacity: 0, y: 24, filter: 'blur(4px)' }}
              to={{ filter: 'blur(0px)' }}
            >
              <div className='mt-6 flex flex-wrap gap-3'>
                <Magnetic>
                  <Link
                    href='/contact-us/'
                    className='btn bg-[#FF7A00] hover:bg-[#ff6a00] text-white shadow-lg'
                  >
                    GET STARTED
                  </Link>
                </Magnetic>
                <Magnetic>
                  <Link
                    href='/website-packages/'
                    className='btn !bg-white !text-[#0F5BD2] hover:!bg-slate-100 ring-2 ring-white/40'
                  >
                    BUY NOW
                  </Link>
                </Magnetic>
              </div>
            </Reveal>

            <div className='mt-8 flex flex-wrap items-center gap-4 text-sm text-white/90'>
              <span className='font-semibold'>
                More than <Counter to={3500} prefix='+' /> use our services
              </span>
              <span className='h-1.5 w-1.5 rounded-full bg-white/50' />
              <span>30 Days Money-Back Guarantee</span>
            </div>
          </div>

          <div className='order-first md:order-last'>
            <ParallaxImage
              src='/images/hero-illustration.png'
              alt='Hosting illustration'
            />
          </div>
        </div>
      </section>
      {/* PROBLEMS */}
      <Section title='Have you ever experienced problems in managing a website?'>
        <Reveal
          once={false}
          y={30}
          stagger={0.08}
          from={{ opacity: 0, y: 36, filter: 'blur(4px)' }}
          to={{ filter: 'blur(0px)' }}
        >
          <div className='grid gap-6 md:grid-cols-3'>
            {problems.map((c) => (
              <TiltCard key={c.title}>
                <div className='card'>
                  <div className='text-2xl'>{c.icon}</div>
                  <h4 className='mt-2 font-semibold'>{c.title}</h4>
                  <p className='mt-1 text-sm text-slate-600'>{c.desc}</p>
                </div>
              </TiltCard>
            ))}
          </div>
        </Reveal>
      </Section>
      {/* BIG IMAGE + feature chips on blue band */}
      <section className='relative overflow-hidden'>
        <div className='absolute inset-0 bg-gradient-to-b from-[#2b7bf0] to-[#0F5BD2]' />
        <div className='relative container py-16'>
          <div className='text-center text-white'>
            <p className='uppercase text-xs tracking-widest/loose opacity-80'>
              Raisha Host
            </p>
            <h3 className='mt-2 text-2xl md:text-3xl font-semibold'>
              Hosting from another world
            </h3>
            <p className='mt-2 text-white/90 max-w-3xl mx-auto'>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque
              euismod, lectus quis bibendum.
            </p>
          </div>

          <div className='mt-8'>
            <ParallaxImage src='/images/datacenter.jpg' alt='Datacenter' />
          </div>

          <div className='mt-8 grid gap-3 sm:grid-cols-2 md:grid-cols-3'>
            {[
              'Website Builder',
              'Free Domain and SSL',
              'WP Accelerator',
              'Auto Installer',
              'DDoS and Malware',
              '24/7 Support',
            ].map((t) => (
              <div
                key={t}
                className='rounded-xl bg-white/10 text-white px-4 py-3 ring-1 ring-white/20'
              >
                {t}
              </div>
            ))}
          </div>
        </div>
      </section>
      {/* MUST-HAVE */}
      <Section title='Level up your web hosting with these must-have.'>
        <Reveal
          once={false}
          y={30}
          stagger={0.08}
          from={{ opacity: 0, y: 36, filter: 'blur(4px)' }}
          to={{ filter: 'blur(0px)' }}
        >
          <div className='grid gap-6 md:grid-cols-3'>
            {mustHave.map((f) => (
              <TiltCard key={f.title}>
                <div className='card'>
                  <h4 className='font-semibold'>{f.title}</h4>
                  <p className='mt-1 text-sm text-slate-600'>{f.desc}</p>
                </div>
              </TiltCard>
            ))}
          </div>
        </Reveal>
      </Section>
      <Section title='CHEAP RATE LINUX SSD WEB HOSTING'>
        <p className='text-slate-600 mb-6'>
          Cheap rate web hosting as your demand, Select your package
        </p>

        <Pricing />
      </Section>
      {/* MONEY-BACK + CTA */}
      <section className='bg-slate-50'>
        <div className='container py-12 grid items-center gap-6 md:grid-cols-[1fr_auto]'>
          <div className='flex items-center gap-4'>
            <img
              src='/images/moneyback-badge.png'
              alt=''
              className='h-16 w-16 object-contain'
            />
            <div>
              <h4 className='text-xl font-semibold'>
                30 Days Money-Back Guarantee
              </h4>
              <p className='text-sm text-slate-600'>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
                egestas efficitur sapien.
              </p>
            </div>
          </div>
          <Link
            href='/contact-us/'
            className='btn justify-self-start md:justify-self-end'
          >
            BUY NOW
          </Link>
        </div>
      </section>
      {/* FAQ */}
      <Section title='Frequently asked questions'>
        <Reveal
          once={false}
          y={24}
          stagger={0.06}
          from={{ opacity: 0, y: 20, filter: 'blur(4px)' }}
          to={{ filter: 'blur(0px)' }}
        >
          <div className='grid gap-4 md:grid-cols-2'>
            {faqs.map(({ q, a }) => (
              <div key={q} className='card'>
                <h5 className='font-semibold'>{q}</h5>
                <p className='mt-1 text-sm text-slate-600'>{a}</p>
              </div>
            ))}
          </div>
        </Reveal>
      </Section>
      {/* PAYMENT OPTIONS band */}
      <section className='bg-white'>
        <div className='container py-10'>
          <div className='flex flex-wrap items-center justify-center gap-6 opacity-80'>
            {['paypal', 'visa', 'mastercard', 'bkash', 'nagad'].map((n) => (
              <img
                key={n}
                src={`/images/payments/${n}.svg`}
                alt={n}
                className='h-8 w-auto'
              />
            ))}
          </div>
        </div>
      </section>
      {/* FINAL CTA band */}
      <section className='relative overflow-hidden'>
        <div className='absolute inset-0 bg-gradient-to-b from-[#0F5BD2] to-[#2b7bf0]' />
        <div className='relative container py-12 flex flex-col md:flex-row items-center justify-between gap-6 text-white'>
          <h4 className='text-2xl font-semibold'>
            Start your business with Raisha Host!
          </h4>
          <Link
            href='/website-packages/'
            className='btn bg-white text-[#0F5BD2] hover:bg-slate-100'
          >
            BUY NOW
          </Link>
        </div>
      </section>
    </>
  )
}
