import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const LAST_UPDATED = 'June 13, 2026';

const sections = [
  {
    id: '01',
    title: 'Information We Collect',
    body: [
      'When you submit the enquiry form on our website, we collect the following information you voluntarily provide:',
      '— Student Name',
      '— Contact Number (mobile, India)',
      '— Requirements (your enquiry or course interest)',
      'We do not collect this information automatically. It is only collected when you choose to submit the form.',
    ],
  },
  {
    id: '02',
    title: 'How We Use Your Information',
    body: [
      'The information you provide is used solely to:',
      '— Respond to your enquiry via WhatsApp',
      '— Understand your course requirements so we can assist you better',
      '— Contact you regarding admissions, batches, or schedules at KALVIYUGAM Academy',
      'We do not use your information for automated decision-making, profiling, or marketing without your consent.',
    ],
  },
  {
    id: '03',
    title: 'How Your Data Is Transmitted',
    body: [
      'When you click "Apply Now", your form data is not stored on any server owned or operated by KALVIYUGAM Academy. Instead, your browser opens WhatsApp (web or app) with your details pre-filled as a message.',
      'The data transmission happens directly from your device to WhatsApp\'s platform. By sending that message, you are sharing your information through WhatsApp, and WhatsApp\'s own Privacy Policy governs how that data is handled thereafter.',
      'We retain information shared via WhatsApp only within the WhatsApp conversation thread on our registered device.',
    ],
  },
  {
    id: '04',
    title: 'Third-Party Services',
    body: [
      'Our website uses the following third-party services:',
      '— WhatsApp (Meta Platforms): Used to receive your enquiry. Governed by Meta\'s Privacy Policy.',
      '— Google Maps: An embedded map is displayed to show our academy\'s location. Google may collect usage data as per Google\'s Privacy Policy.',
      'We do not control how these third parties collect or use your information. We encourage you to review their respective privacy policies.',
    ],
  },
  {
    id: '05',
    title: 'Cookies & Tracking',
    body: [
      'KALVIYUGAM Academy\'s website does not use tracking cookies, analytics cookies, or advertising cookies.',
      'Your browser may store standard session data (e.g., scroll position, local preferences) but no personal information is stored in cookies by us.',
      'Google Maps embedded on the Contact section may set cookies from Google\'s domain. These are governed by Google\'s Cookie Policy.',
    ],
  },
  {
    id: '06',
    title: 'Children\'s Privacy',
    body: [
      'KALVIYUGAM Academy serves students of all ages, including minors. We do not knowingly collect personal data directly from children under the age of 13 through this website without verifiable parental consent.',
      'If a parent or guardian contacts us on behalf of a minor, we handle that information with the same care as all other enquiries.',
      'If you believe we have inadvertently collected information from a minor without consent, please contact us immediately so we can delete it.',
    ],
  },
  {
    id: '07',
    title: 'Data Security',
    body: [
      'Since enquiry data is transmitted directly through WhatsApp and not stored on our servers, the risk of a data breach from our website infrastructure is minimal.',
      'Conversations within WhatsApp are end-to-end encrypted by WhatsApp. We take reasonable precautions to safeguard our registered WhatsApp account.',
      'We recommend that you do not share sensitive personal or financial information through the enquiry form.',
    ],
  },
  {
    id: '08',
    title: 'Your Rights',
    body: [
      'You have the right to:',
      '— Know what information we hold about you',
      '— Request correction of inaccurate information',
      '— Request deletion of your information from our WhatsApp records',
      '— Withdraw consent for us to contact you at any time',
      'To exercise any of these rights, contact us directly via phone or WhatsApp using the details below.',
    ],
  },
  {
    id: '09',
    title: 'Changes to This Policy',
    body: [
      'We may update this Privacy Policy from time to time. Changes will be reflected by updating the "Last Updated" date at the top of this page.',
      'Continued use of this website after any changes constitutes your acceptance of the updated policy.',
    ],
  },
  {
    id: '10',
    title: 'Contact Us',
    body: [
      'For any questions, concerns, or requests regarding this Privacy Policy, please reach out to us:',
      '— Name: KALVIYUGAM ACADEMY',
      '— Address: 29, R.V.L Nagar, ESI Hospital Opp, Uppilipalayam, Coimbatore – 641015',
      '— Phone / WhatsApp: +91 94438 09262',
    ],
  },
];

