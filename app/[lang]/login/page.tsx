import {fetchBanners} from "@/lib/actions/admin/banner.action";
import UniversalBanners from "@/components/admin/home/banners/universal-banners";
import MainBanner from "@/components/admin/home/banners/main-banner";
import Login from "@/app/[lang]/login/login";


async function DashboardPage() {

    return (
        <div className="flex flex-col">
            <Login />
        </div>
    )

}

export default DashboardPage;