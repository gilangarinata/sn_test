"use client";

import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { MapPinIcon, ZapIcon, Plus, Minus, RotateCcw } from "lucide-react";
import { motion } from "framer-motion";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";

export default function ProjectMap({ projects }: { projects: any[] }) {
    const [scale, setScale] = useState(1);
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [hasMouse, setHasMouse] = useState(true);
    
    const masterContainerRef = useRef<HTMLDivElement>(null);
    const mapAreaRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        // Detect if the device has a mouse (primary hover capability)
        const checkMouse = () => {
            setHasMouse(window.matchMedia('(hover: hover)').matches);
        };
        checkMouse();
        window.addEventListener('resize', checkMouse);
        return () => window.removeEventListener('resize', checkMouse);
    }, []);

    const clampPosition = (xPos: number, yPos: number, currentScale: number) => {
        if (!mapAreaRef.current) return { x: xPos, y: yPos };
        const { offsetWidth, offsetHeight } = mapAreaRef.current;
        const minX = -(offsetWidth * currentScale - offsetWidth);
        const minY = -(offsetHeight * currentScale - offsetHeight);
        return {
            x: Math.min(0, Math.max(minX, xPos)),
            y: Math.min(0, Math.max(minY, yPos))
        };
    };

    const handleZoomIn = () => {
        setScale(prev => {
            const nextScale = Math.min(prev + 0.5, 5);
            if (mapAreaRef.current) {
                const rect = mapAreaRef.current.getBoundingClientRect();
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;
                const imageX = (centerX - position.x) / prev;
                const imageY = (centerY - position.y) / prev;
                setPosition(clampPosition(centerX - imageX * nextScale, centerY - imageY * nextScale, nextScale));
            }
            return nextScale;
        });
    }

    const handleZoomOut = () => {
        setScale(prev => {
            const nextScale = Math.max(prev - 0.5, 1);
            if (nextScale === 1) {
                setPosition({ x: 0, y: 0 });
            } else if (mapAreaRef.current) {
                const rect = mapAreaRef.current.getBoundingClientRect();
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;
                const imageX = (centerX - position.x) / prev;
                const imageY = (centerY - position.y) / prev;
                setPosition(clampPosition(centerX - imageX * nextScale, centerY - imageY * nextScale, nextScale));
            }
            return nextScale;
        });
    };

    const handleReset = () => {
        setScale(1);
        setPosition({ x: 0, y: 0 });
    };

    const handleWheel = (e: React.WheelEvent) => {
        if (e.ctrlKey || e.metaKey) {
            const delta = e.deltaY > 0 ? -0.2 : 0.2;
            setScale(prev => {
                const nextScale = Math.min(Math.max(prev + delta, 1), 5);
                if (nextScale === 1) {
                    setPosition({ x: 0, y: 0 });
                } else if (mapAreaRef.current && nextScale !== prev) {
                    const rect = mapAreaRef.current.getBoundingClientRect();
                    const mouseX = e.clientX - rect.left;
                    const mouseY = e.clientY - rect.top;
                    const imageX = (mouseX - position.x) / prev;
                    const imageY = (mouseY - position.y) / prev;
                    setPosition(clampPosition(mouseX - imageX * nextScale, mouseY - imageY * nextScale, nextScale));
                }
                return nextScale;
            });
        }
    };

    useEffect(() => {
        const container = masterContainerRef.current;
        if (!container) return;
        const preventDefault = (e: WheelEvent) => { if (e.ctrlKey || e.metaKey) e.preventDefault(); };
        container.addEventListener('wheel', preventDefault, { passive: false });
        return () => container.removeEventListener('wheel', preventDefault);
    }, [position]);

    const getDragConstraints = () => {
        if (!mapAreaRef.current) return { left: 0, right: 0, top: 0, bottom: 0 };
        const { offsetWidth, offsetHeight } = mapAreaRef.current;
        return {
            left: -(offsetWidth * scale - offsetWidth),
            right: 0,
            top: -(offsetHeight * scale - offsetHeight),
            bottom: 0
        };
    };

    const ProjectInfoCard = ({ project }: { project: any }) => (
        <div className="relative">
            <div className="p-4 md:p-6 bg-white/95 backdrop-blur-md rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.15)] overflow-hidden">
                <div className="relative mb-3 md:mb-4 flex justify-between items-start">
                    <h3 className="font-black text-[#1A4267] text-lg md:text-2xl leading-tight uppercase tracking-tighter">
                        {project.name}
                    </h3>
                    <div className="bg-[#48749b]/10 p-1.5 md:p-2 rounded-lg md:rounded-xl">
                        <ZapIcon className="w-4 h-4 md:w-5 md:h-5 text-blue-600" />
                    </div>
                </div>
                <div className="space-y-2 md:space-y-3 mb-4 md:mb-5">
                    <div className="flex items-start gap-2 md:gap-2.5 text-[12px] md:text-sm font-medium text-[#4C7391]">
                        <MapPinIcon className="w-4 h-4 md:w-5 md:h-5 shrink-0 text-blue-500/70" />
                        <span className="leading-snug">{project.location}</span>
                    </div>
                    <div className="inline-flex items-center gap-1.5 md:gap-2 px-2.5 py-1 bg-yellow-400/10 rounded-full text-[10px] md:text-xs font-bold text-[#1A4267] border border-yellow-400/20">
                        <span className="w-1 md:w-1.5 h-1 md:h-1.5 rounded-full bg-yellow-500 animate-pulse" />
                        {project.capacity}
                    </div>
                </div>
                {project.image ? (
                    <div className="relative w-full aspect-[16/10] rounded-xl overflow-hidden border border-gray-100 shadow-sm ring-1 ring-black/5">
                        <Image src={project.image} alt={project.name} fill className="object-cover" />
                    </div>
                ) : (
                    <div className="w-full aspect-[16/10] bg-gray-50 rounded-xl flex items-center justify-center border border-dashed text-gray-300 text-xs font-bold uppercase tracking-widest">
                        No Project Photo
                    </div>
                )}
            </div>
            {/* The Connecting Line */}
            <div className="absolute top-full left-1/2 -translate-x-1/2 w-0.5 h-[30px] bg-gradient-to-b from-[#1A4267] to-transparent pointer-events-none" />
        </div>
    );

    return (
        <div className="w-full flex flex-col items-center py-10 px-4 gap-6">
            <div 
                ref={masterContainerRef}
                onWheel={handleWheel}
                className="relative w-full max-w-5xl aspect-[1860/760] bg-transparent group/map-outer overflow-hidden"
            >
                <motion.div 
                    ref={mapAreaRef}
                    className="relative w-full h-full"
                    animate={{ scale, x: position.x, y: position.y }}
                    style={{ transformOrigin: "0 0" }}
                    drag={scale > 1}
                    dragConstraints={getDragConstraints()}
                    dragElastic={0}
                    onDragStart={() => { document.body.style.userSelect = 'none'; }}
                    onDragEnd={(_, info) => {
                        document.body.style.userSelect = 'auto';
                        setPosition(prev => ({ x: prev.x + info.offset.x, y: prev.y + info.offset.y }));
                    }}
                    transition={{ type: "spring", damping: 30, stiffness: 250, mass: 0.5 }}
                >
                    <Image
                        src="/images/maps.webp"
                        alt="Map"
                        fill
                        className="object-fill pointer-events-none"
                        priority
                        draggable={false}
                    />

                    {projects.map((project, idx) => {
                        const Dot = (
                            <motion.div
                                animate={{ scale: 1 / scale, x: "-50%", y: "-50%" }}
                                whileHover={{ scale: (1 / scale) * 1.15 }}
                                transition={{ type: "spring", damping: 25, stiffness: 300 }}
                                className="absolute w-5 h-5 md:w-9 md:h-9 cursor-pointer drop-shadow-2xl pointer-events-auto"
                            >
                                <div className="absolute inset-0 bg-yellow-400 rounded-full animate-ping opacity-30" />
                                <div className="relative w-full h-full bg-white rounded-full flex items-center justify-center p-[1px] md:p-[3px] shadow-2xl ring-1 md:ring-2 ring-white overflow-hidden">
                                    <Image
                                        src="/images/logo_sesna.png"
                                        alt="Sesna"
                                        fill
                                        className="object-contain p-[1px] md:p-[2px]"
                                    />
                                </div>
                            </motion.div>
                        );

                        return (
                            <div key={project.id || idx} className="absolute z-10 w-0 h-0" style={{ left: `${project.x}%`, top: `${project.y}%` }}>
                                {hasMouse ? (
                                    <HoverCard openDelay={0} closeDelay={100}>
                                        <HoverCardTrigger asChild>{Dot}</HoverCardTrigger>
                                        <HoverCardContent className="w-[280px] md:w-[400px] p-0 bg-transparent border-none shadow-none" side="top" sideOffset={30}>
                                            <ProjectInfoCard project={project} />
                                        </HoverCardContent>
                                    </HoverCard>
                                ) : (
                                    <Popover>
                                        <PopoverTrigger asChild>{Dot}</PopoverTrigger>
                                        <PopoverContent className="w-[280px] md:w-[400px] p-0 bg-transparent border-none shadow-none" side="top" sideOffset={30}>
                                            <ProjectInfoCard project={project} />
                                        </PopoverContent>
                                    </Popover>
                                )}
                            </div>
                        );
                    })}
                </motion.div>

                {/* Overlays */}
                <div className="absolute top-4 right-4 md:top-8 md:right-8 z-[100] flex flex-col gap-2 md:gap-3">
                    <button onClick={handleZoomIn} className="p-2 md:p-3 bg-white/80 backdrop-blur-xl rounded-lg md:rounded-xl shadow-xl border border-gray-200 text-[#1A4267]"><Plus className="w-5 h-5 md:w-6 md:h-6" /></button>
                    <button onClick={handleZoomOut} className="p-2 md:p-3 bg-white/80 backdrop-blur-xl rounded-lg md:rounded-xl shadow-xl border border-gray-200 text-[#1A4267]"><Minus className="w-5 h-5 md:w-6 md:h-6" /></button>
                    <button onClick={handleReset} className="p-2 md:p-3 bg-white/80 backdrop-blur-xl rounded-lg md:rounded-xl shadow-xl border border-gray-200 text-[#1A4267]"><RotateCcw className="w-5 h-5 md:w-6 md:h-6" /></button>
                </div>

                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-[100] px-4 py-2 bg-[#1A4267]/80 backdrop-blur-xl rounded-full border border-white/20 text-white text-[9px] md:text-[11px] font-black uppercase tracking-[0.2em] md:tracking-[0.3em] pointer-events-none opacity-0 md:opacity-100 transition-all shadow-2xl whitespace-nowrap">
                   {scale > 1 ? "Drag to pan | Pinch / Ctrl + Scroll to Zoom" : "Pinch / Ctrl + Scroll to Zoom"}
                </div>
            </div>
        </div>
    );
}
