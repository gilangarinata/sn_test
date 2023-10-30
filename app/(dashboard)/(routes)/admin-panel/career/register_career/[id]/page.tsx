import {fetchBanners} from "@/lib/actions/admin/banner.action";
import UniversalBanners from "@/components/admin/home/banners/universal-banners";
import MainBanner from "@/components/admin/home/banners/main-banner";
import ExperienceTable from "@/components/admin/home/experience/experience-table";
import AchievementTable from "@/components/admin/home/achievement/achievement-table";
import CareerTable from "@/components/admin/career/add_career/career-table";
import RegisterCareerDetail from "@/components/admin/career/register_career/register-career-detail";
import {fetchCareerRegisterById} from "@/lib/actions/admin/career_register.action";


async function AchievementPage({ params }: { params: { id: string } }) {
    return (
        <div className="flex flex-col">
            <RegisterCareerDetail id={params.id} />
        </div>
    )

}

export default AchievementPage;