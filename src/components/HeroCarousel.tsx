import React from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';
import { Article } from '../data/mockArticles';
import { Link } from 'react-router-dom';
import { ChevronRight, ArrowUpRight, Clock, Sparkles } from 'lucide-react';
import { Button } from './ui/button';
import { getArticleImage, handleImageFallback } from '../lib/utils';

interface HeroCarouselProps {
  articles: Article[];
}

const HeroCarousel = ({ articles }: HeroCarouselProps) => {
  const [emblaRef] = useEmblaCarousel({ loop: true }, [Autoplay({ delay: 5000 })]);

  return (
    <section className="relative mb-10 w-full overflow-hidden rounded-[1.75rem] border border-black/5 bg-background shadow-glass-lg dark:border-white/5 sm:mb-12 sm:rounded-[2.5rem] group">
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex">
          {articles.map((article, index) => (
            <div key={article.id} className="relative min-h-[460px] flex-[0_0_100%] min-w-0 sm:min-h-0 sm:aspect-[21/9] lg:aspect-[21/7]">
              {/* Background with subtle zoom on hover */}
              <div className="absolute inset-0 overflow-hidden">
                <img
                  src={getArticleImage(article.thumbnail)}
                  alt=""
                  className="h-full w-full object-cover transition-transform duration-1000 group-hover:scale-105"
                  loading={index === 0 ? "eager" : "lazy"}
                  onError={handleImageFallback}
                />
                <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/60 to-black/25" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/45 to-black/20" />
              </div>

              {/* Content Overlay */}
              <div className="absolute inset-0 flex flex-col justify-end p-4 pb-6 sm:p-8 sm:pb-10 md:p-10 lg:p-14">
                <div className="max-w-[92%] space-y-3 animate-in slide-in-from-bottom-8 duration-700 sm:max-w-2xl sm:space-y-3.5 lg:max-w-3xl lg:space-y-4">
                  <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
                    <span className="rounded-full bg-primary px-2.5 py-1 text-[9px] font-black uppercase tracking-widest text-white shadow-glass-sm sm:px-3 sm:text-[10px]">
                      {article.category}
                    </span>
                    <div className="flex items-center gap-1.5 text-[9px] font-bold uppercase tracking-widest text-white/80 sm:gap-2 sm:text-[10px]">
                      <Clock className="h-3 w-3" /> {article.readTime} Dispatch
                    </div>
                    {article.trending && (
                      <span className="flex items-center gap-1 text-[9px] font-black uppercase tracking-widest text-white/85 sm:text-[10px]">
                        <Sparkles className="h-3 w-3 fill-current" /> Trending
                      </span>
                    )}
                  </div>

                  <h2 className="max-w-3xl text-balance text-[1.9rem] font-black leading-[1.08] tracking-tighter text-white sm:text-4xl sm:leading-[1.06] md:text-[2.65rem] lg:text-5xl">
                    {article.title}
                  </h2>
                  <p className="max-w-2xl line-clamp-3 text-sm font-bold leading-relaxed text-white/85 sm:line-clamp-2 sm:text-base">
                    {article.summary}
                  </p>

                  <div className="flex flex-wrap items-center gap-2.5 pt-2 sm:gap-4 sm:pt-3">
                    <Link to={`/article/${article.slug}`}>
                      <Button className="h-10 rounded-xl bg-white px-5 text-[10px] font-black uppercase tracking-widest text-black shadow-2xl transition-all hover:scale-[1.02] hover:bg-white/90 active:scale-95 sm:h-12 sm:px-8 sm:text-xs">
                        Explore Full Report
                      </Button>
                    </Link>
                    <Link to="/" className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-white/75 transition-all hover:gap-3 hover:text-white">
                      View Feed <ChevronRight className="h-4 w-4" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Decorative Branding */}
      <div className="absolute bottom-8 right-8 z-20 pointer-events-none hidden sm:block">
        <div className="glass px-4 py-2 rounded-xl text-[10px] font-black text-white/40 uppercase tracking-[0.5em] border-white/5">
          South Scoop Intelligence Hub
        </div>
      </div>
    </section>
  );
};

export default HeroCarousel;
