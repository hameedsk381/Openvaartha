import React from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';
import { Article } from '../data/mockArticles';
import { Link } from 'react-router-dom';
import { ChevronRight, ArrowUpRight, Clock, Sparkles } from 'lucide-react';
import { Button } from './ui/button';

interface HeroCarouselProps {
  articles: Article[];
}

const HeroCarousel = ({ articles }: HeroCarouselProps) => {
  const [emblaRef] = useEmblaCarousel({ loop: true }, [Autoplay({ delay: 5000 })]);

  return (
    <section className="relative w-full rounded-[2.5rem] overflow-hidden mb-12 shadow-glass-lg border border-black/5 dark:border-white/5 bg-background group">
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex">
          {articles.map((article) => (
            <div key={article.id} className="relative flex-[0_0_100%] min-w-0 aspect-[16/12] sm:aspect-[21/9] lg:aspect-[21/7]">
              {/* Background with subtle zoom on hover */}
              <div className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 group-hover:scale-105" style={{ backgroundImage: `url(${article.thumbnail})` }}>
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
              </div>

              {/* Content Overlay */}
              <div className="absolute inset-0 flex flex-col justify-end p-5 sm:p-12 lg:p-16">
                <div className="max-w-2xl space-y-4 sm:space-y-6 animate-in slide-in-from-bottom-8 duration-700">
                  <div className="flex flex-wrap items-center gap-3">
                    <span className="px-3 py-1 bg-primary text-white text-[10px] font-black uppercase tracking-widest rounded-full">
                      {article.category}
                    </span>
                    <div className="flex items-center gap-2 text-white/60 text-[10px] font-bold uppercase tracking-widest">
                      <Clock className="h-3 w-3" /> {article.readTime} Dispatch
                    </div>
                    {article.trending && (
                      <span className="flex items-center gap-1 text-[10px] font-black text-primary uppercase tracking-widest">
                        <Sparkles className="h-3 w-3 fill-current" /> Trending
                      </span>
                    )}
                  </div>

                  <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white leading-none tracking-tighter">
                    {article.title}
                  </h2>
                  <p className="text-white/70 text-sm sm:text-base font-bold line-clamp-2 max-w-xl leading-relaxed">
                    {article.summary}
                  </p>

                  <div className="flex flex-wrap items-center gap-4 pt-4">
                    <Link to={`/article/${article.slug}`}>
                      <Button className="rounded-xl px-8 h-12 font-black bg-white text-black hover:bg-white/90 hover:scale-[1.02] active:scale-95 transition-all text-xs uppercase tracking-widest shadow-2xl">
                        Explore Full Report
                      </Button>
                    </Link>
                    <Link to="/" className="text-white/60 hover:text-white text-[10px] font-black uppercase tracking-widest transition-all flex items-center gap-2 hover:gap-3">
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
