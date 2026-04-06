import { create } from "zustand";

type Role = "guest" | "owner";

type User = {
    id?: string;
    email?: string;
    role?: Role;
};

type AuthState = {
    accessToken: string | null;
    user: User;

    setAccessToken: (token: string | null) => void;
    setUser: (user: User) => void;

    loginUser: (data: {email: string; password: string, role: Role}) => Promise<{
        success: boolean,
        message: string,
    }>;

    registerUser: (data: {username: string; email: string; password: string}, 
        role: Role
    ) => Promise<{
        success: boolean,
        message: string,
    }>
};

export const useAuth = create<AuthState>((set) => ({
    accessToken: null,
    user: {},

    setAccessToken: (accessToken) => set({accessToken}),
    setUser: (user) => set({user}),

    loginUser: async(logUser) => {
        if (!logUser.email || !logUser.password || !logUser.role) {
            return {success: false, message: "provide all fields"}
        }

        const res = await fetch(`http://localhost:8000/common/login/`, {
            method: "POST",
            headers: {"Content-type":"application/json"},
            body:JSON.stringify(logUser),
            credentials: "include",
        });

        const data = await res.json()
        if (!res.ok) return {success: false, message: data.message}

        set({
            accessToken: data.access,
            user: data.user,
        });

        return {success: true, message: "you've been logged in"};
    },

    registerUser: async(newUser, role) => {
        if (!newUser.username || !newUser.email || !newUser.password) {
            return {success: false, message: "provide all fields"}
        }

        const endpoint = role === "owner" ? "owners/register/" : "guests/register/";

        const res = await fetch(`http://localhost:8000/${endpoint}`, {
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
