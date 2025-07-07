"use client";

import React, { useState } from "react";
import axios from "axios";
import { baseUrl } from "@/utils/constants";
import "../globals.css";

function Login() {
  const [authData, setAuthData] = useState({
    email: "",
    password: "",
    name: "",
  });

  const [mode, setMode] = useState("login"); 
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAuthData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); 

    const { email, password, name } = authData;
    if (!email || !password || (mode === "register" && !name)) {
      alert("Please fill in all required fields.");
      return;
    }

    try {
      setIsSubmitting(true);

      const payload = { email, password, ...(mode === "register" && { name }) };
      const url = `${baseUrl}auth/${mode}`;

      const res = await axios.post(url, payload);

      if (res.status === 201) {
        alert("User Registered Successfully");
      } else if (res.status === 200) {
        alert(res.data?.msg || "Login successful");
        localStorage.setItem("authToken", res.data?.token);
      }
    } catch (err) {
      const errorMsg = err?.response?.data?.msg || "Something went wrong";
      alert(errorMsg);
    } finally {
      setAuthData({ email: "", password: "", name: "" });
      setIsSubmitting(false);
    }
  };

  const toggleMode = () => {
    setMode((prev) => (prev === "login" ? "register" : "login"));
  };

  return (
    <div className="app">
      <div className="auth-wrapper">
        <h2>{mode === "login" ? "Login" : "Register"}</h2>

        <form onSubmit={handleSubmit} className="form">
          {mode === "register" && (
            <input
              type="text"
              name="name"
              placeholder="Enter Name"
              value={authData.name}
              onChange={handleChange}
            />
          )}

          <input
            type="email"
            name="email"
            placeholder="Enter Email"
            value={authData.email}
            onChange={handleChange}
          />

          <input
            type="password"
            name="password"
            placeholder="Enter Password"
            value={authData.password}
            onChange={handleChange}
          />

          <button
            type="submit"
            className="btn"
            disabled={isSubmitting}
          >
            {isSubmitting
              ? mode === "login"
                ? "Logging in..."
                : "Registering..."
              : mode === "login"
              ? "Login"
              : "Register"}
          </button>
        </form>

        <div className="switch-mode">
          <span>
            {mode === "login"
              ? "Don't have an account?"
              : "Already have an account?"}{" "}
          </span>
          <button type="button" className="link-button" onClick={toggleMode}>
            {mode === "login" ? "Register" : "Login"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default Login;
