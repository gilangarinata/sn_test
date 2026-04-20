"use client";

import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import "react-slideshow-image/dist/styles.css";
import { Slide } from "react-slideshow-image";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { cn, translateText } from "@/lib/utils";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import React, { useEffect, useState } from "react";
import { News } from "@/components/admin/media/news/news-table";
import { Category } from "@/components/admin/media/category/category-table";
import HorizontalPagination from "@/components/pagination";
import { CareerMdl } from "@/components/admin/career/add_career/career-table";
import { fetchAllNews } from "@/lib/actions/admin/news.action";
import { NewEditor } from "@/components/admin/media/news/new_editor";
import { Locale } from "@/i18n.config";
import MediaEmptyState from "@/components/landing/media/media-empty-state";

export default function NewsContent({
                                        categoryId,
                                        categories,
                                        lang,
                                        dictionary,
                                    }: {
    categoryId?: string;
    categories: Category[];
    lang: Locale;
    dictionary: any;
}) {
    const pathName = usePathname();
    const searchParams = useSearchParams();
    const categoryName = searchParams.get("category") || undefined;
    
    const [news, setNews] = useState<News[]>();
    const [totalBannersCount, setTotalBannersCount] = useState<number>();
    const [year, setYear] = useState<number>();

    async function getAchievements(currentPage: number, year: number) {
        const res = await fetchAllNews(currentPage, 6, categoryId, year, categoryName);
        setNews((res?.banners as News[]) ?? []);
        setTotalBannersCount((res?.totalPages as number) ?? 1);
    }

    const [currentActivePage, setCurrentActivePage] = useState<number>(1);

    // Reset to page 1 when year or category changes so users don’t get empty pages
    useEffect(() => {
        setCurrentActivePage(1);
    }, [year, categoryId, categoryName]);

    useEffect(() => {
        getAchievements(currentActivePage ?? 1, year ?? -1);
    }, [currentActivePage, year, categoryId, categoryName]);

    return (
        <div className="w-full flex flex-col mb-8">
            {/* TOP FILTERS / CATEGORIES */}
            <div className="w-full flex flex-col lg:flex-row justify-between p-6 max-w-5xl mx-auto items-center">
                <div className="w-full flex gap-4 overflow-x-auto pb-2 sm:pb-0 pr-10">
                    <Link href={pathName}>
                        <p
                            className={cn(
                                "font-bold whitespace-nowrap cursor-pointer",
                                !categoryName
                                    ? "text-yellow-400 underline underline-offset-8"
                                    : "text-slate-700 hover:text-yellow-400"
                            )}
                        >
                            {dictionary.all}
                        </p>
                    </Link>

                    {categories.map((category) => {
                        const translatedName = translateText(category.name, lang);
                        const isActive = categoryName?.toLowerCase() === translatedName?.toLowerCase();

                        return (
                            <Link key={category.id} href={`${pathName}?category=${encodeURIComponent(translatedName)}`}>
                                <p
                                    className={cn(
                                        "font-bold whitespace-nowrap cursor-pointer",
                                        isActive
                                            ? "text-yellow-400 underline underline-offset-8"
                                            : "text-slate-700 hover:text-yellow-400"
                                    )}
                                >
                                    {translatedName}
                                </p>
                            </Link>
                        );
                    })}
                </div>

                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <button
                            type="button"
                            className="rounded-sm border border-slate-500 mt-4 lg:mt-0"
                        >
                            <div className="flex items-center px-2 py-1 gap-1">
                                <p className="text-sm">Archive</p>
                                <ChevronDown width={15} />
                            </div>
                        </button>
                    </DropdownMenuTrigger>

                    <DropdownMenuContent>
                        <DropdownMenuItem onClick={() => setYear(2025)}>
                            2025
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => setYear(2024)}>
                            2024
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => setYear(2023)}>
                            2023
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => setYear(2022)}>
                            2022
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>

            {/* GRID */}
            <div className="md:mx-auto mx-4 max-w-5xl w-full mb-8">
                {news !== undefined && news.length === 0 ? (
                    <MediaEmptyState 
                        title={dictionary.no_content} 
                        description={dictionary.no_content_desc} 
                    />
                ) : (
                    <div className="grid relative z-0 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {news?.map((content) => (
                            <article className="flex flex-col gap-4" key={content.slug ?? content.title}>
                                <Link
                                    href={"/media/news/detail/" + content.slug}
                                    className="block"
                                    aria-label={`Open news: ${content.title}`}
                                >
                                    <div className="relative w-full">
                                        <img
                                            src={content.image}
                                            alt={content.title ?? "News image"}
                                            className="w-full h-auto"
                                            loading="lazy"
                                        />
                                    </div>
                                    <h1 className="mt-3 text-xl font-bold group-hover:text-yellow-400 hover:text-yellow-400">
                                        {content.title}
                                    </h1>
                                </Link>

                                <div className="max-h-[165px] overflow-hidden pointer-events-none select-none">
                                    <NewEditor
                                        editable={false}
                                        onChange={() => {}}
                                        initialContent={content.content}
                                    />
                                </div>
                            </article>
                        ))}
                    </div>
                )}
            </div>

            {/* PAGINATION */}
            {(news && news.length > 0) && (
                <div className="w-full flex justify-end px-6 md:px-20 relative z-0">
                    <HorizontalPagination
                        currentPage={currentActivePage}
                        totalPages={totalBannersCount ?? 1}
                        onPageChange={(page) => {
                            setCurrentActivePage(page);
                        }}
                        textColor="text-slate-500"
                    />
                </div>
            )}
        </div>
    );
}
