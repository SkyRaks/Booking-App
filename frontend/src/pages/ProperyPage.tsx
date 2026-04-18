import { Container, Typography, Grid, Card, CardContent, Button } from "@mui/material";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getProperty } from "../services/property.service";

export default function PropertyPage() {
    const { id } = useParams();
    const [property, setProperty] = useState<any>(null);

    useEffect(() => {
        const fetchData = async () => {
            if (!id) return
            const res = await getProperty(id);
            if (res.success) setProperty(res.data);
        };
        fetchData();
    }, [id]);
    if (!property) return <div>Loading...</div>

    return (
        <Container maxWidth="lg" sx={{mt: 4}}>
            <Typography variant="h4" gutterBottom>
                {property.title}
            </Typography>

            <Typography variant="body1" color="text.secondary">
                {property.location}
            </Typography>

            <Grid container spacing={4} sx={{ mt: 2 }}>
                <Grid size={8}>
                    <Grid container spacing={2} sx={{mt: 2}}>
                        <Grid size={8}>
                            <img
                            src={`http://localhost:8000${property.images?.[0].image}`}
                            // src={`http://localhost:8000${img.image}`}
                            style={{width: "100%", borderRadius: 8}}
                        />
                        </Grid>

                        {property.images?.slice(1, 5).map((img: any, i: number) => (
                            <Grid key={i} size={4}>
                                <img
                                    // src={`http://localhost:8000${property.images?.[0].image}`}
                                    src={`http://localhost:8000${img.image}`}
                                    style={{width: "100%", borderRadius: 8}}
                                />
                            </Grid>
                        ))}
                    </Grid>

                    <Typography variant="h6">Description</Typography>
                    <Typography>{property.description}</Typography>

                    <Typography variant="h6" sx={{ mt: 3 }}>
                        Amenities
                    </Typography>
                    <ul>
                        {property.amenities?.map((a: string, i: number) => (
                        <li key={i}>{a}</li>
                        ))}
                    </ul>

                    <Typography variant="h6" sx={{ mt: 3 }}>
                        Rooms
                    </Typography>

                    {property.rooms_list?.map((room: any, i: number) => (
                        <Card key={i} sx={{ mb: 2 }}>
                        <CardContent>
                            <Typography>{room.name}</Typography>
                            <Typography>${room.price_per_night} / night</Typography>
                        </CardContent>
                        </Card>
                    ))}
                </Grid>

                <Grid size={4}>
                    <Card sx={{ position: "sticky", top: 20 }}>
                        <CardContent>
                        <Typography variant="h5">
                            ${property.price_per_night} / night
                        </Typography>

                        <Typography sx={{ mt: 1 }}>
                            Max guests: {property.number_of_guests}
                        </Typography>

                        <Button
                            variant="contained"
                            fullWidth
                            sx={{ mt: 2 }}
                        >
                            Reserve
                        </Button>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
        </Container>
    )
}
