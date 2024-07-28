"use client"
import { useEffect, useState } from "react";
import Image from "next/image";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {EditIcon, EyeIcon, PlusIcon, Trash2Icon} from "lucide-react";
import { DialogBody } from "next/dist/client/components/react-dev-overlay/internal/components/Dialog";
import AddEditCategory from "@/components/admin/media/category/edit-category";
import Spinner from "@/components/spinner";
import {createZeroCapex, deleteZeroCapex, fetchZeroCapex} from "@/lib/actions/admin/zero-capex.action";
import html2canvas from "html2canvas";
import {pricingData} from "@/components/landing/zero-capex/hitung-investasi";
import cookie from "js-cookie";
import jsPDF from "jspdf";
import {number} from "zod";
import {HoverCard, HoverCardContent, HoverCardTrigger} from "@/components/ui/hover-card";
import axiosInstance from "@/lib/axios_config";
import {deleteImage} from "@/lib/actions/admin/upload-image.action";

export type ZeroCapex = {
    _id: string;
    url: string;
    email: string;
    name: string;
    company: string;
    whatsapp: string;
    dayaTerpasang: string;
    dayaListrik: string;
    luasProperty: string;
    tagihanPerBulan: string;
    tarifListrik: string;
    estimasiPenggunaanDaya: string;
    lokasiInstallasi: string;
    rekomendasiInstallasi: string;
    areaPotensial: string;
    jumlahModulSurya: string;
    produksiEnergiPerTahun: string;
    periodeInstallasi: string;
    lokasi: string,
    pdfUrl: string
};

function ZeroCapexTable() {
    const [zeroCapexList, setZeroCapexList] = useState<ZeroCapex[]>();
    const [openDialog, setOpenDialog] = useState<{ category: ZeroCapex | null, isOpen: boolean }>({ category: null, isOpen: false });
    const [deleteLoading, setDeleteLoading] = useState(false);
    const [createCategoryOpen, setCreateCategoryOpen] = useState<{ category: ZeroCapex | null, isOpen: boolean }>({ category: null, isOpen: false });

    const getZeroCapex = async () => {
        try {
            const zeroCapexData = await fetchZeroCapex();
            setZeroCapexList(zeroCapexData?.zeroCapex);
        } catch (error) {
            console.error("Failed to fetch ZeroCapex:", error);
        }
    };


    useEffect(() => {
        getZeroCapex();
    }, []);


    const handleDelete = async (id: string, pdf: string) => {
        try {
            setDeleteLoading(true);
            // Assuming you have logic to handle file deletion here
            const fileLogo = pdf.substring(pdf.lastIndexOf('/') + 1)
            try {
                await axiosInstance.delete(`/api/delete/${fileLogo}`, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                });

            } catch (error) {
                // Handle any upload error
                console.error('File upload error:', error);
            }
            await deleteZeroCapex({ id });
            setDeleteLoading(false);
            setOpenDialog({ category: null, isOpen: false });
            await getZeroCapex();
        } catch (error) {
            setDeleteLoading(false);
            console.error("Error deleting category:", error);
        }
    };

    return (
        <div className="flex flex-col">
            {/* Dialog for delete confirmation */}
            <Dialog open={openDialog.isOpen} onOpenChange={(isOpen) => setOpenDialog({ category: null, isOpen })}>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle>Delete Item</DialogTitle>
                        <DialogDescription>
                            Are you sure you want to delete this item?
                        </DialogDescription>
                    </DialogHeader>
                    <DialogFooter>
                        <div className="flex gap-2">
                            <Button variant="outline" onClick={() => setOpenDialog({ category: null, isOpen: false })}>Cancel</Button>
                            <Button variant="destructive" onClick={() => handleDelete(openDialog.category?._id ?? "", openDialog.category?.pdfUrl ?? "")}>
                                {deleteLoading ? <Spinner /> : `Delete Data`}
                            </Button>
                        </div>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            {/* Category table */}
            <div className="rounded-md border mt-2 mx-8 mb-10">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Name</TableHead>
                            <TableHead>Company</TableHead>
                            <TableHead>Whatsapp</TableHead>
                            <TableHead>Email</TableHead>
                            <TableHead>Daya Terpasang</TableHead>
                            <TableHead>Daya Listrik</TableHead>
                            <TableHead>Luas Property</TableHead>
                            <TableHead>Tagihan Perbulan</TableHead>
                            <TableHead>PDF</TableHead>
                            <TableHead></TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {zeroCapexList?.map((category) => (
                            <TableRow key={category._id}>
                                <TableCell>{category.name}</TableCell>
                                <TableCell>{category.company}</TableCell>
                                <TableCell>{category.whatsapp}</TableCell>
                                <TableCell>{category.email}</TableCell>
                                <TableCell>{category.dayaTerpasang}</TableCell>
                                <TableCell>{category.dayaListrik}</TableCell>
                                <TableCell>{category.luasProperty}</TableCell>
                                <TableCell>{category.tagihanPerBulan}</TableCell>
                                <TableCell>
                                    <a target="_blank" href={category.pdfUrl} rel="noopener noreferrer">
                                        {category.pdfUrl ? <div className="text-blue-900">Lihat PDF</div> : <></>}
                                    </a>
                                </TableCell>
                                <TableCell>
                                    <div className="flex items-center justify-center gap-4">
                                        <Trash2Icon onClick={() => setOpenDialog({ category, isOpen: true })} width={18} color="red" className="hover:cursor-pointer" />
                                        <HoverCard>
                                            <HoverCardTrigger asChild>
                                                <EyeIcon className="hover:cursor-pointer" />
                                            </HoverCardTrigger>
                                            <HoverCardContent className="w-80">
                                                <div className="flex justify-between space-x-4">
                                                    <div className="space-y-1">
                                                        <p className="text-sm">
                                                            Email : {category.email}
                                                        </p>
                                                        <p className="text-sm">
                                                            Lokasi : {category.lokasi ?? ""}
                                                        </p>
                                                        <p className="text-sm">
                                                            Daya Terpasang : {category.dayaTerpasang}
                                                        </p>
                                                        <p className="text-sm">
                                                            Daya Listrik : {category.dayaListrik}
                                                        </p>
                                                        <p className="text-sm">
                                                            Luas Property : {category.luasProperty}
                                                        </p>
                                                        <p className="text-sm">
                                                            Tagihan Per Bulan : {category.tagihanPerBulan}
                                                        </p>
                                                        <p className="text-sm">
                                                            Tarif Listrik : {category.tarifListrik}
                                                        </p>
                                                        <p className="text-sm">
                                                            Est. Penggunaan Daya : {category.estimasiPenggunaanDaya}
                                                        </p>
                                                        <p className="text-sm">
                                                            Lokasi Installasi : {category.lokasiInstallasi}
                                                        </p>
                                                        <p className="text-sm">
                                                            Rekomendasi Installasi : {category.rekomendasiInstallasi}
                                                        </p>
                                                        <p className="text-sm">
                                                            Area Potensial : {category.areaPotensial}
                                                        </p>
                                                        <p className="text-sm">
                                                            Jumlah Modul Surya : {category.jumlahModulSurya}
                                                        </p>
                                                        <p className="text-sm">
                                                            Produksi Energi per tahun  : {category.produksiEnergiPerTahun}
                                                        </p>
                                                        <p className="text-sm">
                                                            Periode Installas : {category.periodeInstallasi}
                                                        </p>
                                                    </div>
                                                </div>
                                            </HoverCardContent>
                                        </HoverCard>
                                    </div>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        </div>
    );
}

export default ZeroCapexTable;
