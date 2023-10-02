"use client"

import Image from "next/image";
import {motion} from "framer-motion";
import React from "react";
import {Button} from "@/components/ui/button";
import {DownloadIcon} from "lucide-react";
import {OurDna} from "@/components/admin/who-we-are/our-dna/our-dna-table";
import {Director} from "@/components/admin/who-we-are/director/director-table";
import {VisionMission} from "@/components/admin/who-we-are/vision-mission/vision-mission-table";
import Link from "next/link";

// const banner = {
//     title: "<b class='text-yellow-500'>SESNA Group</b> at A Glance",
//     description: "SESNA Group (PT Sumber Energi Surya Nusantara) is an Indonesian renewable energy company focused on solar power plantdevelopment and Engineering, Procurement & Construction serviceprovider. Established with Independent Power Producer corebusiness, SESNA Group was awarded by the Indonesian Governmentas the first local private company that could build Solar IPP Projectin East Nusa Tenggara for 3 MWp of total capacity.<br>" +
//         "<br/>" +
//         "SESNA Group's commitment is strengthened by more than 10 yearsof expertise that extends the business nationally into the privatesector market, providing the service to Mining & Minerals,Commercial & Industrial, as well as Industrial Estate.\n" +
//         "SESNA Group's commitment is strengthened by more than 10 yearsof expertise that extends the business nationally into the privatesector market, providing the service to Mining & Minerals,Commercial & Industrial, as well as Industrial Estate.<br>" +
//         "<br/>"
// }
//
// const visionMision = {
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
//
// const ourDna = [
//     {
//         image: "/images/passionate.png",
//         title: "Passionate",
//         description: "SESNA Group (PT Sumber Energi Surya Nusantara) is an Indonesian renewable energy Group (PT Sumber Energi Surya Nusantara) is an Indonesian renewable energy Group (PT Sumber Energi Surya Nusantara) is an Indonesian renewable energy"
//     },
//     {
//         image: "/images/efficiency.png",
//         title: "Efficiency Concept",
//         description: "SESNA Group (PT Sumber Energi Surya Nusantara) is an Indonesian renewable energy Group (PT Sumber Energi Surya Nusantara) is an Indonesian renewable energy"
//     },
//     {
//         image: "/images/sustainable.png",
//         title: "Sustainable Service",
//         description: "SESNA Group (PT Sumber Energi Surya Nusantara) is an Indonesian renewable energy Group (PT Sumber Energi Surya Nusantara) is an Indonesian renewable energy"
//     },
// ]

export function VisionMission({ourDna, director, visionMission} : {ourDna : OurDna[], director: Director, visionMission: VisionMission}) {
    return (
            <section className="w-full pt-8">
                <div className="bg-[#15537A] z-50 relative rounded-3xl max-w-5xl mx-auto flex flex-col justify-center items-center p-6 gap-4">
                    <div className="flex items-center gap-4">
                        <Image src="/images/vision.png" alt="" width={80} height={80} />
                        <div className="flex flex-col text-[#FABD24]">
                            <h1 className="font-bold text-3xl">VISION</h1>
                            <p>
                                {visionMission.vision}
                            </p>
                        </div>
                    </div>
                    <div className="flex items-center gap-4">
                        <Image src="/images/mission.png" alt="" width={80} height={80} />
                        <div className="flex flex-col text-[#FABD24]">
                            <h1 className="font-bold text-3xl">MISSION</h1>
                            <p>
                                {visionMission.mission}
                            </p>
                        </div>
                    </div>
                </div>

                <div className="w-full bg-[#FABD24] z-40 relative mt-[-120px]">
                    <div className="flex flex-col items-center p-6 gap-4 pt-[180px]">
                        <h1 className="font-bold text-[#15537A] text-3xl">Our DNA</h1>
                        <div className="flex flex-col lg:flex-row text-[#15537A] px-8 gap-8 lg:divide-x">
                            {
                                ourDna.map((dna) => {
                                    return (
                                        <div key={dna.image} className="flex flex-col items-center w-full gap-4">
                                            <Image src={dna.image} alt={dna.title} width={150} height={150} />
                                            <h1 className="font-bold text-2xl">{dna.title}</h1>
                                            <p className="text-center w-full justify-center px-4">{dna.description}</p>
                                        </div>
                                    )
                                })
                            }
                        </div>
                    </div>
                </div>

                <section>
                    <div className="w-full bg-[#15537A] pt-8 h-[800px]">
                        <div className="w-full lg:max-w-7xl flex mx-auto flex-col px-6 md:px-20">
                            <div className="w-full flex items-center justify-center">
                                <div className="flex w-full flex-col gap-6">
                                    <motion.div
                                        initial={{ opacity: 0.8, y: '-50%', x:'54%', rotate: -90 }}
                                        whileInView={{ opacity: 1, y: 0, x: 0, rotate: 0 }}
                                        // animate={{ opacity: 1, y: 0, rotate: 0 }}
                                        // exit={{ opacity: 0, y: '-50%', rotate: -180 }}
                                        transition={{ duration: 1 }}
                                        className="text-4xl font-bold "
                                    >
                                        <h1 className="text-white text-2xl  font-semibold" dangerouslySetInnerHTML={{__html : director?.messageDirectorTitle ?? ""}}/>
                                    </motion.div>
                                    <p className="text-white" dangerouslySetInnerHTML={{__html : director?.messageDirectorDescription ?? ""}} />
                                </div>
                                <div className="hidden w-0 md:w-80 md:block ">
                                    <div className="w-[430px] h-[650px] relative">
                                        <Image src="/images/manager2.png" alt="" fill style={{objectFit: "cover"}} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                <div className="w-full bg-[#FABD24] z-40 relative mt-[-120px] flex p-6 items-center justify-center">
                    <Link href={director.companyProfileUrl} ><Button><DownloadIcon/> Download Company Profile</Button></Link>
                </div>

            </section>

    )
}