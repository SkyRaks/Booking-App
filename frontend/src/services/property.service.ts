import { useState } from "react";
import { create } from "zustand";
// import { useAuth } from "../services/user.auth"
import { useAuth } from "./user.auth";

export type Room = {
  name: string;
  price_per_night: number;
};

export type PropertyForm = {
  title: string;
  description: string;
  location: string;
  price_per_night: number;
  number_of_guests: number;
  amenities: string[];
  rooms: number;
  rooms_list: Room[];
  images: File[];
};

export const getProperty = async (id: string) => {
    // GET SINGLE PROPERTY FROM HOME PAGE
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

export const createProperty = async (form: PropertyForm) => {
    // CREATE PROPERTY AS OWNER
    const data = new FormData();

    Object.entries(form).forEach(([key, value]) => {
        if (key === "images") {
            form.images.forEach((img) => data.append("images", img))
        } else {
            data.append(key, JSON.stringify(value));
        }
    });
    const accessToken = useAuth.getState().accessToken;
    console.log("accessToken: ", accessToken)
    const res = await fetch("http://localhost:8000/properties/add-property/", {
        method: "POST",
        headers: {
            // "Content-type": "application/json",
            "Authorization": `Bearer ${accessToken}`
        },
        body: data,
        credentials: "include",
    });

    const result = await res.json()
    
    if (!res.ok) return {success: false, message: result.message}
    return {success: true, data: result.message}
}
