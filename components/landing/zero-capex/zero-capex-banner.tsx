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


const divStyle = {
    backgroundSize: 'cover',
}
const slideImages = [
    {
        url: 'main-banner',
        title: "<b class='text-white'>ZERO</b> CAPEX",
        description: 'We specially provide you a design with <b>no Investment fee required or Zero Capex</b> (Capital Expenditure) <br/> It allows you to allocate costs over the duration of the solar energy project contract-term, providing mode flexibility in budgeting and cash flow management',
        isCustomBanner: true,
        image: "",
        logo: ""
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
    autoplay: true,
}
export default function ZeroCapexBanner() {
    return (
        <div className="">
            <Slide {...properties}>
                {slideImages.map((slideImage, index) =>
                    slideImage.url === "main-banner" ?
                    (
                        <div key={slideImage.url} className="w-full bg-gradient-to-b from-white to-[#FAC225]">
                            <div className="w-full h-[500px] lg:lg:h-[calc(100vh-60px)] flex flex-col">
                                <div className="flex flex-col md:flex-row items-center h-full justify-center">
                                    <motion.div initial={{scale : 0}} whileInView={{scale: 1}} className="flex flex-col items-start text-[#154B6F] px-16 pt-2 w-full gap-1">
                                        <h1 className="text-4xl font-bold" dangerouslySetInnerHTML={{
                                            __html: slideImage.title,
                                        }}/>
                                        <p dangerouslySetInnerHTML={{
                                            __html: slideImage.description,
                                        }}/>
                                    </motion.div>
                                    <motion.div whileInView={{scale : 1}} initial={{scale:0}} className="hidden md:flex items-center justify-center w-full">

                                        <Image sizes="100vw"
                                               width={0}
                                               height={0}
                                               style={{ width: '90%', height: 'auto' }} src="/images/zero_capex.png" alt="logo" />
                                        {/*<div className="w-[120px] h-[120px] md:w-[500px] md:h-[500px] relative">*/}
                                        {/*    <Image fill src="/images/zero_capex.png" alt="banner animation" />*/}
                                        {/*</div>*/}
                                    </motion.div>

                                </div>
                            </div>
                        </div>
                    ) :
                    (
                        <a key={index} href={slideImage.url} target="_blank">
                            <div>
                                <div className="flex items-center justify-center h-[500px] lg:h-[calc(100vh-60px)]" style={{ ...divStyle, 'backgroundImage': `url(${slideImage.image})`}}>
                                    <div className="w-full h-full px-20 pt-10 bg-gradient-to-b from-white to-transparent">
                                        <div className="flex text-[#154B6F] font-bold text-shadow-lg gap-2 items-center divide-x divide-[#154B6F]">
                                            <Image width={100} height={100} src={slideImage.logo} alt=""/>
                                            <h2 className="px-4 text-2xl" dangerouslySetInnerHTML={{__html : slideImage.description}}/>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </a>
                    )
                )}
            </Slide>
        </div>
    )
}