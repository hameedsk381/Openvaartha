import { Instagram, ArrowUpRight, Heart, MessageCircle, RefreshCw } from 'lucide-react';
import { Button } from './ui/button';
import { InstagramEmbed } from 'react-social-media-embed';
import { useState, useEffect } from 'react';

const InstagramFeed = () => {
    const [stats, setStats] = useState({
        followers: "20.6k",
        posts: "492",
        isLive: false
    });

    useEffect(() => {
        const fetchInstagramData = async () => {
            const token = import.meta.env.VITE_INSTAGRAM_ACCESS_TOKEN;
            
            if (token) {
                // Official Meta Graph API
                try {
                    const response = await fetch(`https://graph.instagram.com/me?fields=id,username,account_type,media_count,followers_count&access_token=${token}`);
                    const data = await response.json();
                    
                    if (data.followers_count !== undefined) {
                        const count = data.followers_count;
                        const formatted = count > 1000 ? (count / 1000).toFixed(1) + 'k' : count.toString();
                        setStats(prev => ({ 
                            ...prev, 
                            followers: formatted, 
                            posts: data.media_count.toString(),
                            isLive: true 
                        }));
                        return; // Exit if successful
                    }
                } catch (err) {
                    console.warn("Meta API failed, falling back to proxy.");
                }
            }

            // Fallback: Proxy Scraper (Current implementation)
            try {
                const response = await fetch(`https://api.allorigins.win/get?url=${encodeURIComponent('https://www.instagram.com/openvaartha/')}`);
                const data = await response.json();
                
                if (data.contents) {
                    const followerMatch = data.contents.match(/"edge_followed_by":\{"count":(\d+)\}/);
                    const postMatch = data.contents.match(/"edge_owner_to_timeline_media":\{"count":(\d+)\}/);
                    
                    if (followerMatch && followerMatch[1]) {
                        const count = parseInt(followerMatch[1]);
                        const formatted = count > 1000 ? (count / 1000).toFixed(1) + 'k' : count.toString();
                        setStats(prev => ({ ...prev, followers: formatted, isLive: true }));
                    }
                    if (postMatch && postMatch[1]) {
                        setStats(prev => ({ ...prev, posts: postMatch[1] }));
                    }
                }
            } catch (err) {
                console.log("All sync methods failed, using cached data.");
            }
        };

        fetchInstagramData();
    }, []);

    // Mock data for the social snapshots
    const posts = [
        { id: 1, image: "https://images.unsplash.com/photo-1495020689067-958852a7765e?auto=format&fit=crop&q=80&w=300", likes: "1.2k" },
        { id: 2, image: "https://images.unsplash.com/photo-1504711434969-e33886168f5c?auto=format&fit=crop&q=80&w=300", likes: "850" },
        { id: 3, image: "https://images.unsplash.com/photo-1546422122-018583b482c3?auto=format&fit=crop&q=80&w=300", likes: "2.4k" },
        { id: 4, image: "https://images.unsplash.com/photo-1588681664899-f142ff2dc9b1?auto=format&fit=crop&q=80&w=300", likes: "1.1k" },
        { id: 5, image: "https://images.unsplash.com/photo-1572949645841-094f3a9c4c94?auto=format&fit=crop&q=80&w=300", likes: "920" },
        { id: 6, image: "https://images.unsplash.com/photo-1541746972996-4e0b0f43e03a?auto=format&fit=crop&q=80&w=300", likes: "3.1k" },
    ];

    return (
        <section className="social-feed-section py-12 border-t border-black/5 dark:border-white/5">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
                
                {/* Profile Info - 4 columns */}
                <div className="lg:col-span-4 space-y-8">
                    <div className="space-y-4">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#E1306C]/10 text-[#E1306C] text-[10px] font-black uppercase tracking-[0.3em]">
                            <Instagram className="h-3.5 w-3.5" />
                            Live Social Desk
                        </div>
                        <h2 className="text-4xl font-black text-foreground tracking-tighter leading-none">
                            Connecting through <br /><span className="text-[#E1306C]">@openvaartha</span>
                        </h2>
                        <p className="text-sm font-bold text-muted-foreground leading-relaxed max-w-xs">
                            Get behind-the-scenes reporting, quick infographics, and real-time community updates directly on our Instagram feed.
                        </p>
                    </div>

                    <div className="flex items-center gap-8">
                        <div className="flex flex-col">
                            <div className="flex items-center gap-1.5">
                                <span className="text-2xl font-black text-foreground tabular-nums tracking-tighter">{stats.followers}</span>
                                {stats.isLive && <RefreshCw className="h-3 w-3 text-primary animate-[spin_4s_linear_infinite]" />}
                            </div>
                            <span className="text-[10px] font-black uppercase tracking-widest text-muted-foreground opacity-40">Followers</span>
                            {stats.isLive && <span className="text-[6px] font-black text-primary uppercase tracking-[0.2em] -mt-1 scale-90 -translate-x-1">Live Sync</span>}
                        </div>
                        <div className="flex flex-col">
                            <span className="text-2xl font-black text-foreground tabular-nums tracking-tighter">{stats.posts}</span>
                            <span className="text-[10px] font-black uppercase tracking-widest text-muted-foreground opacity-40">Dispatches</span>
                        </div>
                        <div className="flex flex-col">
                            <span className="text-2xl font-black text-foreground tabular-nums tracking-tighter">500k+</span>
                            <span className="text-[10px] font-black uppercase tracking-widest text-muted-foreground opacity-40">Monthly Reach</span>
                        </div>
                    </div>

                    <div className="rounded-2xl overflow-hidden glass border border-black/5 dark:border-white/5 shadow-glass-sm max-w-[328px]">
                        <InstagramEmbed url="https://www.instagram.com/openvaartha/" width="100%" />
                    </div>

                    <a 
                        href="https://www.instagram.com/openvaartha/" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="inline-block"
                    >
                        <Button className="rounded-xl h-12 px-8 font-black bg-[#E1306C] text-white hover:bg-[#C13584] hover:scale-[1.02] active:scale-95 transition-all text-xs uppercase tracking-widest gap-2">
                            FOLLOW ON INSTAGRAM <ArrowUpRight className="h-4 w-4" />
                        </Button>
                    </a>
                </div>

                {/* Simulated Feed Grid - 8 columns */}
                <div className="lg:col-span-8">
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                        {posts.map((post) => (
                            <a 
                                key={post.id}
                                href="https://www.instagram.com/openvaartha/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="group relative aspect-square rounded-2xl overflow-hidden glass border-transparent hover:border-[#E1306C]/30 transition-all duration-500"
                            >
                                <img 
                                    src={post.image} 
                                    alt="" 
                                    className="h-full w-full object-cover transition-all duration-700 group-hover:scale-110 group-hover:rotate-2 opacity-90 group-hover:opacity-100"
                                />
                                
                                {/* Overlay on Hover */}
                                <div className="absolute inset-0 bg-gradient-to-t from-[#E1306C]/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-4 text-white">
                                    <div className="flex items-center gap-1.5 font-black text-sm">
                                        <Heart className="h-4 w-4 fill-current" /> {post.likes}
                                    </div>
                                    <div className="flex items-center gap-1.5 font-black text-sm">
                                        <MessageCircle className="h-4 w-4 fill-current" />
                                    </div>
                                </div>

                                {/* Sparkle Effect */}
                                <div className="absolute top-3 right-3 h-6 w-6 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500 transform scale-50 group-hover:scale-100">
                                    <Instagram className="h-3 w-3 text-white" />
                                </div>
                            </a>
                        ))}
                    </div>
                </div>

            </div>
        </section>
    );
};

export default InstagramFeed;
