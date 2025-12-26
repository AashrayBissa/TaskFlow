import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import toast from "react-hot-toast";


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
    <div className="w-full h-screen flex flex-col justify-center items-center">
      <h1 className="text-4xl pb-4">
        <i className="fa-solid fa-list-check"></i>
      </h1>
      <h1 className="text-5xl font-bold mb-5">TaskFlow</h1>
      <h4 className="text-2xl mb-10 text-gray-500">
        "The secret of getting ahead is getting started"
      </h4>
     
      {currUser ? (<div>
        <button
          className="mt-1 w-30 h-10 text-center rounded-xl font-bold p-2 grayBtn"
          onClick={handleLogout}
        >
          <p className="textarea-lg">Logout</p>
        </button>
        &nbsp; &nbsp; &nbsp;
        <button
          className="mt-1 w-30 h-10 text-center rounded-xl font-bold p-2 blueBtn"
          onClick={handleDashboard}
        >
          <p className="textarea-lg">Dashboard</p>
        </button>
      </div>) : (<div>
        <button
          className="mt-1 w-30 h-10 text-center rounded-xl font-bold p-2 grayBtn"
          onClick={handleLogin}
        >
          <p className="textarea-lg">Login</p>
        </button>
        &nbsp; &nbsp; &nbsp;
        <button
          className="mt-1 w-30 h-10 text-center rounded-xl font-bold p-2 blueBtn"
          onClick={handleSignup}
        >
          <p className="textarea-lg">Signup</p>
        </button>
      </div>)}
    </div>
  );
}



