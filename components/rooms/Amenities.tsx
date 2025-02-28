import { roomAmenities } from "@/lib/data/rooms";

export function Amenities() {
  return (
    <div className="amen">
      {roomAmenities.map((amenity) => (
        <div key={amenity.title}>
          <b>{amenity.title}</b>
          <span>{amenity.body}</span>
        </div>
      ))}
    </div>
  );
}
