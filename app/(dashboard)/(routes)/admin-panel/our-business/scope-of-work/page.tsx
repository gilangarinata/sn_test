import {fetchBanners} from "@/lib/actions/admin/banner.action";
import UniversalBanners from "@/components/admin/home/banners/universal-banners";
import MainBanner from "@/components/admin/home/banners/main-banner";
import ExperienceTable from "@/components/admin/home/experience/experience-table";
import AchievementTable from "@/components/admin/home/achievement/achievement-table";
import BannerTable from "@/components/admin/our-business/banners/banners-table";
import SolarPowerWorksTable from "@/components/admin/our-business/solar-power-works/solar-power-works-table";
import ScopeOfWorkTable from "@/components/admin/our-business/scope-of-works/scope-of-work-table";


async function AchievementPage() {
    if (typeof window === 'undefined') return <></>
    return (
        <div className="flex flex-col">
            <ScopeOfWorkTable />
        </div>
    )

}

export default AchievementPage;