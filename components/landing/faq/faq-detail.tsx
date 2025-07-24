"use client";
import { motion } from "framer-motion"
import {
    ChevronDown,
    ChevronDownIcon,
    ChevronLeftCircle,
    ChevronRightCircle,
    ChevronRightIcon,
    Globe
} from "lucide-react";
import 'react-slideshow-image/dist/styles.css'
import { Slide } from 'react-slideshow-image';
import {Button} from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import {usePathname} from "next/navigation";
import {cn, formatDateString2, translateText} from "@/lib/utils";
import {DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger} from "@/components/ui/dropdown-menu";
import React, {useState} from "react";
import {News} from "@/components/admin/media/news/news-table";
import {NewEditor} from "@/components/admin/media/news/new_editor";
import {FooterData} from "@/components/admin/footer/footer-table";
import {Locale} from "@/i18n.config";
import {tryGc} from "yjs";

const divStyle = {
    backgroundSize: 'cover',
    backgroundImage: `url('/images/faq_background.png')`
}


interface FaqItem {
    question: string;
    answer: string;
}

const parseFaqData = (jsonString: string): FaqItem[] => {
    const jsonData = JSON.parse(jsonString);
    const faqItems: FaqItem[] = [];
    let currentQuestion: string | null = null;

    jsonData.forEach((item: any) => {
        if (item.type === 'paragraph' && item.content.length > 0) {
            currentQuestion = item.content[0].text;
        } else if (item.type === 'bulletListItem' && currentQuestion) {
            const answer = item.content[0].text;
            faqItems.push({ question: currentQuestion, answer });
            currentQuestion = null;
        }
    });
    return faqItems;
};

export default function FaqDetail({content, title, lang, desc1, desc2} : {content : string, title: string, lang: Locale, desc1: string, desc2 : string}) {
    const [openIndex, setOpenIndex] = useState<number | null>(null);
    const faqData = parseFaqData(content)
    const toggleFaq = (index : number) => {
        if (openIndex === index) {
            setOpenIndex(null);
        } else {
            setOpenIndex(index);
        }
    };
    return (
        <div className="w-full flex flex-col mx-auto my-10">
            <div className="w-full h-[250px] lg:h-[500px] " style={{ ...divStyle}}>
                <div className="w-full flex flex-col">
                    <div className="flex flex-col md:flex-row items-center h-full justify-center">
                        <motion.div initial={{scale : 0}} whileInView={{scale: 1, transition: { duration: 1 }}} className="flex flex-col items-start text-[#154B6F] px-16 pt-2 w-full gap-1">
                            <div className="flex items-center justify-center">
                                <div className="bg-[#40acd1] w-2 h-12 mr-5"></div>
                                <h1 className="text-xl lg:text-5xl font-black" dangerouslySetInnerHTML={{
                                    __html: translateText(title, lang),
                                }}/>
                            </div>
                            {title == "FAQ" ? <h2 className="text-sm lg:text-xl font-semibold mt-4" dangerouslySetInnerHTML={{
                                __html: translateText(desc1, lang),
                            }}/> : <></>}

                            {title == "FAQ" ? <p className="text-xs lg:text-lg mt-20" dangerouslySetInnerHTML={{
                                __html: translateText(desc2, lang),
                            }}/> : <></> }
                        </motion.div>
                        <motion.div whileInView={{scale: 1, transition: { duration: 1 }}} initial={{scale:0}} className="hidden md:flex items-center mt-[-50px] justify-center w-full">

                            <Image sizes="100vw"
                                   width={0}
                                   height={0}
                                   style={{ width: '80%', height: 'auto' }} src="/images/foto.png" alt="logo" />
                            {/*<div className="w-[120px] h-[120px] md:w-[500px] md:h-[500px] relative">*/}
                            {/*    <Image fill src="/images/zero_capex.png" alt="banner animation" />*/}
                            {/*</div>*/}
                        </motion.div>

                    </div>
                </div>
            </div>
            <div className="w-full flex justify-center p-4 z-40 bg-white">
                <div className="w-full max-w-4xl">
                    {faqData.map((faq, index) => (
                        <div key={index} className="border-b border-gray-300">
                            <button
                                onClick={() => toggleFaq(index)}
                                className="flex items-center justify-between w-full py-4 text-left"
                            >
                                <div className="flex items-center">
                                    <div className="w-6 h-6 border-2 border-[#15537a] rounded-full mr-4"></div>
                                    <span className="text-lg font-bold text-[#15537a]">{translateText(faq.question, lang).replace(/^\d+\.\s*/, '')}</span>
                                </div>
                                {openIndex === index ? (
                                    <ChevronDownIcon className="w-6 h-6 text-[#15537a]" />
                                ) : (
                                    <ChevronRightIcon className="w-6 h-6 text-[#15537a]" />
                                )}
                            </button>
                            {openIndex === index && (
                                <div className="p-4 bg-[#15537a] text-white">
                                    {translateText(faq.answer, lang)}
                                </div>
                            )}
                        </div>
                    ))}

                    {title != "FAQ" ? <NewEditor initialContent={content} editable={false} onChange={()=> {}} /> : <></>}
                </div>
            </div>
        </div>
    )
}