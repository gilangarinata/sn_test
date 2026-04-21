"use client";

import { useState, useRef, MouseEvent, ChangeEvent } from "react";
import Image from "next/image";
import { PlusIcon, TrashIcon, EditIcon, MapPinIcon, UploadIcon } from "lucide-react";
import { createMapProject, updateMapProject, deleteMapProject } from "@/lib/actions/admin/map-project.action";
import { usePathname } from "next/navigation";
import axiosInstance from "@/lib/axios_config";
import { isBase64Image } from "@/lib/utils";

export default function MapProjectsClient({ initialProjects }: { initialProjects: any[] }) {
    const pathname = usePathname();
    const [isAdding, setIsAdding] = useState(false);
    const [editingId, setEditingId] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    // Form state
    const [name, setName] = useState("");
    const [capacity, setCapacity] = useState("");
    const [location, setLocation] = useState("");
    const [image, setImage] = useState("");
    const [x, setX] = useState<number | null>(null);
    const [y, setY] = useState<number | null>(null);
    
    // Upload state
    const [logoFiles, setLogoFiles] = useState<File[]>([]);

    const mapContainerRef = useRef<HTMLDivElement>(null);

    const resetForm = () => {
        setName("");
        setCapacity("");
        setLocation("");
        setImage("");
        setX(null);
        setY(null);
        setEditingId(null);
        setIsAdding(false);
        setLogoFiles([]);
    };

    const handleEdit = (project: any) => {
        setName(project.name);
        setCapacity(project.capacity);
        setLocation(project.location);
        setImage(project.image || "");
        setX(project.x);
        setY(project.y);
        setEditingId(project.id);
        setIsAdding(true);
    };

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
        if (editingId) {
            res = await updateMapProject({ 
                id: editingId, 
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
        resetForm();
    };

    const handleDelete = async (id: string) => {
        if (!confirm("Are you sure?")) return;
        setIsLoading(true);
        await deleteMapProject(id, pathname);
        setIsLoading(false);
    };

    return (
        <div>
            {!isAdding ? (
                <div className="flex justify-end mb-4">
                    <button 
                        onClick={() => setIsAdding(true)}
                        className="flex items-center gap-2 bg-[#48749b] text-white px-4 py-2 rounded shadow hover:bg-[#355b81] transition"
                    >
                        <PlusIcon className="w-4 h-4" /> Add Map Project
                    </button>
                </div>
            ) : (
                <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 mb-6">
                    <h3 className="font-bold text-lg mb-4 text-gray-700">{editingId ? "Edit Project Map" : "Add New Project Map"}</h3>
                    <form onSubmit={handleSubmit} className="flex flex-col lg:flex-row gap-8">
                        {/* Form Fields */}
                        <div className="flex-1 space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Project Name <span className="text-red-500">*</span></label>
                                <input required className="w-full border p-2 rounded" placeholder="e.g. Commercial Building" value={name} onChange={(e) => setName(e.target.value)} />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Capacity <span className="text-red-500">*</span></label>
                                <input required className="w-full border p-2 rounded" placeholder="e.g. 0.5 MWp + 0.27 MWh BESS" value={capacity} onChange={(e) => setCapacity(e.target.value)} />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Location <span className="text-red-500">*</span></label>
                                <input required className="w-full border p-2 rounded" placeholder="e.g. Morowali Regency, Central Sulawesi" value={location} onChange={(e) => setLocation(e.target.value)} />
                            </div>
                            
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Project Image</label>
                                <div className="flex items-center gap-4">
                                    {image && (
                                        <div className="relative w-24 h-24 rounded border overflow-hidden shrink-0">
                                            <Image src={image} alt="Preview" fill className="object-cover" />
                                        </div>
                                    )}
                                    <label className="flex-1 flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-lg p-4 cursor-pointer hover:border-[#48749b] transition group">
                                        <UploadIcon className="w-8 h-8 text-gray-400 group-hover:text-[#48749b] transition" />
                                        <span className="mt-2 text-sm text-gray-500 group-hover:text-[#48749b] transition">Click to upload image</span>
                                        <input type="file" accept="image/*" className="hidden" onChange={handleFileChange} />
                                    </label>
                                </div>
                            </div>
                            
                            <div className="flex gap-4 items-center bg-blue-50 p-3 rounded border border-blue-100">
                                <div>
                                    <p className="text-sm font-semibold text-blue-900">Map Coordinates</p>
                                    <p className="text-xs text-blue-700 mb-1">Click on the map image to select coordinating points.</p>
                                    <div className="flex gap-4">
                                        <div className="text-sm font-mono bg-white px-2 border rounded">X: {x !== null ? `${x}%` : 'Not Set'}</div>
                                        <div className="text-sm font-mono bg-white px-2 border rounded">Y: {y !== null ? `${y}%` : 'Not Set'}</div>
                                    </div>
                                </div>
                            </div>

                            <div className="flex gap-2 pt-4">
                                <button type="button" onClick={resetForm} className="px-4 py-2 border rounded text-gray-600 bg-white hover:bg-gray-100 transition flex-1">Cancel</button>
                                <button type="submit" disabled={isLoading} className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 disabled:opacity-50 transition flex-1">
                                    {isLoading ? "Saving..." : "Save Project"}
                                </button>
                            </div>
                        </div>

                        {/* Interactive Map Picker */}
                        <div className="flex-1">
                            <p className="text-sm font-medium text-gray-700 mb-2">Click to Set Location Marker</p>
                            <div 
                                ref={mapContainerRef}
                                onClick={handleMapClick}
                                className="relative bg-[#A3C4D8] rounded cursor-crosshair overflow-hidden ring-2 ring-dashed ring-gray-400 hover:ring-blue-500 transition aspect-video w-full"
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
                                        className="absolute w-4 h-4 rounded-full bg-yellow-400 border-2 border-white shadow-md transform -translate-x-1/2 -translate-y-1/2 pointer-events-none"
                                        style={{ left: `${x}%`, top: `${y}%` }}
                                    >
                                        <div className="absolute top-full left-1/2 -translate-x-1/2 whitespace-nowrap bg-indigo-900 text-white text-[10px] px-1 rounded mt-1">
                                            {name || "Marker"}
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </form>
                </div>
            )}

            {/* List Table */}
            <div className="bg-white rounded border overflow-x-auto">
                <table className="w-full text-left text-sm text-gray-600 border-collapse">
                    <thead className="bg-gray-50 border-b border-gray-200">
                        <tr>
                            <th className="p-3">Project Name</th>
                            <th className="p-3">Location</th>
                            <th className="p-3">Coordinates (X, Y)</th>
                            <th className="p-3 text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {initialProjects.map((project) => (
                            <tr key={project.id} className="border-b border-gray-100 hover:bg-gray-50">
                                <td className="p-3 font-medium">
                                    <div className="flex items-center gap-2">
                                        {project.image ? (
                                            <div className="w-8 h-8 relative rounded overflow-hidden shadow shrink-0">
                                                <Image src={project.image} alt="thumb" fill className="object-cover" />
                                            </div>
                                        ) : (
                                            <div className="w-8 h-8 rounded bg-gray-200 flex items-center justify-center shrink-0">
                                                <MapPinIcon className="w-4 h-4 text-gray-400" />
                                            </div>
                                        )}
                                        <div>
                                            <p>{project.name}</p>
                                            <p className="text-xs text-gray-400">{project.capacity}</p>
                                        </div>
                                    </div>
                                </td>
                                <td className="p-3">{project.location}</td>
                                <td className="p-3 font-mono text-xs text-gray-500 bg-gray-50 border-x">
                                    {project.x}% , {project.y}%
                                </td>
                                <td className="p-3">
                                    <div className="flex justify-end gap-3">
                                        <button onClick={() => handleEdit(project)} className="text-[#48749b] hover:text-blue-700 transition" disabled={isLoading}>
                                            <EditIcon className="w-4 h-4" />
                                        </button>
                                        <button onClick={() => handleDelete(project.id)} className="text-red-500 hover:text-red-700 transition" disabled={isLoading}>
                                            <TrashIcon className="w-4 h-4" />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                        {initialProjects.length === 0 && (
                            <tr><td colSpan={4} className="text-center p-6 text-gray-500">No map projects added yet.</td></tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
