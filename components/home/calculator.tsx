"use client";

import Image from "next/image";
import React, {useEffect, useState} from "react";
import {
    StackedCarousel,
    ResponsiveContainer,
} from "react-stacked-center-carousel";
import {cn} from "@/lib/utils";
import {ChevronLeftCircle, ChevronRightCircle} from "lucide-react";


export default function Calculator() {

    return (
        <section>
            <div className="w-full flex flex-col px-6 md:px-20 bg-[#FABD24] py-20">
                <h1 className="w-full text-[#15537A] text-center text-2xl font-bold mb-8">TRY OUR CALCULATOR</h1>
            </div>
        </section>
    )
}
