import { useEffect, useState } from "react";
import {
  Box,
  Card,
  CardContent,
  Typography,
  Button,
  Chip,
  Stack,
  CircularProgress,
} from "@mui/material";
import { useAuth } from "../services/user.auth";

import { getBookings } from "../services/owner.service";

// Types
interface Booking {
  id: number;
  guestNum: number;
  property: string;
  dateFrom: string;
  dateTo: string;
  total_price: number;
  status: "pending" | "accepted" | "rejected";
}

// // Mock API
// const fetchBookings = async (): Promise<Booking[]> => {
//   return new Promise((resolve) => {
//     setTimeout(() => {
//       resolve([
//         {
//           id: 1,
//           guestNum: 1,
//           property: "Lake House",
//           dateFrom: "2026-05-01",
//           dateTo: "2026-05-05",
//           total_price: 20,
//           status: "pending",
//         },
//         {
//           id: 2,
//           guestNum: 2,
//           property: "City Apartment",
//           dateFrom: "2026-05-10",
//           dateTo: "2026-05-12",
//           total_price: 40.5,
//           status: "accepted",
//         },
//       ]);
//     }, 800);
//   });
// };

export default function OwnerBookingsPage() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const isAuthReady = useAuth((state) => state.isAuthReady);

  useEffect(() => {
    if (!isAuthReady) return

    getBookings().then((res) => {
      if (res.success) {
        setBookings(res.data); 
      } else {
        console.error(res.message);
      }
      setLoading(false);
    });
  }, [isAuthReady]);

  const updateStatus = (id: number, status: Booking["status"]) => {
    setBookings((prev) =>
      prev.map((b) => (b.id === id ? { ...b, status } : b))
    );
  };

  const getStatusColor = (status: Booking["status"]) => {
    switch (status) {
      case "accepted":
        return "success";
      case "rejected":
        return "error";
      default:
        return "warning";
    }
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" mt={5}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box p={3}>
      <Typography variant="h4" mb={3}>
        Booking Requests
      </Typography>

      <Stack spacing={2}>
        {bookings.map((booking) => (
          <Card key={booking.id} sx={{ borderRadius: 3 }}>
            <CardContent>
              <Stack
                direction={{ xs: "column", md: "row" }}
                justifyContent="space-between"
                alignItems="center"
                spacing={2}
              >
                <Box>
                  <Typography variant="h6">
                    {booking.property}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Guests: {booking.guestNum}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {booking.dateFrom} → {booking.dateTo}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Total: {booking.total_price}
                  </Typography>
                </Box>

                <Stack direction="row" spacing={2} alignItems="center">
                  <Chip
                    label={booking.status}
                    color={getStatusColor(booking.status)}
                  />

                  {booking.status === "pending" && (
                    <>
                      <Button
                        variant="contained"
                        onClick={() => updateStatus(booking.id, "accepted")}
                      >
                        Accept
                      </Button>
                      <Button
                        variant="outlined"
                        color="error"
                        onClick={() => updateStatus(booking.id, "rejected")}
                      >
                        Reject
                      </Button>
                    </>
                  )}
                </Stack>
              </Stack>
            </CardContent>
          </Card>
        ))}
      </Stack>
    </Box>
  );
}
