"use client";
import { motion } from "framer-motion"
import { ChevronLeftCircle, ChevronRightCircle } from "lucide-react";
import 'react-slideshow-image/dist/styles.css'
import { Slide } from 'react-slideshow-image';
import {Button} from "@/components/ui/button";
import Image from "next/image";


const divStyle = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundSize: 'cover',
    height: '500px'
}
const slideImages = [
    {
        url: '/',
        caption: '-',
        isCustomBanner: true
    },
    {
        url: 'https://images.unsplash.com/photo-1509721434272-b79147e0e708?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1500&q=80',
        caption: 'Slide 1'
    },
    {
        url: 'https://images.unsplash.com/photo-1506710507565-203b9f24669b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1536&q=80',
        caption: 'Slide 2'
    },
    {
        url: 'https://images.unsplash.com/photo-1536987333706-fc9adfb10d91?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1500&q=80',
        caption: 'Slide 3'
    },
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
export default function HomeBanner() {
    return (
        <div className="">
            <Slide {...properties}>
                {slideImages.map((slideImage, index) =>
                    slideImage.isCustomBanner === true ?
                    (
                        <div key={slideImage.url} className="w-full bg-gradient-to-b from-white to-[#FAC225]">
                            <div className="w-full h-[500px] flex flex-col">
                                <div className="flex flex-col md:flex-row items-center h-full justify-center">
                                    <motion.div whileInView={{scale : 1}} initial={{scale:0}} className="w-[300px] h-[200px] md:h-[300px] md:w-[450px] mt-[-40px] relative duration-500 ease-in transition-all">
                                        <Image fill src="/images/banner_anim_2.webp" alt="banner animation" />
                                    </motion.div>
                                    <motion.div initial={{scale : 0}} whileInView={{scale: 1}} className="flex flex-col items-start text-[#154B6F] mx-16 pt-2">
                                        <h1 className="text-4xl font-bold">BE A <span className="text-[#199FD6]">HERO</span></h1>
                                        <h2 className="text-xl font-semibold">BY SPENDING <span className="text-[#199FD6]">ZERO</span></h2>
                                        <p>We Specially provide a design with no investment (capital expenditure)</p>
                                        <Button className="mt-4">Discover More</Button>
                                    </motion.div>
                                </div>
                            </div>
                        </div>
                    ) :
                    (
                    <div key={index}>
                        <div style={{ ...divStyle, 'backgroundImage': `url(${slideImage.url})` }}>
                            {/*<span style={spanStyle}>{slideImage.caption}</span>*/}
                        </div>
                    </div>
                    )
                )}
            </Slide>
        </div>
    )
}