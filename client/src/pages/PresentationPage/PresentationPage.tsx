import { useParams } from "react-router-dom";
import { useSlides } from "./useSlides";
import Header from "../../components/Header/Header";
import Slide from "./Slide/Slide";
import "./PresentationPage.css";
import Toolbar from "./Toolbar/Toolbar";

export default function PresentationPage() {
  const { id: roomId } = useParams();
  const { slides, editSlide } = useSlides(roomId);

  return (
    <div className="presentation-page container mt-4">
      <Header />
      <Toolbar></Toolbar>
      <div className="presentation-header">
        <h3 className="room-title">Presentation: {roomId}</h3>
        
      </div>

      <div className="slides-list">
        {slides.length === 0 ? (
          <p className="no-slides">No slides yet.</p>
        ) : (
          slides.map((slide) => (
            <Slide key={slide.id} slide={slide} onEdit={editSlide} />
          ))
        )}
      </div>
    </div>
  );
}
