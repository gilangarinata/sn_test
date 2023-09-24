"use client";
import { motion } from "framer-motion"
import Image from "next/image";
import React, {useEffect, useState} from "react";
import {
    StackedCarousel,
    ResponsiveContainer,
} from "react-stacked-center-carousel";
import {cn} from "@/lib/utils";
import {ChevronLeftCircle, ChevronRightCircle} from "lucide-react";
import {Customer} from "@/components/admin/home/customers/edit-customer";
import Link from "next/link";


export default function SatisfiedCustomer({customers} : {customers : Customer[]}) {
    const ref = React.useRef<StackedCarousel>();

    function onPrevClick() {
        ref.current?.goBack();
    }

    function onNextClick() {
        ref.current?.goNext();
    }

    return (
        <section className="lg:max-w-5xl mx-auto">
            <div className="w-full flex flex-col px-6 md:px-20 my-10">
                <h1 className="w-full text-[#15537A] text-center text-2xl font-bold mb-8">OUR SATISFIED CUSTOMER</h1>
                <div className="w-full flex justify-center items-center">
                    <div onClick={onPrevClick} className="hover:cursor-pointer">
                        <ChevronLeftCircle />
                    </div>
                    <motion.div initial={{ scale: 0 }} whileInView={{ scale: 1 }} className="w-full">
                        <ResponsiveContainer
                            carouselRef={ref}
                            render={(parentWidth, carouselRef) => {
                                let currentVisibleSlide = 5;
                                if(parentWidth < 950) currentVisibleSlide = 3;
                                if(parentWidth < 700) currentVisibleSlide = 1;
                                console.log(parentWidth);
                                return (
                                    <StackedCarousel
                                        ref={carouselRef}
                                        slideComponent={SatisfiedCustomerCard}
                                        height={200}
                                        slideWidth={200}  //{parentWidth < 800 ? parentWidth - 40 : 750}
                                        carouselWidth={parentWidth}
                                        data={customers}
                                        currentVisibleSlide={currentVisibleSlide}
                                        maxVisibleSlide={5}
                                        useGrabCursor
                                    />
                                );
                            }}
                        />
                    </motion.div>
                    <div onClick={onNextClick} className="hover:cursor-pointer" >
                        <ChevronRightCircle />
                    </div>
                </div>
            </div>
        </section>
    )
}

// eslint-disable-next-line react/display-name
export const SatisfiedCustomerCard = React.memo(function (props) {
    // @ts-ignore
    const { data, dataIndex, isCenterSlide } = props;
    const { icon } = data[dataIndex];
    const { title } = data[dataIndex];
    const { url } = data[dataIndex];
    return (
        <Link href={url === "" ? "/" : url}>
            <Image width={240} height={240} src={icon} alt={title} draggable={false} className="px-4"/>
        </Link>
    );
});