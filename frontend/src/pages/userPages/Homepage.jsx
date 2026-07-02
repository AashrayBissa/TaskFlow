import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import toast from "react-hot-toast";

const LogoIcon = () => (
  <svg aria-hidden="true" className="brand-mark" viewBox="0 0 32 32" fill="none">
    <path d="M16 4L27 24C23.8 26.3 20.1 27.5 16 27.5C11.9 27.5 8.2 26.3 5 24L16 4Z" stroke="currentColor" strokeWidth="3" strokeLinejoin="round" />
    <path d="M7.5 23.5C10 22.4 12.8 21.8 16 21.8C19.2 21.8 22 22.4 24.5 23.5" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
  </svg>
);

export default function Homepage() {
  const navigate = useNavigate();

  const [currUser, setCurrUser] = useState(null);
  
  const fetchUser = async () => {
    try {
    const res = await fetch("http://localhost:8080/user", { credentials: "include" });
    if (res.ok) {
      const userData = await res.json();
      setCurrUser(userData);
    } else {
      setCurrUser(null);
    }
  } catch (err) {
    console.log(err);
    setCurrUser(null);
  }
  };

  function handleDashboard() {
    navigate("/dashboard");
  }

  const handleLogout = async () => {
    try {
      const response = await fetch('http://localhost:8080/logout', {
        method: 'POST',
        credentials: 'include',
      });

      if(response.ok){
        toast.success('Logged out successfully!');
        setCurrUser(null);
      } else {
        toast.error('Logout failed!');
      }
    } catch (error) {
        console.log(error);
      toast.error('Something went wrong!');
    }  
  };

  function handleSignup() {
    navigate("/signup");
  }

  function handleLogin() {
    navigate("/login");
  }

  useEffect(() => {
      fetchUser();
  }, []);

  return (
    <div className="page-shell">
      <header className="home-header">
        <nav className="app-container home-nav" aria-label="Primary">
          <button className="brand-lockup" type="button" onClick={() => navigate("/")} aria-label="TaskFlow home">
            <LogoIcon />
            <span>TaskFlow</span>
          </button>
          <div className="home-actions">
            {currUser ? (
              <>
                <button className="tf-button tf-button-secondary" type="button" onClick={handleLogout}>Logout</button>
                <button className="tf-button tf-button-primary" type="button" onClick={handleDashboard}>Dashboard</button>
              </>
            ) : (
              <>
                <button className="tf-button tf-button-secondary" type="button" onClick={handleLogin}>Login</button>
                <button className="tf-button tf-button-primary" type="button" onClick={handleSignup}>Signup</button>
              </>
            )}
          </div>
        </nav>
      </header>

      <main className="home-main">
        <section className="home-card" aria-labelledby="home-title">
          <h1 id="home-title" className="home-title">TaskFlow</h1>
          <p className="home-quote">"The secret of getting ahead is getting started."</p>
          <div className="home-card-actions">
            {currUser ? (
              <>
                <button className="tf-button tf-button-secondary" type="button" onClick={handleLogout}>Logout</button>
                <button className="tf-button tf-button-primary" type="button" onClick={handleDashboard}>Dashboard</button>
              </>
            ) : (
              <>
                <button className="tf-button tf-button-primary" type="button" onClick={handleLogin}>Login</button>
                <button className="tf-button tf-button-secondary" type="button" onClick={handleSignup}>Signup</button>
              </>
            )}
          </div>
        </section>
      </main>
    </div>
  );
}



