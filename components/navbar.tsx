// import {SignOutButton, UserButton} from "@clerk/nextjs";
import MobileSidebar from "@/components/mobile-sidebar";
import {Bell, ChevronDown, MoonStar, Search} from "lucide-react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {fetchLastVisit} from "@/lib/actions/admin/last-visit.action";
import {fetchGetInTouch} from "@/lib/actions/admin/get-in-touch/get-in-touch.action";
import {GetInTouch} from "@/components/admin/get-in-touch/get-in-table";
import Link from "next/link";
import {fetchAllCareer} from "@/lib/actions/admin/career.action";
import CareerTable, {CareerMdl} from "@/components/admin/career/add_career/career-table";
import {fetchAllCareerRegister} from "@/lib/actions/admin/career_register.action";
import {RegisterCareer} from "@/components/admin/career/register_career/register-career-table";

async function Navbar() {
    const lastVisits = await fetchLastVisit();
    const lastVisitCareer = lastVisits?.news?.last_visit_career as Date;
    const lastVisitGetInTouch = lastVisits?.news?.last_visit_get_in_touch as Date;

    const getInTouch = await fetchGetInTouch();
    const git = getInTouch?.banners as GetInTouch[];

    const careers = await fetchAllCareerRegister();
    const crs = careers?.banners as RegisterCareer[];

    const filteredGit = git?.filter((item) => {
        return item.createdAt > lastVisitGetInTouch
    })

    const filteredGitLength = filteredGit?.length as number;

    const filteredCrs = crs?.filter((item) => {
        return item.createdAt > lastVisitCareer
    })

    const filteredCrsLength = filteredGit?.length as number;

    const total = filteredGitLength + filteredCrsLength;

    return (
        <div className="flex items-center p-4">
            <MobileSidebar />
            <div className="flex w-full justify-end items-center gap-4">
                <DropdownMenu>
                    <DropdownMenuTrigger>
                        <div className="p-5">
                            <strong className="relative inline-flex items-center rounded border border-gray-200 px-2.5 py-1.5 text-xs font-medium">
                                <span className="absolute -top-2 -right-2 h-5 w-5 rounded-full bg-red-600 flex justify-center items-center items text-white"><span>{total}</span></span>
                                <span className="ml-1.5 text-red-600">Notification</span>
                            </strong>
                        </div>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                        {filteredGit?.map((item) => {
                            return (
                                <DropdownMenuItem key={item.id}>
                                    <Link href="/admin-panel/get-in-touch">
                                        <div className="flex flex-col">
                                            <p className="text-xs text-gray-400">{item.createdAt?.toLocaleTimeString()} {item.createdAt?.getFullYear()}</p>
                                            <p className="text-sm">{item.name} Just published new get in touch message</p>
                                        </div>
                                    </Link>
                                </DropdownMenuItem>
                            )
                        })}

                        {filteredCrs?.map((item) => {
                            return (
                                <DropdownMenuItem key={item.id}>
                                    <Link href="/admin-panel/career/career_register">
                                        <div className="flex flex-col">
                                            <p className="text-xs text-gray-400">{item.createdAt?.toLocaleTimeString()} {item.createdAt?.getFullYear()}</p>
                                            <p className="text-sm">{item.firstName} Just published new career application</p>
                                        </div>
                                    </Link>
                                </DropdownMenuItem>
                            )
                        })}
                        {/*<SignOutButton >*/}
                        {/*    <DropdownMenuItem>Logout</DropdownMenuItem>*/}
                        {/*</SignOutButton>*/}
                    </DropdownMenuContent>
                </DropdownMenu>
                <DropdownMenu>
                    <DropdownMenuTrigger>
                        <div className="flex rounded-3xl p-1 shadow-black/30 shadow-sm justify-center items-center">
                            {/*<UserButton afterSignOutUrl="/sign-in" />*/}
                            <p className="text-xs px-4">John Doe</p>
                            <ChevronDown className="h-4 w-4" />
                        </div>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                        <DropdownMenuLabel>My Account</DropdownMenuLabel>
                        {/*<SignOutButton >*/}
                        {/*    <DropdownMenuItem>Logout</DropdownMenuItem>*/}
                        {/*</SignOutButton>*/}
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
        </div>
    )
}

export default Navbar;