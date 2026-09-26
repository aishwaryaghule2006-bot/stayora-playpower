# Stayora — Airbnb-style Property Booking Site

A fully functional property details & booking web app (React + Vite + Tailwind frontend,
Express backend), recreating the layout/UX shown in the reference video for
**"Romantic Jacuzzi 1BHK Condo | Mirashya UG10" — Candolim, Goa**.

Original branding ("Stayora") is used throughout; no Airbnb assets or trademarks are included.

## What's included & working

- Responsive header with search modal, mobile menu
- Sticky nav tabs (Photos / Amenities / Reviews / Location) with scroll-spy
- Image gallery grid (desktop) + swipeable carousel (mobile), fullscreen lightbox with
  keyboard navigation, counter, prev/next, thumbnails
- Share (copy link) and Save/favorite toggle
- Property stats, highlights, host preview
- "Where you'll sleep" cards
- Amenities preview + "Show all amenities" modal grouped by category
- Sticky desktop booking card / mobile bottom sheet:
  - Two-month date-range calendar picker (past dates disabled, range highlighting,
    prevents checkout before check-in)
  - Guest selector (adults / children / infants / pets) with +/- controls and validation
  - Live nightly price × nights + cleaning fee + service fee + taxes = total, recalculated
    on every date/guest change
  - Reserve button validates dates/guests, calls the backend, and shows a confirmation
    modal with a generated booking ID
- Reviews section with category ratings, review cards, "show all" modal with sorting
- Leaflet + OpenStreetMap "Where you'll be" section (no API key required)
- Host section with response stats + a working "Message host" chat modal (posts to backend)
- Things to know: house rules / safety / cancellation policy (expandable)
- Horizontally scrollable "More stays nearby" cards
- Back-to-top button, smooth scrolling throughout
- Tested at 360 / 390 / 430 / 768 / 1024 / 1280 / 1440px

## Project structure

```
stayora/
├── src/
│   ├── components/         # Header, ImageGallery, BookingCard, DatePicker, etc.
│   │   └── Modals/          # BookingConfirmation
│   ├── pages/
│   │   └── PropertyDetails.jsx
│   ├── data/
│   │   └── properties.js    # <-- EDIT THIS to change property info/images/reviews
│   ├── utils/
│   │   ├── dateUtils.js
│   │   └── pricing.js
│   ├── BookingContext.jsx   # shared booking state (dates, guests, pricing, reserve())
│   ├── App.jsx
│   └── main.jsx
├── backend/
│   ├── server.js            # Express API
│   ├── data.js              # <-- mock data used by the backend
│   └── package.json
├── index.html
├── package.json
└── vite.config.js
```

## Running it

You need Node.js 18+ installed.

**1. Install dependencies**

```bash
# from the project root
npm install

# and the backend
cd backend
npm install
cd ..
```

**2. Start the backend** (in one terminal)

```bash
cd backend
npm start
# → Stayora backend running on http://localhost:4000
```

**3. Start the frontend** (in another terminal, from the project root)

```bash
npm run dev
# → open the printed http://localhost:5173 (or similar) URL
```

The Vite dev server proxies `/api/*` calls to `http://localhost:4000`, so the two need to
run together for booking/contact-host to hit the real backend. If the backend isn't
running, the "Reserve" button still works — it falls back to generating a booking ID
client-side so the demo never breaks.

**4. Build for production**

```bash
npm run build      # outputs to dist/
npm run preview    # serve the production build locally
```

## API endpoints (backend/server.js)

| Method | Endpoint                        | Description                          |
|--------|----------------------------------|---------------------------------------|
| GET    | `/api/properties`                | List all properties                  |
| GET    | `/api/properties/:id`            | Get one property                     |
| GET    | `/api/properties/:id/reviews`    | Get a property's reviews             |
| POST   | `/api/bookings`                  | Create a booking, returns `bookingId`|
| POST   | `/api/contact-host`              | Send a message to the host           |

`POST /api/bookings` example response:
```json
{ "success": true, "bookingId": "AGR-2026-48213", ... }
```

## Where to customize

- **Property info, images, host, amenities, reviews, nearby stays**: all in
  `src/data/properties.js`. Image URLs are centralized there — swap in your own
  (or real listing) photos by changing the `images` array.
- **Branding**: logo/name is set in `src/components/Header.jsx` and `src/components/Footer.jsx`
  ("Stayora"); brand color is the `--brand` CSS variable in `src/index.css`.
- **Pricing**: `pricePerNight`, `cleaningFee`, `serviceFee`, `taxes` fields on the
  `property` object in `src/data/properties.js`.

## Connecting a real database later

Replace the in-memory arrays in `backend/data.js` with real queries (Postgres/Mongo/etc.),
and swap `fetch("/api/bookings")` calls on the frontend for your real endpoints if the
routes change. The frontend already treats the API as the source of truth and only
falls back to a client-generated ID if the request fails, so this is a drop-in swap.

## Notes

- Images are loaded from Unsplash/pravatar placeholder URLs — an internet connection
  is required for them to display. Swap in your own hosted images for production.
- Map tiles come from the public OpenStreetMap tile server (no API key needed).
- This is a demo project and is not affiliated with or endorsed by Airbnb.
