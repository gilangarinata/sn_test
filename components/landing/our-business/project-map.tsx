"use client";

import React from "react";
import Image from "next/image";
import { MapPinIcon, ZapIcon } from "lucide-react";

export default function ProjectMap({ projects }: { projects: any[] }) {
    
    return (
        <div className="w-full flex justify-center py-10 px-4">
            {/* Map Container */}
            <div className="relative w-full max-w-5xl aspect-video">
                {/* Background Map Image */}
                <Image
                    src="/images/maps.webp"
                    alt="Indonesia Project Map"
                    fill
                    className="object-contain"
                    priority
                />

                {/* Map Markers & Tooltips */}
                {projects.map((project, idx) => (
                    <div 
                        key={project.id || idx} 
                        className="absolute group z-10 hover:z-50 w-0 h-0"
                        style={{ left: `${project.x}%`, top: `${project.y}%` }}
                    >
                        {/* Connecting Line */}
                        <div className="absolute left-0 bottom-0 w-px h-10 bg-[#355b81] transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none origin-bottom scale-y-0 group-hover:scale-y-100" />
                        
                        {/* Tooltip Card */}
                        <div className="absolute bottom-0 left-0 transform -translate-x-1/2 -translate-y-12 opacity-0 group-hover:opacity-100 scale-95 group-hover:scale-100 transition-all duration-300 pointer-events-none origin-bottom w-max max-w-[320px] md:max-w-[400px]">
                            <div className="bg-white rounded-2xl shadow-2xl border-2 border-[#1A4267] p-5 backdrop-blur-sm overflow-hidden">
                                <h3 className="font-bold text-[#1A4267] text-lg md:text-xl mb-3 leading-tight uppercase tracking-tight">
                                    {project.name}
                                </h3>
                                
                                <div className="space-y-2 mb-4">
                                    <div className="flex items-start gap-2 text-sm text-[#4C7391]">
                                        <MapPinIcon className="w-4 h-4 shrink-0 mt-0.5 text-blue-500" />
                                        <span className="leading-snug">{project.location}</span>
                                    </div>
                                    <div className="flex items-center gap-2 text-sm text-[#4C7391]">
                                        <ZapIcon className="w-4 h-4 shrink-0 text-blue-500" />
                                        <span className="font-semibold">{project.capacity}</span>
                                    </div>
                                </div>

                                {project.image && (
                                    <div className="relative w-full aspect-video rounded-xl overflow-hidden border border-gray-100 shadow-sm">
                                        <Image
                                            src={project.image}
                                            alt={project.name}
                                            fill
                                            className="object-cover transition-transform duration-500 group-hover:scale-110"
                                        />
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Point Marker (SESNA Logo or simple pinpoint) */}
                        <div className="absolute top-0 left-0 transform -translate-x-1/2 -translate-y-1/2 w-4 h-4 md:w-6 md:h-6 cursor-pointer drop-shadow-md hover:scale-125 transition-transform duration-200">
                             {/* As per user request: "titik tersebut pakai logo sesna" */}
                            <div className="absolute inset-0 bg-[#FBD00F] rounded-full animate-ping opacity-30" />
                            <div className="relative w-full h-full bg-white rounded-full flex items-center justify-center p-[2px] shadow shadow-black/30 ring-1 ring-white/50">
                                <Image
                                    src="/images/logo_sesna.png"
                                    alt="Sesna"
                                    fill
                                    className="object-contain p-[1px]"
                                />
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
