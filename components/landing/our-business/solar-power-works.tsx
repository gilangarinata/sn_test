"use client"

import Image from "next/image";
import React from "react";
import {motion} from "framer-motion";
import Link from "next/link";
import {Button} from "@/components/ui/button";

export default function SolarPowerWorks() {
    return (
        <div className="w-full bg-[#FABD24] pt-8 h-screen">
            <div className="w-full max-w-5xl mx-auto">
                <div className="w-full h-[500px] lg:lg:h-[calc(100vh-60px)] flex flex-col">
                    <div className="flex flex-col md:flex-row items-center h-full justify-center">

                        <div className="flex w-full flex-col gap-6 text-[#15537A]">
                            <h1 className="text-3xl font-bold">SOLAR POWER WORKS</h1>
                            <p className="text-xl mt-6">On Grid Solar Panel System</p>
                            <div className="container mx-auto p-4">
                                <ul className="list-disc">
                                    <li>Must integrated to PLN grid</li>
                                    <li>The energy generated from the solar<br/>
                                        module is directly streamed to an<br/>
                                        existing electrical grid.</li>
                                    <li>Does not require a battery as energy<br/>
                                        storage.</li>
                                    {/* Add more list items as needed */}
                                </ul>
                            </div>
                            <div className="flex space-x-6 mt-12">
                                <div className="w-3 h-3 bg-[#15537A] rounded-full"></div> {/* Active dot */}
                                <div className="w-3 h-3 border border-[#15537A] rounded-full"></div> {/* Inactive dot */}
                                <div className="w-3 h-3 border border-[#15537A] rounded-full"></div> {/* Inactive dot */}

                            </div>
                        </div>

                        <motion.div whileInView={{scale : 1}} initial={{scale:0}} className="hidden md:flex items-center justify-center w-full">

                            <Image sizes="100vw"
                                   width={0}
                                   height={0}
                                   style={{ width: '100%', height: 'auto' }} src="/images/solar-works-1.png" alt="logo" />
                            {/*<div className="w-[120px] h-[120px] md:w-[500px] md:h-[500px] relative">*/}
                            {/*    <Image fill src="/images/zero_capex.png" alt="banner animation" />*/}
                            {/*</div>*/}
                        </motion.div>
                    </div>
                </div>
            </div>
        </div>
    )
}