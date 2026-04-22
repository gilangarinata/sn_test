import MapProjectForm from "@/components/admin/our-business/project-map/project-map-form";
import { fetchMapProjectById } from "@/lib/actions/admin/map-project.action";

export default async function EditMapProjectPage({ params }: { params: { projectId: string } }) {
    const data = await fetchMapProjectById(params.projectId);
    const project = data.project;

    return (
        <div className="flex-col">
            <div className="flex-1 space-y-4 p-8 pt-6">
                <MapProjectForm initialData={project} />
            </div>
        </div>
    );
}
