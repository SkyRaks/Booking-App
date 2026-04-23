import {Container,Typography,TextField,Grid,Card,CardContent,Checkbox,FormControlLabel,Button,Stepper, Step, StepLabel} from "@mui/material";
import { useState } from "react";
import { type PropertyForm, type Room } from "../services/property.service"
import { createProperty } from "../services/property.service";

// { EXAMPLE
//   "id": 1,
//   "title": "Modern Apartment",
//   "description": "...",
//   "location": "Toronto",
//   "price_per_night": 120,
//   "number_of_guests": 3,
//   "rooms": 2,
//   "amenities": ["wifi", "kitchen", "parking"],
//   "images": [
//     {"image": "/media/properties/1.jpg"},
//     {"image": "/media/properties/2.jpg"}
//   ],
//   "rooms_list": [
//     {"name": "Bedroom", "price_per_night": 80},
//     {"name": "Living Room", "price_per_night": 40}
//   ]
// }
const AMENITIES = ["wifi", "parking", "kitchen", "tv", "air conditioning"];

export default function CreatePropertyPage() {
    const [form, setForm] = useState<PropertyForm>({
        title: "",
        description: "",
        location: "",
        price_per_night: 0,
        number_of_guests: 1,
        rooms: 1,
        amenities: [],
        rooms_list: [],
        images: [],
    });

    const handleAmenityToggle = (item: string) => {
        const exists = form.amenities.includes(item);
        setForm({
            ...form,
            amenities: exists
            ? form.amenities.filter((a) => a !== item)
            : [...form.amenities, item],
        });
    };

    const addRoom = () => {
        setForm({
        ...form,
        rooms_list: [...form.rooms_list, { name: "", price_per_night: 0 }],
        });
    };

    const updateRoom = <K extends keyof Room>(
        index: number,
        field: K,
        value: Room[K]
    ) => {
        const updated = [...form.rooms_list];
        updated[index][field] = value;
        setForm({ ...form, rooms_list: updated });
    };

    const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files) return;
        setForm({ ...form, images: Array.from(e.target.files) });
    };

    const handleSubmit = async () => {
      console.log("form: ", form)
        const res = await createProperty(form);

        if (!res.success) {
          console.log(res.message)
        } else {
          console.log("property added")
        }
    };

    return (
    <Container maxWidth="md" sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h4" gutterBottom textAlign={"center"}>
        List your property
      </Typography>

      {/* Basic Info */}
      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Typography variant="h6">Basic Info</Typography>
          <TextField
            fullWidth
            label="Title"
            margin="normal"
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
          />
          <TextField
            fullWidth
            multiline
            rows={4}
            label="Description"
            margin="normal"
            value={form.description}
            onChange={(e) =>
              setForm({ ...form, description: e.target.value })
            }
          />
        </CardContent>
      </Card>

      {/* Location */}
      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Typography variant="h6">Location</Typography>
          <TextField
            fullWidth
            label="Location"
            margin="normal"
            value={form.location}
            onChange={(e) =>
              setForm({ ...form, location: e.target.value })
            }
          />
        </CardContent>
      </Card>

      {/* Details */}
      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Typography variant="h6">Property Details</Typography>
          <Grid container spacing={2}>
            <Grid size={6}>
              <TextField
                fullWidth
                type="number"
                label="Guests"
                value={form.number_of_guests}
                onChange={(e) =>
                  setForm({
                    ...form,
                    number_of_guests: +e.target.value,
                  })
                }
              />
            </Grid>
            <Grid size={6}>
              <TextField
                fullWidth
                type="number"
                label="Rooms"
                value={form.rooms}
                onChange={(e) =>
                  setForm({ ...form, rooms: +e.target.value })
                }
              />
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      {/* Amenities */}
      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Typography variant="h6">Amenities</Typography>
          <Grid container>
            {AMENITIES.map((a) => (
              <Grid size={6} key={a}>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={form.amenities.includes(a)}
                      onChange={() => handleAmenityToggle(a)}
                    />
                  }
                  label={a}
                />
              </Grid>
            ))}
          </Grid>
        </CardContent>
      </Card>

      {/* Rooms */}
      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Typography variant="h6">Rooms</Typography>

          {form.rooms_list.map((room, i) => (
            <Grid container spacing={2} key={i} sx={{ mb: 1 }}>
              <Grid size={6}>
                <TextField
                  fullWidth
                  label="Room Name"
                  value={room.name}
                  onChange={(e) =>
                    updateRoom(i, "name", e.target.value)
                  }
                />
              </Grid>
              <Grid size={6}>
                <TextField
                  fullWidth
                  type="number"
                  label="Price"
                  value={room.price_per_night}
                  onChange={(e) =>
                    updateRoom(i, "price_per_night", +e.target.value)
                  }
                />
              </Grid>
            </Grid>
          ))}

          <Button onClick={addRoom}>+ Add Room</Button>
        </CardContent>
      </Card>

      {/* Photos */}
      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Typography variant="h6">Photos</Typography>
          <Button variant="contained" component="label">
            Upload Images
            <input hidden multiple type="file" onChange={handleUpload} />
          </Button>
        </CardContent>
      </Card>

      {/* Pricing */}
      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Typography variant="h6">Pricing</Typography>
          <TextField
            fullWidth
            type="number"
            label="Price per night"
            value={form.price_per_night}
            onChange={(e) =>
              setForm({
                ...form,
                price_per_night: +e.target.value,
              })
            }
          />
        </CardContent>
      </Card>

      <Button
        fullWidth
        variant="contained"
        size="large"
        onClick={handleSubmit}
      >
        Submit Property
      </Button>
    </Container>
  );
}
