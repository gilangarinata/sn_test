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

const satisfiedCustomers = [
    {
        icon : '/images/logo_client_1.png',
        label: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    },
    {
        icon : '/images/logo_client_2.png',
        label: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    },
    {
        icon : '/images/logo_client_3.png',
        label: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    },
    {
        icon : '/images/logo_client_4.png',
        label: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    },
    {
        icon : '/images/logo_client_5.png',
        label: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    },
    {
        icon : '/images/logo_client_6.png',
        label: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    },
    {
        icon : '/images/logo_client_7.png',
        label: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    },
    {
        icon : '/images/logo_client_8.png',
        label: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    },
    {
        icon : '/images/logo_client_9.png',
        label: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    },
    {
        icon : '/images/logo_client_10.png',
        label: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    },
    {
        icon : '/images/logo_client_11.png',
        label: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    },
    {
        icon : '/images/logo_client_12.png',
        label: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    },
];

export default function SatisfiedCustomer() {
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
                                        data={satisfiedCustomers}
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
    const { label } = data[dataIndex];
    return (
        <Image width={200} height={200} src={icon} alt={label} draggable={false}/>
    );
});