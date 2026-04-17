"use client"
import React from "react";
import Image from "next/image";
import {OurExperience} from "@/components/admin/our-business/our-experience/our-experience-table";
import Link from "next/link";
import { motion } from "framer-motion"
import {Locale} from "@/i18n.config";
import {translateText} from "@/lib/utils";

const experiences = [
    {
        icon: '/images/our-experience-1.png',
        title: 'Independent Power Producer (IPP)',
    },
    {
        icon: '/images/our-experience-2.png',
        title: 'Mining',
    },
    {
        icon: '/images/our-experience-3.png',
        title: 'Commercial & Industry',
    }
]

const divStyle = {
    backgroundSize: 'cover',
}

export default function OurExperience({ourExperience, lang, dictionary, activeCategory} : {ourExperience: OurExperience[],lang: Locale, dictionary: any, activeCategory: string | null}) {
    return (
        <div className="w-full flex flex-col bg-[#1A4267] py-20 px-4 md:px-10 lg:px-20 scroll-mt-20" id="experience-grid">
            <div className="flex flex-col items-center mb-12 text-center">
                <h1 className="text-white text-4xl lg:text-5xl font-bold mb-4 uppercase tracking-wider">
                    {dictionary.our_experience}
                </h1>
                <p className="text-white/80 text-lg lg:text-xl font-medium">
                    {lang === 'id' ? 'Pengalaman Terbukti di Berbagai Industri Utama' : 'Proven Experience Across Key Industries'}
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto w-full">
                {[
                    { 
                        title: "Independent Power Producer (IPP)", 
                        tag: "IPP", 
                        image: "/images/ipp_website.webp",
                        description: lang === 'id' ? 'Memberdayakan Bisnis dengan Solusi Tanpa Modal' : 'Powering Businesses with Zero Capex Solutions'
                    },
                    { 
                        title: "Mining", 
                        tag: "Mining", 
                        image: "/images/mining1.webp",
                        description: lang === 'id' ? 'Energi Handal untuk Operasi Pertambangan yang Menuntut' : 'Reliable Energy for Demanding Mining Operations'
                    },
                    { 
                        title: "Commercial & Industry", 
                        tag: "Commercial", 
                        image: "/images/c&i.webp",
                        description: lang === 'id' ? 'Energi Lebih Pintar untuk Pertumbuhan Industri' : 'Smarter Energy for Industrial Growth'
                    }
                ].map((item) => {
                    const isActive = activeCategory?.toLowerCase() === item.tag.toLowerCase();

                    return (
                        <Link key={item.title} href={`/${lang}/our-business?category=${item.tag.toLowerCase()}#filtered-experience-content`} scroll={false}>
                            <motion.div 
                                initial={isActive ? { scale: 1.05 } : { scale: 1 }}
                                animate={isActive ? { scale: 1.05 } : { scale: 1 }}
                                whileHover={{ y: -10, scale: 1.05 }} 
                                className={`flex flex-col h-full bg-white rounded-sm overflow-hidden shadow-xl cursor-pointer group transition-all duration-300 ${
                                    isActive ? 'ring-4 ring-[#FBD00F] z-10' : 'ring-0'
                                }`}
                            >
                                {/* Image Area */}
                                <div className="relative h-[300px] lg:h-[450px] w-full overflow-hidden">
                                    <Image 
                                        src={item.image} 
                                        alt={item.title}
                                        fill
                                        className="object-cover transition-transform duration-500 group-hover:scale-110"
                                    />
                                </div>
                                
                                {/* Content Area */}
                                <div className={`p-6 lg:p-8 flex flex-col justify-start min-h-[140px] transition-colors ${
                                    isActive ? 'bg-slate-50' : 'bg-white'
                                }`}>
                                    <h2 className="text-[#1A4267] text-2xl lg:text-3xl font-bold mb-2 leading-tight">
                                        {item.title}
                                    </h2>
                                    <p className="text-[#4C7391] text-base lg:text-lg font-medium leading-relaxed">
                                        {item.description}
                                    </p>
                                </div>
                            </motion.div>
                        </Link>
                    );
                })}
            </div>
        </div>
    )
}