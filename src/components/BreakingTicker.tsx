import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { articles } from '../data/mockArticles';
import { Zap } from 'lucide-react';

const BreakingTicker = () => {
  const breakingNews = articles.filter(a => a.isBreaking);

  if (breakingNews.length === 0) return null;

  return (
    <div className="w-full bg-primary py-1.5 overflow-hidden border-y border-black/10">
      <div className="mx-auto max-w-[1280px] px-6 flex items-center gap-4">
        <div className="flex items-center gap-1.5 shrink-0 bg-primary-foreground/10 px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-tighter text-primary-foreground animate-pulse">
          <Zap className="h-3 w-3 fill-current" />
          Breaking
        </div>
        <div className="relative flex-1 overflow-hidden h-5">
          <div className="absolute flex animate-ticker whitespace-nowrap gap-12 items-center">
            {breakingNews.map((news) => (
              <div key={news.id} className="flex items-center gap-3">
                <span className="text-[11px] font-bold text-primary-foreground tracking-tight">
                  {news.title}
                </span>
                <div className="h-1 w-1 rounded-full bg-primary-foreground/30" />
              </div>
            ))}
            {/* Duplicate for seamless loop */}
            {breakingNews.map((news) => (
              <div key={`${news.id}-clone`} className="flex items-center gap-3">
                <span className="text-[11px] font-bold text-primary-foreground tracking-tight">
                  {news.title}
                </span>
                <div className="h-1 w-1 rounded-full bg-primary-foreground/30" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BreakingTicker;
