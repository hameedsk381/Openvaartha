import { useRef } from "react";
import { cn } from "@/lib/utils";
import type { Category } from "@/data/mockArticles";
import { categoryEmojis } from "@/data/mockArticles";

const categories: ("All" | Category)[] = ["All", "Politics", "Tech", "Business", "Cinema", "Local News", "Sports"];

interface CategoryChipsProps {
  selected: "All" | Category;
  onSelect: (cat: "All" | Category) => void;
  isInsideStack?: boolean;
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

const CategoryChips = ({ selected, onSelect, isInsideStack }: CategoryChipsProps) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  return (
    <div className={cn(
      "z-40 glass border-b border-black/5 mx-auto max-w-full backdrop-blur-3xl saturate-200 overflow-hidden",
      !isInsideStack && "sticky top-14 sm:top-[60px]"
    )}>
      {/* Specular highlight for the chip bar */}
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/40 to-transparent" />
      
      <div
        ref={scrollRef}
        className="mx-auto flex max-w-[1280px] items-center gap-1.5 overflow-x-auto px-4 sm:px-6 lg:px-8 py-1.5 sm:py-2 scrollbar-hide no-scrollbar"
        role="tablist"
        aria-label="News categories"
      >
        {categories.map((cat) => {
          const isSelected = selected === cat;
          const brandColor = brandColorVar[cat];
          
          return (
            <button
              key={cat}
              role="tab"
              aria-selected={isSelected}
              onClick={() => onSelect(cat)}
              className={cn(
                "relative flex h-8 sm:h-9 shrink-0 items-center justify-center rounded-xl sm:rounded-lg px-4 sm:px-5 text-[11px] sm:text-[12px] font-black transition-all duration-500",
                "active:scale-95 group outline-none focus-visible:ring-2 focus-visible:ring-primary/20",
                isSelected
                  ? "bg-primary text-primary-foreground shadow-glass border-black/10"
                  : "text-foreground/60 hover:bg-black/5 hover:text-foreground active:bg-black/10"
              )}
            >
              <div className="flex items-center gap-1.5 relative z-10 transition-transform duration-300 group-hover:scale-105">
                {cat !== "All" && (
                  <span className="text-[10px] leading-none opacity-40 group-hover:opacity-100 grayscale hover:grayscale-0 transition-all">
                    {categoryEmojis[cat]}
                  </span>
                )}
                <span className="tracking-widest leading-none uppercase font-bold group-hover:opacity-100">{cat}</span>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default CategoryChips;
