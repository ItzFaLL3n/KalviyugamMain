import { useState, useRef } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';

const galleryImages = [
  { id: 1, src: '/images/gallery/students-group-photo.jpeg', alt: 'Students group photo in classroom', category: 'Students', aspect: 'large' },
  { id: 2, src: '/images/gallery/neet-coaching-poster.jpeg', alt: 'NEET Coaching Institute – Repeaters Program', category: 'Information', aspect: 'tall' },
  { id: 3, src: '/images/gallery/pongal-celebration.jpeg', alt: 'Pongal celebration with students & staff', category: 'Events', aspect: 'wide' },
  { id: 4, src: '/images/gallery/kalviyugam-logo.jpeg', alt: 'Kalviyugam Academy Logo', category: 'Information', aspect: 'square' },
  { id: 5, src: '/images/gallery/academy-info-poster.jpeg', alt: 'Kalviyugam Tuition Academy – Online & Offline Classes', category: 'Information', aspect: 'square' },
  { id: 6, src: '/images/gallery/cake-celebration.jpeg', alt: 'Cake cutting celebration with faculty', category: 'Events', aspect: 'square' },
  { id: 7, src: '/images/gallery/courses-poster.jpeg', alt: 'Special coaching – Maths, Physics & Chemistry', category: 'Information', aspect: 'tall' },
  { id: 8, src: '/images/gallery/students-teachers-group.jpeg', alt: 'Students & teachers annual group photo', category: 'Students', aspect: 'wide' },
];

const categories = ['All', 'Information', 'Students', 'Events'];

function ImageCard({ image, index, onClick }) {
  const cardRef = useRef(null);

  const aspectClasses = {
    large: 'lg:col-span-2 lg:row-span-2 md:col-span-2 md:row-span-2 col-span-1',
    tall: 'lg:col-span-1 lg:row-span-2 md:col-span-1 md:row-span-2 col-span-1',
    wide: 'lg:col-span-2 lg:row-span-1 md:col-span-2 md:row-span-1 col-span-1',
    square: 'lg:col-span-1 lg:row-span-1 md:col-span-1 md:row-span-1 col-span-1',
  };

  return (
    <motion.div
      ref={cardRef}
      layout
      className={`${aspectClasses[image.aspect] || ''} group relative rounded-3xl overflow-hidden cursor-pointer bg-white shadow-sm border border-border-custom hover:shadow-xl transition-all duration-500`}
      onClick={() => onClick(image)}
      whileHover={{ scale: 0.98 }}
    >
      <div className="w-full h-full min-h-[250px] md:min-h-[300px] relative overflow-hidden bg-theme-light/30">
        <img
          src={image.src}
          alt={image.alt}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
      </div>

      {/* Elegant Hover overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-6 md:p-8">
        <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
          <span className="text-xs font-bold uppercase tracking-widest text-theme-main mb-2 block">{image.category}</span>
          <p className="text-base font-semibold text-white leading-tight">{image.alt}</p>
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
    <div className="py-24 md:py-40 lg:py-56 min-h-screen relative overflow-hidden bg-theme-light/10">

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        {/* Header */}
        <div ref={headerRef} className="text-left mb-24 border-border-custom pb-6">
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
          className="flex flex-wrap justify-start gap-4 mb-16"
        >
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`font-mono text-[10px] md:text-xs uppercase tracking-[0.3em] px-8 py-4 border transition-all duration-300 ${filter === cat
                  ? 'border-[#00e5ff] text-[#00e5ff] bg-[#00e5ff]/5'
                  : 'border-border-custom/30 text-text-muted hover:border-border-custom hover:text-text-main'
                }`}
            >
              {cat}
            </button>
          ))}
        </motion.div>

        {/* Clean Bento Grid */}
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-[250px] md:auto-rows-[320px] grid-flow-dense">
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
              <div className="w-full h-[60vh] bg-gradient-to-br from-theme-light via-white to-theme-light flex items-center justify-center overflow-hidden">
                <img
                  src={lightbox.src}
                  alt={lightbox.alt}
                  className="w-full h-full object-contain"
                />
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
