import { Grid, Card, CardMedia, CardContent, Typography } from "@mui/material";
import { useEffect } from "react";

import { usePropertiesStore } from "../services/common.service";
// type FetchProperty = {
//     id: number,
//     owner: string,
//     title: string,
//     description: string,
//     location: string,
//     price_per_night: number,
//     number_of_guests: number,
//     amenities: string[],
//     rooms: number,
//     image: string[],
// }

export default function FeaturedProperties() {
    const {properties, setProperties} = usePropertiesStore();

    useEffect(() => {
        setProperties();
    }, [])
    // console.log("properties: ", properties);

    return (
        <>
        <Typography variant="h5" sx={{ mt: 5, mb: 2 }}>
            Featured stays
        </Typography>

        <Grid container spacing={3}>
            {properties.map((p) => (
                <Grid size={{xs: 12, md: 4}} key={p.title}>
                    <Card>
                        <CardMedia component="img" height="160" image={`http://localhost:8000${p.images?.[0]}`} />
                        <CardContent>
                            <Typography variant="h6">{p.title}</Typography>
                            <Typography variant="body2">{p.location}</Typography>
                            <Typography variant="subtitle1">{p.price_per_night}$</Typography>
                        </CardContent>
                    </Card>
                </Grid>
            ))}
        </Grid>
        </>
    );
}
