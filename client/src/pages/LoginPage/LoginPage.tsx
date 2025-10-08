import { useNavigate } from "react-router-dom";
import { useState } from "react";
import "./LoginPage.css";

const LoginPage = () => {
  const [nickname, setNickname] = useState("");
  const navigate = useNavigate();

  const handleSubmit = () => {
    if (nickname.trim()) {
      localStorage.setItem("nickname", nickname);
      navigate("/main");
    }
  };

  return (
    <div className="login-container">
      <h2 className="login-title">Enter your nickname</h2>
      <input
        className="login-input"
        placeholder="Nickname..."
        value={nickname}
        onChange={(e) => setNickname(e.target.value)}
      />
      <button className="login-button" onClick={handleSubmit}>
        Continue
      </button>
    </div>
  );
};

export default LoginPage;
