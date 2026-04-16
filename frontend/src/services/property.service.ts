export const getProperty = async (id: string) => {
    const res = await fetch(`http://localhost:8000/properties/${id}`, {
        method: "GET",
        headers: {
            "Content-type": "application/json"
        }
    })
    const data = await res.json();
    if (!res.ok) return {success: false, message: data.message};

    return {success: true, data: data};
}