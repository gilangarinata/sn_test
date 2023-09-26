"use client"

import Image from "next/image";

const banner = {
    title: "<b class='text-yellow-500'>SESNA Group</b> at A Glance",
    description: "SESNA Group (PT Sumber Energi Surya Nusantara) is an Indonesian renewable energy company focused on solar power plantdevelopment and Engineering, Procurement & Construction serviceprovider. Established with Independent Power Producer corebusiness, SESNA Group was awarded by the Indonesian Governmentas the first local private company that could build Solar IPP Projectin East Nusa Tenggara for 3 MWp of total capacity.\n" +
        "\n" +
        "SESNA Group's commitment is strengthened by more than 10 yearsof expertise that extends the business nationally into the privatesector market, providing the service to Mining & Minerals,Commercial & Industrial, as well as Industrial Estate.\n" +
        "\n"
}

export function Banner() {
    return (
        <div className="flex flex-col">
            <div className="w-full h-screen relative">
                <Image style={{objectFit:"cover"}} fill src="/images/who_banner.jpeg" alt="" />
                <div className="absolute">
                    <div className="flex p-12 gap-4">
                        <div className="bg-white w-[10px]"></div>
                        <p className="text-4xl text-white font-bold">JUST LIKE THE SUN<br/>WE ARE HERE<br/>FOR YOU</p>
                    </div>
                </div>
            </div>
            <section className="w-full bg-[#15537A]">
                <div className="w-full lg:max-w-7xl flex mx-auto flex-col px-6 md:px-20 my-10">
                    <div className="w-full flex">
                        <div className="flex w-full flex-col gap-6">
                            <h1 className="text-white text-2xl font-semibold" dangerouslySetInnerHTML={{__html : banner?.title ?? ""}}/>
                            <p className="text-white" dangerouslySetInnerHTML={{__html : banner?.description ?? ""}} />
                        </div>
                        <div className="hidden w-0 md:w-80 md:block "></div>
                    </div>
                </div>
            </section>
        </div>


    )
}