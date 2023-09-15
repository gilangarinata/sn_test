"use client";

import {motion} from "framer-motion";
import Image from "next/image";
import React, {useEffect, useState} from "react";
import {Input} from "@/components/ui/input";


export default function Calculator() {

    return (
        <section>
            <div className="w-full flex flex-col px-6 md:px-20 bg-[#FABD24] py-20 h-fit lg:h-screen">
                <h1 className="w-full text-[#15537A] text-center text-2xl font-bold mb-8">TRY OUR CALCULATOR</h1>
                <div className="flex flex-col md:flex-row items-center gap-4">
                    <motion.div whileInView={{scale: 1}} initial={{scale: 0}} className="w-1/2 flex flex-row items-center justify-center">
                        <Image width={250} height={250} src="/images/celengan.png" alt="celengan"/>
                    </motion.div>
                    <motion.div whileInView={{scale: 1}} initial={{scale: 0}} className="w-full font-semibold h-fit border-t-white rounded-lg mx-10 border-2 p-6 grid gap-2 gap-y-6 grid-cols-1 lg:grid-cols-2">
                        <div className="flex flex-col text-[#15537A] gap-2">
                            <p>Your monthly electricity bills (Rupiah)</p>
                            <Input type="email" placeholder="" />
                        </div>
                        <div className="flex flex-col text-[#15537A] gap-2">
                            <p>Electric power installed (Watt)</p>
                            <Input type="email" placeholder="" />
                        </div>
                        <div className="flex flex-col text-[#15537A] gap-2">
                            <p>Max solar panel capacity installed (kWp)</p>
                            <Input disabled={true} type="email" placeholder="" />
                        </div>
                        <div className="flex flex-col text-[#15537A] gap-2">
                            <p>Available space (in m2)</p>
                            <Input disabled={true} type="email" placeholder="" />
                        </div>
                        <div className="flex flex-col text-[#15537A] gap-2">
                            <p>Your saving electricity bills</p>
                            <Input disabled={true} type="email" placeholder="" />
                        </div>
                        <div className="flex flex-col text-[#15537A] gap-2">
                            <p>Monthly electricity bills with solar panel</p>
                            <Input disabled={true} type="email" placeholder="" />
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    )
}
