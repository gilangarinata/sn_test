import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table";
import Image from "next/image";

import {deleteNews, fetchAllNews} from "@/lib/actions/admin/news.action";
import {formatDateString} from "@/lib/utils";
import {Category} from "@/components/admin/media/category/category-table";
import axiosInstance from "@/lib/axios_config";

export type News = {
    _id: any,
    id: string,
    title: string,
    content: string,
    image: string,
    category: Category,
    createdAt: string,
    tags: [
        {
            id: string,
            tag: string
        }
    ],
    relatedNews: [
        {
            _id: string,
            id: string,
            title: string,
            content: string,
            image: string
        }
    ]
}

async function NewsTable() {
    const banners = await fetchAllNews(1,20);
    const news = banners?.banners as News[];
    // const [news, setNews] = useState<News[]>()

    // async function getExperiences() {
    //     const banners = await fetchAllNews(1,20);
    //     console.log("banner:-")
    //     setNews(banners?.banners as SetStateAction<News[] | undefined>);
    // }
    //
    // useEffect(() => {
    //     getExperiences()
    // }, [])

    // const [open, setOpen] = useState<{banner : News | null, isOpen : boolean}>({banner: null, isOpen:false});
    // const [deleteLoading, setDeleteLoading] = useState(false);
    // const [createBannerOpen, setCreateBannerOpen] = useState<{banner : News | null, isOpen : boolean}>({banner: null, isOpen: false})

    const handleDelete = async (id: string,logo: string) => {
        try {
            // setDeleteLoading(true);
            const fileLogo = logo.substring(logo.lastIndexOf('/') + 1)
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
            await deleteNews({id: id});
            // setDeleteLoading(false);
            // setOpen({banner: null, isOpen: true})
            // await getExperiences()
        } catch (e) {
            // setDeleteLoading(false);
            console.log("eror delete " + e);
        }
    }

    return (
            <div className="flex flex-col">

                {/*<Dialog open={open.isOpen} onOpenChange={(isOpen) => setOpen({banner: null, isOpen})}>*/}
                {/*    <DialogContent className="sm:max-w-[425px]">*/}
                {/*        <DialogHeader>*/}
                {/*            <DialogTitle>Delete Item</DialogTitle>*/}
                {/*            <DialogDescription>*/}
                {/*                Are you sure want to delete this item?*/}
                {/*            </DialogDescription>*/}
                {/*        </DialogHeader>*/}
                {/*        <DialogFooter>*/}
                {/*            <div className="flex gap-2">*/}
                {/*                <Button variant="outline" onClick={(bt) => {*/}
                {/*                    bt.preventDefault();*/}
                {/*                    setOpen({banner:null, isOpen:false})*/}
                {/*                }}>Cancel</Button>*/}
                {/*                <Button variant="destructive" onClick={(bt) => {*/}
                {/*                    bt.preventDefault();*/}
                {/*                    handleDelete(open?.banner?.id ?? "", open?.banner?.image ?? "");*/}
                {/*                }}>{deleteLoading ? <Spinner /> : `Delete Item`}</Button>*/}
                {/*            </div>*/}
                {/*        </DialogFooter>*/}
                {/*    </DialogContent>*/}
                {/*</Dialog>*/}


                {/*<Dialog open={createBannerOpen.isOpen} onOpenChange={(isOpen) => setCreateBannerOpen(prevState => {*/}
                {/*    return  {isOpen: isOpen, banner: null}*/}
                {/*})}>*/}
                {/*    <Button onClick={(bt) => {*/}
                {/*        bt.preventDefault();*/}
                {/*        setCreateBannerOpen({banner: null, isOpen:true})*/}
                {/*    }} variant="outline" className="w-fit ml-8"><PlusIcon className="w-4 h-4"/> Add News</Button>*/}
                {/*    <DialogContent onInteractOutside={(e) => {*/}
                {/*        e.preventDefault();*/}
                {/*    }} className="w-8">*/}
                {/*        <DialogHeader>*/}
                {/*            <DialogTitle>Add news</DialogTitle>*/}
                {/*        </DialogHeader>*/}
                {/*        <DialogBody className="overflow-y-auto max-h-[420px]">*/}
                {/*            <AddEditNews achievement={createBannerOpen.banner == null ? undefined : createBannerOpen.banner} onNeedRefresh={() => {*/}
                {/*                setCreateBannerOpen({banner: null, isOpen:false})*/}
                {/*                getExperiences();*/}
                {/*            }} />*/}
                {/*        </DialogBody>*/}
                {/*    </DialogContent>*/}
                {/*</Dialog>*/}
                <div className="rounded-md border mt-2 mx-8 mb-10">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>News ID</TableHead>
                                <TableHead>Title</TableHead>
                                <TableHead>Created at</TableHead>
                                <TableHead>Content</TableHead>
                                <TableHead>Category</TableHead>
                                <TableHead>Tags</TableHead>
                                <TableHead className="text-center">Image</TableHead>
                                <TableHead></TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {news?.map((experience) => (
                                <TableRow key={experience.id}>
                                    <TableCell>{experience._id}</TableCell>
                                    <TableCell>{experience.title}</TableCell>
                                    <TableCell>{formatDateString(experience.createdAt)}</TableCell>
                                    <TableCell >
                                        <p className="max-h-24 flex overflow-y-scroll" dangerouslySetInnerHTML={{__html: experience.content}} />
                                    </TableCell>
                                    <TableCell>{experience.category.name}</TableCell>
                                    <TableCell>{experience?.tags?.map(t => t.tag).join(",")}</TableCell>
                                    <TableCell>
                                        <Image className="mx-auto" width={60} height={60}
                                                      src={experience.image} alt=""/>
                                    </TableCell>
                                    <TableCell>
                                        {/*<div className="flex items-center justify-center gap-4">*/}
                                        {/*    <Trash2Icon onClick={() => setOpen({banner: experience, isOpen: true})} width={18} color="red" className="hover:cursor-pointer" />*/}
                                        {/*    <EditIcon width={18} className="hover:cursor-pointer" onClick={(bt) => {*/}
                                        {/*        bt.preventDefault();*/}
                                        {/*        setCreateBannerOpen({banner: experience, isOpen: true})*/}
                                        {/*    }} />*/}
                                        {/*</div>*/}
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>
            </div>
    )
}

export default NewsTable;