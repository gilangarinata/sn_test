"use client";
import { motion } from "framer-motion"
import Image from "next/image";
import React, {useEffect, useState} from "react";
import {
    StackedCarousel,
    ResponsiveContainer,
} from "react-stacked-center-carousel";
import {cn} from "@/lib/utils";

const achievements = [
    {
        icon : '/images/icon_experience_1.webp',
        label: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    },
    {
        icon : '/images/icon_experience_1.webp',
        label: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    },
    {
        icon : '/images/icon_experience_1.webp',
        label: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    },
];

const achievementAnimation = [
    {
        icon: '/images/bulet.png'
    },
    {
        icon: '/images/grafik1.png'
    },
    {
        icon: '/images/grafik2.png'
    },
    {
        icon: '/images/grafik3.png'
    },
    {
        icon: '/images/piala.png'
    },
    {
        icon: '/images/meriah.png'
    }
]



export default function OurAchievement() {
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        setTimeout(()=>{
            if(currentIndex < achievementAnimation.length - 1) {
                setCurrentIndex(currentIndex + 1)
            }
        }, 400)
    }, [currentIndex]);

    const ref = React.useRef();

    function onViewPortEnter() {
        setCurrentIndex(0);
    }


    return (
        <section>
            <div className="w-full flex flex-col px-6 md:px-20 my-10">
                <h1 className="w-full text-[#15537A] text-center text-2xl font-bold mb-8">OUR ACHIEVEMENT</h1>
                <div className="w-full flex flex-col items-center justify-center">
                    <motion.div onViewportEnter={onViewPortEnter} initial={{ scale: 0 }} whileInView={{ scale: 1 }} className="w-full">
                        <Image className="fade-in duration-200 transition-all mx-auto" width={300} height={300} src={achievementAnimation[currentIndex].icon} alt=""/>
                    </motion.div>
                    <div className="w-full">
                        <ResponsiveContainer
                            carouselRef={ref}
                            render={(parentWidth, carouselRef) => {
                                let currentVisibleSlide = 3;
                                console.log(parentWidth);
                                return (
                                    <StackedCarousel
                                        ref={carouselRef}
                                        slideComponent={AchievementCard}
                                        height={250}
                                        slideWidth={300}  //{parentWidth < 800 ? parentWidth - 40 : 750}
                                        carouselWidth={parentWidth}
                                        data={achievements}
                                        currentVisibleSlide={currentVisibleSlide}
                                        maxVisibleSlide={3}
                                        useGrabCursor
                                    />
                                );
                            }}
                        />
                    </div>
                </div>

            </div>
        </section>
    )
}

// eslint-disable-next-line react/display-name
export const AchievementCard = React.memo(function (props) {
    // @ts-ignore
    const { data, dataIndex, isCenterSlide } = props;
    const { icon } = data[dataIndex];
    const { label } = data[dataIndex];
    return (
        <motion.div initial={{ scale: 0 }} whileInView={{ scale: 1 }} whileHover={{scale : 1.02}} className={cn("rounded-3xl p-8 flex flex-col items-center justify-center w-full", isCenterSlide == false ? "bg-[#15537A]/80" : "bg-[#15537A]")}>
            <Image width={100} height={100} src={icon} alt={label} draggable={false}/>
            <p className={cn(" text-center pt-8", isCenterSlide ? "text-white" : "text-white/80")}>{label}</p>
        </motion.div>
    );
});