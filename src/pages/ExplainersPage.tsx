import React from 'react';
import { articles, Article } from '../data/mockArticles';
import Navbar from '../components/Navbar';
import FeedCard from '../components/FeedCard';
import { Info, HelpCircle, ArrowRight, Zap, Target, History } from 'lucide-react';
import { Link } from 'react-router-dom';

const ExplainersPage = () => {
  const explainers = articles.slice(0, 5); // Mock explainers

  return (
    <div className="min-h-screen bg-background text-foreground font-sans selection:bg-primary/5">
      <Navbar />
      
      <main className="mx-auto max-w-[1440px] pt-32 sm:pt-48 pb-24 px-4 sm:px-8 lg:px-16 animate-in fade-in duration-1000">
        
        {/* Explainer Backbone Header */}
        <header className="mb-32 flex flex-col items-center text-center space-y-12 pb-24 border-b border-black/5 relative overflow-hidden group">
           <div className="flex items-center gap-3 relative z-10 px-4 py-1.5 rounded-full glass bg-primary/10 text-primary text-[10px] font-black uppercase tracking-[0.4em]">
             <HelpCircle className="h-4 w-4" /> Intellectual Infrastructure
           </div>
           <div className="space-y-6 relative z-10">
             <h1 className="text-5xl sm:text-9xl font-black text-foreground tracking-[-0.1em] leading-none uppercase">THE DEEP DIVE</h1>
             <p className="max-w-xl mx-auto text-xl font-bold text-muted-foreground leading-relaxed italic opacity-80">
               Complexity simplified. We break down the regional shifts you need to understand—beyond the headlines.
             </p>
           </div>
        </header>

        {/* Structured Formatting Section */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-48">
          {explainers.slice(0, 2).map((article) => (
             <div key={article.id} className="p-12 sm:p-20 rounded-[4rem] bg-black/[0.02] border border-black/5 hover:-translate-y-2 transition-all group">
                <div className="space-y-12">
                   <div className="flex items-center gap-3">
                      <span className="text-[10px] font-black uppercase tracking-widest text-primary opacity-40">{article.category}</span>
                      <div className="h-1 w-12 bg-primary/20" />
                   </div>
                   <h2 className="text-4xl font-black text-foreground tracking-tighter leading-none group-hover:text-primary transition-colors">
                      {article.title}
                   </h2>
                   
                   <div className="space-y-10 pt-10 border-t border-black/5">
                      <div className="space-y-4">
                         <div className="flex items-center gap-2.5 text-[11px] font-black uppercase tracking-[0.3em] text-primary/60">
                            <Zap className="h-4 w-4" /> What Happened
                         </div>
                         <p className="text-lg font-bold text-muted-foreground/80 leading-snug">{article.summary}</p>
                      </div>
                      
                      <div className="space-y-4">
                         <div className="flex items-center gap-2.5 text-[11px] font-black uppercase tracking-[0.3em] text-primary/60">
                            <Target className="h-4 w-4" /> Why It Matters
                         </div>
                         <p className="text-lg font-bold text-muted-foreground/80 leading-snug">{article.content.tldr}</p>
                      </div>
                   </div>
                   
                   <Link to={`/article/${article.slug}`} className="group/item flex items-center gap-4 text-xs font-black uppercase tracking-widest text-primary hover:gap-6 transition-all">
                      Read Full Explainer <ArrowRight className="h-4 w-4" />
                   </Link>
                </div>
             </div>
          ))}
        </section>

        {/* Simplified Breakdowns - Scannable List */}
        <section className="space-y-16">
          <div className="flex items-center gap-6">
            <h3 className="text-sm font-black uppercase tracking-[0.4em] text-foreground opacity-30">Archive of Complex Topics</h3>
            <div className="h-px flex-1 bg-black/5" />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 sm:gap-16">
            {articles.slice(5).map((article) => (
              <div key={article.id} className="space-y-6 group">
                 <div className="h-48 rounded-[2rem] bg-black/5 border border-black/5 overflow-hidden group-hover:shadow-glass-lg transition-all">
                    {article.thumbnail && <img src={article.thumbnail} className="w-full h-full object-cover grayscale brightness-50 group-hover:grayscale-0 transition-all duration-700" alt={article.title} />}
                 </div>
                 <div className="space-y-3">
                   <div className="text-[9px] font-black uppercase tracking-widest text-primary opacity-40">{article.category}</div>
                   <h3 className="text-xl font-black text-foreground/80 group-hover:text-primary transition-colors leading-tight tracking-tight">
                     {article.title}
                   </h3>
                 </div>
                 <Link to={`/article/${article.slug}`} className="inline-flex items-center h-10 px-6 bg-black/5 hover:bg-primary hover:text-white rounded-xl text-[10px] font-black uppercase tracking-widest transition-all">
                    Load Explainer
                 </Link>
              </div>
            ))}
          </div>
        </section>

      </main>
    </div>
  );
};

export default ExplainersPage;
