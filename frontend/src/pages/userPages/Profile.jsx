import { useEffect, useState } from "react";
import Navbar from "../../components/layouts/Navbar/Navbar";

export default function Profile() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch("http://localhost:8080/user", {
          credentials: "include",
        });

        if (!response.ok) {
          return;
        }

        const userData = await response.json();
        setUser(userData);
      } catch {
        setUser(null);
      }
    };

    fetchUser();
  }, []);

  const initials = user?.username
    ? user.username
        .split(" ")
        .map((part) => part[0])
        .join("")
        .slice(0, 2)
        .toUpperCase()
    : "UI";

  return (
    <div className="profile-shell">
      <Navbar />
      <div className="profile-content">
        <div className="profile-hero">
          <h1 className="dashboard-title">Profile</h1>
        </div>
        <div className="profile-card">
          <div className="profile-avatar">
            <div className="profile-avatar-inner">{initials}</div>
          </div>
          <h2 className="profile-name">{user?.username || "TaskFlow User"}</h2>
          <p className="profile-email">{user?.email || "your.email@example.com"}</p>

          <div className="profile-list">
            <div className="profile-row">
              <span className="profile-row-label">Name</span>
              <span className="profile-row-value">{user?.username || "TaskFlow User"}</span>
            </div>
            <div className="profile-row">
              <span className="profile-row-label">Email</span>
              <span className="profile-row-value">{user?.email || "your.email@example.com"}</span>
            </div>
            <div className="profile-row">
              <span className="profile-row-label">Member Since</span>
              <span className="profile-row-value">Active workspace</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
