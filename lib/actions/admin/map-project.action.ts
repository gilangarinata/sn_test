"use server"

import { connectToDb } from "@/lib/mongoose";
import MapProject from "@/lib/models/map-project.model";
import mongoose from "mongoose";
import { revalidatePath } from "next/cache";

export async function fetchMapProjects() {
    try {
        await connectToDb();
        const projects = await MapProject.find().sort({ createdAt: -1 });
        return { projects: JSON.parse(JSON.stringify(projects)) };
    } catch (error: any) {
        return { error: `Failed to fetch map projects: ${error.message}` };
    }
}

export async function createMapProject({
    name, capacity, location, image, x, y, path
}: {
    name: string; capacity: string; location: string; image?: string; x: number; y: number; path: string;
}) {
    try {
        await connectToDb();

        const newProject = new MapProject({
            id: new mongoose.Types.ObjectId().toString(),
            name,
            capacity,
            location,
            image,
            x,
            y
        });

        await newProject.save();
        revalidatePath(path);
        
        return { success: true };
    } catch (error: any) {
        return { error: `Failed to create map project: ${error.message}` };
    }
}

export async function updateMapProject({
    id, name, capacity, location, image, x, y, path
}: {
    id: string; name: string; capacity: string; location: string; image?: string; x: number; y: number; path: string;
}) {
    try {
        await connectToDb();

        await MapProject.findOneAndUpdate(
            { id },
            { name, capacity, location, image, x, y }
        );

        revalidatePath(path);
        
        return { success: true };
    } catch (error: any) {
        return { error: `Failed to update map project: ${error.message}` };
    }
}

export async function deleteMapProject(id: string, path: string) {
    try {
        await connectToDb();
        await MapProject.findOneAndDelete({ id });
        revalidatePath(path);
        return { success: true };
    } catch (error: any) {
        return { error: `Failed to delete map project: ${error.message}` };
    }
}

export async function fetchMapProjectById(id: string) {
    try {
        await connectToDb();
        const project = await MapProject.findOne({ id });
        return { project: JSON.parse(JSON.stringify(project)) };
    } catch (error: any) {
        return { error: `Failed to fetch map project: ${error.message}` };
    }
}
