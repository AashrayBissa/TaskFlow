import {useState} from "react"
import {Link, useNavigate} from "react-router-dom";

import toast from "react-hot-toast";

import "./Login.css";

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
        
        const response = await fetch("http://localhost:8080/login",{
            method: "POST",
            headers: {"Content-Type": "application/json"},
            credentials: "include",
            body: JSON.stringify({email : formData.email, password : formData.password})
        });
        const res = await response.json();
        console.log(res);

        if (response.ok) {
        navigate("/dashboard");
        toast.success("Logged In Successfully");
      } else {
        toast.error("Login failed. Please try again.");

        setFormData({
            email: "",
            password: ""
        });
    }
    };

    return(
        <div className="w-full h-screen flex flex-col justify-center items-center">
            <h1 className="text-4xl pb-4"><Link to="/"><i className="fa-solid fa-list-check"></i></Link></h1>
            <h2 className="text-4xl font-bold mb-5">Log in to your account</h2>
            <p className="text-xl mb-10 text-gray-500">Welcome back! Please enter your details</p>
            <form action="" onSubmit={handleSubmit} className="grid gap-6">
                <div className="grid gap-2 w-md">
                    <label htmlFor="email" className="block text-start">Email</label>
                    <input className="block rounded-xl w-full" type="text" name="email" id="email" placeholder="Enter your email" value={formData.email} onChange={handleInputChange} required/>
                </div>
                <div className="grid gap-2">
                    <label htmlFor="password" className="block text-start">Password</label>
                    <input className="block rounded-xl w-full" type="password" name="password" id="password" placeholder="Enter a password" value={formData.password} onChange={handleInputChange} required/>
                </div>
                <button type="submit" className="blueBtn mt-3 rounded-xl font-bold text-center"><p className="text-lg">Login</p></button>
                <p className="m-auto text-sm text-gray-300">Don't have an account? <Link to="/signup" className="text-blue-400">Sign up</Link></p>
            </form>
        </div>
    );
}