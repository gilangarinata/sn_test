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
import {EditIcon, PlusIcon, Trash2Icon, TrashIcon, ViewIcon} from "lucide-react";
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
import {deleteNewsCategory, fetchCategories} from "@/lib/actions/admin/news-category.action";
import AddEditCategory from "@/components/admin/media/category/edit-category";
import {deleteDepartement, fetchDepartements} from "@/lib/actions/admin/departement.action";
import AddEditDepartement from "@/components/admin/career/departement/edit-departement";
import {
    deleteCareerRegister,
    fetchAllCareerRegister,
    fetchCareerRegisterById
} from "@/lib/actions/admin/career_register.action";
import {RegisterCareer} from "@/components/admin/career/register_career/register-career-table";
import Link from "next/link";

function RegisterCareerDetail({id} : {id: string}) {

    const [achievements, setAchievements] = useState<RegisterCareer>()
    async function getAchievements() {
        const achievements = await fetchCareerRegisterById(id)
        setAchievements(achievements?.career);
    }

    useEffect(() => {
        getAchievements()
    }, [])


    return (
            <div className="flex flex-col">
                <div className="rounded-md border mt-2 mx-8 mb-10">
                    <Table>
                        <TableBody>
                            <TableRow>
                                <TableCell>First Name</TableCell>
                                <TableCell>{achievements?.firstName}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>Last Name</TableCell>
                                <TableCell>{achievements?.lastName}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>Email</TableCell>
                                <TableCell>{achievements?.email}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>Contact Number</TableCell>
                                <TableCell>{achievements?.contactNumber}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>Address</TableCell>
                                <TableCell>{achievements?.address}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>Last Education</TableCell>
                                <TableCell>{achievements?.lastEducation}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>Campus</TableCell>
                                <TableCell>{achievements?.campus}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>Study Major</TableCell>
                                <TableCell>{achievements?.studyMajor}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>School Start Year</TableCell>
                                <TableCell>{`${achievements?.schoolStartYear1} - ${achievements?.schoolStartYear2}`}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>School End Year</TableCell>
                                <TableCell>{`${achievements?.schoolEndYear1} - ${achievements?.schoolEndYear2}`}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>Previous Company</TableCell>
                                <TableCell>{achievements?.previousCompany}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>Previous Designation</TableCell>
                                <TableCell>{achievements?.previousDesignation}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>Availability Period</TableCell>
                                <TableCell>{achievements?.availabilityPeriod}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>URL Sites</TableCell>
                                <TableCell>{achievements?.urlSites}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>How Did You Know</TableCell>
                                <TableCell>{achievements?.howDidYouKnow}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>Resume</TableCell>
                                <TableCell><Link className="text-blue-900" href={achievements?.resume ?? ""} >Download</Link></TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>Portfolio</TableCell>
                                <TableCell><Link className="text-blue-900" href={achievements?.portfolio ?? ""} >Download</Link></TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>Ijazah</TableCell>
                                <TableCell><Link className="text-blue-900" href={achievements?.ijazah ?? ""} >Download</Link></TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>Transkrip</TableCell>
                                <TableCell><Link className="text-blue-900" href={achievements?.transkrip ?? ""} >Download</Link></TableCell>
                            </TableRow>

                        </TableBody>
                    </Table>
                </div>
            </div>
    )
}

export default RegisterCareerDetail;