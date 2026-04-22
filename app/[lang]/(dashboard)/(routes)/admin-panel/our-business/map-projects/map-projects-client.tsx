"use client";

import { useState } from "react";
import Image from "next/image";
import { PlusIcon, TrashIcon, EditIcon, MapPinIcon } from "lucide-react";
import { deleteMapProject } from "@/lib/actions/admin/map-project.action";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";

export default function MapProjectsClient({ initialProjects }: { initialProjects: any[] }) {
    const pathname = usePathname();
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);

    const handleDelete = async (id: string) => {
        if (!confirm("Are you sure?")) return;
        setIsLoading(true);
        await deleteMapProject(id, pathname);
        setIsLoading(false);
    };

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center bg-white p-4 rounded-xl border shadow-sm">
                <div>
                    <h3 className="font-bold text-lg text-gray-800">Project List</h3>
                    <p className="text-xs text-gray-500">Manage all your interactive map projects here.</p>
                </div>
                <Link 
                    href={`${pathname}/add`}
                    className="flex items-center gap-2 bg-[#48749b] text-white px-5 py-2.5 rounded-lg shadow-lg shadow-blue-900/10 hover:bg-[#355b81] transition-all font-bold text-sm active:scale-95"
                >
                    <PlusIcon className="w-4 h-4" /> Add Map Project
                </Link>
            </div>

            {/* List Table */}
            <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm">
                <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm text-gray-600 border-collapse">
                        <thead>
                            <tr className="bg-gray-50/50 border-b border-gray-200">
                                <th className="p-4 font-bold text-gray-700 uppercase tracking-wider text-[10px]">Project Details</th>
                                <th className="p-4 font-bold text-gray-700 uppercase tracking-wider text-[10px]">Location</th>
                                <th className="p-4 font-bold text-gray-700 uppercase tracking-wider text-[10px]">Coordinates</th>
                                <th className="p-4 font-bold text-gray-700 uppercase tracking-wider text-[10px] text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {initialProjects.map((project) => (
                                <tr key={project.id} className="hover:bg-blue-50/30 transition-colors group">
                                    <td className="p-4">
                                        <div className="flex items-center gap-4">
                                            {project.image ? (
                                                <div className="w-12 h-12 relative rounded-xl overflow-hidden shadow-sm border border-gray-100 shrink-0">
                                                    <Image src={project.image} alt="thumb" fill className="object-cover group-hover:scale-110 transition-transform duration-500" />
                                                </div>
                                            ) : (
                                                <div className="w-12 h-12 rounded-xl bg-gray-100 flex items-center justify-center shrink-0 border border-gray-200">
                                                    <MapPinIcon className="w-5 h-5 text-gray-400" />
                                                </div>
                                            )}
                                            <div>
                                                <p className="font-bold text-gray-900 text-sm">{project.name}</p>
                                                <p className="text-[11px] text-gray-400 font-medium">{project.capacity}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="p-4">
                                        <span className="text-xs font-semibold text-gray-600 bg-gray-100 px-3 py-1 rounded-full">{project.location}</span>
                                    </td>
                                    <td className="p-4">
                                        <div className="flex gap-2">
                                            <span className="font-mono text-[10px] bg-slate-100 px-2 py-0.5 rounded border border-slate-200 text-slate-500 font-bold">X: {project.x}%</span>
                                            <span className="font-mono text-[10px] bg-slate-100 px-2 py-0.5 rounded border border-slate-200 text-slate-500 font-bold">Y: {project.y}%</span>
                                        </div>
                                    </td>
                                    <td className="p-4">
                                        <div className="flex justify-end gap-2">
                                            <Link 
                                                href={`${pathname}/${project.id}`} 
                                                className="p-2 text-gray-400 hover:text-[#48749b] hover:bg-blue-50 rounded-lg transition-all"
                                            >
                                                <EditIcon className="w-4 h-4" />
                                            </Link>
                                            <button 
                                                onClick={() => handleDelete(project.id)} 
                                                className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all" 
                                                disabled={isLoading}
                                            >
                                                <TrashIcon className="w-4 h-4" />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                            {initialProjects.length === 0 && (
                                <tr>
                                    <td colSpan={4} className="text-center p-20">
                                        <div className="flex flex-col items-center opacity-40">
                                            <MapPinIcon className="w-12 h-12 mb-2 text-gray-300" />
                                            <p className="text-sm font-bold text-gray-400 uppercase tracking-widest">Empty State</p>
                                            <p className="text-xs text-gray-400 mt-1">No map projects added to the database yet.</p>
                                        </div>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
