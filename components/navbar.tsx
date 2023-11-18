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

const Navbar = () => {
    return (
        <div className="flex items-center p-4">
            <MobileSidebar />
            <div className="flex w-full justify-end items-center">
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