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




const properties = {
    prevArrow: <ChevronLeft color="#15537a" className="mx-4"/>,
    nextArrow: <ChevronRight color="#15537a" className="mx-4"/>,
    autoplay: true,
}

export default function WhySolar({whySolar} : {whySolar: WhySolar[]}) {
    const pentagonImages = whySolar.map((solar) => solar.icon);
    const pentagonImages2 = whySolar.map((solar) => solar.icon);

    const handleChange = (ci: number,to:number) => {
        console.log("CI",ci)
        setCurrentIndex(to);
    };

    const pentagonVertices = [
        { x: 0, y: -150 },
        { x: 160, y: -30 },
        { x: 80, y: 120 },
        { x: -80, y: 120 },
        { x: -160, y: -30 },
    ];

    const [currentIndex, setCurrentIndex] = useState(0);

    return (
        <div className="w-full flex flex-col items-center py-10 h-screen justify-center">
            <motion.div initial={{ scale: 0 }} whileInView={{scale: 1}}>
                <h1 className="text-[#15537A] text-3xl font-bold">
                    WHY SOLAR ?
                </h1>
            </motion.div>

            <div className="max-w-2xl w-full mt-12">
                <Slide {...properties} onStartChange={handleChange} transitionDuration={500} duration={3000}>
                    {whySolar.map((slideImage, index) =>
                       <div key={index} className="flex flex-col items-center h-24 justify-center">
                           <p className="text-xl text-[#15537A]">{slideImage.title}</p>
                           <p className="mx-16 text-[#15537A] text-sm text-center">{slideImage.description}</p>
                       </div>
                    )}
                </Slide>
            </div>
            <div className="mt-28">
                <div
                    className="w-1/2 mx-auto"
                    style={{
                        position: 'relative',
                        width: '200px',
                        height: '200px',
                        margin: '0 auto',
                    }}
                >
                    <img
                        src='/images/why-solar-6.png'
                        style={{
                            position: 'absolute',
                            width: '150px',
                            height: '150px',
                            top: '50%',
                            left: '50%',
                            transform: `translate(-50%, -50%) translate(0px, 0px)`, // Conditional scaling for the top image
                            transition: 'transform 0.5s ease', // Smooth animation
                        }}
                    />

                    {pentagonImages.map((image, index) => {
                        const { x, y } = pentagonVertices[(index + currentIndex) % pentagonImages.length];
                        const isTopImage = y === Math.min(...pentagonVertices.map(v => v.y));
                        const scale = isTopImage ? 'scale(1.8)' : 'scale(1)'; // Scale the top image larger
                        const imageFx = isTopImage ? pentagonImages2[index] : pentagonImages[index];
                        return (
                            <img
                                // onClick={() => setCurrentIndex((pr) => index - pr)}
                                className="hover:cursor-pointer"
                                key={index}
                                src={imageFx}
                                alt={`Image ${index + 1}`}
                                style={{
                                    position: 'absolute',
                                    width: '70px',
                                    height: '70px',
                                    top: '50%',
                                    left: '50%',
                                    transform: `translate(-50%, -50%) translate(${x}px, ${y}px) ${scale}`, // Conditional scaling for the top image
                                    transition: 'transform 0.5s ease', // Smooth animation
                                }}
                            />
                        );
                    })}
                </div>
                {/*<button*/}
                {/*    className="block mx-auto mt-4 bg-blue-500 text-white px-4 py-2 rounded"*/}
                {/*    onClick={nextImage}*/}
                {/*>*/}
                {/*    Next*/}
                {/*</button>*/}
            </div>
        </div>
    )
}