import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import api from "../services/api";
import Navbar from "../components/Navbar";

export default function Profile() {
  const { user } = useContext(AuthContext);

  const [fullName, setFullName] = useState(user.fullName);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  /* Update profile */
  const updateProfile = async () => {
    try {
      await api.put("/api/users/profile", { fullName });
      setMessage("Profile updated successfully");
      setError("");
    } catch {
      setError("Profile update failed");
    }
  };

  /* Change password */
  const changePassword = async () => {
    if (!currentPassword || !newPassword) {
      setError("All password fields required");
      return;
    }

    try {
      const res = await api.put("/api/users/change-password", {
        currentPassword,
        newPassword,
      });

      setMessage(res.data.message);
      setError("");
      setCurrentPassword("");
      setNewPassword("");
    } catch (err) {
      setError(err.response?.data?.message || "Password change failed");
    }
  };

  return (
    <>
      <Navbar />

      <div className="container">
        {/* Profile Section */}
        <div className="card">
          <h2>Profile</h2>

          {message && <p className="success">{message}</p>}
          {error && <p className="error">{error}</p>}

          <input
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            placeholder="Full Name"
          />

          <button className="primary" onClick={updateProfile}>
            Save Profile
          </button>
        </div>

        {/* Change Password Section */}
        <div className="card" style={{ marginTop: "30px" }}>
          <h2>Change Password</h2>

          <input
            type="password"
            placeholder="Current Password"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
          />

          <input
            type="password"
            placeholder="New Password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />

          <button className="danger" onClick={changePassword}>
            Change Password
          </button>
        </div>
      </div>
    </>
  );
}
