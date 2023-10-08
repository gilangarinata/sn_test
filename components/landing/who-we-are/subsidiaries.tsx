"use client"

import Image from "next/image";
import {motion, useAnimation} from "framer-motion";
import React, {useEffect, useState} from "react";
import {Subsidiaries} from "@/components/admin/who-we-are/subsidiaries/subsidiaries-table";

// const subsidiaries = {
//     title: "SUBSIDIARIES",
//     contents: [
//         {
//             image: "/images/subsidiaries_1.png",
//             description: "SESNA Group (PT Sumber Energi Surya Nusantara) is an Indonesian renewable energy company focused on solar power plantdevelopment and Engineering, Procurement & Construction serviceprovider. Established with Independent Power Producer corebusiness, SESNA Group was awarded by the Indonesian Governmentas the first local private company that could build Solar IPP Projectin East Nusa Tenggara for 3 MWp of total capacity."
//         },
//         {
//             image: "/images/subsidiaries_2.png",
//             description: "SESNA Group (PT Sumber Energi Surya Nusantara) is an Indonesian renewable energy company focused on solar power plantdevelopment and Engineering, Procurement & Construction serviceprovider. Established with Independent Power Producer corebusiness, SESNA Group was awarded by the Indonesian Governmentas the first local private company that could build Solar IPP Projectin East Nusa Tenggara for 3 MWp of total capacity."
//         },
//         {
//             image: "/images/subsidiaries_3.png",
//             description: "SESNA Group (PT Sumber Energi Surya Nusantara) is an Indonesian renewable energy company focused on solar power plantdevelopment and Engineering, Procurement & Construction serviceprovider. Established with Independent Power Producer corebusiness, SESNA Group was awarded by the Indonesian Governmentas the first local private company that could build Solar IPP Projectin East Nusa Tenggara for 3 MWp of total capacity."
//         },
//         {
//             image: "/images/subsidiaries_4.png",
//             description: "SESNA Group (PT Sumber Energi Surya Nusantara) is an Indonesian renewable energy company focused on solar power plantdevelopment and Engineering, Procurement & Construction serviceprovider. Established with Independent Power Producer corebusiness, SESNA Group was awarded by the Indonesian Governmentas the first local private company that could build Solar IPP Projectin East Nusa Tenggara for 3 MWp of total capacity."
//         },
//         {
//             image: "/images/subsidiaries_5.png",
//             description: "SESNA Group (PT Sumber Energi Surya Nusantara) is an Indonesian renewable energy company focused on solar power plantdevelopment and Engineering, Procurement & Construction serviceprovider. Established with Independent Power Producer corebusiness, SESNA Group was awarded by the Indonesian Governmentas the first local private company that could build Solar IPP Projectin East Nusa Tenggara for 3 MWp of total capacity."
//         },
//         {
//             image: "/images/subsidiaries_6.png",
//             description: "SESNA Group (PT Sumber Energi Surya Nusantara) is an Indonesian renewable energy company focused on solar power plantdevelopment and Engineering, Procurement & Construction serviceprovider. Established with Independent Power Producer corebusiness, SESNA Group was awarded by the Indonesian Governmentas the first local private company that could build Solar IPP Projectin East Nusa Tenggara for 3 MWp of total capacity."
//         },
//         {
//             image: "/images/subsidiaries_7.png",
//             description: "SESNA Group (PT Sumber Energi Surya Nusantara) is an Indonesian renewable energy company focused on solar power plantdevelopment and Engineering, Procurement & Construction serviceprovider. Established with Independent Power Producer corebusiness, SESNA Group was awarded by the Indonesian Governmentas the first local private company that could build Solar IPP Projectin East Nusa Tenggara for 3 MWp of total capacity."
//         },
//     ]
// }

export function Subsidiaries({subsidiaries} : {subsidiaries : Subsidiaries[]}) {
    const controls = useAnimation();
    const [scrollY, setScrollY] = useState(0);

    const [finalValue, setFinal] = useState(0);
    const [finalValue2, setFinal2] = useState(0);
    const [finalValue3, setFinal3] = useState(0);


    const minValue = 1200;
    const maxValue = 1500;
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
        // if(mappedValue3 > minMappedValue3) {
        //     final3 = minMappedValue3;
        // }
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
            <section className="w-full pt-8">
                <div className="w-full lg:max-w-7xl flex mx-auto flex-col px-6 md:px-20 my-10">
                    <div className="w-full flex">
                        <div className="flex w-full flex-col gap-6">
                            <motion.div
                                initial={{ opacity: 0.8, y: '-50%', x:'54%', rotate: -90 }}
                                style={{ rotate: finalValue, y: `${finalValue2}%`, x: `${finalValue3}%` }}
                                // animate={{ opacity: 1, y: 0, rotate: 0 }}
                                // exit={{ opacity: 0, y: '-50%', rotate: -180 }}
                                transition={{ duration: 1 }}
                                className="text-4xl font-bold"
                            >
                                <h1 className="text-[#15537A] text-3xl font-bold">
                                    SUBSIDIARIES
                                </h1>
                            </motion.div>
                            <div className="flex flex-col gap-4">
                                {subsidiaries.map((subsidiary => {
                                    return (
                                        <div key={subsidiary.image} className="bg-[#15537A] rounded-3xl flex flex-col lg:flex-row justify-center items-center p-6 gap-4">
                                            <div className="bg-white py-2 w-fit h-fit rounded-3xl p-2">
                                                <div className="w-[220px] h-[150px] relative ">
                                                    <Image className="rounded-full" style={{objectFit: "contain"}} fill src={subsidiary.image} alt={subsidiary.description} draggable={false}/>
                                                </div>
                                            </div>
                                            <p className="text-white" dangerouslySetInnerHTML={{__html: subsidiary.description}} />
                                        </div>
                                    )
                                }))}
                            </div>
                        </div>
                        <div className="hidden w-0 md:w-80 md:block "></div>
                    </div>
                </div>
            </section>
    )
}