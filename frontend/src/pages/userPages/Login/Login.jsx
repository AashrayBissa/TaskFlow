import {useState} from "react"
import {Link, useNavigate} from "react-router-dom";

import toast from "react-hot-toast";

const API = import.meta.env.VITE_API_URL || "http://localhost:8080";

export default function Login(){

    let navigate = useNavigate();

    let [formData, setFormData] = useState({
        email   : "",
        password: ""
    });

    let handleInputChange = (event) =>{
        setFormData((currData) =>{
            return {...currData, [event.target.name]: event.target.value};
        });
    }

    let handleSubmit = async(event) =>{
        event.preventDefault();
        
        const response = await fetch(`${API}/login`,{
            method: "POST",
            headers: {"Content-Type": "application/json"},
            credentials: "include",
            body: JSON.stringify({email : formData.email, password : formData.password})
        });
        const res = await response.json().catch(() => ({}));

        if (response.ok) {
        navigate("/dashboard");
        toast.success("Logged In Successfully");
      } else {
        toast.error(res.message || "Login failed. Please try again.");

        setFormData({
            email: "",
            password: ""
        });
    }
    };

    return(
        <main className="page-shell auth-shell">
          <section className="auth-panel" aria-labelledby="login-title">
            <Link to="/" className="auth-brand">TaskFlow</Link>
            <h1 id="login-title" className="auth-title">Log in to your account</h1>
            <p className="auth-copy">Welcome back! Please enter your details.</p>
            <form onSubmit={handleSubmit} className="auth-form">
                <div className="tf-form-field">
                    <label htmlFor="email" className="tf-label">Email address</label>
                    <input className="tf-input" type="email" name="email" id="email" placeholder="Enter your email" value={formData.email} onChange={handleInputChange} autoComplete="email" required/>
                </div>
                <div className="tf-form-field">
                    <label htmlFor="password" className="tf-label">Password</label>
                    <input className="tf-input" type="password" name="password" id="password" placeholder="Enter your password" value={formData.password} onChange={handleInputChange} autoComplete="current-password" required/>
                </div>
                <button type="submit" className="tf-button tf-button-primary">Login</button>
                <p className="auth-link-copy">Don't have an account? <Link to="/signup">Sign up</Link></p>
            </form>
          </section>
        </main>
    );
}
