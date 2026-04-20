import { fetchMapProjects } from "@/lib/actions/admin/map-project.action";
import MapProjectsClient from "./map-projects-client";

export default async function MapProjectsPage() {
    const data = await fetchMapProjects();
    const projects = data.projects || [];

    return (
        <div className="flex-col">
            <div className="flex-1 space-y-4 p-8 pt-6">
                <div className="flex items-center justify-between">
                    <h2 className="text-3xl font-bold tracking-tight">Interactive Map Projects</h2>
                </div>
                <hr />
                <MapProjectsClient initialProjects={projects} />
            </div>
        </div>
    );
}
