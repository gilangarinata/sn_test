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
export default function ResultPlan() {
    return (
            <div className="w-full flex flex-col bg-[#15537A] items-center justify-center">
                <h1 className="mt-10 text-3xl text-white font-bold text-center">Tentukan Rencana dan Solusi Sesuai<br/> dengan Kebutuhan Anda!</h1>

                <div className="max-w-3xl mx-auto flex py-6">
                    <div className="flex flex-col gap-2">
                        <div className="bg-[#f9c329] rounded-sm border-white border-2">
                            <p className="mx-10 my-2 text-[#15537A] font-bold text-center">Benefits</p>
                        </div>
                        <div className="bg-gray-300">
                            <p className="mx-10 my-2 text-[#15537A] text-center">Advance Experience</p>
                        </div>
                        <div className="bg-[#15537A]">
                            <p className="mx-10 my-2 text-[#15537A] text-center">Advance Experience</p>
                        </div>
                    </div>
                </div>
            </div>
    )
}