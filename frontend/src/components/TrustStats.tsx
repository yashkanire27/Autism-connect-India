import React from 'react';
import { BookCheck, Globe2, Users, HeartHandshake } from 'lucide-react';

export const TrustStats: React.FC = () => {
  const stats = [
    {
      icon: <BookCheck className="w-6 h-6 text-purple-600" />,
      bg: 'bg-purple-100/80 text-purple-700',
      title: 'Trusted Information',
      desc: 'Reliable, evidence-based autism resources reviewed by pediatric specialists.',
      highlight: '100% Free Guides'
    },
    {
      icon: <Globe2 className="w-6 h-6 text-sky-600" />,
      bg: 'bg-sky-100/80 text-sky-700',
      title: 'Multilingual Support',
      desc: 'Information accessible in English, Marathi, Hindi, Bengali, Tamil, and more.',
      highlight: '5+ Languages'
    },
    {
      icon: <Users className="w-6 h-6 text-emerald-600" />,
      bg: 'bg-emerald-100/80 text-emerald-700',
      title: 'Parent Community',
      desc: 'A safe, judgment-free space to connect, share milestones, and exchange advice.',
      highlight: '1,200+ Active Parents'
    },
    {
      icon: <HeartHandshake className="w-6 h-6 text-rose-600" />,
      bg: 'bg-rose-100/80 text-rose-700',
      title: 'Support & Fundraising',
      desc: 'Helping families access critical speech, OT therapy, and assistive education tools.',
      highlight: '₹3.5L+ Raised'
    }
  ];

  return (
    <section className="py-12 bg-white border-y border-purple-100/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((item, idx) => (
            <div
              key={idx}
              className="p-6 rounded-3xl bg-cream-50 hover:bg-white border border-purple-100/80 hover:border-purple-200 shadow-soft hover:shadow-soft-lg transition-all duration-300 transform hover:-translate-y-1 group"
            >
              <div className="flex items-center justify-between mb-4">
                <div className={`p-3 rounded-2xl ${item.bg} group-hover:scale-110 transition-transform`}>
                  {item.icon}
                </div>
                <span className="text-[11px] font-extrabold uppercase tracking-wider px-2.5 py-1 rounded-full bg-white border border-purple-100 text-purple-800 shadow-2xs">
                  {item.highlight}
                </span>
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-1.5 group-hover:text-purple-800 transition-colors">
                {item.title}
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed font-normal">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
