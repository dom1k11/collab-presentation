import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { socket } from "../socket/connection";
import Header from "../components/Header/Header";
import Navbar from "../components/Navbar/Navbar";

type Room = { id: string; title: string };

const MainPage = () => {
  const navigate = useNavigate();
  const { id: roomId } = useParams();
  const [rooms, setRooms] = useState<Room[]>([]);
  const [text, setText] = useState("");
  const [slides, setSlides] = useState<string[]>([]);

  useEffect(() => {
    socket.on("rooms-list", (serverRooms: Room[]) => setRooms(serverRooms));
    socket.emit("get-rooms");
    return () => socket.off("rooms-list");
  }, []);

  useEffect(() => {
    if (!roomId) return;

    socket.emit("join-room", roomId);
    socket.on("room-update", (newSlides: string[]) => setSlides(newSlides));

    return () => {
      socket.off("room-update");
      socket.emit("leave-room", roomId);
    };
  }, [roomId]);

  const handleAddSlide = () => {
    if (!roomId || !text.trim()) return;
    const updated = [...slides, text.trim()];
    setSlides(updated);
    setText("");
    socket.emit("room-change", { roomId, content: updated });
  };

  return (
    <div className="container mt-4">
      <Header />
      <Navbar />

      <h2 className="mb-3">Available Rooms</h2>
      <div className="d-flex flex-wrap gap-2 mb-4">
        {rooms.map((room) => (
          <button
            key={room.id}
            className={`btn ${
              roomId === room.id ? "btn-primary" : "btn-outline-primary"
            }`}
            onClick={() => navigate(`/room/${room.id}`)}
          >
            {room.title}
          </button>
        ))}
      </div>

      {roomId ? (
        <>
          <h4>Room: {roomId}</h4>

          <div className="d-flex gap-2 mt-3">
            <input
              type="text"
              className="form-control"
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Write your slide text..."
            />
            <button className="btn btn-success" onClick={handleAddSlide}>
              ➕ Add
            </button>
          </div>

          <div className="mt-4">
            {slides.length === 0 ? (
              <p>No slides yet.</p>
            ) : (
              slides.map((slide, i) => (
                <p
                  key={i}
                  className="p-2 border rounded bg-light mb-2"
                  style={{ whiteSpace: "pre-wrap" }}
                >
                  {slide}
                </p>
              ))
            )}
          </div>
        </>
      ) : (
        <p>Select a room to start collaborating.</p>
      )}
    </div>
  );
};

export default MainPage;
