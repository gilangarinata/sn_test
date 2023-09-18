import {fetchBanners} from "@/lib/actions/admin/dashboard.action";
import UniversalBanners from "@/components/admin/home/universal-banners";


async function DashboardPage() {
    const banners = await fetchBanners();
    if (!banners) return null;

    return (
        <UniversalBanners banners={banners.banners} isNext={banners.isNext} />
    )

}

export default DashboardPage;