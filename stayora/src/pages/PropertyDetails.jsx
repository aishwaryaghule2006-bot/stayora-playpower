import Header from "../components/Header";
import NavTabs from "../components/NavTabs";
import ImageGallery from "../components/ImageGallery";
import PropertyHeader from "../components/PropertyHeader";
import PropertyStats from "../components/PropertyStats";
import SleepingArrangements from "../components/SleepingArrangements";
import Amenities from "../components/Amenities";
import BookingCard from "../components/BookingCard";
import MobileBookingBar from "../components/MobileBookingBar";
import Reviews from "../components/Reviews";
import LocationMap from "../components/LocationMap";
import HostSection from "../components/HostSection";
import HouseRules from "../components/HouseRules";
import NearbyStays from "../components/NearbyStays";
import Footer, { BackToTop } from "../components/Footer";
import BookingConfirmation from "../components/Modals/BookingConfirmation";
import { property, reviews, nearbyStays } from "../data/properties";

export default function PropertyDetails() {
  return (
    <div id="top" className="min-h-screen bg-white pb-20 lg:pb-0">
      <Header />
      <NavTabs />

      <ImageGallery images={property.images} title={property.title} />
      <PropertyHeader property={property} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-3 gap-10 mt-2">
        <div className="lg:col-span-2">
          <PropertyStats property={property} />
          <SleepingArrangements property={property} />
          <Amenities property={property} />
          <Reviews property={property} reviews={reviews} />
          <LocationMap property={property} />
          <HostSection property={property} />
          <HouseRules property={property} />
        </div>
        <div className="hidden lg:block">
          <BookingCard />
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <NearbyStays stays={nearbyStays} />
      </div>

      <Footer />
      <MobileBookingBar />
      <BackToTop />
      <BookingConfirmation />
    </div>
  );
}
