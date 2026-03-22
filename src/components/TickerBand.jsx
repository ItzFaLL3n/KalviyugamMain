import React from 'react';

const TickerBand = ({ text, color = 'bg-theme-mid', rotate = '-3deg', direction = 1 }) => {
  const repeatedText = Array(10).fill(text).join(' \u2022 ');

  return (
    <div 
      className={`relative w-[110vw] ${rotate === '-3deg' ? '-ml-[5vw]' : ''} overflow-hidden ${color} py-3 shadow-[0_0_30px_rgba(37,99,235,0.4)] z-50`}
      style={{ transform: `rotate(${rotate})` }}
    >
      <div className="flex whitespace-nowrap">
        <div
          className="flex whitespace-nowrap text-theme-main font-heading font-black text-2xl uppercase tracking-widest ticker-scroll"
          style={{
            animationDirection: direction === 1 ? 'normal' : 'reverse',
          }}
        >
          <span className="px-4">{repeatedText}</span>
          <span className="px-4">{repeatedText}</span>
        </div>
      </div>
    </div>
  );
};

export default TickerBand;
