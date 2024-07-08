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
import {News} from "@/components/admin/media/news/news-table";
import {BlockNoteView} from "@blocknote/react";
import {NewEditor} from "@/components/admin/media/news/new_editor";
import {FooterData} from "@/components/admin/footer/footer-table";

export default function FaqDetail({content, title} : {content : string, title: string}) {

    return (
        <div className="w-full flex flex-col mx-auto max-w-5xl my-10">
            <div className="flex flex-col gap-16 md:flex-row md:gap-8 px-6">
                <div className="w-full flex flex-col gap-6">
                    <h1 className="text-3xl font-semibold">{title}</h1>
                    {/*<p className="text-gray-400">{formatDateString2(news?.createdAt)}</p>*/}
                    <NewEditor onChange={(val) => {}} initialContent={content} editable={false} />
                    {/*<p className="text-justify" dangerouslySetInnerHTML={{__html: news?.content}} />*/}
                </div>
            </div>
            <div></div>
        </div>
    )
}