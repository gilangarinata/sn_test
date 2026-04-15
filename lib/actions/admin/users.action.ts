"use server"

import User from "@/lib/models/user.model";
import ActivityLog from "@/lib/models/activity-log.model";
import { connectToDb } from "@/lib/mongoose";
import { getSession, hashPassword } from "@/lib/auth";
import { revalidatePath } from "next/cache";

export async function fetchUsers() {
    await connectToDb();
    const session = getSession();
    if (!session || session.role !== 'super_admin') {
        throw new Error("Unauthorized");
    }

    const users = await User.find({}).sort({ createdAt: -1 });
    return JSON.parse(JSON.stringify(users));
}

export async function createUser(formData: any) {
    const { username, password, name, role } = formData;
    await connectToDb();
    
    const session = getSession();
    if (!session || session.role !== 'super_admin') {
        return { error: "Unauthorized" };
    }

    try {
        const existing = await User.findOne({ username });
        if (existing) {
            return { error: "Username already exists" };
        }

        const user = await User.create({
            username,
            password: hashPassword(password),
            name,
            role
        });

        await ActivityLog.create({
            userId: session.id,
            username: session.username,
            action: 'CREATE_USER',
            details: `Created new user: ${username} (${role})`,
        });

        revalidatePath('/admin-panel/users');
        return { success: true };
    } catch (e: any) {
        return { error: e.message || "Failed to create user" };
    }
}

export async function adminUpdateUserPassword(userId: string, newPassword: string) {
    await connectToDb();
    
    const session = getSession();
    if (!session || session.role !== 'super_admin') {
        return { error: "Unauthorized" };
    }

    try {
        const user = await User.findById(userId);
        if (!user) {
            return { error: "User not found" };
        }

        user.password = hashPassword(newPassword);
        await user.save();

        await ActivityLog.create({
            userId: session.id,
            username: session.username,
            action: 'UPDATE_USER_PASSWORD',
            details: `Updated password for user: ${user.username}`,
        });

        revalidatePath('/admin-panel/users');
        return { success: true };
    } catch (e: any) {
        return { error: e.message || "Failed to update password" };
    }
}

export async function deleteUser(userId: string) {
    await connectToDb();
    
    const session = getSession();
    if (!session || session.role !== 'super_admin') {
        return { error: "Unauthorized" };
    }

    try {
        const user = await User.findById(userId);
        if (!user) return { error: "User not found" };

        if (user.username === session.username) {
            return { error: "Cannot delete yourself" };
        }

        await User.findByIdAndDelete(userId);

        await ActivityLog.create({
            userId: session.id,
            username: session.username,
            action: 'DELETE_USER',
            details: `Deleted user: ${user.username}`,
        });

        revalidatePath('/admin-panel/users');
        return { success: true };
    } catch (e: any) {
        return { error: e.message || "Failed to delete user" };
    }
}
