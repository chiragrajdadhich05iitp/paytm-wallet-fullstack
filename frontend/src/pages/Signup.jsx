import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

export default function Signup() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSignup = async () => {
    try {
      const response = await axios.post("http://localhost:3000/api/v1/users/signup", {
        username,
        firstName,
        lastName,
        password
      });
      localStorage.setItem("token", response.data.token);
      navigate("/dashboard");
    } catch (err) {
      alert("Signup failed: " + (err.response?.data?.message || err.message));
    }
  };

  return (
    <div className="bg-slate-300 h-screen flex justify-center items-center">
      <div className="rounded-lg bg-white w-80 text-center p-6 h-max px-4 shadow-lg">
        <h2 className="text-2xl font-bold pt-2">Sign Up</h2>
        <p className="text-slate-500 text-sm mt-1 mb-4">Enter your information to create an account</p>
        
        <input 
          placeholder="First Name" 
          onChange={(e) => setFirstName(e.target.value)} 
          className="w-full px-2 py-1 border rounded border-slate-200 mb-2" 
        />
        <input 
          placeholder="Last Name" 
          onChange={(e) => setLastName(e.target.value)} 
          className="w-full px-2 py-1 border rounded border-slate-200 mb-2" 
        />
        <input 
          placeholder="Email / Username" 
          onChange={(e) => setUsername(e.target.value)} 
          className="w-full px-2 py-1 border rounded border-slate-200 mb-2" 
        />
        <input 
          type="password" 
          placeholder="Password" 
          onChange={(e) => setPassword(e.target.value)} 
          className="w-full px-2 py-1 border rounded border-slate-200 mb-4" 
        />

        <button 
          onClick={handleSignup} 
          className="w-full text-white bg-gray-800 hover:bg-gray-900 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 mb-2"
        >
          Sign Up
        </button>

        <p className="text-sm py-2">
          Already have an account?{" "}
          <Link className="pointer underline pl-1 cursor-pointer text-blue-600" to="/signin">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}