import { create } from "zustand";

type Role = "guest" | "owner";

type User = {
    id?: string;
    email?: string;
    role?: Role;
};

type AuthState = {
    accessToken: string | null;
    refreshToken: string | null;
    user: User;

    setAccessToken: (token: string | null) => void;
    setRefreshToken: (token: string | null) => void;
    setUser: (user: User) => void;

    loginUser: (data: {email: string; password: string}, role: Role) => Promise<{
        success: boolean,
        message: string,
    }>;

    registerUser: (data: {username: string; email: string; password: string}, role: Role) => Promise<{
        success: boolean,
        message: string,
    }>
};

export const useAuth = create<AuthState>((set) => ({
    accessToken: null,
    refreshToken: null,
    user: {},

    setAccessToken: (accessToken) => set({accessToken}),
    setRefreshToken: (refreshToken) => set({refreshToken}),
    setUser: (user) => set({user}),

    loginUser: async(logUser, role) => {
        if (!logUser.email || !logUser.password) {
            return {success: false, message: "provide all fields"}
        }

        const endpoint = role === "owner" ? "owners/login/" : "guests/login/";
        console.log("logUser: ", logUser);

        const res = await fetch(`http://127.0.0.1:8000/${endpoint}`, {
            method: "POST",
            headers: {"Content-type":"application/json"},
            body:JSON.stringify(logUser),
            credentials: "include",
        });

        const data = await res.json()
        if (!res.ok) return {success: false, message: data.message}

        set({
            accessToken: data.access,
            refreshToken: data.refresh,
            user: data.user,
        });

        return {success: true, message: "you've been logged in"};
    },

    registerUser: async(newUser, role) => {
        if (!newUser.username || !newUser.email || !newUser.password) {
            return {success: false, message: "provide all fields"}
        }

        const endpoint = role === "owner" ? "owners/register/" : "guests/register/";

        const res = await fetch(`http://127.0.0.1:8000/${endpoint}`, {
            method: "POST",
            headers: {"Content-type":"application/json"},
            body:JSON.stringify(newUser),
            credentials: "include",
        });

        const data = await res.json()
        if (!res.ok) return {success: false, message: data.message};
        
        return {success: true, message: "user created"};
    }
}))
