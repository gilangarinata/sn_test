"use client";
import { motion } from "framer-motion"
import { ChevronLeftCircle, ChevronRightCircle } from "lucide-react";
import 'react-slideshow-image/dist/styles.css'
import { Slide } from 'react-slideshow-image';
import {Button} from "@/components/ui/button";
import Image from "next/image";
import {Locale} from "@/i18n.config";


const divStyle = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundSize: 'cover',
    height: '350px'
}
const slideImages = [
    {
        url: 'https://images.unsplash.com/photo-1509721434272-b79147e0e708?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1500&q=80',
        caption: 'Slide 1'
    },
];

const buttonStyle = {
    width: "30px",
    background: 'none',
    border: '0px'
};

const properties = {
    prevArrow: <ChevronLeftCircle color="transparent" className="mx-4"/>,
    nextArrow: <ChevronRightCircle color="transparent" className="mx-4"/>,
    autoplay: false,
}
export default function NewsBanner({image, title, lang, dictionary} : {image: string, title: string, lang: Locale, dictionary: any}) {
    return (
        <div className="">
            <Slide {...properties}>
                {slideImages.map((slideImage, index) =>
                    (
                    <div key={index}>
                        <div style={{ ...divStyle, 'backgroundImage': `url(${image === "" ? slideImage.url : image})` }}>
                            <div className="w-full text-3xl text-white text-shadow-lg text-end pr-8">{title === "" ? "Find the latest need and information" : title}</div>
                        </div>
                    </div>
                    )
                )}
            </Slide>
        </div>
    )
}