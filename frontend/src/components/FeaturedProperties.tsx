import { Grid, Card, CardMedia, CardContent, Typography } from "@mui/material";
import { useEffect } from "react";

import { usePropertiesStore } from "../services/common.service";
import { Link } from "react-router-dom";

interface Props {
  properties: any[];
}

export default function FeaturedProperties({properties}: Props) {

    return (
        <>
        <Typography variant="h5" sx={{ mt: 5, mb: 2 }}>
            Featured stays
        </Typography>

        <Grid container spacing={3}>
            {properties.map((p) => (
                <Grid size={{xs: 12, md: 4}} key={p.id}>
                    <Card component={Link} to={`/property/${p.id}`}>
                        {/* <CardMedia component="img" height="160" image={`http://localhost:8000${p.images?.[0]}`} /> */}
                        <CardMedia component="img" height="160" image={`http://localhost:8000${p.images}`} />
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
