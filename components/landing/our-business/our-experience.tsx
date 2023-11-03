"use client"
import React from "react";
import Image from "next/image";
import {OurExperience} from "@/components/admin/our-business/our-experience/our-experience-table";
import Link from "next/link";
import { motion } from "framer-motion"

const experiences = [
    {
        icon: '/images/our-experience-1.png',
        title: 'Independent Power Producer (IPP)',
    },
    {
        icon: '/images/our-experience-2.png',
        title: 'Mining',
    },
    {
        icon: '/images/our-experience-3.png',
        title: 'Commercial & Industry',
    }
]

const divStyle = {
    backgroundSize: 'cover',
}

export default function OurExperience({ourExperience} : {ourExperience: OurExperience[]}) {
    return (
        <div className="w-full flex flex-col min-h-screen">
            <div className="flex flex-col items-center">
                <div className="flex w-full py-10 bg-gradient-to-b from-[#285479] to-[#4C7391] items-center justify-center">
                    <h1 className="text-white text-3xl font-bold">
                        OUR EXPERIENCE
                    </h1>
                </div>
                <div className="flex flex-col lg:grid lg:grid-cols-3 w-full lg:h-screen mt-[-10px]">
                    {ourExperience.map(scope => (
                        <Link key={scope.title} href={scope.link} >
                            <motion.div initial={{ scale: 1 }} whileHover={{scale: 1.1}} className="flex w-full flex-col h-[300px] lg:h-full" style={{ ...divStyle, 'backgroundImage': `url(${scope.image})`}}>
                                <div className="flex hover:cursor-pointer text-white justify-end flex-col w-full h-full">
                                    <h1 className="mb-20 lg:mb-[200px] mx-20 text-3xl font-bold hover:cursor-pointer">{scope.title}</h1>
                                </div>
                            </motion.div>
                        </Link>
                    ))}
                </div>
            </div>

        </div>
    )
}