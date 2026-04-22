import { Container, Typography, Grid, Card, CardContent, Button, Dialog, DialogActions, DialogTitle, DialogContent, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getProperty } from "../services/property.service";

import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs, { Dayjs } from "dayjs";

export default function PropertyPage() {
    const { id } = useParams();
    const [property, setProperty] = useState<any>(null);

    // FOR CHECKIN N OUT STUFF
    const [checkIn, setCheckIn] = useState<Dayjs | null>(null);
    const [checkOut, setCheckOut] = useState<Dayjs | null>(null);

    const getNights = () => {
        if (!checkIn || !checkOut) return 0;

        const days = checkOut.diff(checkIn, "day");
        return days > 0 ? days : 0
    }

    const nights = getNights()
    const total = nights * (property?.price_per_night || 0);
    // 

    // FOR WINDOW
    const [openWindow, setOpenWindow] = useState(false);

    const handleOpen = () => {
        // const today: Date = new Date()
        setOpenWindow(true);
    }

    const handleClose = () => {
        setOpenWindow(false);
    }
    // 

    // const handleSubmit = async () => {
    //     console.log("start date: ", checkIn)
    //     console.log("end date: ", checkOut)
    //     const res = await bookProperty(checkIn, checkOut, total);
    //     if (res.success) handleClose();
    // }

    // GET DATA ON PAGE
    useEffect(() => {
        const fetchData = async () => {
            if (!id) return
            const res = await getProperty(id);
            if (res.success) setProperty(res.data);
        };
        fetchData();
    }, [id]);
    if (!property) return <div>Loading...</div>
    // 

    return (
        <Container maxWidth="lg" sx={{mt: 4}}>
            <Dialog 
                open={openWindow}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {"Select Check-in and Check-out:"}
                </DialogTitle>

                <DialogContent>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker 
                            label="Check-In"
                            value={checkIn}
                            onChange={(newValue: Dayjs | null) => setCheckIn(newValue)}
                            sx={{mt: 2, width: "100%"}}
                        />

                        <DatePicker 
                            label="Check-Out"
                            value={checkOut}
                            onChange={(newValue: Dayjs | null) => setCheckOut(newValue)}
                            sx={{mt: 2, width: "100%"}}
                            minDate={checkIn || undefined}
                        />

                        <Typography sx={{mt: 2}}>
                            {nights > 0 ? `${nights} nights` : "Select dates" }
                        </Typography>
                        <Typography variant="h6">
                            Total: ${total}
                        </Typography>

                    </LocalizationProvider>
                </DialogContent>

                <DialogActions>
                    <Button variant="contained" disabled={!checkIn || !checkOut} >Confirm</Button>
                    <Button onClick={handleClose}>Cancel</Button>
                </DialogActions>

            </Dialog>

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
                            style={{width: "100%", borderRadius: 8}}
                        />
                        </Grid>

                        {property.images?.slice(1, 5).map((img: any, i: number) => (
                            <Grid key={i} size={4}>
                                <img
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
                            onClick={handleOpen}
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
