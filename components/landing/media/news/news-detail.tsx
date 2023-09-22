"use client";
import { motion } from "framer-motion"
import {ChevronDown, ChevronLeftCircle, ChevronRightCircle, Globe} from "lucide-react";
import 'react-slideshow-image/dist/styles.css'
import { Slide } from 'react-slideshow-image';
import {Button} from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import {usePathname} from "next/navigation";
import {cn, formatDateString2} from "@/lib/utils";
import {DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger} from "@/components/ui/dropdown-menu";
import React from "react";
import {News} from "@/components/admin/home/news/news-table";

export default function NewsDetail({news} : {news : News}) {

    return (
        <div className="w-full flex flex-col mx-auto max-w-5xl my-10 px-4">
            <div className="flex flex-col gap-16 md:flex-row md:gap-8">
                <div className="w-full flex flex-col gap-6">
                    <div className="relative w-full h-[500px]">
                        <Image fill style={{objectFit:"cover"}} src={news.image} alt="" />
                    </div>
                    <h1 className="text-3xl font-semibold">{news.title}</h1>
                    <p className="text-gray-400">{formatDateString2(news.createdAt)}</p>
                    <p dangerouslySetInnerHTML={{__html: news.content}} />
                </div>
                <div className="flex flex-col w-[400px] gap-4">
                    <h2 className="font-bold text-2xl">Related News</h2>
                    <hr className="w-64 h-0.5 bg-gray-500 border-0 rounded"/>
                    <div className="flex items-center gap-2">
                        <div className="w-[200px] h-[100px] rounded-lg relative overflow-hidden">
                            <Image style={{objectFit:"cover"}} fill src="https://images.unsplash.com/photo-1509721434272-b79147e0e708?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1500&q=80" alt="" />
                        </div>
                        <p className="w-full font-bold hover:text-yellow-500 hover:cursor-pointer">Automatic Timer for Lamp to Reduce Electricity Usage in Nusa Prima Logistik</p>
                    </div>
                </div>
            </div>
            <div></div>
        </div>
    )
}