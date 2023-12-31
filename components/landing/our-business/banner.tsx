"use client";
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
import { motion } from "framer-motion"


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
export default function OurBusinessBanner({banner} : {banner: OurBusinessBanner[]}) {
    return (
        <div className="">
            <Slide {...properties}>
                {banner.map((slideImage, index) =>
                    <a key={index} href={slideImage.url} target="_blank">
                        <div>
                            <div className="flex items-center justify-center h-[230px] lg:h-[calc(100vh-60px)]" style={{ ...divStyle, 'backgroundImage': `url(${slideImage.image})`}}>
                                <div className="w-full h-full px-20 pt-10 bg-gradient-to-b from-white to-transparent">
                                    <div className="flex text-[#154B6F] font-bold text-shadow-lg gap-2 items-center divide-x-8 divide-[#154B6F]">
                                        {/*<Image width={100} height={100} src={slideImage.logo} alt=""/>*/}
                                        <div></div>
                                        <motion.div initial={{ scale: 0 }} whileInView={{scale: 1, transition: { duration: 1 }}}>
                                            <h2 className="px-4 text-2xl" dangerouslySetInnerHTML={{__html : slideImage.description}}/>
                                        </motion.div>
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