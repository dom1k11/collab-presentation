import { useState, useEffect } from "react";
import { socket } from "../socket/connection";
import Header from "../components/Header/Header";
import Navbar from "../components/Navbar/Navbar";
import PresentationGallery from "../components/PresentationGallery/PresentationGallery";
import type { Room } from "../components/PresentationGallery/PresentationGallery";

export default function MainPage() {
  const [rooms, setRooms] = useState<Room[]>([]);
  const [loading, setLoading] = useState(true);

 useEffect(() => {
  const handleRooms = (serverRooms: Room[]) => {
    setRooms(serverRooms);
    setLoading(false);
  };

  socket.on("rooms-list", handleRooms);
  socket.emit("get-rooms");

  return () => {
    socket.off("rooms-list", handleRooms);
  };
}, []);


  return (
    <div className="container mt-4">
      <Header />
      <Navbar />
      <h2 className="mb-3">Available Presentations</h2>

      <PresentationGallery rooms={rooms} isLoading={loading} />
    </div>
  );
}
