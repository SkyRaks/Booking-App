import { useState } from "react";
import { create } from "zustand";

type Room = {
    name: string,
    price_per_night: number
}

type PropertyFrom = {
    title: string,
    description: string;
    location: string;
    price_per_night: number;
    number_of_guests: number;
    rooms: number;
    amenities: string[];
    rooms_list: Room[];
    images: File[];
}
