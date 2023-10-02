"use client"

import Image from "next/image";
import {motion} from "framer-motion";
import {WhoWeAreBannerContent} from "@/components/admin/who-we-are/banner/who-we-are-banner";

// const banner = {
//     title: "<b class='text-yellow-500'>SESNA Group</b> at A Glance",
//     description: "SESNA Group (PT Sumber Energi Surya Nusantara) is an Indonesian renewable energy company focused on solar power plantdevelopment and Engineering, Procurement & Construction serviceprovider. Established with Independent Power Producer corebusiness, SESNA Group was awarded by the Indonesian Governmentas the first local private company that could build Solar IPP Projectin East Nusa Tenggara for 3 MWp of total capacity.<br>" +
//         "<br/>" +
//         "SESNA Group's commitment is strengthened by more than 10 yearsof expertise that extends the business nationally into the privatesector market, providing the service to Mining & Minerals,Commercial & Industrial, as well as Industrial Estate.\n" +
//         "SESNA Group's commitment is strengthened by more than 10 yearsof expertise that extends the business nationally into the privatesector market, providing the service to Mining & Minerals,Commercial & Industrial, as well as Industrial Estate.<br>"
// }

export function Banner({banner} : {banner : WhoWeAreBannerContent}) {
    return (
        <div className="flex flex-col">
            <div className="w-full h-screen relative z-20">
                <Image style={{objectFit:"cover"}} fill src={banner?.image} alt="" />
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
                                whileInView={{ opacity: 1, y: 0, x: 0, rotate: 0 }}
                                // animate={{ opacity: 1, y: 0, rotate: 0 }}
                                // exit={{ opacity: 0, y: '-50%', rotate: -180 }}
                                transition={{ duration: 1 }}
                                className="text-4xl font-bold"
                            >
                                <h1 className="text-white text-2xl font-semibold" dangerouslySetInnerHTML={{__html : banner?.headingTitle ?? ""}}/>
                            </motion.div>
                            <p className="text-white" dangerouslySetInnerHTML={{__html : banner?.description ?? ""}} />
                        </div>
                        <div className="hidden w-0 md:w-80 md:block "></div>
                    </div>
                </div>
            </section>
        </div>


    )
}