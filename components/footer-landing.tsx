"use client";

import Image from "next/image";
import React, {useEffect, useState} from "react";
import {
    StackedCarousel,
    ResponsiveContainer,
} from "react-stacked-center-carousel";
import {cn} from "@/lib/utils";
import {
    ChevronLeftCircle,
    ChevronRightCircle,
    Facebook, FacebookIcon,
    Instagram, InstagramIcon,
    Linkedin,
    LinkedinIcon, LocateIcon, LucideMail, MapPin, PhoneCall,
    Youtube, YoutubeIcon
} from "lucide-react";
import Link from "next/link";


export default function FooterLanding() {
    return (
        <section className="z-[1000px] relative">
            <div className="w-full flex flex-col px-6 md:px-20 bg-[#15537A] my-0 divide-y divide-blue-100/20">
                <div className="py-16 flex w-full text-white">
                    <div className="flex flex-col gap-4 w-full">
                        <Image width={200} height={200} src="/images/logo_putih.png" alt="Logo sesna" />
                        <h1 className="font-bold text-lg">FOLLOW US</h1>
                        <div className="flex flex-row gap-4">
                            <InstagramIcon className="hover:cursor-pointer" />
                            <YoutubeIcon className="hover:cursor-pointer" />
                            <LinkedinIcon className="hover:cursor-pointer" />
                            <FacebookIcon className="hover:cursor-pointer" />
                        </div>
                    </div>

                    <div className="w-full flex flex-col gap-2">
                        <h1 className="font-bold text-xl">KANTOR PUSAT</h1>
                        <p>World Trade Center, WTC 1, 5th Floor</p>
                        <div className="flex gap-2">
                            <MapPin width={30} color="white"/>
                            <p> Jl. Jend. Sudirman Kav 29, RT.8/RW.3, Kuningan, Karet, Kecamatan Setiabudi, Kota Jakarta Selatan, Daerah Khusus Ibukota Jakarta 12920</p>
                        </div>
                        <div className="flex gap-2">
                            <LucideMail width={14} color="white"/>
                            <p>info@s-energy.id</p>
                        </div>
                        <div className="flex gap-2">
                            <PhoneCall width={14} color="white"/>
                            <p>0851 5865 9911</p>
                        </div>
                    </div>
                </div>
                <div className="w-full text-white py-4 flex justify-between">
                    <p>Copyright 2023 © <span className="text-yellow-400 font-bold">Solar Warrior</span> | Owned by PT Sumber Energi Surya Nusantara.</p>
                    <div className=" gap-2 font-semibold hidden md:flex">
                        {/*<Link href="/">*/}
                            <p className="hover:text-yellow-400">Syarat Ketentuan</p>
                        {/*</Link>*/}
                         <p>|</p>
                        {/*<Link href="/">*/}
                            <p className="hover:text-yellow-400">Kebijakan Privasi</p>
                        {/*</Link>*/}
                        <p>|</p>
                        {/*<Link href="/">*/}
                            <p className="hover:text-yellow-400">FAQ</p>
                        {/*</Link>*/}
                    </div>
                </div>
            </div>
        </section>
    )
}
