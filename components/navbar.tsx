import {SignOutButton, UserButton} from "@clerk/nextjs";
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
                <div className="hidden lg:block bg-green-700/10 p-2 rounded-xl mr-4 hover: cursor-pointer">
                    <MoonStar className="h-5 w-5"  />
                </div>
                <div className="hidden lg:block bg-primary/10 p-2 rounded-xl mr-4 hover: cursor-pointer">
                    <Search className="h-5 w-5"  />
                </div>
                <div className="hidden lg:block relative mr-12 hover: cursor-pointer">
                    <div className="h-1 w-1 bg-red-600 rounded-full"></div>
                    <Bell className="h-5 w-5" />
                </div>
                <DropdownMenu>
                    <DropdownMenuTrigger>
                        <div className="flex rounded-3xl p-1 shadow-black/30 shadow-sm justify-center items-center">
                            <UserButton afterSignOutUrl="/sign-in" />
                            <p className="text-xs px-4">John Doe</p>
                            <ChevronDown className="h-4 w-4" />
                        </div>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                        <DropdownMenuLabel>My Account</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>Profile</DropdownMenuItem>
                        <DropdownMenuItem>Billing</DropdownMenuItem>
                        <DropdownMenuItem>Team</DropdownMenuItem>
                        <DropdownMenuItem>Subscription</DropdownMenuItem>
                        <SignOutButton >
                            <DropdownMenuItem>Logout</DropdownMenuItem>
                        </SignOutButton>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
        </div>
    )
}

export default Navbar;