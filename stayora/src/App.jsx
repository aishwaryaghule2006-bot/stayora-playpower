import { BookingProvider } from "./BookingContext";
import PropertyDetails from "./pages/PropertyDetails";

export default function App() {
  return (
    <BookingProvider>
      <PropertyDetails />
    </BookingProvider>
  );
}
