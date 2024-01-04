"use client";
import { motion } from "framer-motion"
import Image from "next/image";
import React, {useEffect, useState} from "react";
import {
    StackedCarousel,
    ResponsiveContainer,
} from "react-stacked-center-carousel";
import {cn, translateText} from "@/lib/utils";
import {Achievement} from "@/components/admin/home/achievement/edit-achievement";
import {Locale} from "@/i18n.config";

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



export default function OurAchievement({achievements, lang, dictionary} : {achievements: Achievement[], lang: Locale, dictionary: any}) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const ref = React.useRef<StackedCarousel>();
    useEffect(() => {
        setTimeout(()=>{
            if(currentIndex < achievementAnimation.length - 1) {
                setCurrentIndex(currentIndex + 1)
            }
        }, 400)

        const interval = setInterval(() => {
            if (ref.current) {
                // Trigger the next slide action here
                ref.current?.goNext();
            }
        }, 3000); // Auto-slide every 3 seconds

        return () => {
            clearInterval(interval); // Clear the interval when the component unmounts
        };
    }, [currentIndex]);



    function onViewPortEnter() {
        setCurrentIndex(0);
    }


    return (
        <section className="lg:max-w-5xl mx-auto">
            <div className="w-full flex flex-col px-6 md:px-20 my-10">
                <h1 className="w-full text-[#15537A] text-center text-2xl font-bold mb-8">{dictionary.our_achievement}</h1>
                <div className="w-full flex flex-col md:flex-row items-center justify-center">
                    <motion.div onViewportEnter={onViewPortEnter} initial={{ scale: 0 }} whileInView={{scale: 1, transition: { duration: 1 }}} className="w-full flex flex-col justify-center items-center mt">
                        <Image className="fade-in duration-200 transition-all" width={300} height={300} src={achievementAnimation[currentIndex].icon} alt=""/>
                    </motion.div>
                    <div className="w-full">
                        <ResponsiveContainer
                            carouselRef={ref}
                            render={(parentWidth, carouselRef) => {
                                let currentVisibleSlide = 3;
                                return (
                                    <StackedCarousel
                                        ref={carouselRef}
                                        slideComponent={AchievementCard}
                                        height={340}
                                        slideWidth={220}  //{parentWidth < 800 ? parentWidth - 40 : 750}
                                        carouselWidth={parentWidth}
                                        data={[achievements, lang]}
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
    const { icon } = data[0][dataIndex];
    const { description } = data[0][dataIndex];
    const lang = data[1] as Locale;
    return (
        <motion.div initial={{ scale: 0 }} whileInView={{scale: 1, transition: { duration: 1 }}} whileHover={{scale : 1.001}} className={cn("rounded-3xl p-4 flex flex-col items-center justify-center w-full", isCenterSlide == false ? "bg-[#15537A]/80" : "bg-[#15537A]")}>
            <div className="rounded-full bg-white w-[150px] h-[150px] relative">
                <Image className="rounded-full" fill src={icon} alt={description} draggable={false}/>
            </div>
            <p className={cn("text-center text-sm mt-4 max-w-[220px] min-h-[140px]", isCenterSlide ? "text-white" : "text-white/80")} dangerouslySetInnerHTML={{__html : translateText(description,lang)}} />
        </motion.div>
    );
});