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
import {deleteCustomer, fetchCustomers} from "@/lib/actions/admin/customer.action";
import AddEditCustomer from "@/components/admin/home/customers/edit-customer";

export type Customer = {
    id: string,
    title: string,
    url: string,
    icon: string
}

function CustomerTable() {

    const [customers, setCustomer] = useState<Customer[]>()

    async function getCustomers() {
        const customers = await fetchCustomers();
        setCustomer(customers?.banners);
    }

    useEffect(() => {
        getCustomers()
    }, [])

    const [open, setOpen] = useState<{banner : Customer | null, isOpen : boolean}>({banner: null, isOpen:false});
    const [deleteLoading, setDeleteLoading] = useState(false);
    const [createCustomerOpen, setCreateCustomerOpen] = useState<{banner : Customer | null, isOpen : boolean}>({banner: null, isOpen: false})

    const handleDelete = async (id: string,logo: string) => {
        try {
            setDeleteLoading(true);
            const fileLogo = logo.substring(logo.lastIndexOf('/') + 1)
            await fetch(`/api/uploadthing/delete/${fileLogo}`, { method: 'DELETE',})
            await deleteCustomer({id: id});
            setDeleteLoading(false);
            setOpen({banner : null, isOpen: false})
            await getCustomers()
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
                                    handleDelete(open?.banner?.id ?? "", open?.banner?.icon ?? "");
                                }}>{deleteLoading ? <Spinner /> : `Delete ${open?.banner?.title}`}</Button>
                            </div>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
                <Dialog open={createCustomerOpen.isOpen} onOpenChange={(isOpen) => setCreateCustomerOpen(prevState => {
                    return  {isOpen: isOpen, banner: null}
                })}>
                    <Button onClick={(bt) => {
                        bt.preventDefault();
                        setCreateCustomerOpen({banner: null, isOpen:true})
                    }} variant="outline" className="w-fit ml-8"><PlusIcon className="w-4 h-4"/> Add Customer</Button>
                    <DialogContent className="w-8">
                        <DialogHeader>
                            <DialogTitle>{"Add new customer"}</DialogTitle>
                        </DialogHeader>
                        <DialogBody className="overflow-y-auto max-h-[420px]">
                            <AddEditCustomer customer={createCustomerOpen.banner == null ? undefined : createCustomerOpen.banner} onNeedRefresh={() => {
                                setCreateCustomerOpen({banner: null, isOpen:false})
                                getCustomers();
                            }} />
                        </DialogBody>
                    </DialogContent>
                </Dialog>
                <div className="rounded-md border mt-2 mx-8 mb-10">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Tag</TableHead>
                                <TableHead>Link</TableHead>
                                <TableHead className="text-center">Image</TableHead>
                                <TableHead></TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {customers?.map((customer) => (
                                <TableRow key={customer.id}>
                                    <TableCell>{customer.title}</TableCell>
                                    <TableCell>{customer.url}</TableCell>
                                    <TableCell>
                                        <Image className="mx-auto" width={60} height={60}
                                                      src={customer.icon} alt=""/>
                                    </TableCell>
                                    <TableCell>
                                        <div className="flex items-center justify-center gap-4">
                                            <Trash2Icon onClick={()=> setOpen({isOpen: true, banner: customer})} width={18} color="red" className="hover:cursor-pointer" />
                                            <EditIcon width={18} className="hover:cursor-pointer" onClick={(bt) => {
                                                bt.preventDefault();
                                                setCreateCustomerOpen({banner: customer, isOpen: true})
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

export default CustomerTable;