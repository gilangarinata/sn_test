"use server"

import User from "@/lib/models/user.model";
import ActivityLog from "@/lib/models/activity-log.model";
import { connectToDb } from "@/lib/mongoose";
import { hashPassword, verifyPassword, setSession, clearSession, getSession } from "@/lib/auth";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

export async function login(formData: any) {
    try {
        const { username, password } = formData;
        await connectToDb();

        // Ensure users are seeded gracefully
        try {
            await seedUsers();
        } catch (seedErr) {
            console.error("Seeding error:", seedErr);
            // Non-fatal, continue login attempt
        }

        const user = await User.findOne({ username });
        if (!user || !verifyPassword(password, user.password)) {
            return { error: "Invalid username or password" };
        }

        setSession(user);

        // Log login
        try {
            await ActivityLog.create({
                userId: user._id,
                username: user.username,
                action: 'LOGIN',
                details: `User ${user.username} logged in.`,
            });
        } catch (logErr) {
            console.error("Activity log error:", logErr);
        }

    } catch (e: any) {
        console.error("Login Server Error:", e);
        return { error: "Server error during login: " + (e.message || "Unknown error") };
    }
    
    redirect("/admin-panel");
}

export async function logout() {
    clearSession();
    redirect("/login");
}

export async function createActivityLog(action: string, details: string) {
    await connectToDb();
    const session = getSession();
    if (!session) return;

    await ActivityLog.create({
        userId: session.id,
        username: session.username,
        action,
        details,
    });
}

export async function fetchActivityLogs() {
    await connectToDb();
    const session = getSession();
    if (!session || (session.role !== 'marketing' && session.role !== 'it')) {
        throw new Error("Unauthorized");
    }

    const logs = await ActivityLog.find({}).sort({ timestamp: -1 }).limit(100);
    return JSON.parse(JSON.stringify(logs));
}

// Initial seed function
export async function seedUsers() {
    await connectToDb();
    const existingUsers = await User.countDocuments();
    if (existingUsers === 0) {
        const usersToSeed = [
            {
                username: "andikaputra@s-energi.com",
                password: hashPassword("MasterWarrior100113"),
                name: "Andika Restu Putra",
                role: "marketing",
            },
            {
                username: "maharaniva@s-energi.com",
                password: hashPassword("DmWarrior100113"),
                name: "Maharani Vania",
                role: "marketing",
            },
            {
                username: "it_team@s-energi.com",
                password: hashPassword("ItWarrior100113"),
                name: "IT Team",
                role: "it",
            },
            {
                username: "meidynasilva@s-energy.id",
                password: hashPassword("HrWarrior100113"),
                name: "Meidyna Silva",
                role: "hr",
            },
        ];
        await User.insertMany(usersToSeed);
    }

    // Explicitly guarantee super admin exists
    const superAdminExists = await User.findOne({ role: 'super_admin' });
    if (!superAdminExists) {
        await User.create({
            username: "superadmin@s-energi.com",
            password: hashPassword("SuperAdmin100"),
            name: "Super Admin",
            role: "super_admin",
        });
    }

    return { message: "Users validation complete." };
}

export async function changePassword(formData: any) {
    const { oldPassword, newPassword } = formData;
    await connectToDb();
    
    const session = getSession();
    if (!session) return { error: "Not authenticated" };

    const user = await User.findById(session.id);
    if (!user || !verifyPassword(oldPassword, user.password)) {
        return { error: "Incorrect current password" };
    }

    user.password = hashPassword(newPassword);
    await user.save();

    await ActivityLog.create({
        userId: user._id,
        username: user.username,
        action: 'CHANGE_PASSWORD',
        details: `User ${user.username} changed their password.`,
    });

    return { success: true };
}
