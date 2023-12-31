import {fetchBanners} from "@/lib/actions/admin/banner.action";
import UniversalBanners from "@/components/admin/home/banners/universal-banners";
import MainBanner from "@/components/admin/home/banners/main-banner";
import ExperienceTable from "@/components/admin/home/experience/experience-table";
import AchievementTable from "@/components/admin/home/achievement/achievement-table";
import CareerTable from "@/components/admin/career/add_career/career-table";


async function AchievementPage() {
    if (typeof window !== 'undefined') {
        return (
            <div className="flex flex-col">
                <CareerTable/>
            </div>
        )
    }else {
        return <></>
    }

}

export default AchievementPage;