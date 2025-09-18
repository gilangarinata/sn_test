"use client";

import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import "react-slideshow-image/dist/styles.css";
import { Slide } from "react-slideshow-image";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
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
    const [news, setNews] = useState<News[]>();
    const [totalBannersCount, setTotalBannersCount] = useState<number>();
    const [year, setYear] = useState<number>();

    async function getAchievements(currentPage: number, year: number) {
        const res = await fetchAllNews(currentPage, 6, categoryId, year);
        setNews((res?.banners as News[]) ?? []);
        setTotalBannersCount((res?.totalPages as number) ?? 1);
    }

    const [currentActivePage, setCurrentActivePage] = useState<number>(1);

    // Reset to page 1 when year or category changes so users don’t get empty pages
    useEffect(() => {
        setCurrentActivePage(1);
    }, [year, categoryId]);

    useEffect(() => {
        getAchievements(currentActivePage ?? 1, year ?? -1);
    }, [currentActivePage, year, categoryId]);

    return (
        <div className="w-full flex flex-col mb-8">
            {/* TOP FILTERS / CATEGORIES */}
            <div className="w-full flex flex-col lg:flex-row justify-between p-6 max-w-5xl mx-auto items-center">
                {/* IMPORTANT: use w-full (not w-screen) to avoid overflow layer on mobile */}
                <div className="w-full flex gap-4 overflow-x-auto">
                    <Link href={"/media/news"}>
                        <p
                            className={cn(
                                "font-bold whitespace-nowrap",
                                pathName === "/media/news"
                                    ? "text-yellow-400 underline underline-offset-8"
                                    : ""
                            )}
                        >
                            {dictionary.all}
                        </p>
                    </Link>

                    {categories.map((category) => (
                        <Link key={category.id} href={"/media/news/" + category._id}>
                            <p
                                className={cn(
                                    "font-bold whitespace-nowrap",
                                    pathName === "/media/news/" + category._id
                                        ? "text-yellow-400 underline underline-offset-8"
                                        : ""
                                )}
                            >
                                {translateText(category.name, lang)}
                            </p>
                        </Link>
                    ))}
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
            {/* Give the grid a stacking context so nothing floats over it */}
            <div className="grid relative z-0 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 md:mx-auto mx-4 max-w-5xl gap-4 mb-8">
                {news?.map((content) => (
                    <article className="flex flex-col gap-4" key={content.slug ?? content.title}>
                        {/* Wrap only the tappable parts in Link (image + title) */}
                        <Link
                            href={"/media/news/detail/" + content.slug}
                            className="block"
                            aria-label={`Open news: ${content.title}`}
                        >
                            <div className="relative w-full">
                                {/* Use <img> to keep it simple & avoid layout shifts if dimensions are unknown */}
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

                        {/* IMPORTANT: Make preview click-through so it won't steal taps on mobile */}
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

            {/* PAGINATION */}
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
        </div>
    );
}
