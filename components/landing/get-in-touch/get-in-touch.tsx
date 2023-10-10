"use client";

import {motion} from "framer-motion";
import Image from "next/image";
import React, {useEffect, useState} from "react";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";


export default function GetInTouch() {


    return (
        <div className="">
            <div className="w-screen flex flex-col bg-[#FABD24] py-20 h-fit lg:h-screen justify-center">
                <div className="flex flex-col">
                    <h1 className="w-full text-[#15537A]/20 text-center text-7xl font-bold">GET IN TOUCH</h1>
                    <h1 className="w-full text-[#15537A] text-center text-2xl font-bold mb-8 mt-[-50px]">GET IN TOUCH</h1>
                </div>
                <div className="flex flex-col md:flex-row items-center gap-4">
                    <motion.div whileInView={{scale: 1}} initial={{scale: 0}} className="w-1/2 flex flex-col items-center justify-center">
                        <p className="px-10 text-justify text-[#15537A]">
                            Are you passionate about shaping a
                            sustainable future? Whether you
                            have an exciting project or exploring
                            opportunities to collaborate, feel
                            free to reach out!
                        </p>
                        <h1 className="text-2xl text-[#15537A] mt-20 font-bold">“Just Like The Sun,<br/>
                            We are Here For You”</h1>
                    </motion.div>
                    <motion.div whileInView={{scale: 1}} initial={{scale: 0}} className="flex flex-col gap-4 w-3/4 lg:mr-20">
                        <div  className="w-full h-fit border-t-white rounded-lg grid gap-2 gap-y-6 grid-cols-1 lg:grid-cols-2">
                            <div className="flex flex-col text-[#15537A] gap-2">
                                <Input type="number" placeholder="Enter Your Name" onChange={(e) => {
                                }} />
                            </div>
                            <div className="flex flex-col text-[#15537A] gap-2">
                                <Input type="number" placeholder="Enter a valid email address" onChange={(e) => {
                                }} />
                            </div>
                        </div>
                        <div className="flex flex-col text-[#15537A] gap-2">
                            <Input type="number" placeholder="Enter mobile phone" onChange={(e) => {
                            }} />
                        </div>
                        <div className="flex flex-col text-[#15537A] gap-2">
                            <Input className="h-32" type="number" placeholder="Enter your message" onChange={(e) => {
                            }} />
                        </div>
                        <div className="flex gap-4">
                            <Input type="checkbox" className="w-5 h-5"/>
                            <p className="text-[#15537A]">I accept the terms of service</p>
                        </div>
                        <Button className="bg-[#15537A] w-fit">Submit</Button>
                    </motion.div>

                </div>
            </div>
        </div>
    )
}
