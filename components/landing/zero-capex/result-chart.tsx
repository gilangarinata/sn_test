"use client"

import React from "react";
import Image from "next/image";
import {ScopeOfWOrk} from "@/components/admin/our-business/scope-of-works/scope-of-work-table";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import Link from "next/link";
import {DownloadIcon} from "lucide-react";


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
export default function ResultChart() {
    return (
            <div className="w-full flex flex-col bg-[#15537A] items-center justify-center">
                <h1 className="mt-10 text-3xl text-white font-bold text-center">Grafik Penghematan</h1>
                <Image className="py-10" src="/images/chart.png" alt="" width={600} height={340} />
                <div className="w-full bg-[#f9c329] flex justify-center">
                    <Link className="my-4" href="" ><Button><DownloadIcon/> Download Hasil</Button></Link>
                </div>
            </div>
    )
}