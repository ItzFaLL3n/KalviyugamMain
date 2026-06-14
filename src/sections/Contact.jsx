import { useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const WHATSAPP_NUMBER = '919443809262';

function buildWhatsAppUrl({ name, phone, requirements }) {
  const digits = phone.replace(/\D/g, '');
  const msg =
    `🎓 New Enquiry — KALVIYUGAM Academy\n\n` +
    `Student Name : ${name.trim()}\n` +
    `Contact No   : +91 ${digits}\n\n` +
    `Requirements :\n${requirements.trim()}`;
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`;
}

export default function Contact() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const [form, setForm] = useState({ name: '', phone: '', requirements: '' });
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e) => {
    setError('');
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (form.name.trim().length < 2) {
      setError('Enter a valid student name.');
      return;
    }
    if (!/^\d{10}$/.test(form.phone.replace(/\D/g, ''))) {
      setError('Enter a valid 10-digit mobile number.');
      return;
    }
    if (form.requirements.trim().length < 5) {
      setError('Please describe your requirements.');
      return;
    }
    setError('');
    setSubmitting(true);
    const opened = window.open(buildWhatsAppUrl(form), '_blank', 'noopener,noreferrer');
    if (!opened) {
      setError('Popup was blocked. Please allow popups and try again, or message us directly on WhatsApp.');
    }
    setTimeout(() => setSubmitting(false), 2000);
  };

  return (
    <section id="contact" className="py-24 md:py-40 lg:py-56 relative">
      <div className="max-w-7xl mx-auto px-6">

        {/* Header */}
        <div ref={ref} className="text-left mb-16 md:mb-32 border-b border-border-custom pb-8 md:pb-12">
          <motion.span
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.6 }}
            className="font-mono text-[10px] md:text-xs uppercase tracking-[0.4em] text-text-muted mb-8 block"
          >
            05 // Contact
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-4xl sm:text-6xl lg:text-[7rem] font-bold font-heading tracking-tighter leading-[0.9] text-text-main uppercase"
          >
            <span className="hover-glitch" data-text="CONTACT">CONTACT</span>{' '}
            <span
              className="text-text-muted italic font-light block hover-glitch"
              data-text="US"
            >
              US
            </span>
          </motion.h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16">

          {/* Form */}
          <motion.form
            onSubmit={handleSubmit}
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-8"
          >
            {/* Student Name */}
            <div className="space-y-2">
              <label
                htmlFor="contact-name"
                className="block text-[10px] font-mono uppercase tracking-[0.3em] text-text-muted"
              >
                Student Name
              </label>
              <input
                id="contact-name"
                name="name"
                type="text"
                value={form.name}
                onChange={handleChange}
                required
                placeholder="Your full name"
                className="w-full bg-transparent border-b border-border-custom px-0 py-3 md:py-4 text-base md:text-lg text-text-main placeholder-text-muted/40 focus:outline-none focus:border-theme-dark transition-colors duration-300"
              />
            </div>

            {/* Contact No */}
            <div className="space-y-2">
              <label
                htmlFor="contact-phone"
                className="block text-[10px] font-mono uppercase tracking-[0.3em] text-text-muted"
              >
                Contact No
              </label>
              <div className="flex items-center border-b border-border-custom focus-within:border-theme-dark transition-colors duration-300">
                <span className="text-base md:text-lg text-text-muted mr-2 select-none">+91</span>
                <input
                  id="contact-phone"
                  name="phone"
                  type="tel"
                  value={form.phone}
                  onChange={handleChange}
                  required
                  placeholder="10-digit mobile number"
                  className="flex-1 bg-transparent px-0 py-3 md:py-4 text-base md:text-lg text-text-main placeholder-text-muted/40 focus:outline-none"
                />
              </div>
            </div>

            {/* Requirements */}
            <div className="space-y-2">
              <label
                htmlFor="contact-requirements"
                className="block text-[10px] font-mono uppercase tracking-[0.3em] text-text-muted"
              >
                Requirements
              </label>
              <textarea
                id="contact-requirements"
                name="requirements"
                rows={4}
                value={form.requirements}
                onChange={handleChange}
                required
                placeholder="What are you looking for?"
                className="w-full bg-transparent border-b border-border-custom px-0 py-3 md:py-4 text-base md:text-lg text-text-main placeholder-text-muted/40 focus:outline-none focus:border-theme-dark transition-colors duration-300 resize-none"
              />
            </div>

            {error && (
              <p className="text-sm text-red-500">{error}</p>
            )}

            {/* CTA */}
            <div className="pt-2">
              <button
                type="submit"
                disabled={submitting}
                className="w-full md:w-auto px-10 py-5 bg-gradient-to-r from-theme-mid to-theme-dark text-white font-heading font-bold text-base tracking-widest uppercase rounded-sm hover:shadow-[0_0_32px_rgba(0,212,255,0.35)] transition-all duration-300 active:scale-[0.98] disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {submitting ? 'Opening…' : 'Apply Now'}
              </button>
              <p className="mt-3 text-[10px] font-mono uppercase tracking-[0.25em] text-text-muted">
                We will get back to you soon !!
              </p>
            </div>
          </motion.form>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="space-y-8 lg:space-y-12 border-t border-border-custom pt-10 lg:border-t-0 lg:pt-0 lg:border-l lg:pl-16"
          >
            <div className="flex items-start gap-6 border-b border-border-custom pb-8">
              <div className="w-14 h-14 border border-border-custom flex items-center justify-center text-text-muted shrink-0">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z" />
                </svg>
              </div>
              <div>
                <p className="text-[10px] font-mono uppercase tracking-[0.3em] text-text-muted mb-2">Phone</p>
                <a
                  href="tel:+919443809262"
                  className="text-xl md:text-2xl font-light font-heading text-text-main hover:text-theme-dark transition-colors tracking-wide"
                >
                  +91 94438 09262
                </a>
              </div>
            </div>

            <div className="flex items-start gap-6 border-b border-border-custom pb-8">
              <div className="w-14 h-14 border border-border-custom flex items-center justify-center text-text-muted shrink-0">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
                </svg>
              </div>
              <div>
                <p className="text-[10px] font-mono uppercase tracking-[0.3em] text-text-muted mb-2">Address</p>
                <p className="text-base text-text-muted leading-relaxed">
                  29, R.V.L Nagar, ESI Hospital Opp,<br />
                  Uppilipalayam, Coimbatore – 641015
                </p>
              </div>
            </div>

            <a
              href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent('Hi, I\'m interested in KALVIYUGAM Academy')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-4 px-8 py-5 border border-[#25D366]/30 text-[#25D366] hover:bg-[#25D366] hover:text-white transition-all duration-300 font-mono text-[10px] uppercase tracking-[0.3em]"
            >
              <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
              <span>Chat on WhatsApp</span>
            </a>

            <div className="border border-border-custom overflow-hidden">
              <iframe
                title="KALVIYUGAM Academy Location"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1958.5!2d77.0256163!3d11.0099826!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ba857f10993e595%3A0xa34a05401310bc3a!2sKALVIYUGAM%20ACADEMY!5e0!3m2!1sen!2sin!4v1711100000000"
                width="100%"
                height="250"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
