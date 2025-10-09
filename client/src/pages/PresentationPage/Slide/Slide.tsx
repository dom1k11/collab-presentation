import { useEffect, useRef } from "react";
import "./Slide.css";

type SlideProps = {
  slide: { id: string; content: string };
  onEdit: (id: string, newContent: string) => void;
};

export const Slide = ({ slide, onEdit }: SlideProps) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (ref.current && ref.current.innerText !== slide.content) {
      ref.current.innerText = slide.content;
    }
  }, [slide.content]);

  const handleInput = () => {
    const newText = ref.current?.innerText ?? "";
    onEdit(slide.id, newText);
  };

  return (
    <div
      ref={ref}
      className="slide"
      contentEditable
      suppressContentEditableWarning
      onInput={handleInput}
    />
  );
};

export default Slide;
