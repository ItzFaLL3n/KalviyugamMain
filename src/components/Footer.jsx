import { Link } from 'react-router-dom';
import { SmokeBackground } from './ui/spooky-smoke-animation';

const footerLinks = [
  { label: 'Home', href: '/' },
  { label: 'Gallery', href: '/gallery' },
  { label: 'Courses', href: '/#courses' },
  { label: 'Programs', href: '/#programs' },
  { label: 'Why We Stand Out', href: '/#stand-out' },
  { label: 'Contact', href: '/#contact' },
];

const socialLinks = [
  {
    label: 'WhatsApp',
    href: 'https://wa.me/919443809262',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
      </svg>
    ),
  },
  {
    label: 'Instagram',
    href: '#',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
      </svg>
    ),
  },
  {
    label: 'Phone',
    href: 'tel:+919443809262',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
        <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/>
      </svg>
    ),
  },
];

export default function Footer() {
  return (
    <footer className="border-t border-border-custom relative overflow-hidden bg-theme-main">
      {/* Isolated Smoke Background */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 opacity-40">
          <SmokeBackground smokeColor="#2563EB" />
        </div>
        {/* Contrast overlay for legibility */}
        <div className="absolute inset-0 bg-gradient-to-t from-theme-main via-theme-main/80 to-transparent" />
      </div>
      <div className="max-w-7xl mx-auto px-6 py-16 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-24">
          {/* Brand */}
          <div className="md:col-span-1">
            <h3 className="text-3xl font-bold font-heading mb-6 tracking-wide text-text-main">
              KALVIYUGAM
            </h3>
            <p className="font-mono text-xs text-text-muted leading-loose max-w-xs uppercase tracking-wider">
              Shaping future toppers with precision coaching.
            </p>
          </div>

          {/* Quick Links */}
          <div className="md:col-start-3">
            <h4 className="text-xs font-mono uppercase tracking-[0.3em] text-text-muted mb-8">
              System Links
            </h4>
            <ul className="space-y-4">
              {footerLinks.map((link) => (
                <li key={link.label}>
                  {link.href.startsWith('/') && !link.href.includes('#') ? (
                    <Link
                      to={link.href}
                      className="font-mono text-xs uppercase tracking-widest text-text-muted hover:text-text-main transition-colors duration-300"
                    >
                      {link.label}
                    </Link>
                  ) : (
                    <a
                      href={link.href}
                      className="font-mono text-xs uppercase tracking-widest text-text-muted hover:text-text-main transition-colors duration-300"
                    >
                      {link.label}
                    </a>
                  )}
                </li>
              ))}
            </ul>
          </div>

          {/* Social & Contact */}
          <div>
            <h4 className="text-xs font-mono uppercase tracking-[0.3em] text-text-muted mb-8 mt-12 md:mt-0">
              Terminal Connect
            </h4>
            <div className="flex gap-6 mb-8">
              {socialLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-text-muted hover:text-theme-dark transition-colors duration-300"
                  aria-label={link.label}
                >
                  {link.icon}
                </a>
              ))}
            </div>
            <p className="font-mono text-[10px] text-text-muted uppercase tracking-widest leading-loose">
              29, R.V.L Nagar, ESI Hospital Opp,<br />
              Uppilipalayam, Coimbatore – 641015
            </p>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-32 pt-8 border-t border-border-custom flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="font-mono text-[10px] text-text-muted uppercase tracking-widest">
            © {new Date().getFullYear()} KALVIYUGAM Academy. All rights reserved.
          </p>
          <p className="font-mono text-[10px] text-text-muted uppercase tracking-widest">
            Built with precision & care.
          </p>
        </div>
      </div>
    </footer>
  );
}