function Section({ sec, index }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: 0.05 * (index % 5), ease: [0.22, 1, 0.36, 1] }}
      className="border-b border-border-custom pb-10 mb-10 last:border-none last:mb-0"
    >
      <div className="flex items-start gap-6 mb-5">
        <span className="font-mono text-[10px] tracking-[0.3em] text-text-muted uppercase shrink-0 pt-1">
          {sec.id}
        </span>
        <h2 className="font-heading font-bold text-xl md:text-2xl text-text-main uppercase tracking-tight">
          {sec.title}
        </h2>
      </div>
      <div className="pl-10 space-y-3">
        {sec.body.map((line, i) => (
          <p
            key={i}
            className={`text-sm md:text-base leading-relaxed ${
              line.startsWith('—')
                ? 'font-mono text-[11px] md:text-xs tracking-wider text-text-muted uppercase pl-2'
                : 'text-text-muted'
            }`}
          >
            {line}
          </p>
        ))}
      </div>
    </motion.div>
  );
}

export default function PrivacyPolicy() {
  const headerRef = useRef(null);
  const inView = useInView(headerRef, { once: true });

  return (
    <div style={{ background: '#050B14', minHeight: '100vh', paddingTop: '120px', overflowX: 'hidden' }}>

      {/* Ambient glow */}
      <div style={{
        position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 0,
        background: 'radial-gradient(ellipse 80% 40% at 50% -5%, rgba(37,99,235,0.08) 0%, transparent 65%)',
      }} />

      <div className="relative z-10 max-w-4xl mx-auto px-6 pb-32">

        {/* Header */}
        <header ref={headerRef} className="mb-16 md:mb-24 border-b border-border-custom pb-10">
          <motion.span
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.6 }}
            className="font-mono text-[10px] uppercase tracking-[0.4em] text-text-muted mb-6 block"
          >
            Legal // KALVIYUGAM Academy
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="font-heading font-bold text-4xl sm:text-6xl lg:text-7xl uppercase tracking-tighter leading-[0.9] text-text-main"
          >
            <span className="hover-glitch" data-text="PRIVACY">PRIVACY</span>
            {' '}
            <span
              className="text-text-muted font-light italic block hover-glitch"
              data-text="POLICY"
            >
              POLICY
            </span>
          </motion.h1>

          <motion.div
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-8 flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-8"
          >
            <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-text-muted">
              Last Updated: {LAST_UPDATED}
            </span>
            <span className="hidden sm:block w-px h-4 bg-border-custom" />
            <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-text-muted">
              KALVIYUGAM Academy, Coimbatore
            </span>
          </motion.div>

          <motion.div
            initial={{ scaleX: 0 }}
            animate={inView ? { scaleX: 1 } : {}}
            transition={{ duration: 0.7, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="mt-8 h-px"
            style={{
              background: 'linear-gradient(90deg, rgba(0,212,255,0.4), rgba(37,99,235,0.2), transparent)',
              transformOrigin: 'left',
            }}
          />
        </header>

        {/* Intro */}
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-text-muted text-sm md:text-base leading-relaxed mb-16"
        >
          This Privacy Policy describes how <strong className="text-text-main font-semibold">KALVIYUGAM Academy</strong> ("we", "us", "our") collects, uses, and handles information when you use our website. We are committed to protecting your privacy and being transparent about our practices.
        </motion.p>

        {/* Sections */}
        <div>
          {sections.map((sec, i) => (
            <Section key={sec.id} sec={sec} index={i} />
          ))}
        </div>

      </div>
    </div>
  );
}
