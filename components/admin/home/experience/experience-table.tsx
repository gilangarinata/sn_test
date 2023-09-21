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
import {deleteExperience, fetchExperiences} from "@/lib/actions/admin/experience.action";

export type Experience = {
    id: string,
    title: string,
    description: string,
    total: string,
    icon: string
}

function ExperienceTable() {

    const [experiences, setExperiences] = useState<Experience[]>()

    async function getExperiences() {
        const banners = (await fetchExperiences())?.banners?.filter((element, index, array) => {
            return element.id !== "main-experience"
        });
        setExperiences(banners);
    }

    useEffect(() => {
        getExperiences()
    }, [])

    const [open, setOpen] = useState(false);
    const [deleteLoading, setDeleteLoading] = useState(false);
    const [createBannerOpen, setCreateBannerOpen] = useState<{banner : Experience | null, isOpen : boolean}>({banner: null, isOpen: false})

    const handleDelete = async (id: string,logo: string) => {
        try {
            setDeleteLoading(true);
            const fileLogo = logo.substring(logo.lastIndexOf('/') + 1)
            await fetch(`/api/uploadthing/delete/${fileLogo}`, { method: 'DELETE',})
            await deleteExperience({id: id});
            setDeleteLoading(false);
            setOpen(false)
            await getExperiences()
        } catch (e) {
            setDeleteLoading(false);
            console.log("eror delete " + e);
        }
    }

    return (
            <div className="flex flex-col">
                <Dialog open={createBannerOpen.isOpen} onOpenChange={(isOpen) => setCreateBannerOpen({isOpen: isOpen, banner: null})}>
                    <Button onClick={(bt) => {
                        bt.preventDefault();
                        setCreateBannerOpen({banner: null, isOpen:true})
                    }} variant="outline" className="w-fit ml-8"><PlusIcon className="w-4 h-4"/> Add Experience</Button>
                    <DialogContent className="w-8">
                        <DialogHeader>
                            <DialogTitle>Add new experience</DialogTitle>
                        </DialogHeader>
                        <DialogBody className="overflow-y-auto h-[420px]">
                            {/*<AddEditBanner banner={createBannerOpen.banner == null ? undefined : createBannerOpen.banner} onNeedRefresh={() => {*/}
                            {/*    setCreateBannerOpen({banner: null, isOpen:false})*/}
                            {/*    getExperiences();*/}
                            {/*}} />*/}
                        </DialogBody>
                    </DialogContent>
                </Dialog>
                <div className="rounded-md border mt-2 mx-8 mb-10">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Type</TableHead>
                                <TableHead>Total</TableHead>
                                <TableHead className="text-center">Icon</TableHead>
                                <TableHead></TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {experiences?.map((experience) => (
                                <TableRow key={experience.id}>
                                    <TableCell className="font-medium">
                                        <Image width={100} height={100} src={experience.description}
                                                                              alt=""/></TableCell>
                                    <TableCell>{experience.total}</TableCell>
                                    <TableCell>
                                        <Image className="mx-auto" width={60} height={60}
                                                      src={experience.icon} alt=""/>
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
                                                                handleDelete(experience.id, experience.icon);
                                                            }}>{deleteLoading ? <Spinner /> : "Delete"}</Button>
                                                        </div>
                                                    </DialogFooter>
                                                </DialogContent>
                                            </Dialog>
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

export default ExperienceTable;