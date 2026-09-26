import express from "express";
import cors from "cors";
import { properties } from "./data.js";

const app = express();
app.use(cors());
app.use(express.json());

// GET /api/properties - list all properties
app.get("/api/properties", (req, res) => {
  res.json(properties.map(({ reviews, ...rest }) => rest));
});

// GET /api/properties/:id - single property
app.get("/api/properties/:id", (req, res) => {
  const p = properties.find((p) => p.id === req.params.id);
  if (!p) return res.status(404).json({ success: false, message: "Property not found" });
  const { reviews, ...rest } = p;
  res.json(rest);
});

// GET /api/properties/:id/reviews
app.get("/api/properties/:id/reviews", (req, res) => {
  const p = properties.find((p) => p.id === req.params.id);
  if (!p) return res.status(404).json({ success: false, message: "Property not found" });
  res.json(p.reviews || []);
});

// POST /api/bookings
app.post("/api/bookings", (req, res) => {
  const { propertyId, checkIn, checkOut, nights, guests, total } = req.body || {};

  if (!propertyId) return res.status(400).json({ success: false, message: "Missing propertyId" });
  if (!checkIn || !checkOut) return res.status(400).json({ success: false, message: "Missing dates" });
  if (new Date(checkOut) <= new Date(checkIn))
    return res.status(400).json({ success: false, message: "Checkout must be after check-in" });
  if (!guests || guests.adults < 1)
    return res.status(400).json({ success: false, message: "At least 1 adult guest is required" });

  const bookingId = `AGR-${new Date().getFullYear()}-${Math.floor(10000 + Math.random() * 89999)}`;

  res.json({
    success: true,
    bookingId,
    propertyId,
    checkIn,
    checkOut,
    nights,
    guests,
    total,
  });
});

// POST /api/contact-host
app.post("/api/contact-host", (req, res) => {
  const { propertyId, message } = req.body || {};
  if (!message || !message.trim())
    return res.status(400).json({ success: false, message: "Message cannot be empty" });

  res.json({
    success: true,
    message: "Message delivered to host (demo mode — no real message is sent).",
  });
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, "0.0.0.0", () => console.log(`Stayora backend running on http://localhost:${PORT}`));
