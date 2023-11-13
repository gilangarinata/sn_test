import {fetchBanners} from "@/lib/actions/admin/banner.action";
import UniversalBanners from "@/components/admin/home/banners/universal-banners";
import MainBanner from "@/components/admin/home/banners/main-banner";
import ExperienceTable from "@/components/admin/home/experience/experience-table";
import AchievementTable from "@/components/admin/home/achievement/achievement-table";
import CategoryTable from "@/components/admin/media/category/category-table";


async function CategoryPage() {

    return (
        <div className="flex flex-col">
            <CategoryTable type="video" />
        </div>
    )

}

export default CategoryPage;