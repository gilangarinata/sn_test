"use client";
import Image from "next/image";
import { motion } from "framer-motion"

const experience = {
        title: "<b class='text-[#FAC225] font-bold'>SESNA</b> Group at A Glance",
        description: "SESNA Group (PT Sumber Energi Surya Nusantara) is an Indonesian\n" +
            "renewable energy company focused on solar power plant" +
            "development and Engineering, Procurement & Construction service" +
            "provider. Established with Independent Power Producer core" +
            "business, SESNA Group was awarded by the Indonesian Government" +
            "as the first local private company that could build Solar IPP Project" +
            "in East Nusa Tenggara for 3 MWp of total capacity." +
            "<br/> <br/>SESNA Group's commitment is strengthened by more than 10 years" +
            "of expertise that extends the business nationally into the private" +
            "sector market, providing the service to Mining & Minerals," +
            "Commercial & Industrial, as well as Industrial Estate.",
        experiences : [
            {
                icon : '/images/icon_experience_1.webp',
                label: 'Cities in Indonesia',
                value: 10
            },
            {
                icon : '/images/icon_experience_2.webp',
                label: 'Year Experience',
                value: 7
            },
            {
                icon : '/images/icon_experience_3.webp',
                label: 'Project',
                value: 20
            },
            {
                icon : '/images/icon_experience_4.webp',
                label: 'Kwh installed',
                value: 250000
            },
        ]
    };

export default function SesnaGroup() {
    return (
        <section>
            <div className="w-full flex flex-col px-6 md:px-20 my-10">
                <h1 className="w-full text-[#15537A] text-center text-2xl font-bold mb-8">EXPERIENCE</h1>
                <div className="w-full flex flex-col md:flex-row">
                    <div className="flex w-full flex-col gap-6">
                        <h1 className="text-[#15537A] text-2xl font-semibold" dangerouslySetInnerHTML={{__html : experience.title}}/>
                        <p className="text-[#15537A]" dangerouslySetInnerHTML={{__html : experience.description}} />
                    </div>
                    <motion.div whileInView={{scale: 1}} initial={{scale: 0}} className="w-full relative">
                        <div className="relative w-[190px] h-[340px] m-auto mt-4 md:mt-0">
                            <Image fill src="/images/captain_surya.webp" alt="Captain Surya" />
                        </div>
                    </motion.div>
                </div>
                <div className="w-[300px] mx-auto md:w-full bg-[#15537A] rounded-2xl mt-1">
                    <div className="w-full flex flex-col md:flex-row px-4">
                        {experience.experiences.map(experience => {
                            return (
                                <motion.div whileHover={{ scale: 1.1 }} className="w-full flex flex-row my-4 items-center gap-2 justify-start" key={experience.label}>
                                    <Image width={100} height={100} src={experience.icon} alt={experience.label} />
                                    <div className="flex flex-col text-white items-center w-full text-center">
                                        <p>More Than</p>
                                        <span className="text-yellow-400 font-bold">{experience.value}</span>
                                        <p>{experience.label}</p>
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