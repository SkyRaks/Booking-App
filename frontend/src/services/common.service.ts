import {create} from 'zustand';

type FetchProperty = {
    id: number, 
    title: string, 
    location: string, 
    price_per_night: number, 
    images: string[], 
}

type PropertiesState = {
    properties: FetchProperty[],
    setProperties: () => Promise<void>,
}

export const usePropertiesStore = create<PropertiesState>((set) => (
    {
        properties: [],

        setProperties: async () => {
            try {
                const res = await fetch("http://localhost:8000/properties/featured/", {
                    method: "GET",
                    headers: {
                        "Content-type": "application/json"
                    }
                })
                const data = await res.json();
                set({properties: data});
            } catch (error) {
                console.error(error);
            }
        }
    }
));
