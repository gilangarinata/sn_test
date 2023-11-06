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

    return (
            <section className="w-full pt-8">
                <div className="w-full lg:max-w-7xl flex mx-auto flex-col px-6 md:px-20 my-10">
                    <div className="w-full flex">
                        <div className="flex w-full flex-col gap-6">
                            <motion.div
                                initial={{ scale: 0 }}
                                whileInView={{scale: 1, transition: { duration: 1 }}}
                                className="text-4xl font-bold"
                            >
                                <h1 className="text-[#15537A] text-3xl font-bold">
                                    SUBSIDIARIES
                                </h1>
                            </motion.div>
                            <div className="flex flex-col gap-4">
                                {subsidiaries.map((subsidiary => {
                                    return (
                                        <motion.div initial={{scale : 0}} whileInView={{scale: 1, transition: { duration: 1 }}} key={subsidiary.image} className="bg-[#15537A] rounded-3xl flex flex-col lg:flex-row justify-center items-center p-6 gap-4">
                                            <div className="bg-white py-2 w-fit h-fit rounded-3xl p-2">
                                                <div className="w-[220px] h-[150px] relative ">
                                                    <Image className="rounded-full" style={{objectFit: "contain"}} fill src={subsidiary.image} alt={subsidiary.description} draggable={false}/>
                                                </div>
                                            </div>
                                            <p className="text-white" dangerouslySetInnerHTML={{__html: subsidiary.description}} />
                                        </motion.div>
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