"use client"

import {Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table";
import {Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger} from "@/components/ui/dialog";
import {Button} from "@/components/ui/button";
import {PlusIcon} from "lucide-react";
import {DialogBody} from "next/dist/client/components/react-dev-overlay/internal/components/Dialog";
import {Input} from "@/components/ui/input";
import RichTextEditor from "@/components/rich-text-editor";
import Image from "next/image";
import {useEffect, useState} from "react";
import {EditorState} from "react-draft-wysiwyg";
import draftToHtml from 'draftjs-to-html';

const Editor = dynamic(() => import("react-draft-wysiwyg")
        .then((module) => module.Editor),
    {
        ssr: false
    }
);



import {convertFromRaw, convertToRaw} from "draft-js";
import dynamic from "next/dynamic";

export type Banner = {
    id: string,
    image: string,
    url: string,
    headingTitle: string,
    subHeading: string,
    description: string,
    isCustomBanner: boolean,
    logo: string
}

interface Props {
    banners: Banner[];
    isNext: boolean;
}

const content = {"entityMap":{},"blocks":[{"key":"637gr","text":"Initialized from content state.","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}]};

function UniversalBanners({banners, isNext} : Props) {

    const [editorState, setEditorState] = useState(EditorState?.createEmpty())

    return (
        <Dialog>
            <div className="flex flex-col">

                <Dialog >
                    <DialogTrigger asChild className="w-fit mx-8">
                        <Button variant="outline"><PlusIcon className="w-4 h-4" /> Add Universal Banner</Button>
                    </DialogTrigger>
                    <DialogContent className="w-8">
                        <DialogHeader>
                            <DialogTitle>Add new banner</DialogTitle>
                            <DialogBody>
                                <div className="flex flex-col gap-6 mt-4 px-4 overflow-y-auto h-[420px]">
                                    <div className="flex flex-col gap-2">
                                        <p>Description</p>
                                        <Input />
                                    </div>
                                    <div className="flex flex-col gap-2">
                                        <p>Link</p>
                                        <Input />
                                    </div>
                                    <div className="flex flex-col gap-2">
                                        <p>Description</p>
                                        <RichTextEditor editorState={editorState} onEditorChange={(state) => {
                                            const raw = convertToRaw(state.getCurrentContent())
                                            console.log(draftToHtml(raw))
                                        }} />
                                    </div>

                                </div>
                            </DialogBody>
                        </DialogHeader>
                    </DialogContent>
                </Dialog>
                <div className="rounded-md border mt-2 mx-8">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Image</TableHead>
                                <TableHead>Link</TableHead>
                                <TableHead>Description</TableHead>
                                <TableHead className="text-center">Logo</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {banners.map((banner) => (
                                <TableRow key={banner.id}>
                                    <TableCell className="font-medium"><Image width={100} height={100} src="/images/banner_1.jpg" alt="" /></TableCell>
                                    <TableCell>{banner.url}</TableCell>
                                    <TableCell>{banner.headingTitle}</TableCell>
                                    <TableCell><Image className="mx-auto" width={60} height={60} src="/images/logo_pln.png" alt="" /></TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>
            </div>
        </Dialog>
    )
}

export default UniversalBanners;