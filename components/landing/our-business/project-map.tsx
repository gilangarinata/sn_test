"use client";

import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { MapPinIcon, ZapIcon, Plus, Minus, RotateCcw } from "lucide-react";
import { motion } from "framer-motion";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
    PopoverAnchor,
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
    const [activePopover, setActivePopover] = useState<string | null>(null);

    const masterContainerRef = useRef<HTMLDivElement>(null);
    const mapAreaRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const checkMouse = () => setHasMouse(window.matchMedia('(hover: hover)').matches);
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
        setActivePopover(null);
    };

    const handleWheel = (e: React.WheelEvent) => {
        if (e.ctrlKey || e.metaKey) {
            const delta = e.deltaY > 0 ? -0.2 : 0.2;
            setScale(prev => {
                const nextScale = Math.min(Math.max(prev + delta, 1), 5);
                if (nextScale === 1) {
                    setPosition({ x: 0, y: 0 });
                } else if (masterContainerRef.current && nextScale !== prev) {
                    const rect = masterContainerRef.current.getBoundingClientRect();
                    const mouseX = e.clientX - rect.left;
                    const mouseY = e.clientY - rect.top;
                    const imageX = (mouseX - position.x) / prev;
                    const imageY = (mouseY - position.y) / prev;

                    const { offsetWidth, offsetHeight } = masterContainerRef.current;
                    const minX = -(offsetWidth * nextScale - offsetWidth);
                    const minY = -(offsetHeight * nextScale - offsetHeight);
                    const targetX = mouseX - imageX * nextScale;
                    const targetY = mouseY - imageY * nextScale;

                    setPosition({
                        x: Math.min(0, Math.max(minX, targetX)),
                        y: Math.min(0, Math.max(minY, targetY))
                    });
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
        // Removed mobile touch pinch bindings as requested.

        return () => {
            container.removeEventListener('wheel', preventDefault);
        };
    }, []);

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
            <div className="bg-white rounded-2xl shadow-[0_8px_30px_rgba(0,0,0,0.12)] border-2 border-gray-800">
                <div className="px-4 pt-4 pb-3 md:px-5 md:pt-5 md:pb-3.5">
                    <h3 className="font-black text-[#1A2B3D] text-sm md:text-base leading-tight uppercase tracking-wide mb-2.5 md:mb-3">
                        {project.name}
                    </h3>
                    <div className="space-y-1.5 md:space-y-2">
                        <div className="flex items-center gap-2 text-[11px] md:text-[13px] text-gray-600">
                            <MapPinIcon className="w-3.5 h-3.5 md:w-4 md:h-4 shrink-0 text-[#3B7DD8]" />
                            <span>{project.location}</span>
                        </div>
                        <div className="flex items-center gap-2 text-[11px] md:text-[13px] text-gray-600">
                            <ZapIcon className="w-3.5 h-3.5 md:w-4 md:h-4 shrink-0 text-[#3B7DD8]" />
                            <span>{project.capacity}</span>
                        </div>
                    </div>
                </div>
                <div className="px-3 pb-3 md:px-4 md:pb-4">
                    {project.image ? (
                        <div className="relative w-full aspect-[16/10] rounded-xl overflow-hidden">
                            <Image src={project.image} alt={project.name} fill className="object-cover" />
                        </div>
                    ) : (
                        <div className="w-full aspect-[16/10] bg-gray-50 rounded-xl flex items-center justify-center text-gray-300 text-[10px] font-bold uppercase tracking-widest">
                            No Project Photo
                        </div>
                    )}
                </div>
            </div>
            <div className="absolute top-full left-1/2 -translate-x-1/2 w-0.5 h-[20px] bg-gradient-to-b from-[#1A4267] to-transparent pointer-events-none" />
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
                    <Image src="/images/maps.webp" alt="Map" fill className="object-fill pointer-events-none" priority draggable={false} />

                    {projects.map((project, idx) => {
                        const Dot = (
                            <div className="absolute" style={{ transform: 'translate(-50%, -50%)' }}>
                                <motion.div
                                    animate={{ scale: 1 / scale }}
                                    whileHover={{ scale: (1 / scale) * 1.15 }}
                                    transition={{ type: "spring", damping: 25, stiffness: 300 }}
                                    className="w-5 h-5 md:w-9 md:h-9 cursor-pointer drop-shadow-2xl pointer-events-auto touch-none"
                                    onPointerDown={(e) => e.stopPropagation()}
                                    onTouchStart={(e) => e.stopPropagation()}
                                    onTap={() => {
                                        if (!hasMouse) setActivePopover(activePopover === project.id ? null : project.id);
                                    }}
                                >
                                    <div className="absolute inset-0 bg-yellow-400 rounded-full animate-ping opacity-30 pointer-events-none" />
                                    <div className="relative w-full h-full bg-white rounded-full flex items-center justify-center p-[1px] md:p-[3px] shadow-2xl ring-1 md:ring-2 ring-white overflow-hidden pointer-events-none">
                                        <Image src="/images/logo_sesna.png" alt="Sesna" fill className="object-contain p-[1px] md:p-[2px]" />
                                    </div>
                                </motion.div>
                            </div>
                        );

                        return (
                            <div key={project.id || idx} className="absolute z-10" style={{ left: `${project.x}%`, top: `${project.y}%` }}>
                                {hasMouse ? (
                                    <HoverCard openDelay={0} closeDelay={100}>
                                        <HoverCardTrigger asChild>
                                            {Dot}
                                        </HoverCardTrigger>
                                        <HoverCardContent className="w-[200px] md:w-[260px] p-0 bg-transparent border-none shadow-none" side="top" sideOffset={20}>
                                            <ProjectInfoCard project={project} />
                                        </HoverCardContent>
                                    </HoverCard>
                                ) : (
                                    <Popover open={activePopover === project.id} onOpenChange={(o) => setActivePopover(o ? project.id : null)}>
                                        <PopoverAnchor asChild>
                                            {Dot}
                                        </PopoverAnchor>
                                        <PopoverContent className="w-[200px] md:w-[260px] p-0 bg-transparent border-none shadow-none z-[200]" side="top" sideOffset={20}>
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
                    <button type="button" onClick={handleZoomIn} className="p-2 md:p-3 bg-white/80 backdrop-blur-xl rounded-lg md:rounded-xl shadow-xl border border-gray-200 text-[#1A4267]"><Plus className="w-5 h-5 md:w-6 md:h-6" /></button>
                    <button type="button" onClick={handleZoomOut} className="p-2 md:p-3 bg-white/80 backdrop-blur-xl rounded-lg md:rounded-xl shadow-xl border border-gray-200 text-[#1A4267]"><Minus className="w-5 h-5 md:w-6 md:h-6" /></button>
                    <button type="button" onClick={handleReset} className="p-2 md:p-3 bg-white/80 backdrop-blur-xl rounded-lg md:rounded-xl shadow-xl border border-gray-200 text-[#1A4267]"><RotateCcw className="w-5 h-5 md:w-6 md:h-6" /></button>
                </div>

                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-[100] px-3 py-1.5 bg-[#1A4267]/40 backdrop-blur-md rounded-full border border-white/10 text-white/90 text-[7px] md:text-[9px] font-bold uppercase tracking-[0.2em] pointer-events-none opacity-0 md:opacity-100 transition-all shadow-xl whitespace-nowrap">
                    {scale > 1 ? "Drag to pan | Ctrl + Scroll to Zoom" : "Ctrl + Scroll to Zoom"}
                </div>
            </div>
        </div>
    );
}
