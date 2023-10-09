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
import {WhoWeAreBannerContent} from "@/components/admin/who-we-are/banner/who-we-are-banner";


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
export default function WhoWeAreBanner({banner} : {banner : WhoWeAreBannerContent}) {
    return (
        <div className="">
            <Slide {...properties}>
                {slideImages.map((slideImage, index) =>
                    <a key={index} href={slideImage.url} target="_blank">
                        <div>
                            <div className="flex items-center justify-center h-[500px] lg:h-[calc(100vh-60px)]" style={{ ...divStyle, 'backgroundImage': `url(${banner.image})`}}>
                                <div className="w-full h-full px-20 pt-10 bg-gradient-to-b from-transparent to-transparent">
                                    <div className="flex text-[#154B6F] font-bold gap-2 items-center divide-x-8 divide-white">
                                        {/*<Image width={100} height={100} src={slideImage.logo} alt=""/>*/}
                                        <div></div>
                                        <h2 className="px-4 text-4xl font-bold mt-12" dangerouslySetInnerHTML={{__html : banner.bannerHeadingTitle}}/>
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