"use client"

import React from "react";
import Image from "next/image";
import {ScopeOfWOrk} from "@/components/admin/our-business/scope-of-works/scope-of-work-table";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import Link from "next/link";
import {redirect, useRouter} from "next/navigation";
import {cn} from "@/lib/utils";
import cookie from 'js-cookie';



const scopes = [
    {
        icon: '/images/scope-work-1.png',
        title: 'Planning & System Engineering',
        description: "Every masterpiece starts with a great planning. Once we have determined the location, we will create a design that best meets your technical and environmental objectives. Not to forget, we are familiar to coordinate with local people and complete required steps and permits."
    },
    {
        icon: '/images/scope-work-2.png',
        title: 'Solar System Rental',
        description: "Thanks to our experience and international network as an IPP developer, we provide financial solution as sustainable as solar energy through solar rental/leasing scheme. With this scheme, we will do the investment on the solar power system and manage the asset, while client should only prepare monthly payment as much as electricity consumed from solar rooftop"
    },
    {
        icon: '/images/scope-work-3.png',
        title: 'Project Management',
        description: "Our many years of experience working on projects teach us how to manage and finalize our project completely optimized for reliability. We indicate every challenge on the field as early as possible to keep our project right based on technical plan and time schedule."
    },
    {
        icon: '/images/scope-work-4.png',
        title: 'Component & Technology Selection',
        description: "To ensure our solar power plant built with very high quality, we only select suppliers that have already achieved best in class excellence in their field and integrate every each component with high quality engineering system."
    },
    {
        icon: '/images/scope-work-5.png',
        title: 'Installation & Construction',
        description: "Our installation team are professional and experienced in the industry. Combined with our extensive history of proven solar success, rest assured our system will be optimally installed."
    },
    {
        icon: '/images/scope-work-6.png',
        title: 'Operations & Maintenance',
        description: "We believe that we have a professional approach to keep our power plant working in highest level of performance. Through our experience, a comprehensive operations maintenance plan and monitoring system we aim our plant working with zero problem."
    },
]

const divStyle = {
    backgroundSize: 'cover',
}
export default function HistungInvestasi() {
    const router = useRouter();
    const [jenisProperty, setJenisProperty] = React.useState('');
    const [dayaListrik, setDayaListrik] = React.useState('');
    const [tarifListrik, setTarifListrik] = React.useState('');
    const [tagihanListrik, setTagihanListrik] = React.useState('');
    const [luasArea, setLuasArea] = React.useState('');
    const [lokasiPemasangan, setLokasiPemasangan] = React.useState('');

    const [error, setError] = React.useState('');

    return (
            <div className="w-full flex flex-col items-center min-h-screen justify-center" style={{ ...divStyle, 'backgroundImage': `url("/images/banner_1.jpg")`}}>
                <div className="bg-white/70 lg:hidden w-full h-full">
                    <h1 className="w-full text-end p-[60px] text-6xl font-bold text-[#f9c329] text-shadow-lg">HITUNG INVESTASI<br/>PANEL SURYA MU<br/>SEKARANG</h1>
                </div>
                <div className="bg-white/70 w-full">
                    <div className="max-w-7xl mx-auto h-screen flex">
                        <div className="w-full lg:w-[600px] h-full">
                            <div className="flex flex-col items-center px-4 py-6 gap-4">
                                <div className="rounded-2xl px-4 py-6 w-full shadow-xl bg-[#f9c329] flex flex-col items-center gap-4">
                                    <h1>Mohon input data dibawah ini</h1>
                                    <Input type="text" placeholder="Jenis Property" onChange={(e) => {
                                        setJenisProperty(e.target.value);
                                    }} />
                                    <Input type="number" placeholder="Daya Listrik (kVa)" onChange={(e) => {
                                        setDayaListrik(e.target.value)
                                    }} />
                                    <Input type="number" placeholder="Tarif Listrik (per kWh)" onChange={(e) => {
                                        setTarifListrik(e.target.value)
                                    }} />
                                    <Input type="number" placeholder="Tagihan Listrik per bulan (Rupiah)" onChange={(e) => {
                                        setTagihanListrik(e.target.value)
                                    }} />
                                    <Input type="number" placeholder="Luas Area Property (m2)" onChange={(e) => {
                                        setLuasArea(e.target.value)
                                    }} />
                                    <p>Lokasi Pemasangan</p>
                                    <div className="flex gap-4">
                                        <div className={cn("flex flex-col items-center hover:cursor-pointer", lokasiPemasangan === "rooftop" ? "bg-yellow-500" : "")} onClick={()=> setLokasiPemasangan("rooftop")}>
                                            <Image width={50} height={50} src="/images/ic_zero_capex_1.png" alt="" />
                                            <p>Rooftop</p>
                                        </div>
                                        <div className={cn("flex flex-col items-center", lokasiPemasangan === "ground_mounted" ? "bg-yellow-500" : "")} onClick={() => setLokasiPemasangan("ground_mounted")}>
                                            <Image width={50} height={50} src="/images/ic_zero_capex_2.png" alt="" />
                                            <p>Ground Mounted</p>
                                        </div>
                                    </div>
                                    <p className="text-red-500">{error}</p>
                                </div>

                                <Button onClick={(bt) => {
                                    bt.preventDefault()

                                    if (jenisProperty === "") {
                                        setError("Mohon isi jenis property")
                                        return;
                                    }

                                    if (dayaListrik === "") {
                                        setError("Mohon isi daya listrik")
                                        return;
                                    }

                                    if (tarifListrik === "") {
                                        setError("Mohon isi tarif listrik")
                                        return;
                                    }

                                    if (tagihanListrik === "") {
                                        setError("Mohon isi tagihan listrik")
                                        return;
                                    }

                                    if (luasArea === "") {
                                        setError("Mohon isi luas area")
                                        return;
                                    }

                                    if (lokasiPemasangan === "") {
                                        setError("Mohon pilih lokasi pemasangan")
                                        return;
                                    }

                                    cookie.set("jenisProperty",jenisProperty);
                                    cookie.set("dayaListrik",dayaListrik);
                                    cookie.set("tarifListrik",tarifListrik);
                                    cookie.set("tagihanListrik",tagihanListrik);
                                    cookie.set("luasArea",luasArea);
                                    cookie.set("lokasiPemasangan",lokasiPemasangan);


                                    router.push('/zero-capex-result');
                                }} className="bg-[#f9c329] text-blue-950 font-bold w-full">Selanjutnya</Button>
                            </div>
                        </div>
                        <h1 className="w-full hidden lg:block text-center lg:text-end p-[60px] text-7xl font-bold text-[#f9c329] text-shadow-lg">HITUNG INVESTASI<br/>PANEL SURYA MU<br/>SEKARANG</h1>
                    </div>
                </div>
            </div>
    )
}