import { useState, useEffect } from "react";
import { socket } from "../socket/connection";

const MainPage = () => {
  const [text, setText] = useState("");

  useEffect(() => {
    socket.on("text-update", (newText: string) => {
      setText(newText);
    });

    return () => {
      socket.off("text-update");
    };
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setText(value);
    socket.emit("text-change", value);
  };

  return (
    <div>
      <h1>Collaborative input test</h1>
      <input
        type="text"
        value={text}
        onChange={handleChange}
        placeholder="Type here..."
      />
    </div>
  );
};

export default MainPage;
