"use client";

import Image from "next/image";
import {Code, ImageIcon, LayoutDashboard, MessageSquare, Music, Settings, VideoIcon} from "lucide-react";
import Link from "next/link";
import {cn} from "@/lib/utils";

const dashboardBanner = [
    {
        label : "Monthly Revenue",
        value : 3500,
        increasePercent: 10.6,
        previous: 1700,
        icon: "/images/img_income.svg",
        type: "money"
    },
    {
        label : "New Users",
        value : 10,
        increasePercent: 10.6,
        previous: 5,
        icon: "/images/img_new_user.svg",
        type: "user"
    },
    {
        label : "Expense",
        value : 1000,
        increasePercent: 4.6,
        previous: 5,
        icon: "/images/img_expense.svg",
        type: "money"
    },
]

const DashboardPage = () => {
    return (
        <div className="mb-8 space-y-4 px-4">
            <div className="flex flex-col lg:flex-row">
                <div className="lg:flex-[70%] bg-primary rounded-2xl">
                    <div className="grid grid-cols-3 p-6">
                        {dashboardBanner.map((data) => (
                            <div key={data.label} className="w-full flex space-x-2 justify-center">
                                <Image className="hidden lg:block" width="38" height="38" src={data.icon} alt="Income" />
                                <div className="flex flex-col space-y-1">
                                    <p className="text-slate-200/80 text-sm">{data.label}</p>
                                    <div className="flex-col flex lg:flex-row lg:space-x-2">
                                        <h2 className="text-xl text-white">${data.value}</h2>
                                        <span className="bg-white text-primary rounded-full text-xs flex items-center px-2">+{data.increasePercent}%</span>
                                    </div>
                                    <p className="text-slate-200/80 text-sm">Previous month <span className="text-white">{data.previous}</span> </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="h-20 lg:flex-[30%] bg-amber-400">

                </div>
            </div>
            <div className="flex flex-col lg:flex-row">
                <div className="lg:flex-[70%]">
                    <div className="flex flex-col space-y-2 lg:grid lg:grid-cols-3 lg:space-x-2 lg:space-y-0">
                        <div className="border-black/10 border rounded-2xl">
                            <div className="m-6 flex flex-col">
                                <h3 className="text-lg">
                                    Total Income
                                </h3>
                                <p className="text-xs text-gray-400">Last 60 days</p>
                                <div className="flex items-center space-x-2 mt-4">
                                    <div className="text-primary text-3xl">$956.82k</div>
                                    <div className="flex content-center rounded-full bg-green-200 px-2">
                                        <p className="m-0 text-green-900">+5.4%</p>
                                    </div>
                                </div>
                                <p className="text-xs text-gray-400"><span className="text-green-500">+820</span> vs prev. 60 days</p>
                            </div>
                        </div>
                        <div className="border-black/10 border rounded-2xl ">
                            <div className="m-6 flex flex-col">
                                <h3 className="text-lg">
                                    Total Income
                                </h3>
                                <p className="text-xs text-gray-400">Last 60 days</p>
                                <div className="flex items-center space-x-2 mt-4">
                                    <div className="text-primary text-3xl">$956.82k</div>
                                    <div className="flex content-center rounded-full bg-green-200 px-2">
                                        <p className="m-0 text-green-900">+5.4%</p>
                                    </div>
                                </div>
                                <p className="text-xs text-gray-400"><span className="text-green-500">+820</span> vs prev. 60 days</p>
                            </div>
                        </div>
                        <div className="border-black/10 border rounded-2xl ">
                            <div className="m-6 flex flex-col">
                                <h3 className="text-lg">
                                    Total Income
                                </h3>
                                <p className="text-xs text-gray-400">Last 60 days</p>
                                <div className="flex items-center space-x-2 mt-4">
                                    <div className="text-primary text-3xl">$956.82k</div>
                                    <div className="flex content-center rounded-full bg-green-200 px-2">
                                        <p className="m-0 text-green-900">+5.4%</p>
                                    </div>
                                </div>
                                <p className="text-xs text-gray-400"><span className="text-green-500">+820</span> vs prev. 60 days</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="h-20 lg:flex-[30%] bg-red-600">

                </div>
            </div>
        </div>
    )
}

export default DashboardPage;
