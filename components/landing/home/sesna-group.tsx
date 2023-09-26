"use client";
import Image from "next/image";
import {motion, useAnimation} from "framer-motion"
import {Experience} from "@/components/admin/home/experience/edit-experience";
import {useEffect} from "react";
import Counter from "@/components/counting-animation";

export default function SesnaGroup({experience} : {experience: Experience[]}) {
    const mainExp = experience.find((ex) => ex.id === "main-experience");
    const experiences = experience.filter((ex) => ex.id !== "main-experience")


    return (
        <section className="lg:max-w-5xl mx-auto">
            <div className="w-full flex flex-col px-6 md:px-20 my-10">
                <h1 className="w-full text-[#15537A] text-center text-2xl font-bold mb-8">EXPERIENCE</h1>
                <div className="w-full flex flex-col md:flex-row">
                    <div className="flex w-full flex-col gap-6">
                        <h1 className="text-[#15537A] text-2xl font-semibold" dangerouslySetInnerHTML={{__html : mainExp?.title ?? ""}}/>
                        <p className="text-[#15537A]" dangerouslySetInnerHTML={{__html : mainExp?.description ?? ""}} />
                    </div>
                    <motion.div whileInView={{scale: 1}} initial={{scale: 0}} className="w-full relative">
                        <div className="relative w-[280px] h-[480px] m-auto mt-4 md:mt-0">
                            <Image fill src="/images/captain_surya.webp" alt="Captain Surya" />
                        </div>
                    </motion.div>
                </div>
                <div className="w-[300px] mx-auto md:w-full bg-[#15537A] rounded-2xl mt-[-50px] z-50">
                    <div className="w-full flex flex-col md:flex-row px-4">
                        {experiences.map(experience => {
                            return (
                                <motion.div whileHover={{ scale: 1.1 }} className="w-full flex flex-row my-4 items-center gap-2 justify-start" key={experience.id}>
                                    <Image width={100} height={100} src={experience.icon} alt={experience.title} />
                                    <div className="flex flex-col text-white items-center w-full text-center">
                                        <p>More Than</p>
                                        <Counter value={Number(experience.total)} />
                                        <p>{experience.description}</p>
                                    </div>
                                </motion.div>
                            )
                        })}
                    </div>
                </div>
            </div>
        </section>
    )
}