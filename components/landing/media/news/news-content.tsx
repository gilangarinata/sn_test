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
import React from "react";
import {News} from "@/components/admin/media/news/news-table";
import {Category} from "@/components/admin/media/category/category-table";

// const categories = [
//     {
//         href : "/media/news",
//         label: "All News"
//     },
//     {
//         href : "/media/news/business",
//         label: "Business"
//     },
//     {
//         href : "/media/news/corporate",
//         label: "Corporate"
//     },
//     {
//         href : "/media/news/event",
//         label: "Events"
//     },
//     {
//         href : "/media/news/corporate",
//         label: "Corporate"
//     },
//     {
//         href : "/media/news/event",
//         label: "Events"
//     }
// ]

// const newsContents = [
//     {
//         href: '/media/news/detail/12',
//         title: "FKS Group Shares Love With Children At The Wikrama Putra And YPAB Orphanages, Surakarta",
//         images: "https://images.unsplash.com/photo-1509721434272-b79147e0e708?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1500&q=80",
//         description : "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut ornare varius nulla, quis aliquam augue varius nec. Morbi malesuada consequat nibh. Aliquam non arcu id lorem consectetur auctor."
//     },
//     {
//         href: '/media/news/detail/12',
//         title: "FKS Group Shares Love With Children At",
//         images: "https://images.unsplash.com/photo-1509721434272-b79147e0e708?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1500&q=80",
//         description : "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut ornare varius nulla, quis aliquam augue varius nec. Morbi malesuada consequat nibh. Aliquam non arcu id lorem consectetur auctor."
//     },
//     {
//         href: '/media/news/detail/12',
//         title: "FKS Group Shares Love With Children At The Wikrama Putra And YPAB Orphanages, Surakarta sdsa ",
//         images: "https://images.unsplash.com/photo-1509721434272-b79147e0e708?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1500&q=80",
//         description : "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut ornare varius nulla, quis aliquam augue varius nec. Morbi malesuada consequat nibh. Aliquam non arcu id lorem consectetur auctor."
//     },
//     {
//         href: '/media/news/detail/12',
//         title: "FKS Group Shares Love With Children At The ",
//         images: "https://images.unsplash.com/photo-1509721434272-b79147e0e708?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1500&q=80",
//         description : "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut ornare varius nulla, quis aliquam augue varius nec. Morbi malesuada consequat nibh. Aliquam non arcu id lorem consectetur auctor."
//     },
//     {
//         href: '/media/news/detail/12',
//         title: "News Title 1",
//         images: "https://images.unsplash.com/photo-1509721434272-b79147e0e708?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1500&q=80",
//         description : "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut ornare varius nulla, quis aliquam augue varius nec. Morbi malesuada consequat nibh. Aliquam non arcu id lorem consectetur auctor."
//     },
//     {
//         href: '/media/news/detail/12',
//         title: "FKS Group Shares Love With Children At The Wikrama Putra And YPAB Orphanages, Surakarta FKS Group Shares Love With Children At The Wikrama Putra And YPAB Orphanages, Surakarta",
//         images: "https://images.unsplash.com/photo-1509721434272-b79147e0e708?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1500&q=80",
//         description : "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut ornare varius nulla, quis aliquam augue varius nec. Morbi malesuada consequat nibh. Aliquam non arcu id lorem consectetur auctor."
//     },
// ]

export default function NewsContent({news, categories} : {news: News[], categories: Category[]}) {
    const pathName = usePathname();

    return (
        <div className="w-full flex flex-col mb-8">
            <div className="w-full flex justify-between p-6 max-w-5xl mx-auto items-center">
                <div className="w-full flex gap-4 overflow-scroll">
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
                        <div className="rounded-sm border border-slate-500">
                            <div className="flex items-center px-2 py-1 gap-1">
                                <p className="text-sm">Archive</p>
                                <ChevronDown width={15} />
                            </div>
                        </div>
                    </DropdownMenuTrigger>

                    <DropdownMenuContent>
                        <DropdownMenuItem>2023</DropdownMenuItem>
                        <DropdownMenuItem>2022</DropdownMenuItem>
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
        </div>
    )
}