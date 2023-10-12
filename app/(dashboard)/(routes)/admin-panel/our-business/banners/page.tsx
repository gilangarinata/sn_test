import {fetchBanners} from "@/lib/actions/admin/banner.action";
import UniversalBanners from "@/components/admin/home/banners/universal-banners";
import MainBanner from "@/components/admin/home/banners/main-banner";
import ExperienceTable from "@/components/admin/home/experience/experience-table";
import AchievementTable from "@/components/admin/home/achievement/achievement-table";
import BannerTable from "@/components/admin/our-business/banners/banners-table";


async function AchievementPage() {

    return (
        <div className="flex flex-col">
            <BannerTable />
        </div>
    )

}

export default AchievementPage;