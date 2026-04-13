import crypto from 'crypto';
import { cookies } from 'next/headers';

const SECRET_KEY = process.env.JWT_SECRET || 'your-secret-key';

export function hashPassword(password: string): string {
    return crypto.pbkdf2Sync(password, SECRET_KEY, 1000, 64, 'sha512').toString('hex');
}

export function verifyPassword(password: string, hashed: string): boolean {
    const hash = crypto.pbkdf2Sync(password, SECRET_KEY, 1000, 64, 'sha512').toString('hex');
    return hash === hashed;
}

export function setSession(user: any) {
    const sessionData = {
        id: user._id.toString(),
        username: user.username,
        role: user.role,
        name: user.name,
    };
    const sessionStr = JSON.stringify(sessionData);
    // In a real app, you'd encrypt this or use a proper JWT
    cookies().set('admin-session', sessionStr, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        path: '/',
    });
}

export function getSession() {
    const session = cookies().get('admin-session')?.value;
    if (!session) return null;
    try {
        return JSON.parse(session);
    } catch (e) {
        return null;
    }
}

export function clearSession() {
    cookies().delete('admin-session');
}
