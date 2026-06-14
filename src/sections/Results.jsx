import { motion } from 'framer-motion';

const boards = [
  {
    id: 'sb10',
    label: '10th',
    max: 500,
    toppers: [
      { name: 'Nanmaran', total: 491, highlights: ['Science (100)', 'Maths (99)'] },
      { name: 'Gokul', total: 486, highlights: ['Maths (99)', 'Science (99)'] },
      { name: 'Balaji', total: 482, highlights: [] },
    ],
  },
  {
    id: 'sb12',
    label: '12th',
    max: 600,
    toppers: [
      { name: 'Jothika', total: 595, highlights: ['Maths (99)'] },
      { name: 'Nishanthini', total: 582, highlights: ['Chemistry (100)', 'Physics (99)', 'Maths (99)'] },
      { name: 'Madumitha', total: 579, highlights: [] },
    ],
  },
];

const rankLabel = ['01', '02', '03'];

export default function Results() {
  return (
    <section
      id="results"
      className="py-24 md:py-40 border-t border-white/[0.06] bg-theme-main relative overflow-hidden"
      aria-labelledby="results-heading"
    >
      {/* Background glow effects to make it feel premium */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-[500px] h-[500px] bg-theme-mid/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-1/3 right-0 -translate-y-1/2 w-[400px] h-[400px] bg-[#00D4FF]/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 items-center">
          
          {/* Left Column: Image Stack Layout */}
          <div className="lg:col-span-5 flex justify-center lg:justify-start">
            <div className="relative w-full max-w-[420px] px-8 sm:px-12 lg:px-0">
              
              {/* Vertical Text Label: rotated and positioned on the left edge */}
              <div className="hidden sm:block absolute left-[-60px] md:left-[-80px] top-1/2 -translate-y-1/2 -rotate-90 origin-center whitespace-nowrap">
                <span className="font-mono text-[11px] uppercase tracking-[0.4em] text-white/30">
                  // Academic Excellence
                </span>
              </div>

              {/* Main Portrait Image */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
                className="relative aspect-[4/3] w-full rounded-[2.5rem] overflow-hidden border border-white/[0.08] shadow-[0_20px_50px_rgba(0,0,0,0.5)] group"
              >
                <img
                  src="/images/gallery/students-teachers-group.jpeg"
                  alt="Classroom Session"
                  className="w-full h-full object-cover grayscale-[20%] group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700 ease-out"
                />
                {/* Subtle vignette/overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-theme-main/50 via-transparent to-transparent pointer-events-none" />
              </motion.div>

              {/* Overlapping Badge: Top-Left */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                className="absolute top-[-20px] left-0 md:left-[-30px] z-20 w-28 h-28 md:w-32 md:h-32 rounded-3xl bg-gradient-to-br from-emerald-400 via-teal-500 to-emerald-600 p-[1px] shadow-[0_20px_40px_rgba(16,185,129,0.3)] hover:scale-105 transition-transform duration-500 cursor-default"
              >
                <div className="w-full h-full bg-[#050B14]/90 backdrop-blur-md rounded-[23px] flex flex-col justify-center items-center text-center p-3">
                  {/* Trophy SVG Icon */}
                  <svg className="w-5 h-5 text-emerald-400 mb-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"></path>
                  </svg>
                  <span className="font-heading font-black text-xl md:text-2xl text-emerald-400 leading-none tracking-tight">100%</span>
                  <span className="font-mono text-[8px] uppercase tracking-widest text-emerald-300/80 mt-1 font-bold">Pass Rate</span>
                </div>
              </motion.div>

              {/* Overlapping Secondary Image: Bottom-Right */}
              <motion.div
                initial={{ opacity: 0, x: 30, y: 30 }}
                whileInView={{ opacity: 1, x: 0, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2, duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
                className="absolute bottom-[-35px] right-[-15px] md:right-[-35px] z-10 w-[170px] md:w-[220px] aspect-[4/3] rounded-[2rem] overflow-hidden border-[6px] border-[#050B14] shadow-[0_20px_40px_rgba(0,0,0,0.6)] group hover:translate-y-[-5px] transition-transform duration-500"
              >
                <img
                  src="/images/gallery/img-11.jpeg"
                  alt="Student Toppers"
                  className="w-full h-full object-cover grayscale-[10%] group-hover:grayscale-0 transition-all duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-theme-main/30 via-transparent to-transparent pointer-events-none" />
              </motion.div>

            </div>
          </div>

          {/* Right Column: Title and Content */}
          <div className="lg:col-span-7 flex flex-col justify-center">
            
            {/* Header section */}
            <div className="mb-12">
              <motion.p
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="font-mono text-[11px] uppercase tracking-[0.4em] text-theme-dark mb-4"
              >
                Results & Achievements
              </motion.p>
              
              <motion.h2
                id="results-heading"
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.08, duration: 0.7 }}
                className="text-4xl sm:text-5xl md:text-6xl font-heading font-black tracking-tight text-white leading-tight uppercase"
              >
                Your Success <span className="gold-gradient-text">Starts Here!</span>
              </motion.h2>

              <motion.p
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.15, duration: 0.7 }}
                className="mt-4 text-white/60 text-sm md:text-base leading-relaxed max-w-xl"
              >
                At Kalviyugam Academy, we don't just teach — we transform. Our students consistently set outstanding academic benchmarks of excellence.
              </motion.p>
            </div>

            {/* Toppers Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 lg:gap-10">
              {boards.map((board, panelIdx) => (
                <motion.div
                  key={board.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: panelIdx * 0.1, duration: 0.6 }}
                  className="bg-[#0A1128]/40 backdrop-blur-md border border-white/[0.06] rounded-[2rem] p-6 hover:border-theme-dark/30 hover:shadow-[0_20px_50px_rgba(0,212,255,0.05)] transition-all duration-500 flex flex-col justify-between"
                >
                  <div>
                    {/* Card Header */}
                    <div className="flex items-center mb-8 pb-4 border-b border-white/[0.05]">
                      <h3 className="font-heading font-black text-2xl text-white uppercase tracking-tight">
                        {board.label} Board
                      </h3>
                    </div>

                    {/* Students list */}
                    <div className="flex flex-col gap-6">
                      {board.toppers.map((student, i) => (
                        <div key={student.name} className="group/item">
                          
                          {/* Rank, Name, Score Row */}
                          <div className="flex items-start justify-between gap-3">
                            <div className="flex items-start gap-3.5">
                              {/* Glowing rank number */}
                              <span className="font-mono text-[10px] text-theme-dark/60 font-bold bg-theme-dark/5 border border-theme-dark/10 w-6 h-6 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5 group-hover/item:text-theme-dark group-hover/item:border-theme-dark/30 transition-colors duration-300">
                                {rankLabel[i]}
                              </span>
                              <div>
                                <span className="font-heading font-bold text-base text-white group-hover/item:text-theme-dark transition-colors duration-300 uppercase tracking-wide">
                                  {student.name}
                                </span>
                                
                                {/* Highlights / perfect scores */}
                                {student.highlights.length > 0 && (
                                  <p className="mt-1 font-mono text-[9px] uppercase tracking-wider text-white/40 font-semibold">
                                    {student.highlights.join('  ·  ')}
                                  </p>
                                )}
                              </div>
                            </div>

                            {/* Marks Display */}
                            <div className="text-right flex-shrink-0">
                              <span className="font-heading font-black text-xl text-white group-hover/item:text-theme-dark transition-colors duration-300 tabular-nums">
                                {student.total}
                              </span>
                              <span className="font-mono text-[9px] text-white/30 ml-1">
                                /{board.max}
                              </span>
                            </div>
                          </div>

                          {/* Inner separator */}
                          {i < board.toppers.length - 1 && (
                            <div className="mt-5 h-px bg-white/[0.03]" />
                          )}

                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
