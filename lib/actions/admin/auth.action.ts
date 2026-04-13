"use server"

import User from "@/lib/models/user.model";
import ActivityLog from "@/lib/models/activity-log.model";
import { connectToDb } from "@/lib/mongoose";
import { hashPassword, verifyPassword, setSession, clearSession, getSession } from "@/lib/auth";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

export async function login(formData: any) {
    const { username, password } = formData;
    await connectToDb();

    // Ensure users are seeded
    await seedUsers();

    const user = await User.findOne({ username });
    if (!user || !verifyPassword(password, user.password)) {
        return { error: "Invalid username or password" };
    }

    setSession(user);

    // Log login
    await ActivityLog.create({
        userId: user._id,
        username: user.username,
        action: 'LOGIN',
        details: `User ${user.username} logged in.`,
    });

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
    if (existingUsers > 0) return { message: "Users already seeded." };

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
    return { message: "Initial users seeded successfully." };
}
