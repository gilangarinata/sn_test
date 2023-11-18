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
import {DialogBody} from "next/dist/client/components/react-dev-overlay/internal/components/Dialog";
import {Input} from "@/components/ui/input";
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
import {deleteVideo, fetchAllVideos} from "@/lib/actions/admin/video.action";
import AddEditVideo from "@/components/admin/media/video/edit-video";

export type Video = {
    _id: any,
    id: string,
    title: string,
    description: string,
    videoUrl: string,
    createdAt: Date,
    category: Category
}

function VideoTable() {

    const [news, setNews] = useState<Video[]>()

    async function getExperiences() {
        const banners = await fetchAllVideos(1,200);
        //console.log("banner:-")
        // //console.log(banner)
        setNews(banners?.banners as SetStateAction<Video[] | undefined>);
    }

    useEffect(() => {
        getExperiences()
    }, [])

    const [open, setOpen] = useState<{banner : Video | null, isOpen : boolean}>({banner: null, isOpen:false});
    const [deleteLoading, setDeleteLoading] = useState(false);
    const [createBannerOpen, setCreateBannerOpen] = useState<{banner : Video | null, isOpen : boolean}>({banner: null, isOpen: false})

    const handleDelete = async (id: string) => {
        try {
            setDeleteLoading(true);

            await deleteVideo({id: id});
            setDeleteLoading(false);
            setOpen({banner: null, isOpen: true})
            await getExperiences()
        } catch (e) {
            setDeleteLoading(false);
            //console.log("eror delete " + e);
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
                    <Button onClick={(bt) => {
                        bt.preventDefault();
                        setCreateBannerOpen({banner: null, isOpen:true})
                    }} variant="outline" className="w-fit ml-8"><PlusIcon className="w-4 h-4"/> Add Video</Button>
                    <DialogContent onInteractOutside={(e) => {
                        e.preventDefault();
                    }} className="w-8">
                        <DialogHeader>
                            <DialogTitle>Add Video</DialogTitle>
                        </DialogHeader>
                        <DialogBody className="overflow-y-auto max-h-[420px]">
                            <AddEditVideo achievement={createBannerOpen.banner == null ? undefined : createBannerOpen.banner} onNeedRefresh={() => {
                                setCreateBannerOpen({banner: null, isOpen:false})
                                getExperiences();
                            }} />
                        </DialogBody>
                    </DialogContent>
                </Dialog>
                <div className="rounded-md border mt-2 mx-8 mb-10">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Title</TableHead>
                                <TableHead>Description</TableHead>
                                <TableHead>VideoUrl</TableHead>
                                <TableHead>Category</TableHead>
                                <TableHead></TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {news?.map((experience) => (
                                <TableRow key={experience.id}>
                                    <TableCell>{experience.title}</TableCell>
                                    <TableCell >
                                        <p className="max-h-24 flex overflow-y-scroll" dangerouslySetInnerHTML={{__html: experience.description}} />
                                    </TableCell>
                                    <TableCell>{experience.videoUrl}</TableCell>
                                    <TableCell>{experience.category?.name}</TableCell>
                                    <TableCell>
                                        <div className="flex items-center justify-center gap-4">
                                            <Trash2Icon onClick={() => setOpen({banner: experience, isOpen: true})} width={18} color="red" className="hover:cursor-pointer" />
                                            <EditIcon width={18} className="hover:cursor-pointer" onClick={(bt) => {
                                                bt.preventDefault();
                                                setCreateBannerOpen({banner: experience, isOpen: true})
                                            }} />
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>
            </div>
    )
}

export default VideoTable;