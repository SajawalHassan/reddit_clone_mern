import React, { useState } from "react";
import axios from "../../axios/axios";

import { useDispatch, useSelector } from "react-redux";
import { changeView } from "../../features/modalSlice";

import {
  loginPending,
  loginFail,
  loginSuccess,
} from "../../features/loginSlice";

function AuthModal() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const { isLoading, isAuth, error } = useSelector((state) => state.login);

  const handleOnClick = async (e) => {
    e.preventDefault();

    dispatch(loginPending(true));

    try {
      const { data, status } = await axios.post("/auth/login", {
        email,
        password,
      });

      dispatch(loginSuccess());
    } catch (error) {
      dispatch(loginFail(error.response.data));
    }
  };
  return (
    <div className="w-full py-2 px-4 relative">
      <div className="space-y-14">
        <div>
          <h1 className="text-xl">Login</h1>
          <p className="text-xs mt-2">
            By continuing, you agree to our{" "}
            <span className="link">User Agreement</span> and{" "}
            <span className="link truncate">Privacy Policy</span>.
          </p>
        </div>
        <form className="flex flex-col space-y-4 min-w-[40%] max-w-[50%]">
          <input
            type="text"
            placeholder="Email"
            autoFocus="on"
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
                <h1 className="text-white font-bold">Login</h1>
              )}
            </button>
          </div>
        </form>
        <div className="w-[45%]">
          <p className="text-xs ml-3 -mt-10">
            New to Reddit?{" "}
            <span
              onClick={() => dispatch(changeView("register"))}
              className="link font-bold text-sm uppercase"
            >
              Sign up
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}

export default AuthModal;
