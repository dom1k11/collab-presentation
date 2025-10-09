import { useNavigate } from "react-router-dom";
import "./PresentationGallery.css";

export type Room = { id: string; title: string };

type Props = {
  rooms: Room[];
  isLoading?: boolean;
};

export const PresentationGallery = ({ rooms, isLoading }: Props) => {
  const navigate = useNavigate();

  if (isLoading) {
    return <p className="gallery-loading">Loading rooms...</p>;
  }

  if (!rooms.length) {
    return <p className="gallery-empty">No presentations available.</p>;
  }

  return (
    <div className="presentation-gallery">
      {rooms.map((room) => (
        <div
          key={room.id}
          className="presentation-card"
          onClick={() => navigate(`/room/${room.id}`)}
        >
          <h4>{room.title}</h4>
        </div>
      ))}
    </div>
  );
};

export default PresentationGallery;
