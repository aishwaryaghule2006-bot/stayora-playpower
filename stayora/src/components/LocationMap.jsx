import { MapContainer, TileLayer, Marker, Popup, Circle } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";
import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";

const icon = L.icon({
  iconUrl: markerIcon,
  iconRetinaUrl: markerIcon2x,
  shadowUrl: markerShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

export default function LocationMap({ property }) {
  const { lat, lng } = property.coords;
  return (
    <div id="location" className="py-8 scroll-mt-32">
      <h3 className="text-xl font-semibold mb-4">Where you'll be</h3>
      <div className="rounded-2xl overflow-hidden h-80 border border-gray-200">
        <MapContainer center={[lat, lng]} zoom={14} scrollWheelZoom={false} className="w-full h-full">
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <Circle center={[lat, lng]} radius={600} pathOptions={{ color: "#E11D74", fillOpacity: 0.08 }} />
          <Marker position={[lat, lng]} icon={icon}>
            <Popup>{property.location}</Popup>
          </Marker>
        </MapContainer>
      </div>
      <p className="text-gray-700 mt-4 leading-relaxed">
        <span className="font-semibold">{property.location}</span> — a quiet residential lane a short walk from
        Candolim beach, with cafes, restaurants and the Baga strip all within easy reach.
      </p>
    </div>
  );
}
