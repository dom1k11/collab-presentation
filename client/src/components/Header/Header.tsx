import { useNavigate } from "react-router-dom";
import "./Header.css";

export const Header = () => {
  const navigate = useNavigate();
  const nickname = localStorage.getItem("nickname");

  const handleLogout = () => {
    localStorage.removeItem("nickname");
    navigate("/");
  };

  const handleGoHome = () => {
    navigate("/main");
  };

  return (
    <header className="app-header">
      <div className="header-left">
        <button className="btn btn-warning" onClick={handleGoHome}>
          Home
        </button>
        <h1 className="app-title">Collab Presentation</h1>
      </div>

      <div className="header-right">
        <span className="user-name">👤 {nickname || "Guest"}</span>
        <button className="btn btn-danger" onClick={handleLogout}>
          Logout
        </button>
      </div>
    </header>
  );
};

export default Header;
