import { useAuth } from "../services/user.auth"

export const getBookings = async () => {
    const accessToken = useAuth.getState().accessToken;
    const res = await fetch("/api/bookings/", {
        method: "GET",
        headers: {
            "Authorization": `Bearer ${accessToken}`,
            "Content-type": "application/json"            
        }
    })
    const data = await res.json()
    if (!res.ok) return {success: false, message: data.message};

    return {success: true, data: data};
}
