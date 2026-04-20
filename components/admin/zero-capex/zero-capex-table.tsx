"use client"
import React, { useEffect, useState, useCallback } from "react";
import Image from "next/image";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { EditIcon, EyeIcon, PlusIcon, Trash2Icon, Search, Download } from "lucide-react";
import { DialogBody } from "next/dist/client/components/react-dev-overlay/internal/components/Dialog";
import Spinner from "@/components/spinner";
import { createZeroCapex, deleteZeroCapex, fetchZeroCapex, fetchAllZeroCapexForExport } from "@/lib/actions/admin/zero-capex.action";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";
import axiosInstance from "@/lib/axios_config";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { DateRangePicker } from 'rsuite';
import * as XLSX from 'xlsx';

// Import RSuite styles
import 'rsuite/dist/rsuite.min.css';

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
    pdfUrl: string;
    createdAt: string;
};

function ZeroCapexTable() {
    const [zeroCapexList, setZeroCapexList] = useState<ZeroCapex[]>();
    const [openDialog, setOpenDialog] = useState<{ category: ZeroCapex | null, isOpen: boolean }>({ category: null, isOpen: false });
    const [deleteLoading, setDeleteLoading] = useState(false);
    const [createCategoryOpen, setCreateCategoryOpen] = useState<{ category: ZeroCapex | null, isOpen: boolean }>({ category: null, isOpen: false });

    // Pagination state
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [isLoading, setIsLoading] = useState(false);
    const pageSize = 10;

    // Filter states
    const [search, setSearch] = useState("");
    const [categoryFilter, setCategoryFilter] = useState("all");
    const [dateRange, setDateRange] = useState<[Date, Date] | null>(null);

    const getZeroCapex = useCallback(async (page = 1) => {
        try {
            setIsLoading(true);
            const zeroCapexData = await fetchZeroCapex(
                page, 
                pageSize, 
                search, 
                categoryFilter, 
                dateRange?.[0], 
                dateRange?.[1]
            );
            setZeroCapexList(zeroCapexData?.zeroCapex);
            setTotalPages(zeroCapexData?.totalPages || 1);
        } catch (error) {
            console.error("Failed to fetch ZeroCapex:", error);
        } finally {
            setIsLoading(false);
        }
    }, [search, categoryFilter, dateRange]);


    useEffect(() => {
        const delayDebounceFn = setTimeout(() => {
            setCurrentPage(1);
            getZeroCapex(1);
        }, 500);

        return () => clearTimeout(delayDebounceFn);
    }, [search, categoryFilter, dateRange, getZeroCapex]);

    useEffect(() => {
        getZeroCapex(currentPage);
    }, [currentPage, getZeroCapex]);

    const handleExport = async () => {
        try {
            const allData = await fetchAllZeroCapexForExport(
                search,
                categoryFilter,
                dateRange?.[0],
                dateRange?.[1]
            );

            if (!allData || allData.length === 0) {
                alert("No data available to export.");
                return;
            }

            const exportData = allData.map(item => ({
                "Submitted At": item.createdAt ? new Date(item.createdAt).toLocaleString('id-ID') : "-",
                "Name": item.name,
                "Company": item.company,
                "WhatsApp": item.whatsapp,
                "Email": item.email,
                "Daya Terpasang": item.dayaTerpasang,
                "Daya Listrik": item.dayaListrik,
                "Luas Property": item.luasProperty,
                "Tagihan Per Bulan": item.tagihanPerBulan,
                "Tarif Listrik": item.tarifListrik,
                "Est. Penggunaan Daya": item.estimasiPenggunaanDaya,
                "Lokasi": item.lokasi,
                "Lokasi Installasi": item.lokasiInstallasi,
                "PDF URL": item.pdfUrl
            }));

            const wb = XLSX.utils.book_new();
            const ws = XLSX.utils.json_to_sheet(exportData);
            XLSX.utils.book_append_sheet(wb, ws, "Zero Capex Leads");
            XLSX.writeFile(wb, `leads_zero_capex_${new Date().toISOString().slice(0, 10)}.xlsx`);
        } catch (error) {
            console.error("Export failed:", error);
        }
    };


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

            {/* Filter Bar */}
            <div className="flex flex-col gap-4 mt-2 mx-8 mb-4">
                <div className="flex flex-wrap items-center justify-between gap-4">
                    <div className="flex flex-wrap items-center gap-2">
                        <div className="relative w-64">
                            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                            <Input
                                placeholder="Search by name, email, company..."
                                className="pl-8"
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                            />
                        </div>

                        <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                            <SelectTrigger className="w-[180px]">
                                <SelectValue placeholder="Category" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">All Categories</SelectItem>
                                <SelectItem value="Komersial">Komersial</SelectItem>
                                <SelectItem value="Industri">Industri</SelectItem>
                                <SelectItem value="Tambang">Tambang</SelectItem>
                            </SelectContent>
                        </Select>

                        <DateRangePicker 
                            appearance="default"
                            placeholder="Select Date Range"
                            value={dateRange}
                            onChange={setDateRange}
                            className="w-[300px]"
                            ranges={[
                                { label: 'Hari ini', value: [new Date(), new Date()] },
                                { label: 'Kemarin', value: [new Date(Date.now() - 86400000), new Date(Date.now() - 86400000)] },
                                { label: '7 hari terakhir', value: [new Date(Date.now() - 6 * 86400000), new Date()] },
                                { label: '30 hari terakhir', value: [new Date(Date.now() - 29 * 86400000), new Date()] },
                                { label: 'Bulan ini', value: [new Date(new Date().getFullYear(), new Date().getMonth(), 1), new Date()] },
                                { label: 'Bulan lalu', value: [new Date(new Date().getFullYear(), new Date().getMonth() - 1, 1), new Date(new Date().getFullYear(), new Date().getMonth(), 0)] }
                            ]}
                        />
                    </div>

                    <Button 
                        onClick={handleExport}
                        variant="outline"
                        className="flex items-center gap-2"
                    >
                        <Download className="w-4 h-4" /> Export to Excel
                    </Button>
                </div>
            </div>

            {/* Category table */}
            <div className="rounded-md border mx-8 mb-10 overflow-hidden">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Submitted At</TableHead>
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
                        {isLoading ? (
                            <TableRow>
                                <TableCell colSpan={11} className="text-center py-10">
                                    <Spinner />
                                </TableCell>
                            </TableRow>
                        ) : zeroCapexList?.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={11} className="text-center py-10">
                                    No data found.
                                </TableCell>
                            </TableRow>
                        ) : (
                            zeroCapexList?.map((category) => (
                                <TableRow key={category._id}>
                                    <TableCell className="whitespace-nowrap">
                                        {category.createdAt ? new Date(category.createdAt).toLocaleString('id-ID', {
                                            day: '2-digit',
                                            month: '2-digit',
                                            year: 'numeric',
                                            hour: '2-digit',
                                            minute: '2-digit',
                                            hour12: false
                                        }).replace(/\//g, '-') : '-'}
                                    </TableCell>
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
                            ))
                        )}
                    </TableBody>
                </Table>
            </div>

            {/* Pagination Controls */}
            <div className="flex items-center justify-center gap-4 mb-10">
                <Button 
                    variant="outline" 
                    onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                    disabled={currentPage === 1 || isLoading}
                >
                    Previous
                </Button>
                <div className="text-sm font-medium">
                    Page {currentPage} of {totalPages}
                </div>
                <Button 
                    variant="outline" 
                    onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                    disabled={currentPage === totalPages || isLoading}
                >
                    Next
                </Button>
            </div>
        </div>
    );
}

export default ZeroCapexTable;
