import React from 'react';
import { articles } from '../data/mockArticles';
import { Zap } from 'lucide-react';

const BreakingTicker = () => {
  const breakingNews = articles.filter(a => a.isBreaking);
  const tickerDuration = `${Math.max(28, breakingNews.length * 10)}s`;

  if (breakingNews.length === 0) return null;

  return (
    <div className="w-full overflow-hidden border-y border-black/10 bg-primary py-1.5 sm:py-2">
      <div className="mx-auto flex max-w-[1280px] items-center gap-3 px-4 sm:gap-4 sm:px-6 lg:px-8">
        <div className="flex shrink-0 items-center gap-1.5 rounded-full bg-primary-foreground/10 px-2.5 py-1 text-[10px] font-black uppercase tracking-tight text-primary-foreground shadow-glass-sm">
          <Zap className="h-3 w-3 fill-current" />
          Breaking
        </div>
        <div className="relative h-5 flex-1 overflow-hidden sm:h-6">
          <div
            className="ticker-track flex items-center gap-8 whitespace-nowrap pr-8 sm:gap-12 sm:pr-12"
            style={{ '--ticker-duration': tickerDuration } as React.CSSProperties}
            aria-label="Breaking headlines"
          >
            {[...breakingNews, ...breakingNews].map((news, index) => (
              <div key={`${news.id}-${index}`} className="flex items-center gap-3">
                <span className="text-[11px] font-bold leading-none tracking-tight text-primary-foreground sm:text-xs">
                  {news.title}
                </span>
                <span className="h-1 w-1 rounded-full bg-primary-foreground/35" aria-hidden="true" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BreakingTicker;
