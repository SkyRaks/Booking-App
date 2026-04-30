import { useState, useEffect } from "react";
import { Container } from "@mui/material";
import FeaturedProperties from "../components/FeaturedProperties";
import { useSearchParams } from "react-router-dom";

export default function SearchPage() {
    const [result, setResult] = useState([]);
    const [params] = useSearchParams();

    const locaion = params.get("location");
    const guests = params.get("guests");

    useEffect(() => {
        const fetchData = async () => {
            const res = await fetch("http://localhost:8000/properties/search/", {
                method: "POST",
                headers: {
                    "Content-type": "application/json"
                },
                body: JSON.stringify({
                    location,
                    guests,
                })
            })

            const data = await res.json()
            setResult(data);
        };

        fetchData();
    }, [location, guests]);

    return (
        <Container>
            <FeaturedProperties properties={result}/>
        </Container>
    )
}