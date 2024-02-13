"use client"

import Image from "next/image";
import React, {RefObject, useRef} from "react";
import {motion} from "framer-motion";
import Link from "next/link";
import {Button} from "@/components/ui/button";
import {SolarPowerWorks} from "@/components/admin/our-business/solar-power-works/solar-power-works-table";
import {Slide, SlideshowRef} from "react-slideshow-image";
import {ChevronLeftCircle, ChevronRightCircle} from "lucide-react";
import {StackedCarousel} from "react-stacked-center-carousel";
import {cn, translateText} from "@/lib/utils";
import {Locale} from "@/i18n.config";

const properties = {
    prevArrow: <div></div>,
    nextArrow: <div></div>,
    autoplay: false,
    transitionDuration: 10,
}

const solarWorks = [
    {
        title: "SOLAR POWER WORKS",
        description: "On Grid Solar Panel System",
        image: "/images/solar-works-1.png",
        points: "<li>Must integrated to PLN grid</li>\n" +
            "                                    <li>The energy generated from the solar<br/>\n" +
            "                                        module is directly streamed to an<br/>\n" +
            "                                        existing electrical grid.</li>\n" +
            "                                    <li>Does not require a battery as energy<br/>\n" +
            "                                        storage.</li>"
    }
]

export default function SolarPowerWorks({solarPowerWorks, lang, dictionary} : {solarPowerWorks: SolarPowerWorks[],lang: Locale, dictionary: any}) {
    const slideshowRef: RefObject<SlideshowRef> | null = useRef<SlideshowRef | null>(null);
    const [currentSlide, setCurrentSlide] = React.useState(0);
    return (
        <Slide ref={slideshowRef} onChange={(fr,to) => {
            setCurrentSlide(to)
        }} {...properties}>
            {solarPowerWorks.map((slideImage, index) => (
                <div key={slideImage.id} className="w-full bg-[#FABD24] pt-8 h-screen px-6">
                    <div className="w-full max-w-5xl mx-auto">
                        <div className="w-full h-[500px] lg:lg:h-[calc(100vh-60px)] flex flex-col">
                            <div className="flex flex-col md:flex-row items-center h-full justify-center">

                                <motion.div whileInView={{scale : 1}} initial={{scale:0}} className="flex w-full flex-col gap-6 text-[#15537A]">
                                    <h1 className="text-3xl font-bold">{translateText(slideImage.title, lang)}</h1>
                                    <p className="text-xl mt-6">{translateText(slideImage.subtitle, lang)}</p>
                                    <div className="container mx-auto p-4">
                                        <div dangerouslySetInnerHTML={{__html: translateText(slideImage.description.replaceAll("<ul>", "<ul class=\"list-disc\">"), lang)}}>

                                        </div>
                                    </div>
                                    <div className="flex space-x-6 mt-12">
                                        {solarPowerWorks.map((slideImage, index) => (
                                            <div key={slideImage.id} onClick={() => {
                                                setCurrentSlide(index);
                                                slideshowRef?.current?.goTo(index);
                                            } } className={cn("w-3 h-3 rounded-full hover:cursor-pointer", currentSlide === index ? "bg-[#15537A]" : "border border-[#15537A]")}></div>
                                        ))}
                                        {/*<div className="w-3 h-3 bg-[#15537A] rounded-full"></div> /!* Active dot *!/*/}
                                        {/*<div className="w-3 h-3 border border-[#15537A] rounded-full"></div> /!* Inactive dot *!/*/}
                                        {/*<div className="w-3 h-3 border border-[#15537A] rounded-full"></div> /!* Inactive dot *!/*/}
                                    </div>
                                </motion.div>

                                <motion.div whileInView={{scale : 1}} initial={{scale:0}} className="hidden md:flex items-center justify-center w-full">
                                    {slideImage.image.includes("mp4") ? (
                                        <video autoPlay loop style={{ width: '500px', height: '500px' }}>
                                            <source src={slideImage.image} />
                                        </video>
                                    ) : (
                                        <img sizes="100vw"
                                               width={0}
                                               height={0}
                                               style={{ width: '100%', height: 'auto' }} src={slideImage.image} alt="logo" />
                                    )}

                                    {/*<div className="w-[120px] h-[120px] md:w-[500px] md:h-[500px] relative">*/}
                                    {/*    <Image fill src="/images/zero_capex.png" alt="banner animation" />*/}
                                    {/*</div>*/}
                                </motion.div>
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </Slide>

    )
}