import { motion } from 'framer-motion';

const boards = [
  {
    id: 'sb10',
    label: '10th',
    sublabel: 'State Board',
    max: 500,
    toppers: [
      { name: 'Nanmaran',  total: 491, highlights: ['Science (100)', 'Maths (99)'] },
      { name: 'Gokul',     total: 486, highlights: ['Maths (99)', 'Science (99)'] },
      { name: 'Balaji',    total: 482, highlights: [] },
    ],
  },
  {
    id: 'sb12',
    label: '12th',
    sublabel: 'State Board',
    max: 600,
    toppers: [
      { name: 'Jothika',      total: 595, highlights: ['Maths (99)'] },
      { name: 'Nishanthini',  total: 582, highlights: ['Chemistry (100)', 'Physics (99)', 'Maths (99)'] },
      { name: 'Madumitha',    total: 579, highlights: [] },
    ],
  },
  {
    id: 'cbse12',
    label: '12th',
    sublabel: 'CBSE',
    max: null,
    toppers: [
      { name: 'Shandiya',         total: null, highlights: ['Chemistry (100)'] },
      { name: 'Hathija Nachiya',  total: null, highlights: [] },
      { name: 'Hathiga',          total: null, highlights: [] },
    ],
  },
];

const rankLabel = ['01', '02', '03'];

export default function Results() {
  return (
    <section
      id="results"
      className="py-24 md:py-40 border-t border-white/[0.06]"
      aria-labelledby="results-heading"
    >
      <div className="max-w-6xl mx-auto px-6">

        {/* Header — Apple-style: left-anchored, large, lots of air */}
        <div className="mb-20 md:mb-28">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="font-mono text-[11px] uppercase tracking-[0.4em] text-white/30 mb-5"
          >
            Results
          </motion.p>
          <motion.h2
            id="results-heading"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.08, duration: 0.7 }}
            className="text-5xl sm:text-7xl md:text-8xl font-heading font-black tracking-tighter text-white leading-[0.9] uppercase"
          >
            Our Toppers
          </motion.h2>
        </div>

        {/* Three board columns */}
        <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-white/[0.07]">
          {boards.map((board, panelIdx) => (
            <motion.div
              key={board.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ delay: panelIdx * 0.1, duration: 0.6 }}
              className="px-0 md:px-10 first:pl-0 last:pr-0 py-10 md:py-0"
            >
              {/* Column header */}
              <div className="mb-10">
                <p className="font-mono text-[10px] uppercase tracking-[0.35em] text-white/30 mb-1">
                  {board.sublabel}
                </p>
                <h3 className="font-heading font-black text-4xl text-white uppercase tracking-tight">
                  {board.label}
                </h3>
              </div>

              {/* Student rows */}
              <div className="flex flex-col gap-8">
                {board.toppers.length > 0 ? board.toppers.map((student, i) => (
                  <motion.div
                    key={student.name}
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: panelIdx * 0.1 + i * 0.08, duration: 0.5 }}
                    className="group"
                  >
                    {/* Rank + Name row */}
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex items-start gap-4">
                        <span className="font-mono text-[10px] text-white/20 mt-1 tracking-widest">
                          {rankLabel[i]}
                        </span>
                        <span className="font-heading font-bold text-lg md:text-xl text-white uppercase tracking-wide leading-snug">
                          {student.name}
                        </span>
                      </div>

                      {/* Score — big and plain */}
                      {student.total ? (
                        <div className="text-right flex-shrink-0">
                          <span className="font-heading font-black text-2xl md:text-3xl text-theme-dark tabular-nums">
                            {student.total}
                          </span>
                          <span className="font-mono text-[10px] text-white/25 ml-1">
                            /{board.max}
                          </span>
                        </div>
                      ) : null}
                    </div>

                    {/* Perfect / near-perfect subject mentions — subtle, inline */}
                    {student.highlights.length > 0 && (
                      <p className="mt-2 ml-8 font-mono text-[10px] uppercase tracking-widest text-white/30">
                        {student.highlights.join('  ·  ')}
                      </p>
                    )}

                    {/* Thin separator */}
                    {i < board.toppers.length - 1 && (
                      <div className="mt-8 h-px bg-white/[0.05]" />
                    )}
                  </motion.div>
                )) : (
                  <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-white/20">
                    Results Awaited
                  </p>
                )}
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
