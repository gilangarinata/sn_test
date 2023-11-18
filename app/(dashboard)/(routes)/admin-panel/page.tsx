import {fetchBanners} from "@/lib/actions/admin/banner.action";
import UniversalBanners from "@/components/admin/home/banners/universal-banners";
import MainBanner from "@/components/admin/home/banners/main-banner";


async function DashboardPage() {
    if (typeof window === 'undefined') return <></>
    return (
        <div className="flex flex-col">
            <MainBanner />
            <UniversalBanners />
        </div>
    )

}

export default DashboardPage;