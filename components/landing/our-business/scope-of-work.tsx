import React from "react";
import Image from "next/image";
import {ScopeOfWOrk} from "@/components/admin/our-business/scope-of-works/scope-of-work-table";


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

export default function ScopeOfWork({scopeOfWork} : {scopeOfWork: ScopeOfWOrk[]}) {
    return (
        <div className="w-full flex flex-col items-center py-10 min-h-screen justify-center">
            <div className="flex flex-col items-center max-w-6xl mx-auto gap-8">
                <h1 className="text-[#15537A] text-3xl font-bold">
                    SCOPE OF WORK
                </h1>
                <div className="grid grid-cols-2 gap-4">
                    {scopeOfWork.map(scope => (
                        <div key={scope.title} className="flex gap-4">
                            <div className="relative w-[120px] h-[120px]">
                                <Image fill style={{objectFit:"cover"}} src={scope?.image} alt="" />
                            </div>
                            <div className="flex flex-col w-full">
                                <h1 className="text-[#15537A] text-2xl font-bold">{scope.title}</h1>
                                <p className="text-[#15537A] text-justify text-sm">{scope.description}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

        </div>
    )
}