import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { socket } from "../socket/connection";
import Header from "../components/Header/Header";
import Navbar from "../components/Navbar/Navbar";

type Room = { id: string; title: string };

export default function MainPage() {
  const navigate = useNavigate();
  const [rooms, setRooms] = useState<Room[]>([]);

  useEffect(() => {
    socket.on("rooms-list", (serverRooms: Room[]) => setRooms(serverRooms));
    socket.emit("get-rooms");
    return () => socket.off("rooms-list");
  }, []);

  return (
    <div className="container mt-4">
      <Header />
      <Navbar />

      <h2 className="mb-3">Available Presentations</h2>
      <div className="d-flex flex-wrap gap-2">
        {rooms.length ? (
          rooms.map((room) => (
            <button
              key={room.id}
              className="btn btn-outline-primary"
              onClick={() => navigate(`/room/${room.id}`)}
            >
              {room.title || room.id}
            </button>
          ))
        ) : (
          <p>Loading rooms...</p>
        )}
      </div>
    </div>
  );
}
