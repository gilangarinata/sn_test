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
import {Customer} from "@/components/admin/home/customers/customer-table";
import {deleteSubsidiary, fetchSubsidiaries} from "@/lib/actions/admin/subsidiaries.action";
import AddEditSubsidiary from "@/components/admin/who-we-are/subsidiaries/edit-subsidiary";
import {
    deleteOurBusinessBanner,
    fetchOurBusinessBanners
} from "@/lib/actions/admin/our-business/our-business-banner.action";
import AddEditOurBusinessBanner from "@/components/admin/our-business/banners/edit-banner";
import {deleteWhySolar, fetchWhySolar} from "@/lib/actions/admin/our-business/why-solar.action";
import AddEditWhySolar from "@/components/admin/our-business/why-solar/edit-why-solar";
import {deleteOurExperience, fetchOurExperience} from "@/lib/actions/admin/our-business/our-experience";
import AddEditOurExperience from "@/components/admin/our-business/our-experience/edit-our-experience";

export type OurExperience = {
    id: string,
    link: string,
    image: string,
    title: string,
}

function OurExperienceTable() {

    const [achievements, setAchievements] = useState<OurExperience[]>()
    async function getAchievements() {
        const achievements = await fetchOurExperience()
        setAchievements(achievements?.banners);
    }

    useEffect(() => {
        getAchievements()
    }, [])

    const [open, setOpen] = useState<{banner : OurExperience | null, isOpen : boolean}>({banner: null, isOpen:false});
    const [deleteLoading, setDeleteLoading] = useState(false);
    const [createBannerOpen, setCreateBannerOpen] = useState<{banner : OurExperience | null, isOpen : boolean}>({banner: null, isOpen: false})

    const handleDelete = async (id: string,logo: string) => {
        try {
            setDeleteLoading(true);
            const fileLogo = logo.substring(logo.lastIndexOf('/') + 1)
            await fetch(`/api/uploadthing/delete/${fileLogo}`, { method: 'DELETE',})
            await deleteOurExperience({id: id});
            setDeleteLoading(false);
            setOpen({banner: null, isOpen: false})
            await getAchievements()
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
                                    handleDelete(open?.banner?.id ?? "", open?.banner?.image ?? "");
                                }}>{deleteLoading ? <Spinner /> : `Delete ${open?.banner?.title}`}</Button>
                            </div>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
                <Dialog open={createBannerOpen.isOpen} onOpenChange={(isOpen) => setCreateBannerOpen(prevState => {
                    return  {isOpen: isOpen, banner: null}
                })}>
                    <Button onClick={(bt) => {
                        bt.preventDefault();
                        setCreateBannerOpen({banner: null, isOpen:true,})
                    }} variant="outline" className="w-fit ml-8"><PlusIcon className="w-4 h-4"/> Add Our Experience</Button>
                    <DialogContent className="w-8">
                        <DialogHeader>
                            <DialogTitle>{"Add new our experience"}</DialogTitle>
                        </DialogHeader>
                        <DialogBody className="overflow-y-auto max-h-[420px]">
                            <AddEditOurExperience achievement={createBannerOpen.banner == null ? undefined : createBannerOpen.banner} onNeedRefresh={() => {
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
                                <TableHead>Title</TableHead>
                                <TableHead>Link</TableHead>
                                <TableHead className="text-center">Image</TableHead>
                                <TableHead></TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {achievements?.map((achievement) => (
                                <TableRow key={achievement.id}>
                                    <TableCell>{achievement.title}</TableCell>
                                    <TableCell>{achievement.link}</TableCell>
                                    <TableCell>
                                        <Image className="mx-auto" width={60} height={60}
                                                      src={achievement.image} alt=""/>
                                    </TableCell>
                                    <TableCell>
                                        <div className="flex items-center justify-center gap-4">
                                            <Trash2Icon onClick={() => setOpen({banner: achievement, isOpen: true})} width={18} color="red" className="hover:cursor-pointer" />
                                            <EditIcon width={18} className="hover:cursor-pointer" onClick={(bt) => {
                                                bt.preventDefault();
                                                setCreateBannerOpen({banner: achievement, isOpen: true})
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

export default OurExperienceTable;