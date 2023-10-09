"use client"

import Image from "next/image";
import {motion, useAnimation, useScroll} from "framer-motion";
import {WhoWeAreBannerContent} from "@/components/admin/who-we-are/banner/who-we-are-banner";
import {useEffect, useLayoutEffect, useRef, useState} from "react";

// const banner = {
//     title: "<b class='text-yellow-500'>SESNA Group</b> at A Glance",
//     description: "SESNA Group (PT Sumber Energi Surya Nusantara) is an Indonesian renewable energy company focused on solar power plantdevelopment and Engineering, Procurement & Construction serviceprovider. Established with Independent Power Producer corebusiness, SESNA Group was awarded by the Indonesian Governmentas the first local private company that could build Solar IPP Projectin East Nusa Tenggara for 3 MWp of total capacity.<br>" +
//         "<br/>" +
//         "SESNA Group's commitment is strengthened by more than 10 yearsof expertise that extends the business nationally into the privatesector market, providing the service to Mining & Minerals,Commercial & Industrial, as well as Industrial Estate.\n" +
//         "SESNA Group's commitment is strengthened by more than 10 yearsof expertise that extends the business nationally into the privatesector market, providing the service to Mining & Minerals,Commercial & Industrial, as well as Industrial Estate.<br>"
// }

export function Banner({banner} : {banner : WhoWeAreBannerContent}) {
    const controls = useAnimation();
    const [scrollY, setScrollY] = useState(0);

    const [finalValue, setFinal] = useState(0);
    const [finalValue2, setFinal2] = useState(0);
    const [finalValue3, setFinal3] = useState(0);


    const minValue = 500;
    const maxValue = 800;
    const minMappedValue = -90;
    const maxMappedValue = 0;

    const minMappedValue2 = -50;
    const maxMappedValue2 = 0;

    const minMappedValue3 = 50;
    const maxMappedValue3 = 0;

    useEffect(() => {
        const scrollListener = () => {
            setScrollY(window.scrollY);

            console.log(window.scrollY)
        };

        window.addEventListener('scroll', scrollListener);

        return () => {
            window.removeEventListener('scroll', scrollListener);
        };
    }, []);

    useEffect(() => {
        // Define the animation properties here
        const maxRotation = 360; // Maximum rotation angle in degrees
        const scrollThreshold = 6000; // Adjust the threshold where the animation starts

        // Calculate the normalized scroll progress between 0 and 1
        const normalizedScroll = Math.min(scrollY / scrollThreshold, 1);

        // Map the inputValue to the desired range
        const mappedValue = ((scrollY - minValue) / (maxValue - minValue)) * (maxMappedValue - minMappedValue) + minMappedValue;
        let final = mappedValue;
        if(mappedValue < minMappedValue) {
            final = minMappedValue;
        }
        if(mappedValue >= maxMappedValue) {
            final = maxMappedValue;
        }
        setFinal(final);

        // Map the inputValue to the desired range
        const mappedValue2 = ((scrollY - minValue) / (maxValue - minValue)) * (maxMappedValue2 - minMappedValue2) + minMappedValue2;
        let final2 = mappedValue2;
        if(mappedValue2 < minMappedValue2) {
            final2 = minMappedValue2;
        }
        if(mappedValue2 >= maxMappedValue2) {
            final2 = maxMappedValue2;
        }
        setFinal2(final2);

        // Map the inputValue to the desired range
        const mappedValue3 = ((scrollY - minValue) / (maxValue - minValue)) * (maxMappedValue3 - minMappedValue3) + minMappedValue3;

        let final3 = mappedValue3;
        if(mappedValue3 > minMappedValue3) {
            final3 = minMappedValue3;
        }
        if(mappedValue3 <= maxMappedValue3) {
            final3 = maxMappedValue3;
        }
        setFinal3(final3);

        console.log("mappedFinal",final)
        console.log("mappedFinal2",final2)
        console.log("mappedFinal3",final3)
        // Apply the rotation animation based on scroll position
        controls.start({
            rotate: normalizedScroll * maxRotation,
        });
    }, [scrollY, controls]);


    return (
        <div className="flex flex-col">
            <div className="w-full h-screen relative z-20">
                <Image style={{objectFit:'cover'}} fill src={banner?.image} alt="" />
                <div className="absolute">
                    <div className="flex p-12 gap-4">
                        <div className="bg-white w-[10px]"></div>
                        <p className="text-4xl text-white font-bold" dangerouslySetInnerHTML={{__html:banner?.bannerHeadingTitle}}></p>
                    </div>
                </div>
            </div>
            <section className="w-full bg-[#15537A] pt-8 lg:h-screen">
                <div className="w-full lg:max-w-7xl flex mx-auto flex-col px-6 md:px-20 h-full">
                    <div className="w-full flex h-full">
                        <div className="flex w-full flex-col gap-6 justify-center">
                            <motion.div
                                initial={{ opacity: 0.8, y: '-50%', x:'54%', rotate: -90 }}
                                style={{ rotate: finalValue, y: `${finalValue2}%`, x: `${finalValue3}%` }}
                                // whileInView={{ opacity: 1, y: 0, x: 0, rotate: scrollYProgress.get() }}
                                // animate={{ opacity: 1, y: 0, rotate: 0 }}
                                // exit={{ opacity: 0, y: '-50%', rotate: -180 }}
                                // transition={{ duration: 3 }}
                                className="text-4xl font-bold"
                            >
                                <h1 className="text-white text-2xl font-semibold" dangerouslySetInnerHTML={{__html : banner?.headingTitle ?? ""}}/>
                            </motion.div>
                            <motion.p initial={{ opacity: 0, scale: 0.5 }}
                                      whileInView={{ opacity: 1, scale: 1 }}
                                      transition={{ duration: 1 }} className="text-white" dangerouslySetInnerHTML={{__html : banner?.description ?? ""}} />
                        </div>
                        <div className="hidden w-0 md:w-80 md:block "></div>
                    </div>
                </div>
            </section>
        </div>


    )
}