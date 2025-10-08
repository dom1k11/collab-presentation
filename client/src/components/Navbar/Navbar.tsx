import "./Navbar.css";

const Navbar = () => {
  const nickname = localStorage.getItem("nickname");

  const handleLogout = () => {
    localStorage.removeItem("nickname");
    window.location.href = "/";
  };

  return (
    <nav className="navbar">
      <div className="navbar-group">
        <button className="btn btn-primary">Create New Presentation</button>
      </div>

      <div className="navbar-user">
        <span className="user-name">👤 {nickname || "Guest"}</span>
        <button className="btn btn-logout" onClick={handleLogout}>
          Logout
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
