import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const API = import.meta.env.VITE_API_URL || "http://localhost:8080";

export default function Signup() {

  const navigate = useNavigate();

  let [signupInfo, setSignupInfo] = useState({
    username: "",
    email: "",
    password: "",
  });

  function handleInputChange(event) {
    setSignupInfo((currInfo) => {
      return { ...currInfo, [event.target.name]: event.target.value };
    });
  }

  async function handleSubmit(event) {
    event.preventDefault();

    const response = await fetch(`${API}/signup`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify(signupInfo),
    });

    const res = await response.json().catch(() => ({}));

    if (response.ok) {
        navigate("/dashboard");
         toast.success(" Signed-in Successfully");
      } else {
         toast.error(res.message || "Signup failed. Please try again.");
      }
    
    setSignupInfo({
      username: "",
      email: "",
      password: "",
    });

  }

  return (
    <main className="page-shell auth-shell">
      <section className="auth-panel" aria-labelledby="signup-title">
      <Link to="/" className="auth-brand">TaskFlow</Link>
      <h1 id="signup-title" className="auth-title">Create an account</h1>
      <p className="auth-copy">Start organizing your tasks and boosting your productivity.</p>

      <form onSubmit={handleSubmit} className="auth-form">
        <div className="tf-form-field">
          <label htmlFor="username" className="tf-label">
            Username
          </label>
          <input
            className="tf-input"
            type="text"
            name="username"
            id="username"
            placeholder="Enter a username"
            value={signupInfo.username}
            onChange={handleInputChange}
            autoComplete="username"
            required
          />
        </div>
        <div className="tf-form-field">
          <label htmlFor="email" className="tf-label">
            Email address
          </label>
          <input
            className="tf-input"
            type="email"
            name="email"
            id="email"
            placeholder="Enter your email"
            value={signupInfo.email}
            onChange={handleInputChange}
            autoComplete="email"
            required
          />
        </div>
        <div className="tf-form-field">
          <label htmlFor="password" className="tf-label">
            Password
          </label>
          <input
            className="tf-input"
            type="password"
            name="password"
            id="password"
            placeholder="Enter a password"
            value={signupInfo.password}
            onChange={handleInputChange}
            autoComplete="new-password"
            required
          />
        </div>
        <button type="submit" className="tf-button tf-button-primary">Signup</button>
        <p className="auth-link-copy">
          Already have an account?{" "}
          <Link to="/login">Log in</Link>
        </p>
      </form>
      </section>
    </main>
  );
}
