import { useSlides } from "../useSlides";
import { useParams } from "react-router-dom";
import "./Toolbar.css";

const Toolbar = () => {
  const { id: roomId } = useParams();
  const { addSlide } = useSlides(roomId);

  return (
    <nav className="toolbar">
      <div className="toolbar-group">
        <button className="btn btn-primary" onClick={addSlide}>
        New Slide
        </button>
      </div>
    </nav>
  );
};

export default Toolbar;
