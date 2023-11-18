import {fetchBanners} from "@/lib/actions/admin/banner.action";
import UniversalBanners from "@/components/admin/home/banners/universal-banners";
import MainBanner from "@/components/admin/home/banners/main-banner";
import ExperienceTable from "@/components/admin/home/experience/experience-table";
import AchievementTable from "@/components/admin/home/achievement/achievement-table";
import BannerTable from "@/components/admin/our-business/banners/banners-table";
import WhySolarTable from "@/components/admin/our-business/why-solar/why-solar-table";


async function AchievementPage() {
    if (typeof window === 'undefined') return <></>
    return (
        <div className="flex flex-col">
            <WhySolarTable />
        </div>
    )

}

export default AchievementPage;