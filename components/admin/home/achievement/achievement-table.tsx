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
import React, {ChangeEvent, useEffect, useState} from "react";


import AddEditBanner from "@/components/admin/home/banners/edit-banner";
import {deleteBanner, fetchBanners} from "@/lib/actions/admin/banner.action";
import Spinner from "@/components/spinner";
import {deleteExperience, fetchExperiences, fetchMainExperience} from "@/lib/actions/admin/experience.action";
import AddEditExperience from "@/components/admin/home/experience/edit-experience";
import {Label} from "@/components/ui/label";
import {deleteAchievement, fetchAchievement} from "@/lib/actions/admin/achievement.action";
import AddEditAchievement from "@/components/admin/home/achievement/edit-achievement";

export type Achievement = {
    id: string,
    description: string,
    icon: string
}

function AchievementTable() {

    const [achievements, setAchievements] = useState<Achievement[]>()
    async function getAchievements() {
        const achievements = await fetchAchievement()
        setAchievements(achievements?.banners);
    }

    useEffect(() => {
        getAchievements()
    }, [])

    const [open, setOpen] = useState(false);
    const [deleteLoading, setDeleteLoading] = useState(false);
    const [createBannerOpen, setCreateBannerOpen] = useState<{banner : Achievement | null, isOpen : boolean}>({banner: null, isOpen: false})

    const handleDelete = async (id: string,logo: string) => {
        try {
            setDeleteLoading(true);
            const fileLogo = logo.substring(logo.lastIndexOf('/') + 1)
            await fetch(`/api/uploadthing/delete/${fileLogo}`, { method: 'DELETE',})
            await deleteAchievement({id: id});
            setDeleteLoading(false);
            setOpen(false)
            await getAchievements()
        } catch (e) {
            setDeleteLoading(false);
            console.log("eror delete " + e);
        }
    }

    return (
            <div className="flex flex-col">
                <Dialog open={createBannerOpen.isOpen} onOpenChange={(isOpen) => setCreateBannerOpen(prevState => {
                    return  {isOpen: isOpen, banner: null}
                })}>
                    <Button onClick={(bt) => {
                        bt.preventDefault();
                        setCreateBannerOpen({banner: null, isOpen:true,})
                    }} variant="outline" className="w-fit ml-8"><PlusIcon className="w-4 h-4"/> Add Achievement</Button>
                    <DialogContent className="w-8">
                        <DialogHeader>
                            <DialogTitle>{"Add new achievement"}</DialogTitle>
                        </DialogHeader>
                        <DialogBody className="overflow-y-auto h-[420px]">
                            <AddEditAchievement achievement={createBannerOpen.banner == null ? undefined : createBannerOpen.banner} onNeedRefresh={() => {
                                setCreateBannerOpen({banner: null, isOpen:false})
                                getAchievements();
                            }} />
                        </DialogBody>
                    </DialogContent>
                </Dialog>
                <div className="rounded-md border mt-2 mx-8 mb-10">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Description</TableHead>
                                <TableHead className="text-center">Icon</TableHead>
                                <TableHead></TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {achievements?.map((achievements) => (
                                <TableRow key={achievements.id}>
                                    <TableCell>{achievements.description}</TableCell>
                                    <TableCell>
                                        <Image className="mx-auto" width={60} height={60}
                                                      src={achievements.icon} alt=""/>
                                    </TableCell>
                                    <TableCell>
                                        <div className="flex items-center justify-center gap-4">
                                            <Dialog open={open} onOpenChange={setOpen}>
                                                <DialogTrigger asChild>
                                                    <Trash2Icon width={18} color="red" className="hover:cursor-pointer" />
                                                </DialogTrigger>
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
                                                                setOpen(false)
                                                            }}>Cancel</Button>
                                                            <Button variant="destructive" onClick={(bt) => {
                                                                bt.preventDefault();
                                                                handleDelete(achievements.id, achievements.icon);
                                                            }}>{deleteLoading ? <Spinner /> : "Delete"}</Button>
                                                        </div>
                                                    </DialogFooter>
                                                </DialogContent>
                                            </Dialog>
                                            <EditIcon width={18} className="hover:cursor-pointer" onClick={(bt) => {
                                                bt.preventDefault();
                                                setCreateBannerOpen({banner: achievements, isOpen: true})
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

export default AchievementTable;