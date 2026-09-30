import React from 'react';

export const MarqueeStrip: React.FC = () => {
  const items = [
    "Software Engineer",
    "Backend Developer",
    "AI / ML Engineer",
    "Founder @ Navi Mumbai United FC",
    "B.Tech CSE (AI & ML)",
    "VIT Bhopal '27",
    "REST APIs & Django",
    "Football Analytics",
  ];

  return (
    <div className="marquee-strip" aria-label="Professional Highlights">
      <div className="marquee-track" aria-hidden="true">
        {/* Repeat 4 times for smooth continuous loop */}
        {[0, 1, 2, 3].map((rep) => (
          <div key={rep} className="marquee-group">
            {items.map((item, idx) => (
              <React.Fragment key={idx}>
                <span>{item}</span>
                <span className="text-[#f62477] text-[1.1em] leading-none">✦</span>
              </React.Fragment>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};
