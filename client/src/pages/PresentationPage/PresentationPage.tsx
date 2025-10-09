import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { socket } from "../../socket/connection";
import Header from "../../components/Header/Header";
import "./PresentationPage.css";

export default function PresentationPage() {
  const { id: roomId } = useParams();
  const [slides, setSlides] = useState<string[]>([]);
  const [text, setText] = useState("");

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
    <div className="presentation-page container mt-4">
      <Header />

      <h3 className="room-title">Presentation: {roomId}</h3>

      <div className="slide-input-group d-flex gap-2 mt-3">
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

      <div className="slides-list mt-4">
        {slides.length === 0 ? (
          <p className="no-slides">No slides yet.</p>
        ) : (
          slides.map((slide, i) => (
            <p key={i} className="slide-item">
              {slide}
            </p>
          ))
        )}
      </div>
    </div>
  );
}
