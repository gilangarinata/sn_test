"use client";
import {
    ArrowLeft,
    ArrowRight,
    ArrowRightIcon,
    ChevronLast, ChevronLeft,
    ChevronLeftCircle,
    ChevronRight,
    ChevronRightCircle
} from "lucide-react";
import 'react-slideshow-image/dist/styles.css'
import { Slide } from 'react-slideshow-image';
import { motion } from "framer-motion"
import {Button} from "@/components/ui/button";
import Image from "next/image";
import {updateBanner} from "@/lib/actions/admin/banner.action";
import React, {useEffect, useState} from "react";
import Link from "next/link";
import {Banner} from "@/components/admin/home/banners/edit-banner";
import {WhySolar} from "@/components/admin/our-business/why-solar/why-solar-table";
import {FancyCarousel} from "@/components/landing/our-business/fancy-carousel";
import {cn, translateText} from "@/lib/utils";
import {Locale} from "@/i18n.config";





export default function WhySolar({whySolar, lang, dictionary} : {whySolar: WhySolar[],lang: Locale, dictionary: any}) {
    const pentagonImages = whySolar.map((solar) => solar.icon);
    const pentagonImages2 = whySolar.map((solar) => solar.icon);

    const handleChange = (ci: number,to:number) => {
        console.log("CI",to)
        setCurrentIndex(to);
    };

    const pentagonVertices = [
        { x: 0, y: -150 },
        { x: 160, y: -30 },
        { x: 80, y: 120 },
        { x: -80, y: 120 },
        { x: -160, y: -30 },
    ];

    const [nextState, setNextState] = useState(0);
    const [prevState, setPrevState] = useState(0);
    const [currentIndex, setCurrentIndex] = useState(0);

    return (
        <div className="w-full flex flex-col items-center py-10 h-screen justify-center">
            <motion.div initial={{ scale: 0 }} whileInView={{scale: 1}}>
                <h1 className="text-[#15537A] text-3xl font-bold">
                    {dictionary.why_solar}
                </h1>
            </motion.div>

            <div className="max-w-2xl w-full mt-12 mb-10">
                <div className="flex items-center">
                    <ChevronLeft size={40} onClick={(bt) => {
                        setPrevState((pv) => pv+1);
                        setCurrentIndex((pv) => {
                            if(pv <= 0) {
                                return whySolar.length - 1;
                            }else {
                                return pv-=1
                            }
                        })
                    }} color="#15537a" className="mx-4 hover:cursor-pointer"/>
                    {whySolar.map((slideImage, index) =>
                        <div key={index} className={cn("flex flex-col items-center h-24 justify-center", index === currentIndex ? "block" : "hidden")}>
                            <p className="text-xl text-[#15537A] w-full text-center mb-4">{translateText(slideImage.title, lang)}</p>
                            <p className="mx-16 text-[#15537A] text-sm text-center">{translateText(slideImage.description, lang)}</p>
                        </div>
                    )}
                    <ChevronRight size={40} onClick={() => {
                        setNextState((pv) => pv+1);
                        setCurrentIndex((pv) => {
                            if(pv >= whySolar.length - 1) {
                                return 0;
                            }else {
                                return pv+=1
                            }
                        })
                    }} color="#15537a" className="mx-4 hover:cursor-pointer"/>
                </div>

            </div>
            <div className="carousel mt-20">
                <FancyCarousel
                    currentIndex={currentIndex}
                    nextState={nextState}
                    prevState={prevState}
                    images={pentagonImages}
                    images2={pentagonImages2}
                    carouselRadius={120}
                    peripheralImageRadius={40}
                    centralImageRadius={60}
                    autoRotateTime={0}
                    borderWidth={4}
                    borderHexColor={'1c364f'}
                    centralImage="/images/why-solar-6.png"
                    setFocusElement={() => {

                    }}
                />
            </div>
        </div>
    )
}