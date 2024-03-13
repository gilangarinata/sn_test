"use client"

import Image from "next/image";
import {motion, useAnimation, useScroll} from "framer-motion";
import {WhoWeAreBannerContent} from "@/components/admin/who-we-are/banner/who-we-are-banner";
import React, {useEffect, useLayoutEffect, useRef, useState} from "react";
import {Slide} from "react-slideshow-image";
import {ChevronLeftCircle, ChevronRightCircle} from "lucide-react";
import OurBusinessBanner from "@/components/landing/our-business/banner";
import WhoWeAreBanner from "@/components/landing/who-we-are/who-we-are-banner";
import {Locale} from "@/i18n.config";
import {translateText} from "@/lib/utils";

const properties = {
    prevArrow: <ChevronLeftCircle color="white" className="mx-4"/>,
    nextArrow: <ChevronRightCircle color="white" className="mx-4"/>,
    autoplay: false,
}

const slideImages = [
    {
        url: '/',
        description: "A to Z Solutions,<br>End-to-End Service",
        image: "/images/banner_1.jpg",
        logo: "/images/banner-our-business.png"
    }
];

// const banner = {
//     title: "<b class='text-yellow-500'>SESNA Group</b> at A Glance",
//     description: "SESNA Group (PT Sumber Energi Surya Nusantara) is an Indonesian renewable energy company focused on solar power plantdevelopment and Engineering, Procurement & Construction serviceprovider. Established with Independent Power Producer corebusiness, SESNA Group was awarded by the Indonesian Governmentas the first local private company that could build Solar IPP Projectin East Nusa Tenggara for 3 MWp of total capacity.<br>" +
//         "<br/>" +
//         "SESNA Group's commitment is strengthened by more than 10 yearsof expertise that extends the business nationally into the privatesector market, providing the service to Mining & Minerals,Commercial & Industrial, as well as Industrial Estate.\n" +
//         "SESNA Group's commitment is strengthened by more than 10 yearsof expertise that extends the business nationally into the privatesector market, providing the service to Mining & Minerals,Commercial & Industrial, as well as Industrial Estate.<br>"
// }

export function Banner({banner, lang, dictionary} : {banner : WhoWeAreBannerContent, lang: Locale, dictionary: any}) {

    return (
        <div className="flex flex-col">
            <WhoWeAreBanner banner={banner} lang={lang} dictionary={dictionary} />
            <section className="w-full bg-[#15537A] py-10 lg:pt-8 lg:h-screen">
                <div className="w-full lg:max-w-7xl flex mx-auto flex-col px-6 md:px-20 h-full">
                    <div className="w-full flex h-full">
                        <div className="flex w-full flex-col gap-6 justify-center">
                            <motion.div
                                initial={{ scale: 0 }}
                                whileInView={{scale: 1, transition: { duration: 1 }}}
                                className="text-4xl font-bold">
                                    <h1 className="text-white text-2xl font-semibold" dangerouslySetInnerHTML={{__html : translateText(banner?.headingTitle ?? "",lang)}}/>
                            </motion.div>
                            <motion.p initial={{ opacity: 0, scale: 0.5 }}
                                      whileInView={{scale: 1,opacity: 1, transition: { duration: 1 }}}
                                      transition={{ duration: 1 }} className="text-white md:pr-32" dangerouslySetInnerHTML={{__html : translateText(banner?.description ?? "", lang)}} />
                        </div>
                        <div className="hidden w-0 md:w-80 md:block "></div>
                    </div>
                </div>
            </section>
        </div>


    )
}