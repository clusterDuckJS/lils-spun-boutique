import React, { useState, useEffect } from 'react';
import { Sparkles, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const announcements = [
  { text: 'Timeless Traditions, Beautifully Reimagined', link: '/collections/new-arrivals' },
  { text: 'Discover Our Handcrafted Festive & Occasion Collections', link: '/collections/festive-wear' },
  { text: 'Artisanal Weaves & Bespoke Silhouettes', link: '/about' }
];

export default function AnnouncementBar() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % announcements.length);
    }, 4500);
    return () => clearInterval(timer);
  }, []);

  const current = announcements[currentIndex];

  return (
    <div className="bg-brand-navy text-brand-ivory text-xs py-2 px-4 border-b border-brand-navy-light/40 relative z-30">
      <div className="max-w-7xl mx-auto flex items-center justify-center text-center relative overflow-hidden h-5">
        <Link
          to={current.link}
          className="inline-flex items-center gap-2 hover:text-brand-champagne transition-all duration-500 transform tracking-wider"
        >
          <Sparkles className="w-3.5 h-3.5 text-brand-champagne shrink-0" />
          <span className="font-light">{current.text}</span>
          <ChevronRight className="w-3 h-3 text-brand-champagne/80 shrink-0" />
        </Link>
      </div>
    </div>
  );
}
