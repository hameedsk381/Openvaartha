import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { cn, getArticleImage, handleImageFallback } from "@/lib/utils";
import { Search, Sun, Moon, Bookmark, User, Compass, Newspaper, LogOut, Bell, History } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { articles } from "@/data/mockArticles";
import { useReadingList } from "@/hooks/use-reading-list";

const Navbar = ({ isInsideStack }: { isInsideStack?: boolean }) => {
  const [isDark, setIsDark] = useState(true);
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { saved } = useReadingList();
  const navigate = useNavigate();

  useEffect(() => {
    const isDarkMode = document.documentElement.classList.contains("dark");
    setIsDark(isDarkMode);

    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };

    const handleScroll = () => {
      setScrolled(window.scrollY > 8);
    };

    document.addEventListener("keydown", down);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      document.removeEventListener("keydown", down);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const toggleTheme = () => {
    const newDark = !isDark;
    setIsDark(newDark);
    if (newDark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  };

  return (
    <>
      <nav
        className={cn(
          "z-50 transition-all duration-700",
          !isInsideStack && "sticky top-0",
          scrolled ? "glass border-b border-white/10 shadow-glass" : "bg-transparent border-b border-transparent"
        )}
        role="navigation"
        aria-label="Main navigation"
      >
        <div className="mx-auto flex h-14 sm:h-[56px] max-w-[1280px] px-4 sm:px-6 lg:px-8 items-center justify-between">
          {/* Branded Liquid Glass Logo — Authoritative Palette */}
          <Link to="/" className="flex items-center gap-2 group" aria-label="Open Vaartha home">
            <div className="flex h-7 w-7 items-center justify-center rounded-lg glass bg-[hsl(var(--primary)/0.1)] text-[hsl(var(--primary))] transition-all duration-500 group-hover:scale-105 group-hover:shadow-glass group-active:scale-95">
              <span className="text-sm font-bold italic leading-none">V</span>
            </div>
            <span className="text-base font-bold tracking-tighter text-foreground leading-none">
              Open<span className="opacity-40 font-medium ml-0.5">Vaartha</span>
            </span>
          </Link>

          {/* Actions */}
          <div className="flex items-center gap-1 sm:gap-1.5">
            {/* Search Trigger */}
            <button
              onClick={() => setOpen(true)}
              className="flex h-8 items-center gap-2 rounded-lg glass-thin bg-white/5 px-2.5 text-muted-foreground transition-all duration-300 hover:text-foreground hover:bg-white/10 active:scale-95"
              aria-label="Search (Ctrl+K)"
            >
              <Search className="h-3.5 w-3.5" />
              <span className="hidden md:inline text-[9px] font-bold opacity-40 uppercase tracking-tighter">
                Search
              </span>
            </button>

            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="flex h-8 w-8 items-center justify-center rounded-lg glass-thin bg-white/5 text-muted-foreground transition-all duration-300 hover:text-foreground hover:bg-white/10 active:scale-95"
              aria-label="Toggle Theme"
            >
              {isDark ? <Sun className="h-3.5 w-3.5" /> : <Moon className="h-3.5 w-3.5" />}
            </button>

            <div className="hidden sm:flex items-center gap-1 ml-0.5">
              {/* Reading List Drawer */}
              <Sheet>
                <SheetTrigger asChild>
                  <button className="relative flex h-8 w-8 items-center justify-center rounded-lg glass-thin bg-white/5 text-muted-foreground transition-all duration-300 hover:text-foreground hover:bg-white/10 active:scale-95">
                    <Bookmark className="h-3.5 w-3.5" />
                    {saved.length > 0 && (
                      <span className="absolute top-1.5 right-1.5 h-1.5 w-1.5 rounded-full bg-blue-500 shadow-[0_0_8px_#3b82f6]" />
                    )}
                  </button>
                </SheetTrigger>
                <SheetContent className="w-full sm:max-w-md glass border-l border-white/10 p-0">
                  <SheetHeader className="p-6 pb-4 border-b border-border/50">
                    <SheetTitle className="text-lg font-bold tracking-tight">Saved Briefs</SheetTitle>
                    <SheetDescription className="text-xs text-muted-foreground uppercase tracking-widest font-bold opacity-60">
                      Reading List
                    </SheetDescription>
                  </SheetHeader>
                  <div className="p-4 overflow-y-auto max-h-[calc(100vh-120px)] space-y-1">
                    {saved.length === 0 ? (
                      <div className="py-20 text-center opacity-40">
                        <Bookmark className="h-10 w-10 mx-auto mb-4" />
                        <p className="text-xs font-bold uppercase tracking-widest leading-none">No saved briefs</p>
                      </div>
                    ) : (
                      saved.map((a) => (
                        <Link
                          key={a.id}
                          to={`/article/${a.slug}`}
                          className="flex gap-3 p-2.5 rounded-xl transition-all duration-500 hover:bg-white/5 group border border-transparent hover:border-white/10 shadow-sm"
                        >
                          <div className="h-14 w-14 rounded-lg overflow-hidden shrink-0 glass-thin">
                            <img
                              src={getArticleImage(a.thumbnail)}
                              className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                              alt=""
                              onError={handleImageFallback}
                            />
                          </div>
                          <div className="space-y-0.5 min-w-0">
                            <span className="text-[9px] font-bold uppercase tracking-widest text-muted-foreground opacity-60">{a.category}</span>
                            <h4 className="text-[13px] font-bold leading-tight line-clamp-2 text-foreground/90">{a.title}</h4>
                            <p className="text-[10px] text-muted-foreground font-medium opacity-60">{a.readTime} read</p>
                          </div>
                        </Link>
                      ))
                    )}
                  </div>
                </SheetContent>
              </Sheet>

              {/* Profile Dropdown */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button className="h-8 w-8 rounded-lg overflow-hidden glass border-white/10 hover:border-white/20 transition-all duration-300 focus:outline-none shadow-sm active:scale-95 ml-1">
                    <Avatar className="h-full w-full rounded-none">
                      <AvatarImage src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=100" />
                      <AvatarFallback className="bg-muted text-[10px] font-bold uppercase">VP</AvatarFallback>
                    </Avatar>
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56 mt-2 glass-thick border border-white/10 p-1.5 shadow-glass-lg" align="end">
                  <DropdownMenuLabel className="p-2.5">
                    <div className="flex flex-col gap-0.5">
                      <p className="text-xs font-bold tracking-tight">Vignesh Prabhu</p>
                      <p className="text-[10px] text-muted-foreground opacity-60">vignesh@openvaartha.com</p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator className="bg-white/10 my-1" />
                  <DropdownMenuGroup>
                    <DropdownMenuItem className="h-8 rounded-lg focus:bg-white/5 gap-2.5 cursor-pointer text-xs font-medium">
                      <User className="h-3.5 w-3.5 opacity-60" /> <span>Account</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem className="h-8 rounded-lg focus:bg-white/5 gap-2.5 cursor-pointer text-xs font-medium">
                      <History className="h-3.5 w-3.5 opacity-60" /> <span>History</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem className="h-8 rounded-lg focus:bg-white/5 gap-2.5 cursor-pointer text-xs font-medium">
                      <Bell className="h-3.5 w-3.5 opacity-60" /> <span>Notifications</span>
                    </DropdownMenuItem>
                  </DropdownMenuGroup>
                  <DropdownMenuSeparator className="bg-white/10 my-1" />
                  <DropdownMenuItem className="h-8 rounded-lg focus:bg-destructive/10 focus:text-destructive gap-2.5 cursor-pointer text-destructive text-xs font-bold">
                    <LogOut className="h-3.5 w-3.5" /> <span>Log out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>
      </nav>

      {/* ⌘K Command Dialog */}
      <CommandDialog open={open} onOpenChange={setOpen}>
        <div className="glass shadow-glass">
          <CommandInput placeholder="Search intelligence briefings..." className="border-none focus:ring-0" />
          <CommandList className="scrollbar-hide px-2 pb-2">
            <CommandEmpty>No results found.</CommandEmpty>
            <CommandGroup heading="Topics">
              {["Politics", "Tech", "Business", "Cinema", "Sports"].map(c => (
                <CommandItem key={c} onSelect={() => { setOpen(false); navigate(`/?category=${c}`); }} className="rounded-lg hover:bg-white/5">
                  <Newspaper className="mr-2 h-3.5 w-3.5 text-muted-foreground opacity-40" />
                  <span className="font-semibold text-xs tracking-tight">{c}</span>
                </CommandItem>
              ))}
            </CommandGroup>
            <CommandSeparator className="bg-white/10 my-1" />
            <CommandGroup heading="Trending Briefings">
              {articles.slice(0, 5).map(a => (
                <CommandItem key={a.id} onSelect={() => { setOpen(false); navigate(`/article/${a.slug}`); }} className="rounded-lg hover:bg-white/5">
                  <div className="flex flex-col gap-0.5 min-w-0">
                    <span className="font-bold text-[13px] tracking-tight leading-tight truncate">{a.title}</span>
                    <span className="text-[10px] text-muted-foreground uppercase font-bold tracking-widest opacity-40">{a.category} · {a.readTime}</span>
                  </div>
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </div>
      </CommandDialog>
    </>
  );
};

export default Navbar;
