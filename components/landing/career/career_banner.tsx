"use client";
import { motion } from "framer-motion"
import { ChevronLeftCircle, ChevronRightCircle } from "lucide-react";
import 'react-slideshow-image/dist/styles.css'
import { Slide } from 'react-slideshow-image';
import {Button} from "@/components/ui/button";
import Image from "next/image";
import {updateBanner} from "@/lib/actions/admin/banner.action";
import React, {useEffect} from "react";
import Link from "next/link";
import {Banner} from "@/components/admin/home/banners/edit-banner";
import {OurBusinessBanner} from "@/components/admin/our-business/banners/banners-table";
import {Locale} from "@/i18n.config";
import {CareerBanner} from "@/components/admin/career/career_banner/career-banner-table";
import {translateText} from "@/lib/utils";


const divStyle = {
    backgroundSize: 'cover',
}
const slideImages = [
    {
        url: '/',
        description: "A to Z Solutions,<br>End-to-End Service",
        image: "/images/banner_1.jpg",
        logo: "/images/banner-our-business.png"
    }
];

const buttonStyle = {
    width: "30px",
    background: 'none',
    border: '0px'
};

const properties = {
    prevArrow: <ChevronLeftCircle color="white" className="mx-4"/>,
    nextArrow: <ChevronRightCircle color="white" className="mx-4"/>,
    autoplay: false,
}
export default function CareerBanner({lang, dictionary, banners} : {lang: Locale, dictionary: any, banners : CareerBanner[]}) {
    return (
        <div className="">
            <Slide {...properties}>
                {banners.map((slideImage, index) =>
                    <a key={index} href={slideImage.image} target="_blank">
                        <div>
                            <div className="flex items-center justify-center h-[200px] lg:h-[250px]" style={{ ...divStyle, 'backgroundImage': `url(${slideImage.image})`}}>
                                <div className="w-full h-full px-20 pt-10 bg-gradient-to-b from-white to-transparent">
                                    <div className="flex text-[#154B6F] font-bold text-shadow-lg gap-2 items-center divide-x-8 divide-[#154B6F]">
                                        {/*<Image width={100} height={100} src={slideImage.logo} alt=""/>*/}
                                        <div></div>
                                        <h2 className="px-4 text-2xl" >{translateText(slideImage.description, lang)}</h2>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </a>
                )}
            </Slide>
        </div>
    )
}