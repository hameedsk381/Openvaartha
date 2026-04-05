import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import type { Article } from "@/data/mockArticles";
import { categoryColors } from "@/data/mockArticles";
import { ChevronRight, ArrowUpRight } from "lucide-react";

interface FeedCardProps {
  article: Article;
  index?: number;
  variant?: "hero" | "grid" | "list" | "compact" | "minimal";
}

const brandColorVar: Record<string, string> = {
  Politics: "var(--brand-politics)",
  Tech: "var(--brand-tech)",
  Business: "var(--brand-business)",
  Cinema: "var(--brand-cinema)",
  "Local News": "var(--brand-local)",
  Sports: "var(--brand-sports)",
  All: "var(--primary)"
};

const FeedCard = ({ article, index = 0, variant = "grid" }: FeedCardProps) => {
  const delay = Math.min(index * 50, 250);

  return (
    <Link
      to={`/article/${article.slug}`}
      className="block group animate-fade-in relative z-10 w-full h-full"
      style={{ animationDelay: `${delay}ms`, animationFillMode: "both" }}
    >
      <article
        className={cn(
          "relative overflow-hidden transition-all duration-700 h-full flex flex-col group",
          "rounded-2xl sm:rounded-3xl border border-black/5 dark:border-white/5 bg-card shadow-sm hover-lift",
          variant === "list" ? "sm:flex-row" : "",
        )}
      >
        {/* Instagram Look: Top Category Bar (Cream) */}
        {variant !== "minimal" && variant !== "compact" && (
          <div className="px-5 py-3 bg-secondary/50 border-b border-black/5 dark:border-white/5 flex items-center justify-between">
            <span className="text-[9px] font-black uppercase tracking-[0.3em] text-primary dark:text-primary-foreground">
              {article.category}
            </span>
            <div className="h-1.5 w-1.5 rounded-full bg-primary/20 animate-pulse" />
          </div>

        )}

        {/* Thumbnail Section */}
        {article.thumbnail && variant !== "minimal" && (
          <div className={cn(
            "relative overflow-hidden flex-shrink-0",
            variant === "hero" ? "w-full aspect-[16/9] sm:aspect-[21/9]" :
              variant === "list" ? "w-full sm:w-80 h-full" :
                "w-full aspect-square"
          )} >
            <img
              src={article.thumbnail}
              alt=""
              className="h-full w-full object-cover transition-transform duration-1000 group-hover:scale-105"
              loading="lazy"
            />
            {/* Glossy Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

            {article.trending && (
              <div className="absolute top-4 right-4 h-8 w-8 rounded-full glass bg-white/20 flex items-center justify-center text-white backdrop-blur-md">
                <ArrowUpRight className="h-4 w-4" />
              </div>
            )}
          </div>
        )}

        {/* Content Area */}
        <div className={cn(
          "relative flex-1 flex flex-col justify-between transition-colors",
          "p-5 sm:p-7",
          variant === "grid" || variant === "hero" ? "bg-primary dark:bg-primary/10 text-white dark:text-foreground" : "bg-card text-foreground"
        )}>

          <div className="space-y-4">
            <h2
              className={cn(
                "font-black text-balance leading-[1.1] tracking-tight transition-transform duration-500 group-hover:translate-x-1",
                variant === "hero" ? "text-2xl sm:text-5xl" : "text-xl sm:text-2xl"
              )}
            >
              {article.title}
            </h2>

            {variant !== "compact" && (
              <p className={cn(
                "leading-relaxed opacity-80 font-medium line-clamp-3",
                variant === "hero" ? "text-lg" : "text-sm"
              )}>
                {article.summary}
              </p>
            )}
          </div>

          {/* Footer Card Section */}
          <div className={cn(
            "mt-8 flex items-center justify-between pt-6 border-t border-current/10",
          )}>
            <div className="flex flex-col gap-0.5">
              <span className="text-[10px] uppercase font-black tracking-widest opacity-40">Intelligence</span>
              <span className="text-xs font-bold tabular-nums">{article.readTime} Dispatch</span>
            </div>
            <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest group/link">
              Read More <ChevronRight className="h-3 w-3 group-hover/link:translate-x-1 transition-transform" />
            </div>
          </div>
        </div>
      </article>
    </Link>
  );
};

export default FeedCard;
