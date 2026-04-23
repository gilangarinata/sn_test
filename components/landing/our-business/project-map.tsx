"use client";

import React, { useState, useRef, useEffect, useMemo } from "react";
import Image from "next/image";
import { MapPinIcon, ZapIcon, Plus, Minus, RotateCcw } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function ProjectMap({ projects }: { projects: any[] }) {
    const [scale, setScale] = useState(1);
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const containerRef = useRef<HTMLDivElement>(null);

    const clampPosition = (xPos: number, yPos: number, currentScale: number) => {
        if (!containerRef.current) return { x: xPos, y: yPos };
        const { offsetWidth, offsetHeight } = containerRef.current;
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
            if (containerRef.current) {
                const rect = containerRef.current.getBoundingClientRect();
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;
                const imageX = (centerX - position.x) / prev;
                const imageY = (centerY - position.y) / prev;
                const nextX = centerX - imageX * nextScale;
                const nextY = centerY - imageY * nextScale;
                setPosition(clampPosition(nextX, nextY, nextScale));
            }
            return nextScale;
        });
    }

    const handleZoomOut = () => {
        setScale(prev => {
            const nextScale = Math.max(prev - 0.5, 1);
            if (nextScale === 1) {
                setPosition({ x: 0, y: 0 });
            } else if (containerRef.current) {
                const rect = containerRef.current.getBoundingClientRect();
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;
                const imageX = (centerX - position.x) / prev;
                const imageY = (centerY - position.y) / prev;
                const nextX = centerX - imageX * nextScale;
                const nextY = centerY - imageY * nextScale;
                setPosition(clampPosition(nextX, nextY, nextScale));
            }
            return nextScale;
        });
    };

    const handleReset = () => {
        setScale(1);
        setPosition({ x: 0, y: 0 });
    };

    // Native event listener for scroll prevention and pinch
    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        const preventDefault = (e: WheelEvent) => {
            if (e.ctrlKey || e.metaKey) {
                e.preventDefault();
            }
        };

        let initialDistance = 0;
        const handleTouchStart = (e: TouchEvent) => {
            if (e.touches.length === 2) {
                initialDistance = Math.hypot(
                    e.touches[0].pageX - e.touches[1].pageX,
                    e.touches[0].pageY - e.touches[1].pageY
                );
            }
        };

        const handleTouchMove = (e: TouchEvent) => {
            if (e.touches.length === 2 && initialDistance > 0) {
                e.preventDefault();
                const distance = Math.hypot(
                    e.touches[0].pageX - e.touches[1].pageX,
                    e.touches[0].pageY - e.touches[1].pageY
                );
                const delta = (distance - initialDistance) / 200;
                setScale(prev => {
                    const nextScale = Math.min(Math.max(prev + delta, 1), 5);
                    if (containerRef.current) {
                        const rect = containerRef.current.getBoundingClientRect();
                        const centerX = rect.width / 2;
                        const centerY = rect.height / 2;
                        const imageX = (centerX - position.x) / prev;
                        const imageY = (centerY - position.y) / prev;
                        setPosition(clampPosition(centerX - imageX * nextScale, centerY - imageY * nextScale, nextScale));
                    }
                    return nextScale;
                });
                initialDistance = distance;
            }
        };

        container.addEventListener('wheel', preventDefault, { passive: false });
        container.addEventListener('touchstart', handleTouchStart, { passive: true });
        container.addEventListener('touchmove', handleTouchMove, { passive: false });

        return () => {
            container.removeEventListener('wheel', preventDefault);
            container.removeEventListener('touchstart', handleTouchStart);
            container.removeEventListener('touchmove', handleTouchMove);
        };
    }, [position]);

    const handleWheel = (e: React.WheelEvent) => {
        if (e.ctrlKey || e.metaKey) {
            const delta = e.deltaY > 0 ? -0.2 : 0.2;
            setScale(prev => {
                const nextScale = Math.min(Math.max(prev + delta, 1), 5);
                if (nextScale === 1) {
                    setPosition({ x: 0, y: 0 });
                } else if (containerRef.current && nextScale !== prev) {
                    const rect = containerRef.current.getBoundingClientRect();
                    const mouseX = e.clientX - rect.left;
                    const mouseY = e.clientY - rect.top;

                    const imageX = (mouseX - position.x) / prev;
                    const imageY = (mouseY - position.y) / prev;

                    const nextX = mouseX - imageX * nextScale;
                    const nextY = mouseY - imageY * nextScale;
                    
                    setPosition(clampPosition(nextX, nextY, nextScale));
                }
                return nextScale;
            });
        }
    };

    const getDragConstraints = () => {
        if (!containerRef.current) return { left: 0, right: 0, top: 0, bottom: 0 };
        const { offsetWidth, offsetHeight } = containerRef.current;
        return {
            left: -(offsetWidth * scale - offsetWidth),
            right: 0,
            top: -(offsetHeight * scale - offsetHeight),
            bottom: 0
        };
    };

    return (
        <div className="w-full flex flex-col items-center py-10 px-4 gap-6">
            <div className="relative w-full max-w-5xl aspect-video cursor-default group/map-outer">
                {/* 1. CLIPPED LAYER: The actual map image */}
                <div 
                    ref={containerRef}
                    onWheel={handleWheel}
                    className="absolute inset-0 rounded-[2.5rem] overflow-hidden bg-[#f0f9ff]/50 border-4 border-white shadow-2xl touch-none ring-1 ring-[#1A4267]/10"
                >
                    {/* Zooming background image */}
                    <motion.div 
                        className="relative w-full h-full"
                        animate={{ scale, x: position.x, y: position.y }}
                        style={{ transformOrigin: "0 0" }}
                        transition={{ type: "spring", damping: 30, stiffness: 250, mass: 0.5 }}
                    >
                        <Image
                            src="/images/maps.webp"
                            alt="Indonesia Project Map"
                            fill
                            className="object-contain pointer-events-none"
                            priority
                            draggable={false}
                        />
                    </motion.div>
                </div>

                {/* 2. UNCLIPPED LAYER: Markers & Tooltips (They can pop out!) */}
                <div className="absolute inset-0 pointer-events-none z-[50]">
                    <motion.div 
                        className="relative w-full h-full pointer-events-auto"
                        animate={{ 
                            scale,
                            x: position.x,
                            y: position.y
                        }}
                        style={{ transformOrigin: "0 0" }}
                        drag={scale > 1}
                        dragConstraints={getDragConstraints()}
                        dragElastic={0}
                        onDragStart={() => {
                            document.body.style.userSelect = 'none';
                        }}
                        onDragEnd={(_, info) => {
                            document.body.style.userSelect = 'auto';
                            setPosition(prev => ({
                                x: prev.x + info.offset.x,
                                y: prev.y + info.offset.y
                            }));
                        }}
                        transition={{ type: "spring", damping: 30, stiffness: 250, mass: 0.5 }}
                    >
                        {projects.map((project, idx) => {
                            // Boundary Check: Only render if visually inside the map frame
                            // We use a small margin (e.g. -2% to 102%) to allow tooltips to peek out
                            if (!containerRef.current) return null;
                            const { offsetWidth, offsetHeight } = containerRef.current;
                            const visualX = (project.x / 100 * offsetWidth * scale) + position.x;
                            const visualY = (project.y / 100 * offsetHeight * scale) + position.y;
                            
                            const isVisible = 
                                visualX >= -20 && 
                                visualX <= offsetWidth + 20 && 
                                visualY >= -20 && 
                                visualY <= offsetHeight + 20;

                            if (!isVisible) return null;

                            return (
                                <div 
                                    key={project.id || idx} 
                                    className="absolute group z-10 hover:z-50 w-0 h-0 transition-opacity duration-300"
                                    style={{ 
                                        left: `${project.x}%`, 
                                        top: `${project.y}%`,
                                    }}
                                >
                                    <motion.div
                                        animate={{ scale: 1 / scale }}
                                        transition={{ type: "spring", damping: 30, stiffness: 200 }}
                                        className="relative flex flex-col items-center"
                                    >
                                        {/* Connecting Line */}
                                        <div className="absolute left-1/2 bottom-0 w-px h-12 bg-gradient-to-t from-[#1A4267] to-transparent transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none origin-bottom scale-y-0 group-hover:scale-y-100" />
                                        
                                        {/* Hover Card - NOW UNCLIPPED */}
                                        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 -translate-y-12 opacity-0 group-hover:opacity-100 scale-95 group-hover:scale-100 transition-all duration-300 pointer-events-none origin-bottom w-max max-w-[320px] md:max-w-[400px]">
                                            <div className="bg-white/95 backdrop-blur-md rounded-[2rem] shadow-[0_20px_50px_rgba(0,0,0,0.15)] border-2 border-white p-6 overflow-hidden">
                                                <div className="relative mb-4 flex justify-between items-start">
                                                    <h3 className="font-black text-[#1A4267] text-xl md:text-2xl leading-tight uppercase tracking-tighter">
                                                        {project.name}
                                                    </h3>
                                                    <div className="bg-[#48749b]/10 p-2 rounded-xl">
                                                        <ZapIcon className="w-5 h-5 text-blue-600" />
                                                    </div>
                                                </div>
                                                
                                                <div className="space-y-3 mb-5">
                                                    <div className="flex items-start gap-2.5 text-sm font-medium text-[#4C7391]">
                                                        <MapPinIcon className="w-5 h-5 shrink-0 text-blue-500/70" />
                                                        <span className="leading-snug">{project.location}</span>
                                                    </div>
                                                    <div className="inline-flex items-center gap-2 px-3 py-1 bg-yellow-400/10 rounded-full text-xs font-bold text-[#1A4267] border border-yellow-400/20">
                                                        <span className="w-1.5 h-1.5 rounded-full bg-yellow-500 animate-pulse" />
                                                        {project.capacity}
                                                    </div>
                                                </div>

                                                {project.image && (
                                                    <div className="relative w-full aspect-[16/10] rounded-2xl overflow-hidden border border-gray-100 shadow-sm ring-1 ring-black/5">
                                                        <Image
                                                            src={project.image}
                                                            alt={project.name}
                                                            fill
                                                            className="object-cover"
                                                        />
                                                    </div>
                                                )}
                                            </div>
                                        </div>

                                        {/* Main Dot */}
                                        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-6 h-6 md:w-8 md:h-8 cursor-pointer drop-shadow-xl hover:scale-110 transition-transform duration-200">
                                            <div className="absolute inset-0 bg-yellow-400 rounded-full animate-ping opacity-30" />
                                            <div className="relative w-full h-full bg-white rounded-full flex items-center justify-center p-[3px] shadow-lg ring-2 ring-white overflow-hidden">
                                                <Image
                                                    src="/images/logo_sesna.png"
                                                    alt="Sesna"
                                                    fill
                                                    className="object-contain p-[2px]"
                                                />
                                            </div>
                                        </div>
                                    </motion.div>
                                </div>
                            );
                        })}
                    </motion.div>
                </div>

                {/* Floating UI: Over everything */}
                <div className="absolute top-8 right-8 z-[100] flex flex-col gap-3">
                    <button 
                        onClick={handleZoomIn}
                        className="p-3 bg-white/80 backdrop-blur-xl rounded-2xl shadow-xl border border-white/50 hover:bg-blue-50 transition-all text-[#1A4267] active:scale-90 group"
                        title="Zoom In"
                    >
                        <Plus className="w-6 h-6 group-hover:scale-110 transition-transform" />
                    </button>
                    <button 
                        onClick={handleZoomOut}
                        className="p-3 bg-white/80 backdrop-blur-xl rounded-2xl shadow-xl border border-white/50 hover:bg-blue-50 transition-all text-[#1A4267] active:scale-90 group"
                        title="Zoom Out"
                    >
                        <Minus className="w-6 h-6 group-hover:scale-110 transition-transform" />
                    </button>
                    <button 
                        onClick={handleReset}
                        className="p-3 bg-white/80 backdrop-blur-xl rounded-2xl shadow-xl border border-white/50 hover:bg-blue-50 transition-all text-[#1A4267] active:scale-90 group"
                        title="Reset View"
                    >
                        <RotateCcw className="w-6 h-6 group-hover:rotate-[-45deg] transition-transform" />
                    </button>
                </div>

                <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-[100] px-5 py-2.5 bg-[#1A4267]/80 backdrop-blur-xl rounded-full border border-white/20 text-white text-[11px] font-black uppercase tracking-[0.3em] pointer-events-none opacity-0 md:opacity-100 transition-all shadow-2xl">
                   {scale > 1 ? "Drag to pan | Pinch / Ctrl + Scroll to Zoom" : "Pinch / Ctrl + Scroll to Zoom"}
                </div>
            </div>
        </div>
    );
}
