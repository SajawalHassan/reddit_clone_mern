import React, { useState } from "react";
import axios from "../../axios/axios";

import { useDispatch, useSelector } from "react-redux";
import { changeView } from "../../features/modalSlice";
import {
  registerFail,
  registerPending,
  registerSuccess,
} from "../../features/registerSlice";

function RegisterModal() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const { isLoading, isAuth, error } = useSelector((state) => state.register);

  const handleOnClick = async (e) => {
    e.preventDefault();

    dispatch(registerPending(true));
    try {
      const { data } = await axios.post("/auth/register", {
        username,
        email,
        password,
      });

      dispatch(registerSuccess);
    } catch (error) {
      dispatch(registerFail(error.response.data));
    }
  };
  return (
    <div className="w-full py-2 px-4 relative">
      <div className="space-y-10">
        <div>
          <h1 className="text-xl">Sign up</h1>
          <p className="text-xs mt-2 w-[39%]">
            By continuing, you are setting up a Reddit account agree to our{" "}
            <span className="link">User Agreement</span> and{" "}
            <span className="link truncate">Privacy Policy</span>.
          </p>
        </div>
        <form className="flex flex-col space-y-4 min-w-[40%] max-w-[50%]">
          <input
            type="text"
            placeholder="Username"
            autoFocus="on"
            name="first_name"
            title="Please fill out this field."
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="auth-input"
          />
          <input
            type="text"
            placeholder="Email"
            name="email"
            title="Please fill out this field."
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="auth-input"
          />
          <input
            type="password"
            placeholder="Password"
            className="auth-input"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            title="Please fill out this field."
          />
          <h1 className={error ? `text-xs font-bold text-red-500` : `hidden`}>
            {error}
          </h1>

          <div className="w-full flex-item justify-center">
            <button
              type="submit"
              className="w-full h-10 rounded-full font-bold text-white bg-blue-500 hover:bg-blue-600 transition-all duration-200"
              onClick={handleOnClick}
            >
              {isLoading ? (
                <div className="w-full">
                  <div
                    style={{ borderTopColor: "transparent" }}
                    className="w-6 h-6 border-[3px] border-white rounded-full animate-spin mx-auto"
                  />
                </div>
              ) : (
                <h1 className="text-white font-bold">Sign up</h1>
              )}
            </button>
          </div>
        </form>
        <div className="w-[45%]">
          <p className="text-xs ml-3 -mt-7">
            New to Reddit?{" "}
            <span
              onClick={() => dispatch(changeView("login"))}
              className="link font-bold text-sm uppercase"
            >
              Login
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}

export default RegisterModal;
