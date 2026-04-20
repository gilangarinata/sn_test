"use client"

import {Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table";
import {
    Dialog,
    DialogContent,
    DialogDescription, DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from "@/components/ui/dialog";
import {Button} from "@/components/ui/button";
import {EditIcon, PlusIcon, Trash2Icon, TrashIcon} from "lucide-react";
import AddEditVideo from "@/components/admin/media/video/edit-video";
import {Input} from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import RichTextEditor from "@/components/rich-text-editor";
import Image from "next/image";
import React, {ChangeEvent, SetStateAction, useEffect, useState} from "react";


import AddEditBanner from "@/components/admin/home/banners/edit-banner";
import {deleteBanner, fetchBanners} from "@/lib/actions/admin/banner.action";
import Spinner from "@/components/spinner";
import {deleteExperience, fetchExperiences, fetchMainExperience} from "@/lib/actions/admin/experience.action";
import AddEditExperience from "@/components/admin/home/experience/edit-experience";
import {Label} from "@/components/ui/label";
import {Achievement} from "@/components/admin/home/achievement/achievement-table";
import mongoose from "mongoose";
import {deleteNews, fetchAllNews} from "@/lib/actions/admin/news.action";
import AddEditNews from "@/components/admin/media/news/edit-news";
import {formatDateString} from "@/lib/utils";
import {Category} from "@/components/admin/media/category/category-table";
import axiosInstance from "@/lib/axios_config";
import { deleteVideo, fetchAllVideos } from "@/lib/actions/admin/video.action";
import { fetchCategories } from "@/lib/actions/admin/news-category.action";
import { ChevronLeft, ChevronRight, Search } from "lucide-react";

export type Video = {
    _id: any,
    id: string,
    title: string,
    description: string,
    videoUrl: string,
    status?: string,
    publishAt?: string,
    createdAt: Date,
    category: Category
}

function VideoTable() {
    const [videos, setVideos] = useState<Video[]>([]);
    const [page, setPage] = useState(1);
    const [isLoading, setIsLoading] = useState(false);
    const [totalPages, setTotalPages] = useState(1);
    
    // Filter states
    const [search, setSearch] = useState("");
    const [statusFilter, setStatusFilter] = useState("all");
    const [categoryFilter, setCategoryFilter] = useState("all");
    const [categories, setCategories] = useState<Category[]>([]);

    const [open, setOpen] = useState<{banner : Video | null, isOpen : boolean}>({banner: null, isOpen:false});
    const [deleteLoading, setDeleteLoading] = useState(false);
    const [createBannerOpen, setCreateBannerOpen] = useState<{banner : Video | null, isOpen : boolean}>({banner: null, isOpen: false})

    const getCategories = async () => {
        const result = await fetchCategories('video');
        setCategories(result?.categories || []);
    };

    const getVideos = async (pageNumber: number, searchTerm: string, status: string, category: string) => {
        try {
            setIsLoading(true);
            const result = await fetchAllVideos(
                pageNumber, 
                10, 
                category === "all" ? undefined : category, 
                undefined, 
                undefined, 
                searchTerm, 
                status
            );
            if (result?.banners) {
                setVideos(result.banners as Video[]);
                setTotalPages(result.totalPages || 1);
            }
            setIsLoading(false);
        } catch (error) {
            setIsLoading(false);
            console.error("Failed to fetch videos", error);
        }
    };

    useEffect(() => {
        getCategories();
    }, []);

    useEffect(() => {
        const delayDebounceFn = setTimeout(() => {
            setPage(1);
            getVideos(1, search, statusFilter, categoryFilter);
        }, 500);

        return () => clearTimeout(delayDebounceFn);
    }, [search, statusFilter, categoryFilter]);

    useEffect(() => {
        getVideos(page, search, statusFilter, categoryFilter);
    }, [page]);

    const handleDelete = async (id: string) => {
        try {
            setDeleteLoading(true);
            await deleteVideo({id: id});
            setDeleteLoading(false);
            setOpen({banner: null, isOpen: false});
            getVideos(page, search, statusFilter, categoryFilter);
        } catch (e) {
            setDeleteLoading(false);
            console.log("eror delete " + e);
        }
    }

    return (
            <div className="flex flex-col">
                <Dialog open={open.isOpen} onOpenChange={(isOpen) => setOpen({banner: null, isOpen})}>
                    <DialogContent className="sm:max-w-[425px]">
                        <DialogHeader>
                            <DialogTitle>Delete Item</DialogTitle>
                            <DialogDescription>
                                Are you sure want to delete this item?
                            </DialogDescription>
                        </DialogHeader>
                        <DialogFooter>
                            <div className="flex gap-2">
                                <Button variant="outline" onClick={(bt) => {
                                    bt.preventDefault();
                                    setOpen({banner:null, isOpen:false})
                                }}>Cancel</Button>
                                <Button variant="destructive" onClick={(bt) => {
                                    bt.preventDefault();
                                    handleDelete(open?.banner?.id ?? "");
                                }}>{deleteLoading ? <Spinner /> : `Delete Item`}</Button>
                            </div>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>

                <Dialog open={createBannerOpen.isOpen} onOpenChange={(isOpen) => setCreateBannerOpen(prevState => {
                    return  {isOpen: isOpen, banner: null}
                })}>
                    <div className="flex flex-col gap-4 mt-2 mx-8 mb-4">
                        <div className="flex flex-wrap items-center justify-between gap-4">
                            <Button onClick={(bt) => {
                                bt.preventDefault();
                                setCreateBannerOpen({banner: null, isOpen:true})
                            }} variant="outline" className="w-fit"><PlusIcon className="w-4 h-4 mr-2"/> Add Video</Button>

                            <div className="flex flex-wrap items-center gap-2">
                                <div className="relative w-64">
                                    <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                                    <Input
                                        placeholder="Search videos..."
                                        className="pl-8"
                                        value={search}
                                        onChange={(e) => setSearch(e.target.value)}
                                    />
                                </div>

                                <Select value={statusFilter} onValueChange={setStatusFilter}>
                                    <SelectTrigger className="w-[150px]">
                                        <SelectValue placeholder="Status" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="all">All Status</SelectItem>
                                        <SelectItem value="Published">Published</SelectItem>
                                        <SelectItem value="Draft">Draft</SelectItem>
                                        <SelectItem value="Scheduled">Scheduled</SelectItem>
                                    </SelectContent>
                                </Select>

                                <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                                    <SelectTrigger className="w-[180px]">
                                        <SelectValue placeholder="Category" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="all">All Categories</SelectItem>
                                        {categories.map((cat) => (
                                            <SelectItem key={cat._id} value={cat._id}>
                                                {cat.name}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>
                    </div>

                    <DialogContent onInteractOutside={(e) => {
                        e.preventDefault();
                    }} className="sm:max-w-[425px]">
                        <DialogHeader>
                            <DialogTitle>{createBannerOpen.banner ? "Edit Video" : "Add Video"}</DialogTitle>
                        </DialogHeader>
                        <div className="overflow-y-auto max-h-[420px] py-4">
                            <AddEditVideo achievement={createBannerOpen.banner == null ? undefined : createBannerOpen.banner} onNeedRefresh={() => {
                                setCreateBannerOpen({banner: null, isOpen:false})
                                getVideos(page, search, statusFilter, categoryFilter);
                            }} />
                        </div>
                    </DialogContent>
                </Dialog>

                <div className="rounded-md border mx-8 mb-10 overflow-hidden">
                    <div className="overflow-x-auto">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Title</TableHead>
                                    <TableHead>Description</TableHead>
                                    <TableHead>Video Url</TableHead>
                                    <TableHead>Category</TableHead>
                                    <TableHead>Status</TableHead>
                                    <TableHead className="text-right">Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {isLoading ? (
                                    <TableRow>
                                        <TableCell colSpan={6} className="h-24 text-center">
                                            <div className="flex justify-center items-center gap-2">
                                                <Spinner /> <span>Loading videos...</span>
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                ) : videos.length === 0 ? (
                                    <TableRow>
                                        <TableCell colSpan={6} className="h-24 text-center">
                                            No videos found.
                                        </TableCell>
                                    </TableRow>
                                ) : (
                                    videos.map((experience) => (
                                        <TableRow key={experience.id}>
                                            <TableCell className="font-medium">{experience.title}</TableCell>
                                            <TableCell className="max-w-xs">
                                                <p className="truncate text-muted-foreground" dangerouslySetInnerHTML={{__html: experience.description}} />
                                            </TableCell>
                                            <TableCell className="truncate max-w-[150px]">{experience.videoUrl}</TableCell>
                                            <TableCell>{experience.category?.name}</TableCell>
                                            <TableCell>
                                                <span className={`px-2 py-1 rounded-full text-[10px] font-semibold uppercase tracking-wider ${
                                                    experience.status === 'Published' ? 'bg-green-100 text-green-800' :
                                                    experience.status === 'Scheduled' ? 'bg-blue-100 text-blue-800' :
                                                    'bg-yellow-100 text-yellow-800'
                                                }`}>
                                                    {experience.status || 'Draft'}
                                                </span>
                                            </TableCell>
                                            <TableCell className="text-right">
                                                <div className="flex items-center justify-end gap-3">
                                                    <EditIcon 
                                                        width={16} 
                                                        className="text-gray-600 hover:text-primary transition-colors cursor-pointer" 
                                                        onClick={(bt) => {
                                                            bt.preventDefault();
                                                            setCreateBannerOpen({banner: experience, isOpen: true})
                                                        }} 
                                                    />
                                                    <Trash2Icon 
                                                        onClick={() => setOpen({banner: experience, isOpen: true})} 
                                                        width={16} 
                                                        className="text-red-500 hover:text-red-700 transition-colors cursor-pointer" 
                                                    />
                                                </div>
                                            </TableCell>
                                        </TableRow>
                                    ))
                                )}
                            </TableBody>
                        </Table>
                    </div>

                    {/* Pagination Controls */}
                    <div className="flex items-center justify-between px-4 py-4 border-t bg-muted/50">
                        <div className="text-sm text-muted-foreground">
                            Showing <span className="font-medium">{videos.length}</span> videos
                        </div>
                        <div className="flex items-center gap-2">
                            <Button
                                variant="outline"
                                size="sm"
                                disabled={page <= 1 || isLoading}
                                onClick={() => setPage(prev => prev - 1)}
                            >
                                <ChevronLeft className="h-4 w-4 mr-1" /> Previous
                            </Button>
                            <div className="text-sm font-medium">
                                Page {page} of {totalPages}
                            </div>
                            <Button
                                variant="outline"
                                size="sm"
                                disabled={page >= totalPages || isLoading}
                                onClick={() => setPage(prev => prev + 1)}
                            >
                                Next <ChevronRight className="h-4 w-4 ml-1" />
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
    )
}

export default VideoTable;