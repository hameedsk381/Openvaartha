import React from 'react';
import { Article, Category, categoryEmojis } from '../data/mockArticles';
import { ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import FeedCard from './FeedCard';

interface CategoryStripProps {
  category: Category;
  articles: Article[];
}

const CategoryStrip = ({ category, articles }: CategoryStripProps) => {
  if (articles.length === 0) return null;

  return (
    <section className="mb-10 lg:mb-12">
      <div className="flex items-end justify-between mb-6 border-b border-black/5 dark:border-white/5 pb-3">
        <div className="flex items-center gap-3">
          <span className="text-xl leading-none grayscale brightness-75 dark:brightness-110">{categoryEmojis[category]}</span>
          <h2 className="text-2xl font-black text-foreground tracking-tighter uppercase">{category}</h2>
        </div>

        <Link 
          to={`/category/${category.toLowerCase().replace(' ', '-')}`}
          className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-widest text-primary hover:gap-2 transition-all"
        >
          Explore All <ChevronRight className="h-3 w-3" />
        </Link>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {articles.slice(0, 3).map((article) => (
          <FeedCard key={article.id} article={article} />
        ))}
      </div>
      
      {articles.length > 3 && (
        <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-5">
          {articles.slice(3, 6).map((article) => (
            <Link 
              key={article.id}
              to={`/article/${article.slug}`}
              className="group flex flex-col gap-2 p-4 rounded-3xl glass-thin border-transparent hover:border-black/5 hover:bg-black/5 transition-all"
            >
              <div className="flex items-center gap-2 text-[8px] font-bold uppercase tracking-[0.2em] text-muted-foreground dark:text-white/60">
                {article.readTime} • {new Date(article.publishedAt).toLocaleDateString()}
              </div>

              <h3 className="text-sm font-bold text-foreground/80 group-hover:text-primary transition-colors leading-snug">
                {article.title}
              </h3>
            </Link>
          ))}
        </div>
      )}
    </section>
  );
};

export default CategoryStrip;
