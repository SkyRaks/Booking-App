import { Grid, Card, CardMedia, CardContent, Typography } from "@mui/material";

const properties = [
    {
    name: "Grand Hotel",
    location: "Toronto",
    price: "$120/night",
    image: "https://source.unsplash.com/400x300/?hotel",
  },
  {
    name: "City Apartment",
    location: "New York",
    price: "$90/night",
    image: "https://source.unsplash.com/400x300/?apartment",
  },
  {
    name: "Beach Resort",
    location: "Miami",
    price: "$200/night",
    image: "https://source.unsplash.com/400x300/?resort",
  },
];

export default function FeaturedProperties() {
    return (
        <>
        <Typography variant="h5" sx={{ mt: 5, mb: 2 }}>
            Featured stays
        </Typography>

        <Grid container spacing={3}>
            {properties.map((p) => (
                <Grid size={{xs: 12, md: 4}} key={p.name}>
                    <Card>
                        <CardMedia component="img" height="160" image={p.image} />
                        <CardContent>
                            <Typography variant="h6">{p.name}</Typography>
                            <Typography variant="body2">{p.location}</Typography>
                            <Typography variant="subtitle1">{p.price}</Typography>
                        </CardContent>
                    </Card>
                </Grid>
            ))}
        </Grid>
        </>
    );
}
