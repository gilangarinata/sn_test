import React from "react";
import Image from "next/image";


const experiences = [
    {
        icon: '/images/our-experience-1.png',
        title: 'Independent Power Producer (IPP)',
    },
    {
        icon: '/images/our-experience-2.png',
        title: 'Mining',
    },
    {
        icon: '/images/our-experience-3.png',
        title: 'Commercial & Industry',
    }
]

const divStyle = {
    backgroundSize: 'cover',
}

export default function OurExperience() {
    return (
        <div className="w-full flex flex-col min-h-screen">
            <div className="flex flex-col items-center">
                <div className="flex w-full py-10 bg-gradient-to-b from-[#285479] to-[#4C7391] items-center justify-center">
                    <h1 className="text-white text-3xl font-bold">
                        OUR EXPERIENCE
                    </h1>
                </div>
                <div className="grid grid-cols-3 w-full h-screen mt-[-10px]">
                    {experiences.map(scope => (
                        <div key={scope.title}  className="flex w-full flex-col h-full" style={{ ...divStyle, 'backgroundImage': `url(${scope.icon})`}}>
                            <div className="flex text-white justify-end flex-col w-full h-full">
                                <h1 className="mb-[200px] mx-20 text-3xl font-bold">{scope.title}</h1>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

        </div>
    )
}