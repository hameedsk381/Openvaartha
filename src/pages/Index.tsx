import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import CategoryChips from '../components/CategoryChips';
import { articles, Category } from '../data/mockArticles';
import BreakingTicker from '../components/BreakingTicker';
import CategoryStrip from '../components/CategoryStrip';
import MagicBento from '../components/MagicBento';
import { Clock, Bell } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '../components/ui/button';
import FeedCard from '../components/FeedCard';
import InstagramFeed from '../components/InstagramFeed';
import HeroCarousel from '../components/HeroCarousel';

const Index = () => {
  const [selectedCategory, setSelectedCategory] = useState<Category | 'All'>('All');
  
  const trendingArticles = articles.filter(a => a.trending);
  const heroHeadlines = trendingArticles.slice(0, 3);
  
  // Ensure the grid has a healthy mix of content (at least 5 items)
  const gridHeadlines = [
    ...trendingArticles.slice(3),
    ...articles.filter(a => !trendingArticles.includes(a)).slice(0, 5)
  ].slice(0, 5);

  const quickBriefings = articles.slice(0, 6);
  const categories: Category[] = ["Politics", "Tech", "Business", "Cinema", "Local News", "Sports"];

  return (
    <div className="min-h-screen bg-background text-foreground font-sans selection:bg-primary/10 selection:text-primary">
      {/* Universal Header Stack — Distribution Engine */}
      <div className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-2xl border-b border-black/5 shadow-glass-sm header-stack overflow-hidden">
        <Navbar isInsideStack />
        <CategoryChips selected={selectedCategory} onSelect={setSelectedCategory} isInsideStack />
        <BreakingTicker />
      </div>

      <main className="mx-auto max-w-[1280px] pt-[140px] sm:pt-[160px] pb-16 px-4 sm:px-6 lg:px-8 animate-in fade-in slide-in-from-bottom-4 duration-1000">
        
        {selectedCategory === 'All' ? (
          <div className="space-y-16">
            {/* High Impact Hero - Direct Feed */}
            <HeroCarousel articles={heroHeadlines} />

            {/* In-Depth Architecture - Magic Bento Integration */}
            <MagicBento articles={gridHeadlines} />

            {/* Instagram Live Feed Integration */}
            <InstagramFeed />

            {/* Quick Summaries - 60sec Intelligence */}
            <section className="bg-white dark:bg-white/[0.03] rounded-3xl p-6 sm:p-10 border border-black/5 dark:border-white/5 shadow-sm">
              <div className="flex items-center gap-3 mb-8">
                <div className="h-10 w-10 rounded-2xl bg-primary flex items-center justify-center shadow-lg shadow-primary/20">
                  <Clock className="h-5 w-5 text-white" />
                </div>
                <div className="space-y-0.5">
                  <h2 className="text-xl font-black text-foreground tracking-tighter uppercase">In 60 Seconds</h2>
                  <p className="text-[9px] font-extrabold text-muted-foreground uppercase tracking-widest opacity-60">Intelligence Sync</p>
                </div>
              </div>

              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {quickBriefings.map((article) => (
                  <div key={article.id} className="space-y-4 group">
                    <Link to={`/article/${article.slug}`} className="block">
                      <h3 className="text-lg font-black text-foreground/80 group-hover:text-primary transition-colors leading-tight">
                        {article.title}
                      </h3>
                    </Link>
                    <ul className="space-y-2.5">
                      {article.content.points.slice(0, 2).map((point, i) => (
                        <li key={i} className="flex gap-3 text-[13px] font-bold text-muted-foreground/60 leading-snug">
                          <span className="shrink-0 text-primary opacity-40">•</span>
                          {point}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </section>

            {/* Distribution Engine - Category Strips */}
            <div className="space-y-20">
              {categories.map((cat) => (
                <CategoryStrip 
                  key={cat} 
                  category={cat} 
                  articles={articles.filter(a => a.category === cat)} 
                />
              ))}
            </div>

            {/* Engagement Loop - Newsletter */}
            <section className="relative overflow-hidden rounded-3xl bg-primary dark:bg-primary/20 p-8 sm:p-16 shadow-2xl border border-black/10 dark:border-white/10 group">
              <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-transparent opacity-50" />
              <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
                <div className="space-y-6">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass bg-white/10 text-white text-[9px] font-black uppercase tracking-[0.3em]">
                    <Bell className="h-3 w-3" />
                    Daily Intelligence
                  </div>
                  <div className="space-y-3">
                    <h3 className="text-3xl sm:text-5xl font-black text-white tracking-tighter leading-[0.95]">
                      The morning briefing.<br /><span className="text-white/40 italic">Zero noise.</span>
                    </h3>
                    <p className="text-base text-primary-foreground/70 font-bold max-w-md leading-tight">
                      Structure, clarity, and precision delivered at 8 AM.
                    </p>
                  </div>
                </div>
                <div className="flex flex-col sm:flex-row gap-3 items-center bg-white/5 rounded-2xl p-2 border border-white/10 focus-within:border-white/30 transition-all">
                  <input
                    type="email"
                    placeholder="ENTER EMAIL ADDRESS"
                    className="flex-1 bg-transparent w-full h-11 px-4 text-[10px] font-black text-white placeholder:text-white/30 focus:outline-none uppercase tracking-widest"
                  />
                  <Button className="w-full sm:w-auto rounded-xl px-8 h-11 font-black bg-white text-primary hover:scale-[1.02] active:scale-95 transition-all text-[10px] uppercase tracking-widest shadow-xl">
                    SUBSCRIBE
                  </Button>
                </div>
              </div>
            </section>

          </div>
        ) : (
          /* Category Direct View fallback */
          <div className="space-y-12 animate-in fade-in duration-700">
             <div className="flex flex-col gap-4 border-b border-black/5 pb-12">
               <div className="text-primary text-sm font-black uppercase tracking-[0.4em]">{selectedCategory}</div>
               <h1 className="text-5xl sm:text-7xl font-black text-foreground tracking-tighter leading-none">{selectedCategory} Dossiers</h1>
             </div>
             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {articles.filter(a => a.category === selectedCategory).map((article) => (
                <FeedCard key={article.id} article={article} />
              ))}
            </div>
          </div>
        )}

        <footer className="mt-24 pt-16 border-t border-black/5 dark:border-white/5">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
            <div className="space-y-6">
              <div className="text-xl font-black tracking-tighter text-foreground uppercase">OPEN<span className="text-primary">VAARTHA</span></div>
              <p className="text-[13px] font-bold text-muted-foreground leading-relaxed opacity-60">
                Simple. Crisp. Unbiased. <br />South India's authoritative news architecture built for clarity.
              </p>
            </div>
             <div className="space-y-3">
              <h5 className="text-[9px] font-black uppercase tracking-widest opacity-30 text-foreground">Verticals</h5>
              <div className="flex flex-col gap-2">
                {categories.map(c => <Link key={c} to="/" className="text-[11px] font-bold text-muted-foreground hover:text-primary transition-colors">{c}</Link>)}
              </div>
            </div>
          </div>
        </footer>

      </main>
    </div>
  );
};

export default Index;
