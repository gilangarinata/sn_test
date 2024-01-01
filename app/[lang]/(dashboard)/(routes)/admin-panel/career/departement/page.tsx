import {fetchBanners} from "@/lib/actions/admin/banner.action";
import UniversalBanners from "@/components/admin/home/banners/universal-banners";
import MainBanner from "@/components/admin/home/banners/main-banner";
import ExperienceTable from "@/components/admin/home/experience/experience-table";
import AchievementTable from "@/components/admin/home/achievement/achievement-table";
import DepartementTable from "@/components/admin/career/departement/departement-table";


async function AchievementPage() {

    return (
        <div className="flex flex-col">
            <DepartementTable />
        </div>
    )

}

export default AchievementPage;