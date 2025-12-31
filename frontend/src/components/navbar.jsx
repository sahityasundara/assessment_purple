import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

export default function Navbar() {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="navbar">
      <span><b>{user?.fullName}</b> ({user?.role})</span>

      <div>
        <Link to="/">Profile</Link>
        {user?.role === "admin" && <Link to="/admin">Admin</Link>}
        <button onClick={handleLogout}>Logout</button>
      </div>
    </nav>
  );
}
