import { useState, useRef, useEffect } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import ShaderImage from '../components/webgl/ShaderImage';

gsap.registerPlugin(ScrollTrigger);

// Placeholder gallery images — user will replace with real photos
const galleryImages = [
  { id: 1, src: '', alt: 'Classroom session', category: 'Classroom', aspect: 'tall' },
  { id: 2, src: '', alt: 'Student group study', category: 'Students', aspect: 'wide' },
  { id: 3, src: '', alt: 'Lab practical session', category: 'Activities', aspect: 'square' },
  { id: 4, src: '', alt: 'Awards ceremony', category: 'Events', aspect: 'tall' },
  { id: 5, src: '', alt: 'Library study area', category: 'Classroom', aspect: 'wide' },
  { id: 6, src: '', alt: 'Sports day', category: 'Events', aspect: 'square' },
  { id: 7, src: '', alt: 'Science exhibition', category: 'Activities', aspect: 'tall' },
  { id: 8, src: '', alt: 'Teacher mentoring', category: 'Classroom', aspect: 'square' },
  { id: 9, src: '', alt: 'Annual function', category: 'Events', aspect: 'wide' },
];

const categories = ['All', 'Classroom', 'Students', 'Activities', 'Events'];

function ImageCard({ image, index, onClick }) {
  const cardRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(cardRef.current, {
        y: 50,
        opacity: 0,
        duration: 0.7,
        delay: index * 0.08,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: cardRef.current,
          start: 'top 90%',
          toggleActions: 'play none none none',
        },
      });
    });
    return () => ctx.revert();
  }, [index]);

  const aspectClasses = {
    tall: 'row-span-2',
    wide: 'col-span-2',
    square: '',
  };

  return (
    <motion.div
      ref={cardRef}
      layout
      className={`${aspectClasses[image.aspect] || ''} group relative rounded-2xl overflow-hidden cursor-pointer bg-white/40 backdrop-blur-sm border border-border-custom`}
      onClick={() => onClick(image)}
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.3 }}
    >
      <div className={`w-full ${image.aspect === 'tall' ? 'h-full min-h-[400px]' : image.aspect === 'wide' ? 'h-64' : 'h-72'} relative`}>
        {/* Render our custom WebGL component for the image with liquid hover */}
        <ShaderImage url={image.src || ''} />
        
        {/* Fallback overlay text if no actual image src is provided */}
        {!image.src && (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10">
            <div className="text-center">
              <svg className="w-10 h-10 mx-auto mb-3 text-text-muted border border-border-custom p-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
                <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909M3.75 21h16.5A2.25 2.25 0 0 0 22.5 18.75V5.25A2.25 2.25 0 0 0 20.25 3H3.75A2.25 2.25 0 0 0 1.5 5.25v13.5A2.25 2.25 0 0 0 3.75 21Z" />
              </svg>
              <p className="text-[10px] font-mono uppercase tracking-[0.3em] text-text-muted border border-border-custom px-3 py-1">ASSET.REQ</p>
            </div>
          </div>
        )}
      </div>

      {/* Hover overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-theme-light via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-6">
        <div>
          <span className="text-xs uppercase tracking-widest text-theme-dark mb-1 block">{image.category}</span>
          <p className="text-sm font-medium text-text-main">{image.alt}</p>
        </div>
      </div>
    </motion.div>
  );
}

export default function Gallery() {
  const [filter, setFilter] = useState('All');
  const [lightbox, setLightbox] = useState(null);
  const headerRef = useRef(null);
  const isInView = useInView(headerRef, { once: true, margin: '-50px' });

  const filtered = filter === 'All'
    ? galleryImages
    : galleryImages.filter((img) => img.category === filter);

  return (
    <div className="py-24 md:py-40 lg:py-56 min-h-screen relative overflow-hidden">

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        {/* Header */}
        <div ref={headerRef} className="text-left mb-24 border-b border-border-custom pb-12">
          <motion.span
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.6 }}
            className="font-mono text-[10px] md:text-xs uppercase tracking-[0.4em] text-text-muted mb-8 block"
          >
            05 // Visual Records
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-4xl sm:text-6xl lg:text-[7rem] font-bold font-heading tracking-tighter leading-[0.9] text-text-main uppercase"
          >
            <span className="hover-glitch" data-text="MOMENTS AT">MOMENTS AT</span> <span className="text-text-muted italic font-light block hover-glitch" data-text="KALVIYUGAM">KALVIYUGAM</span>
          </motion.h1>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-wrap justify-start gap-3 mb-16"
        >
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`font-mono text-[10px] uppercase tracking-[0.3em] px-6 py-3 border transition-all duration-300 ${
                filter === cat
                  ? 'bg-theme-main/10 text-theme-dark border-theme-dark'
                  : 'border-border-custom text-text-muted hover:border-theme-dark/50 hover:text-theme-dark'
              }`}
            >
              {cat}
            </button>
          ))}
        </motion.div>

        {/* Masonry Grid */}
        <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 auto-rows-[200px]">
          <AnimatePresence>
            {filtered.map((image, index) => (
              <ImageCard
                key={image.id}
                image={image}
                index={index}
                onClick={setLightbox}
              />
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {lightbox && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-theme-light/95 backdrop-blur-md z-50 flex items-center justify-center p-6"
            onClick={() => setLightbox(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              className="relative max-w-4xl w-full max-h-[80vh] bg-white rounded-2xl overflow-hidden border border-border-custom shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="w-full h-[60vh] bg-gradient-to-br from-theme-light via-white to-theme-light flex items-center justify-center">
                <div className="text-center">
                  <svg className="w-16 h-16 mx-auto mb-4 text-text-muted" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909M3.75 21h16.5A2.25 2.25 0 0 0 22.5 18.75V5.25A2.25 2.25 0 0 0 20.25 3H3.75A2.25 2.25 0 0 0 1.5 5.25v13.5A2.25 2.25 0 0 0 3.75 21Z" />
                  </svg>
                  <p className="text-sm text-text-muted">{lightbox.alt}</p>
                  <p className="text-xs text-text-muted/50 mt-1">Add your photo here</p>
                </div>
              </div>
              <div className="p-6 flex justify-between items-center bg-white border-t border-border-custom">
                <div>
                  <span className="text-xs uppercase tracking-widest text-theme-dark">{lightbox.category}</span>
                  <p className="text-sm font-medium mt-1 text-text-main">{lightbox.alt}</p>
                </div>
                <button
                  onClick={() => setLightbox(null)}
                  className="text-text-muted hover:text-theme-dark transition-colors"
                >
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
