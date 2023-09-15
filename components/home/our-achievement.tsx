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
        icon : '/images/logo_world_economic.png',
        label: 'Contributor of Policy Paper "Policy Opportunities to Advance Clean Energy Investment in Indonesia" in collaboration with RE100 Climate Group & World Economic Forum',
    },
    {
        icon : '/images/logo_solar_summit.png',
        label: 'Signed the Declaration Towards Bringing Gigawatt Order of Solar Energy in Indonesia in Indonesia Solar Summit 2022',
    },
    {
        icon : '/images/logo_mordor.png',
        label: 'Indonesia Solar Energy Market Top Players<br/>version of Mordor Intelligence, 2022',
    },
    {
        icon : '/images/logo_solar_ai.png',
        label: 'Top 10 Solar Energy Companies in Indonesia<br/>version of Solar AI Technologies,2022',
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
                                        height={400}
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
        <motion.div initial={{ scale: 0 }} whileInView={{ scale: 1 }} whileHover={{scale : 1.01}} className={cn("rounded-3xl p-6 flex flex-col items-center justify-center w-full", isCenterSlide == false ? "bg-[#15537A]/80" : "bg-[#15537A]")}>
            <div className="rounded-full bg-white w-[100px] h-[100px] relative">
                <Image className="rounded-full" fill src={icon} alt={label} draggable={false}/>
            </div>
            <p className={cn("text-center text-sm mt-4", isCenterSlide ? "text-white" : "text-white/80")} dangerouslySetInnerHTML={{__html : label}} />
        </motion.div>
    );
});