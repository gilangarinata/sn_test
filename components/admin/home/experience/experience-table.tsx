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
import {Achievement} from "@/components/admin/home/achievement/achievement-table";
import axiosInstance from "@/lib/axios_config";

export type Experience = {
    id: string,
    title: string,
    description: string,
    total: string,
    icon: string
}

function ExperienceTable() {

    const [experiences, setExperiences] = useState<Experience[]>()
    const [mainExperiences, setMainExperiences] = useState<Experience>()

    async function getExperiences() {
        const banners = (await fetchExperiences())?.banners?.filter((element, index, array) => {
            return element.id !== "main-experience"
        });
        setExperiences(banners);


        setMainExperiences(await fetchMainExperience());
    }

    useEffect(() => {
        getExperiences()
    }, [])

    const [open, setOpen] = useState<{banner : Experience | null, isOpen : boolean}>({banner: null, isOpen:false});
    const [deleteLoading, setDeleteLoading] = useState(false);
    const [createBannerOpen, setCreateBannerOpen] = useState<{banner : Experience | null, isOpen : boolean, isMainContent: boolean}>({banner: null, isOpen: false, isMainContent : false})

    const handleDelete = async (id: string,logo: string) => {
        try {
            setDeleteLoading(true);
            const fileLogo = logo.substring(logo.lastIndexOf('/') + 1)
            const url = new URL(logo);
            const filename = url.pathname.split("/").pop();
            try {
                await axiosInstance.delete(`/api/delete/${filename}`, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                });

            } catch (error) {
                // Handle any upload error
                console.error('File upload error:', error);
            }
            await deleteExperience({id: id});
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
                <div className="grid grid-cols-2 gap-4 mx-8 mb-6">
                    <div className="grid w-full items-center gap-1.5">
                        <Label htmlFor="email">Title</Label>
                        <div className="rounded-lg border p-2">
                            <p dangerouslySetInnerHTML={{__html: mainExperiences?.title ?? "-"}} />
                        </div>
                    </div>
                    <div className="grid w-full items-center gap-1.5">
                        <Label htmlFor="email">Description</Label>
                        <div className="rounded-lg border p-2 max-h-14 overflow-y-scroll">
                            <p dangerouslySetInnerHTML={{__html: mainExperiences?.description ?? "-"}} />
                        </div>
                    </div>
                    <Button onClick={(bt) => {
                        bt.preventDefault();
                        setCreateBannerOpen({ banner: mainExperiences ?? null, isOpen:true, isMainContent: true})
                    }} variant="outline" className="w-fit"><EditIcon className="w-4 h-4 mr-2"/> Edit</Button>
                </div>

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
                                    handleDelete(open?.banner?.id ?? "", open?.banner?.icon ?? "");
                                }}>{deleteLoading ? <Spinner /> : `Delete ${open?.banner?.title}`}</Button>
                            </div>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>


                <Dialog open={createBannerOpen.isOpen} onOpenChange={(isOpen) => setCreateBannerOpen(prevState => {
                    return  {isOpen: isOpen, banner: null, isMainContent: prevState.isMainContent}
                })}>
                    <Button onClick={(bt) => {
                        bt.preventDefault();
                        setCreateBannerOpen({banner: null, isOpen:true, isMainContent: false})
                    }} variant="outline" className="w-fit ml-8"><PlusIcon className="w-4 h-4"/> Add Experience</Button>
                    <DialogContent className="w-8">
                        <DialogHeader>
                            <DialogTitle>{createBannerOpen.isMainContent ? "Edit content experience" : " Add new experience"}</DialogTitle>
                        </DialogHeader>
                        <DialogBody className="overflow-y-auto max-h-[420px]">
                            <AddEditExperience isMainContent={createBannerOpen.isMainContent} experience={createBannerOpen.banner == null ? undefined : createBannerOpen.banner} onNeedRefresh={() => {
                                setCreateBannerOpen({banner: null, isOpen:false, isMainContent: false})
                                getExperiences();
                            }} />
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
                                    <TableCell>{experience.description}</TableCell>
                                    <TableCell>{experience.total}</TableCell>
                                    <TableCell>
                                        <Image className="mx-auto" width={60} height={60}
                                                      src={experience.icon} alt=""/>
                                    </TableCell>
                                    <TableCell>
                                        <div className="flex items-center justify-center gap-4">
                                            <Trash2Icon onClick={() => setOpen({banner: experience, isOpen: true})} width={18} color="red" className="hover:cursor-pointer" />
                                            <EditIcon width={18} className="hover:cursor-pointer" onClick={(bt) => {
                                                bt.preventDefault();
                                                setCreateBannerOpen({banner: experience, isOpen: true, isMainContent: false})
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