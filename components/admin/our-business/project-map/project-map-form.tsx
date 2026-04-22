"use client";

import { useState, useRef, MouseEvent, ChangeEvent } from "react";
import Image from "next/image";
import { UploadIcon, ChevronLeft } from "lucide-react";
import { createMapProject, updateMapProject } from "@/lib/actions/admin/map-project.action";
import { useRouter, usePathname } from "next/navigation";
import axiosInstance from "@/lib/axios_config";
import { isBase64Image } from "@/lib/utils";
import Link from "next/link";

interface MapProjectFormProps {
    initialData?: any;
}

export default function MapProjectForm({ initialData }: MapProjectFormProps) {
    const router = useRouter();
    const pathname = usePathname();
    const [isLoading, setIsLoading] = useState(false);

    // Form state
    const [name, setName] = useState(initialData?.name || "");
    const [capacity, setCapacity] = useState(initialData?.capacity || "");
    const [location, setLocation] = useState(initialData?.location || "");
    const [image, setImage] = useState(initialData?.image || "");
    const [x, setX] = useState<number | null>(initialData?.x ?? null);
    const [y, setY] = useState<number | null>(initialData?.y ?? null);
    
    // Upload state
    const [logoFiles, setLogoFiles] = useState<File[]>([]);

    const mapContainerRef = useRef<HTMLDivElement>(null);

    const handleMapClick = (e: MouseEvent<HTMLDivElement>) => {
        if (!mapContainerRef.current) return;
        const rect = mapContainerRef.current.getBoundingClientRect();
        const clickX = e.clientX - rect.left;
        const clickY = e.clientY - rect.top;
        
        const percentX = (clickX / rect.width) * 100;
        const percentY = (clickY / rect.height) * 100;
        
        setX(parseFloat(percentX.toFixed(2)));
        setY(parseFloat(percentY.toFixed(2)));
    };

    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        const fileReader = new FileReader();

        if (e.target.files && e.target.files.length > 0) {
            const file = e.target.files[0];
            setLogoFiles(Array.from(e.target.files));

            if (!file.type.includes("image")) return;

            fileReader.onload = async (event) => {
                const imageDataUrl = event.target?.result?.toString() || "";
                setImage(imageDataUrl);
            };

            fileReader.readAsDataURL(file);
        }
    };

    const startUpload = async (files: File[]) : Promise<{
        message: string;
        fileUrl: string;
    }[]> => {
        const file = files[0];
        const formData = new FormData();
        formData.append('file', file);

        try {
            const response = await axiosInstance.post<{
                message: string;
                fileUrl: string;
            }[]>('/api/upload', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            return response.data;
        } catch (error) {
            console.error('File upload error:', error);
            return [{ message: 'File upload failed', fileUrl: '' }];
        }
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (x === null || y === null) {
            alert("Silakan klik pada peta untuk menentukan lokasi koordinat!");
            return;
        }

        setIsLoading(true);
        
        let imageUrl = image;
        
        // Upload image if it's base64 (newly selected)
        if (isBase64Image(imageUrl)) {
            const uploadRes = await startUpload(logoFiles);
            if (uploadRes && uploadRes[0].fileUrl) {
                imageUrl = uploadRes[0].fileUrl;
            } else {
                alert("Gagal mengupload gambar!");
                setIsLoading(false);
                return;
            }
        }

        let res;
        if (initialData?.id) {
            res = await updateMapProject({ 
                id: initialData.id, 
                name, 
                capacity, 
                location, 
                image: imageUrl, 
                x, 
                y, 
                path: pathname 
            });
        } else {
            res = await createMapProject({ 
                name, 
                capacity, 
                location, 
                image: imageUrl, 
                x, 
                y, 
                path: pathname 
            });
        }
        
        if (res?.error) {
            alert(res.error);
            setIsLoading(false);
            return;
        }
        
        setIsLoading(false);
        // Navigate back to the list
        const listPath = pathname.split('/').slice(0, -1).join('/') || "/admin-panel/our-business/map-projects";
        // If we are at [projectId], we need to go up two levels? No, if pathname is .../map-projects/[id], slicing 0, -1 gives .../map-projects.
        // If pathname is .../map-projects/add, slicing 0, -1 gives .../map-projects.
        router.push(listPath);
        router.refresh();
    };

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <Link 
                    href={pathname.split('/').slice(0, -1).join('/') || "/admin-panel/our-business/map-projects"}
                    className="flex items-center text-sm text-gray-500 hover:text-gray-700 transition font-medium"
                >
                    <ChevronLeft className="w-4 h-4 mr-1" /> Back to List
                </Link>
            </div>

            <div className="bg-white border border-gray-200 rounded-2xl p-8 shadow-sm">
                <h3 className="font-bold text-2xl mb-8 text-gray-800 border-b border-gray-100 pb-6 flex items-center gap-3">
                    <span className="w-2 h-8 bg-[#48749b] rounded-full"></span>
                    {initialData ? "Edit Project Map" : "Add New Project Map"}
                </h3>
                
                <form onSubmit={handleSubmit} className="flex flex-col lg:flex-row gap-12">
                    <div className="flex-1 space-y-6">
                        <div className="grid gap-5">
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">Project Name <span className="text-red-500">*</span></label>
                                <input 
                                    required 
                                    className="w-full border border-gray-300 p-3 rounded-xl focus:ring-4 focus:ring-blue-50 focus:border-[#48749b] outline-none transition-all" 
                                    placeholder="e.g. Commercial Building" 
                                    value={name} 
                                    onChange={(e) => setName(e.target.value)} 
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">Capacity <span className="text-red-500">*</span></label>
                                <input 
                                    required 
                                    className="w-full border border-gray-300 p-3 rounded-xl focus:ring-4 focus:ring-blue-50 focus:border-[#48749b] outline-none transition-all" 
                                    placeholder="e.g. 0.5 MWp + 0.27 MWh BESS" 
                                    value={capacity} 
                                    onChange={(e) => setCapacity(e.target.value)} 
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">Location <span className="text-red-500">*</span></label>
                                <input 
                                    required 
                                    className="w-full border border-gray-300 p-3 rounded-xl focus:ring-4 focus:ring-blue-50 focus:border-[#48749b] outline-none transition-all" 
                                    placeholder="e.g. Morowali Regency, Central Sulawesi" 
                                    value={location} 
                                    onChange={(e) => setLocation(e.target.value)} 
                                />
                            </div>
                        </div>
                        
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-3">Project Image</label>
                            <div className="flex items-start gap-4">
                                {image && (
                                    <div className="relative w-36 h-36 rounded-2xl border-2 border-gray-100 bg-gray-50 overflow-hidden shrink-0 shadow-md">
                                        <Image src={image} alt="Preview" fill className="object-cover" />
                                    </div>
                                )}
                                <label className="flex-1 flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-2xl p-8 cursor-pointer hover:border-[#48749b] hover:bg-blue-50/50 transition-all group h-36">
                                    <UploadIcon className="w-10 h-10 text-gray-400 group-hover:text-[#48749b] group-hover:scale-110 transition-all" />
                                    <span className="mt-3 text-xs font-bold text-gray-500 group-hover:text-[#48749b] transition-all uppercase tracking-widest">Upload Photo</span>
                                    <input type="file" accept="image/*" className="hidden" onChange={handleFileChange} />
                                </label>
                            </div>
                        </div>
                        
                        <div className="bg-gradient-to-br from-slate-50 to-blue-50 p-6 rounded-2xl border border-blue-100 shadow-inner">
                            <div className="flex items-start gap-4">
                                <div className="bg-[#48749b] rounded-xl p-2 shadow-lg shadow-blue-200">
                                    <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                                </div>
                                <div className="flex-1">
                                    <p className="text-sm font-bold text-slate-800">Coordinate Precision</p>
                                    <p className="text-xs text-slate-500 mb-4 font-medium">Pin the exact location on the interactive map.</p>
                                    <div className="flex gap-4">
                                        <div className="flex-1 text-center bg-white py-3 px-4 border border-blue-200 rounded-xl shadow-sm group hover:border-[#48749b] transition-all">
                                            <span className="text-[10px] uppercase font-bold tracking-[0.2em] text-slate-400 block mb-1">X-Axis %</span>
                                            <span className="font-mono font-black text-lg text-[#48749b]">{x !== null ? `${x}%` : '--'}</span>
                                        </div>
                                        <div className="flex-1 text-center bg-white py-3 px-4 border border-blue-200 rounded-xl shadow-sm group hover:border-[#48749b] transition-all">
                                            <span className="text-[10px] uppercase font-bold tracking-[0.2em] text-slate-400 block mb-1">Y-Axis %</span>
                                            <span className="font-mono font-black text-lg text-[#48749b]">{y !== null ? `${y}%` : '--'}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="flex gap-4 pt-8 border-t border-gray-100 mt-2">
                            <button 
                                type="button" 
                                onClick={() => router.back()} 
                                className="px-8 py-3.5 border border-gray-200 rounded-xl text-gray-500 bg-white hover:bg-gray-50 font-bold transition-all flex-1"
                            >
                                Cancel
                            </button>
                            <button 
                                type="submit" 
                                disabled={isLoading} 
                                className="px-8 py-3.5 bg-[#48749b] text-white rounded-xl hover:bg-[#355b81] disabled:opacity-50 font-bold transition-all flex-1 shadow-lg shadow-blue-900/10 active:scale-95"
                            >
                                {isLoading ? "Saving Changes..." : (initialData ? "Update Project" : "Create Project")}
                            </button>
                        </div>
                    </div>

                    <div className="flex-[1.3] flex flex-col">
                        <div className="flex items-center justify-between mb-4">
                            <label className="block text-sm font-bold text-gray-700">Live Placement Preview</label>
                            <span className="text-[10px] font-bold text-blue-500 bg-blue-50 px-2 py-0.5 rounded-full border border-blue-100 uppercase tracking-widest animate-pulse">Interactive</span>
                        </div>
                        <div className="sticky top-10">
                            <div 
                                ref={mapContainerRef}
                                onClick={handleMapClick}
                                className="relative bg-[#A3C4D8] rounded-[2rem] cursor-crosshair overflow-hidden ring-8 ring-slate-50 shadow-2xl hover:ring-blue-50 transition-all duration-500 aspect-video w-full border border-slate-200"
                            >
                                <Image
                                    src="/images/maps.webp"
                                    alt="Interactive Map"
                                    fill
                                    className="object-contain"
                                    draggable={false}
                                />
                                {x !== null && y !== null && (
                                    <div 
                                        className="absolute w-8 h-8 rounded-full bg-yellow-400 border-4 border-white shadow-[0_0_20px_rgba(250,204,21,0.5)] transform -translate-x-1/2 -translate-y-1/2 pointer-events-none transition-all duration-500 ease-out"
                                        style={{ left: `${x}%`, top: `${y}%` }}
                                    >
                                        <div className="absolute top-full left-1/2 -translate-x-1/2 whitespace-nowrap bg-slate-900 text-white text-[11px] font-black px-3 py-1 rounded-full shadow-2xl mt-3 animate-bounce border-2 border-white">
                                            {name || "Current Target"}
                                        </div>
                                        <div className="absolute inset-0 rounded-full bg-yellow-400 animate-ping opacity-40"></div>
                                        <div className="absolute -inset-2 rounded-full border-2 border-white/50 border-dashed animate-[spin_4s_linear_infinite]"></div>
                                    </div>
                                )}
                            </div>
                            <div className="mt-8 p-6 bg-slate-50 rounded-2xl border border-slate-200 relative overflow-hidden group">
                                <div className="absolute top-0 right-0 p-2 opacity-10 group-hover:scale-110 transition-transform">
                                    <svg className="w-12 h-12" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z" /></svg>
                                </div>
                                <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] mb-3">Placement Logic</h4>
                                <p className="text-xs text-slate-600 leading-relaxed font-semibold italic">
                                    "Your clicks are converted to percentage-based coordinates. This ensures the marker stays precisely in the same spot regardless of screen size or responsiveness on the public site."
                                </p>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}
