"use client";
import { motion } from "framer-motion"
import {ChevronDown, ChevronLeftCircle, ChevronRightCircle, Globe} from "lucide-react";
import 'react-slideshow-image/dist/styles.css'
import { Slide } from 'react-slideshow-image';
import {Button} from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import {usePathname} from "next/navigation";
import {cn} from "@/lib/utils";
import {DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger} from "@/components/ui/dropdown-menu";
import React, {useEffect, useState} from "react";
import {News} from "@/components/admin/media/news/news-table";
import {Category} from "@/components/admin/media/category/category-table";
import HorizontalPagination from "@/components/pagination";
import {fetchCareerByDepIds} from "@/lib/actions/admin/career.action";
import {CareerMdl} from "@/components/admin/career/add_career/career-table";
import {fetchAllNews, fetchNewsByCategory} from "@/lib/actions/admin/news.action";

export default function NewsContent({ categoryId, categories} : { categoryId?: string, categories: Category[]}) {
    const pathName = usePathname();
    const [news, setNews] = useState<News[]>()
    const [totalBannersCount, setTotalBannersCount] = useState<number>()
    const [year, setYear] = useState<number>()

    async function getAchievements(currentPage: number, year: number) {
        const news = await fetchAllNews(currentPage, 16, categoryId, year)
        setNews(news?.banners as News[])
        setTotalBannersCount(news?.totalPages as number)
    }

    const [currentActivePage, setCurrentActivePage] = useState<number>(1)
    useEffect(() => {
        getAchievements(currentActivePage ?? 1, year ?? new Date().getFullYear())
    }, [currentActivePage, year])

    return (
        <div className="w-full flex flex-col mb-8">
            <div className="w-full flex flex-col lg:flex-row justify-between p-6 max-w-5xl mx-auto items-center">
                <div className="w-full flex gap-4 ">
                    <p className="font-bold">News Length</p>
                    {news?.length}
                    {categories.map(category => (
                        <Link key={category.id} href={"/media/news/"+category._id}>
                            <p className={cn("font-bold", pathName == "/media/news/"+category._id ? "text-yellow-400 underline underline-offset-8" : "")}>
                                {category.name}
                            </p>
                        </Link>
                    ))}
                </div>
                <DropdownMenu>
                    <DropdownMenuTrigger>
                        <div className="rounded-sm border border-slate-500 mt-4 lg:mt-0">
                            <div className="flex items-center px-2 py-1 gap-1">
                                <p className="text-sm">Archive</p>
                                <ChevronDown width={15} />
                            </div>
                        </div>
                    </DropdownMenuTrigger>

                    <DropdownMenuContent>
                        <DropdownMenuItem onClick={() => setYear(2023)}>2023</DropdownMenuItem>
                        <DropdownMenuItem onClick={() => setYear(2022)}>2022</DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 md:mx-auto mx-4 max-w-5xl gap-4 mb-8">
                {news?.map(content => (
                    <div className="flex flex-col gap-4" key={content.title}>
                        <div className="relative w-full h-[250px]">
                            <Link href={"/media/news/detail/"+content.id} >
                                <Image fill src={content.image} alt="" />
                            </Link>
                        </div>
                        <Link href={"/media/news/detail/"+content.id} >
                            <h1 className="text-xl font-bold hover:text-yellow-400">{content.title}</h1>
                        </Link>
                        <p className="max-h-[165px] overflow-hidden text-justify" dangerouslySetInnerHTML={{__html: content.content}} />
                    </div>
                ))}
            </div>
            <div className="w-full flex justify-end px-20">
                <HorizontalPagination currentPage={currentActivePage} totalPages={totalBannersCount ?? 1} onPageChange={()=> {}} textColor="text-slate-500"/>
            </div>
        </div>
    )
}