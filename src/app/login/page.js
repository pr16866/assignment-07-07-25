"use client"

import React,{ useState } from "react";
import axios from "axios";
import { baseUrl } from "@/utils/constants";
import "../globals.css"
// import { baseUrl } from "./utils/constants";
function Login() {
    const [authData, setAuthData] = useState({
    email: "",
    password: "",
    name: "",
  });
  const [mode, setMode] = useState("login");
  const [isDissabled, setIsDissable] = useState(false);

  const handleSubmit = async () => {
    try {
      let obj = { ...authData };
      if (mode == "login") {
        delete obj.name;
      }
      setIsDissable(true);
      let res = await axios.post(
        baseUrl + (mode == "login" ? "auth/login" : "auth/register"),
        obj
      );
      if (res?.status === 201) {
        alert("User Registered Successfully");
      } else if (res?.status === 200) {
        alert(res?.data?.msg);
        localStorage.setItem("authToken", res?.data?.token);
      }
    } catch (error) {
      console.log(error?.response?.data?.msg);
      alert(error?.response?.data?.msg);
    } finally {
      setAuthData({
        email: "",
        password: "",
        name: "",
      });
      setIsDissable(false);
    }
  };

  return (
   <div className="App">
      <div className="auth-wrapper">
        <h2>{mode === "login" ? "Login Page" : "Register Page"}</h2>
        {mode === "register" && (
          <input
            type="text"
            name="name"

            value={authData.name}
            placeholder="Enter Name"
            onChange={(e) =>
              setAuthData((prev) => ({ ...prev, name: e.target.value }))
            }
          />
        )}
        <input
          type="email"
          name="email"
          placeholder="Enter Email"
            value={authData.email}

          onChange={(e) =>
            setAuthData((prev) => ({ ...prev, email: e.target.value }))
          }
        />
        <input
          type="password"
          name="password"
          placeholder="Enter Password"
          value={authData.password}
          onChange={(e) =>
            setAuthData((prev) => ({ ...prev, password: e.target.value }))
          }
        />

        <button className="btn" onClick={handleSubmit} disabled={isDissabled}>
          {mode === "login" ? "Login" : "Register"}{" "}
        </button>
        <div className="span-wrapper">
          <span>
            {mode === "login"
              ? "Don't have account"
              : "Already have an account "}{" "}
          </span>
          <span
            className="span-btn"
            onClick={() =>
              mode === "login" ? setMode("register") : setMode("login")
            }
          >
            {mode === "login" ? "register" : "login"}
          </span>
        </div>
      </div>
    </div>
  )
}

export default Login