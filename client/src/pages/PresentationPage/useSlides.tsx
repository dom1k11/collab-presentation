import { useEffect, useState } from "react";
import { socket } from "../../socket/connection";

export type SlideType = { id: string; content: string };

export function useSlides(roomId?: string) {
  const [slides, setSlides] = useState<SlideType[]>([]);

  useEffect(() => {
    if (!roomId) return;

    socket.emit("join-room", roomId);

    const handleUpdate = (newSlides: SlideType[]) => setSlides(newSlides);
    socket.on("room-update", handleUpdate);

    return () => {
      socket.off("room-update", handleUpdate);
      socket.emit("leave-room", roomId);
    };
  }, [roomId]);

  const addSlide = () => {
    if (!roomId) return;
    const newSlide = { id: crypto.randomUUID(), content: "" };
    socket.emit("add-slide", { roomId, slide: newSlide });
  };

  const editSlide = (id: string, content: string) => {
    if (!roomId) return;
    socket.emit("slide-update", { roomId, id, content });
  };

  return { slides, addSlide, editSlide };
}
