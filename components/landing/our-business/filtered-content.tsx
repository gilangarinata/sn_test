"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { fetchAllNews } from "@/lib/actions/admin/news.action";
import { fetchAllVideos } from "@/lib/actions/admin/video.action";
import { News } from "@/components/admin/media/news/news-table";
import { Video } from "@/components/admin/media/video/video-table";
import { Locale } from "@/i18n.config";
import { translateText } from "@/lib/utils";
import Spinner from "@/components/spinner";

interface FilteredContentProps {
    category: string | null;
    lang: Locale;
    dictionary: any;
}

export default function FilteredContent({ category, lang, dictionary }: FilteredContentProps) {
    const [news, setNews] = useState<News[]>([]);
    const [videos, setVideos] = useState<Video[]>([]);
    const [loading, setLoading] = useState(false);

    const sectionRef = React.useRef<HTMLElement>(null);

    useEffect(() => {
        if (!category) {
            setNews([]);
            setVideos([]);
            return;
        }

        const fetchData = async () => {
            setLoading(true);
            try {
                // sector mapping using specific DB IDs for news and videos
                const sectorMap: Record<string, { news: string, video: string }> = {
                    'ipp': { 
                        news: '69e1ef538a345f0d22450b87', 
                        video: '655242ebd48b159b9b31c711' 
                    },
                    'mining': { 
                        news: '69e1ef538a345f0d22450b8a', 
                        video: '65524305d48b159b9b320c88' 
                    },
                    'commercial': { 
                        news: '69e1ef538a345f0d22450b8d', 
                        video: '65524fedd48b159b9b31f785' 
                    }
                };
                
                const ids = sectorMap[category.toLowerCase()];

                if (ids) {
                    const newsRes = await fetchAllNews(1, 6, ids.news);
                    const videosRes = await fetchAllVideos(1, 6, ids.video);

                    setNews((newsRes?.banners as News[]) || []);
                    setVideos((videosRes?.banners as Video[]) || []);
                } else {
                    setNews([]);
                    setVideos([]);
                }

                // Smooth scroll to the content section
                if (sectionRef.current) {
                    sectionRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
            } catch (error) {
                console.error("Error fetching filtered content:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [category]);

    if (!category) return null;

    return (
        <section ref={sectionRef} id="filtered-experience-content" className="w-full py-20 bg-white scroll-mt-32">
            <div className="max-w-7xl mx-auto px-4 md:px-10 lg:px-20">
                <div className="flex flex-col items-center mb-16 text-center">
                    <h2 className="text-[#1A4267] text-3xl md:text-5xl font-bold mb-4 uppercase tracking-wider">
                        {category === 'commercial' ? 'Commercial & Industry' : category.toUpperCase()} PROJECTS
                    </h2>
                    <div className="w-24 h-1.5 bg-[#FBD00F]" /> {/* Matching yellow accent if used elsewhere, otherwise blue */}
                </div>

                {loading ? (
                    <div className="flex justify-center items-center py-32">
                        <Spinner />
                    </div>
                ) : (
                    <div className="space-y-24">
                        {/* News / Articles Section */}
                        {news.length > 0 && (
                            <div>
                                <div className="flex items-center gap-4 mb-10">
                                    <div className="w-2 h-10 bg-[#1A4267]" />
                                    <h3 className="text-[#1A4267] text-3xl font-bold">Latest Articles</h3>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                                    {news.map((item) => (
                                        <motion.article 
                                            key={item.id}
                                            whileHover={{ y: -5 }}
                                            className="bg-white rounded-sm overflow-hidden border border-slate-100 shadow-lg hover:shadow-2xl transition-all duration-300"
                                        >
                                            <Link href={`/${lang}/media/news/detail/${item.slug}`}>
                                                <div className="relative h-64 w-full">
                                                    <Image 
                                                        src={item.image} 
                                                        alt={item.title} 
                                                        fill 
                                                        className="object-cover"
                                                    />
                                                </div>
                                                <div className="p-8">
                                                    <h4 className="text-[#1A4267] text-xl font-bold line-clamp-2 hover:text-blue-600 transition-colors mb-4 min-h-[56px]">
                                                        {item.title}
                                                    </h4>
                                                    <div className="flex items-center justify-between mt-6 pt-6 border-t border-slate-100">
                                                        <span className="text-slate-500 text-sm font-medium">
                                                            {new Date(item.publishAt || item.createdAt).toLocaleDateString(lang === 'id' ? 'id-ID' : 'en-US', {
                                                                day: 'numeric',
                                                                month: 'long',
                                                                year: 'numeric'
                                                            })}
                                                        </span>
                                                        <span className="text-[#1A4267] font-bold text-sm uppercase tracking-tighter">Read More →</span>
                                                    </div>
                                                </div>
                                            </Link>
                                        </motion.article>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Videos Section */}
                        {videos.length > 0 && (
                            <div>
                                <div className="flex items-center gap-4 mb-10">
                                    <div className="w-2 h-10 bg-red-600" />
                                    <h3 className="text-[#1A4267] text-3xl font-bold">Featured Videos</h3>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                                    {videos.map((video) => {
                                        const match = video.videoUrl.match(/[?&]v=([^&]+)/);
                                        const videoId = match ? match[1] : '';
                                        return (
                                            <motion.div 
                                                key={video.id}
                                                whileHover={{ scale: 1.02 }}
                                                className="bg-white rounded-sm overflow-hidden border border-slate-100 shadow-lg hover:shadow-2xl transition-all duration-300"
                                            >
                                                <Link href={`/${lang}/media/video/detail/${video.id}`}>
                                                    <div className="relative h-64 w-full group">
                                                        <Image 
                                                            src={`https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`} 
                                                            alt={video.title} 
                                                            fill 
                                                            className="object-cover"
                                                        />
                                                        <div className="absolute inset-0 flex items-center justify-center bg-black/30 group-hover:bg-black/50 transition-colors">
                                                            <div className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center text-white shadow-2xl scale-100 group-hover:scale-110 transition-transform">
                                                                <svg fill="currentColor" viewBox="0 0 24 24" className="w-8 h-8">
                                                                    <path d="M8 5v14l11-7z" />
                                                                </svg>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="p-8">
                                                        <h4 className="text-[#1A4267] text-xl font-bold line-clamp-2 hover:text-red-600 transition-colors min-h-[56px]">
                                                            {translateText(video.title, lang)}
                                                        </h4>
                                                    </div>
                                                </Link>
                                            </motion.div>
                                        );
                                    })}
                                </div>
                            </div>
                        )}

                        {news.length === 0 && videos.length === 0 && (
                            <div className="flex flex-col items-center py-32 text-slate-400">
                                <div className="bg-slate-50 p-10 rounded-full mb-6">
                                    <svg className="w-20 h-20 text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="9.172 9.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                </div>
                                <h4 className="text-[#1A4267] text-2xl font-bold">No projects found</h4>
                                <p className="text-lg mt-2">We haven't uploaded any content for this category yet. Check back soon!</p>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </section>
    );
}
