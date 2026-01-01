import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";


import "./Signup.css";

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

    const response = await fetch("http://localhost:8080/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify(signupInfo),
    });

    const res = await response.json();
    console.log(res);

    if (response.ok) {
        navigate("/dashboard");
         toast.success(" Signed-in Successfully");
      } else {
         toast.error("Signup failed. Please try again.");
      }
    
    setSignupInfo({
      username: "",
      email: "",
      password: "",
    });

  }

  return (
    <div className="w-full h-screen flex flex-col justify-center items-center">
      <h1 className="text-4xl pb-4"><Link to="/"><i className="fa-solid fa-list-check"></i></Link></h1>
      <h2 className="text-4xl font-bold mb-5">Create an account</h2>
      <p className="text-xl mb-10 text-gray-500">
        Start organizing your task and boosting your productivity
      </p>

      <form action="" onSubmit={handleSubmit} className="grid gap-5">
        <div className="grid gap-2 w-md">
          <label htmlFor="username" className="block text-start">
            Username
          </label>
          <input
            className="block rounded-xl w-full"
            type="text"
            name="username"
            id="username"
            placeholder="Enter a username"
            value={signupInfo.username}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="grid gap-2 w-md">
          <label htmlFor="email" className="block text-start">
            Email
          </label>
          <input
            className="block rounded-xl w-full"
            type="email"
            name="email"
            id="email"
            placeholder="Enter your email"
            value={signupInfo.email}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="grid gap-2 w-md">
          <label htmlFor="password" className="block text-start">
            Password
          </label>
          <input
            className="block rounded-xl w-full"
            type="password"
            name="password"
            id="password"
            placeholder="Enter a password"
            value={signupInfo.password}
            onChange={handleInputChange}
            required
          />
        </div>
        <button type="submit" className="blueBtn mt-3 rounded-xl font-bold text-center"><p className="text-lg">Signup</p>
        </button>
        <p className="m-auto text-sm text-gray-300">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-400">
            Log in
          </Link>
        </p>
      </form>
    </div>
  );
}
