import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { socket } from "../../socket/connection";
import Header from "../../components/Header/Header";
import Slide from "./Slide/Slide";
import "./PresentationPage.css";

type SlideType = { id: string; content: string };

export default function PresentationPage() {
  const { id: roomId } = useParams();
  const [slides, setSlides] = useState<SlideType[]>([]);

  useEffect(() => {
    if (!roomId) return;

    socket.emit("join-room", roomId);
    socket.on("room-update", (newSlides: SlideType[]) => setSlides(newSlides));

    socket.on("slide-updated", ({ id, content }) => {
      setSlides((prev) =>
        prev.map((s) => (s.id === id ? { ...s, content } : s))
      );
    });

    return () => {
      socket.off("room-update");
      socket.off("slide-updated");
      socket.emit("leave-room", roomId);
    };
  }, [roomId]);

  const handleAddSlide = () => {
    if (!roomId) return;
    const newSlide = { id: crypto.randomUUID(), content: "" };
    const updated = [...slides, newSlide];
    setSlides(updated);
    socket.emit("add-slide", { roomId, slide: newSlide });
  };

  const handleEditSlide = (id: string, newContent: string) => {
    setSlides((prev) =>
      prev.map((s) => (s.id === id ? { ...s, content: newContent } : s))
    );
    if (roomId) socket.emit("slide-update", { roomId, id, content: newContent });
  };

  return (
    <div className="presentation-page container mt-4">
      <Header />
      <h3 className="room-title">Presentation: {roomId}</h3>

      <button className="btn btn-success mb-3" onClick={handleAddSlide}>
        ➕ New Slide
      </button>

      <div className="slides-list">
        {slides.length === 0 ? (
          <p className="no-slides">No slides yet.</p>
        ) : (
          slides.map((slide) => (
            <Slide key={slide.id} slide={slide} onEdit={handleEditSlide} />
          ))
        )}
      </div>
    </div>
  );
}
