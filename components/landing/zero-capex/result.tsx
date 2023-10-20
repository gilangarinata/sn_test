"use client"

import React from "react";
import Image from "next/image";
import {ScopeOfWOrk} from "@/components/admin/our-business/scope-of-works/scope-of-work-table";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";


const results = [
    {
        icon: '/images/icon_zero_capex_1.png',
        title: 'Co2 Avoided',
        description: "1.841.695 kg"
    },
    {
        icon: '/images/icon_zero_capex_2.png',
        title: 'Coal burned',
        description: "4.851.412 kg"
    },
    {
        icon: '/images/icon_zero_capex_3.png',
        title: 'Vehicle Driven',
        description: "676.096 kg"
    },
    {
        icon: '/images/icon_zero_capex_4.png',
        title: 'Gasoline burned',
        description: "5.622.026 kg"
    },
    {
        icon: '/images/icon_zero_capex_5.png',
        title: 'Trees Needed',
        description: "64.233.057 kg"
    },
]

const recommendations = [
    {
        title: "Rekomendasi Installasi (kWp)",
        value: "1.5 kWp"
    },
    {
        title: "Area Potensial (m2)",
        value: "1.5 kWp"
    },
    {
        title: "Jumlah Modul Surya (pcs)",
        value: "1.5 kWp"
    },
    {
        title: "Produksi Energi per Tahun (kWh)",
        value: "1.5 kWp"
    },
    {
        title: "Periode Installasi (hari)",
        value: "1.5 kWp"
    },
]

const divStyle = {
    backgroundSize: 'cover',
}
export default function ZeroCapexResult() {
    return (
            <div className="w-full flex flex-col bg-[#15537A] items-center min-h-screen justify-center">
                <h1 className="mt-10 text-3xl text-white font-bold">HASIL</h1>
                <div className="w-full">
                    <div className="mx-auto h-screen flex gap-4 justify-between px-20">
                        <div className="w-[400px] h-full">
                            <div className="flex flex-col items-center px-4 py-6 gap-4">
                                <div className="rounded-2xl px-4 py-6 w-full shadow-xl bg-[#f9c329] flex flex-col items-center gap-4">
                                    <h1>Rekomendasi Installasi</h1>
                                    {recommendations.map((recommendation, index) => (
                                        <div key={recommendation.title} className="flex flex-col w-full gap-2">
                                            <h1 className="text-[#15537A]">
                                                {recommendation.title}
                                            </h1>
                                            <Input value={recommendation.value} readOnly={true} type="text" placeholder="Kapasitas " onChange={(e) => {

                                            }} />
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                        <div className="flex flex-col py-6 gap-8">
                            {results.map((result, index) => (
                                <div key={result.title} className="flex gap-4">
                                    <Image src={result.icon} alt="" width={50} height={30} />
                                    <div className="flex flex-col">
                                        <p className="text-white text-sm">{result.title}</p>
                                        <h4 className="text-white text-2xl font-bold">{result.description}</h4>
                                    </div>
                                </div>
                            )) }
                        </div>
                        <Image className="h-fit" src="/images/zero-capex-banner-2.png" alt="" width={500} height={500} />
                    </div>
                </div>
            </div>
    )
}