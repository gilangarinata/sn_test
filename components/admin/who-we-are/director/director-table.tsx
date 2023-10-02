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
import {fetchWhoWeAreBanner} from "@/lib/actions/admin/who-we-are-banner.action";
import AddEditVisionMission from "@/components/admin/who-we-are/vision-mission/edit-vission-mission";
import Link from "next/link";
import AddEditDirector from "@/components/admin/who-we-are/director/edit-director";

export type Director = {
    id: string,
    messageDirectorTitle: string,
    messageDirectorDescription: string,
    companyProfileUrl: string
}

function DirectorTable() {

    const [achievements, setAchievements] = useState<Director>()
    async function getAchievements() {
        const achievements = await fetchWhoWeAreBanner()
        setAchievements(achievements?.banners);
    }

    useEffect(() => {
        getAchievements()
    }, [])

    const [createBannerOpen, setCreateBannerOpen] = useState<{banner : Director | null, isOpen : boolean}>({banner: null, isOpen: false})


    return (
            <div className="flex flex-col">
                <Dialog open={createBannerOpen.isOpen} onOpenChange={(isOpen) => setCreateBannerOpen(prevState => {
                    return  {isOpen: isOpen, banner: null}
                })}>
                    <DialogContent className="w-8">
                        <DialogHeader>
                            <DialogTitle>{"Add new achievement"}</DialogTitle>
                        </DialogHeader>
                        <DialogBody className="overflow-y-auto max-h-[420px]">
                            <AddEditDirector banner={createBannerOpen.banner == null ? undefined : createBannerOpen.banner} onNeedRefresh={() => {
                                setCreateBannerOpen({banner: null, isOpen:false})
                                getAchievements();
                            }} />
                        </DialogBody>
                    </DialogContent>
                </Dialog>
                <div className="rounded-md border mt-2 mx-8 mb-10">
                    <Table>
                        <TableBody>
                            <TableRow>
                                <TableCell>Title</TableCell>
                                <TableCell>
                                    <p dangerouslySetInnerHTML={{__html: achievements?.messageDirectorTitle ?? ""}} />
                                </TableCell>
                                <TableCell>
                                    <div className="flex items-center justify-center gap-4">
                                        <EditIcon width={18} className="hover:cursor-pointer" onClick={(bt) => {
                                            bt.preventDefault();
                                            setCreateBannerOpen({banner: achievements ?? null, isOpen: true})
                                        }} />
                                    </div>
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>Message</TableCell>
                                <TableCell>
                                    <p dangerouslySetInnerHTML={{__html: achievements?.messageDirectorDescription ?? ""}} />
                                </TableCell>
                                <TableCell>
                                    <div className="flex items-center justify-center gap-4">
                                        <EditIcon width={18} className="hover:cursor-pointer" onClick={(bt) => {
                                            bt.preventDefault();
                                            setCreateBannerOpen({banner: achievements ?? null, isOpen: true})
                                        }} />
                                    </div>
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>Company Profile</TableCell>
                                <TableCell>
                                    {achievements?.companyProfileUrl == undefined ? "No Data" : <Link passHref href={achievements?.companyProfileUrl ?? ""}>  <a className="text-blue-900 underline" target="_blank" rel="noopener noreferrer">
                                        Download Company Profile
                                    </a></Link>}
                                </TableCell>
                                <TableCell>
                                    <div className="flex items-center justify-center gap-4">
                                        <EditIcon width={18} className="hover:cursor-pointer" onClick={(bt) => {
                                            bt.preventDefault();
                                            setCreateBannerOpen({banner: achievements ?? null, isOpen: true})
                                        }} />
                                    </div>
                                </TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </div>
            </div>
    )
}

export default DirectorTable;