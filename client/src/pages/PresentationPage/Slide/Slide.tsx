import { useEffect, useRef, useState } from "react";
import "./Slide.css";

type SlideProps = {
  slide: { id: string; content: string };
  onEdit: (id: string, newContent: string) => void;
};

const Slide = ({ slide, onEdit }: SlideProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const [localContent, setLocalContent] = useState(slide.content);

  // 🔹 синхронизируем только если пришёл другой контент с сервера
  useEffect(() => {
    if (slide.content !== localContent) {
      setLocalContent(slide.content);
      if (ref.current && ref.current.innerText !== slide.content) {
        ref.current.innerText = slide.content;
      }
    }
  }, [slide.content]);

  // 🔹 при вводе обновляем локальный текст и уведомляем родителя
  const handleInput = () => {
    const newText = ref.current?.innerText ?? "";
    setLocalContent(newText);
    onEdit(slide.id, newText);
  };

  return (
    <div
      ref={ref}
      className="slide"
      contentEditable
      suppressContentEditableWarning
      onInput={handleInput}
      spellCheck={false}
    />
  );
};

export default Slide;
