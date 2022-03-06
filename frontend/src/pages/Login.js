import React, { useEffect, useState } from "react";

import RemoveRedEyeOutlinedIcon from "@mui/icons-material/RemoveRedEyeOutlined";
import VisibilityOffOutlinedIcon from "@mui/icons-material/VisibilityOffOutlined";

import { useDispatch, useSelector } from "react-redux";
import { useHistory, Link } from "react-router-dom";
import { login } from "../state/actions/auth";

function Login() {
  const dispatch = useDispatch();
  const history = useHistory();

  const authUser = useSelector((state) => state.user); // Getting the authenticated user
  const error = useSelector((state) => state.error);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [visible, setVisible] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Pushing user to login
    if (loading && authUser.redirect) {
      history.push("/home");
      setLoading(false);
    }

    // Before if the user enters right credentials after entering the wrong ones it would just remove the error
    // Here we are just fixing that
    if (error.message && authUser.redirect) {
      history.push("/home");
      setLoading(false);
    }
  }, [loading, authUser]);

  const handleOnClick = (e) => {
    e.preventDefault();

    setLoading(true);
    dispatch(login(email, password)); // Dispatching the login action
  };

  // Setting loading to false after error is displayed
  if (loading && error.message) {
    setLoading(false);
  }

  return (
    <div className="h-screen flex items-center justify-center bg-gradient-to-bl from-[#f59d7d] to-[#fab8a0]">
      <div className="shadow-2xl px-4 pb-3 pt-3 mx-1 bg-orange-200 rounded-md max-w-md md:max-w-lg lg:max-w-2xl">
        <h1 className="text-2xl uppercase">login</h1>
        <p className="text-gray-600 text-sm mt-2">Welcome back!</p>

        <p className="text-gray-600 text-xs mt-4">
          By continuing, you agree to our{" "}
          <span className="text-blue-500 hover:underline cursor-pointer">
            User Agreement
          </span>{" "}
          and{" "}
          <span className="text-blue-500 hover:underline cursor-pointer">
            Privacy Policy
          </span>
          .
        </p>
        <form className="space-y-2 mt-5">
          <input
            className="auth-input"
            type="text"
            placeholder="Email"
            autoComplete="on"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <div className="flex items-center bg-white rounded-md focus-within:ring-1 focus-within:ring-orange-500">
            <input
              className="px-2 py-1 w-full rounded-md outline-none text-slate-700"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type={visible ? `text` : `password`}
            />
            <div className={visible ? `hidden` : `block`}>
              <RemoveRedEyeOutlinedIcon
                onClick={() => setVisible(!visible)}
                className="mr-4 text-gray-600 cursor-pointer"
              />
            </div>
            <div className={visible ? `block` : `hidden`}>
              <VisibilityOffOutlinedIcon
                onClick={() => setVisible(!visible)}
                className="mr-4 text-gray-600 cursor-pointer"
              />
            </div>
          </div>

          {loading && (
            <h1 className="text-gray-500 text-center text-sm">Loading...</h1>
          )}

          {error.message && (
            <h1 className="text-sm text-red-500 text-center">
              {error.message}
            </h1>
          )}

          <button
            type="submit"
            className="bg-blue-500 py-2 w-[70%] rounded-full text-center mx-14 md:mx-15 lg:mx-16 hover:bg-blue-600 transition-colors duration-300"
            onClick={handleOnClick}
          >
            <h1 className="font-bold text-white">Login</h1>
          </button>
        </form>
        <h1 className="text-xs text-slate-600 mt-4 text-center">
          New to Reddit?{" "}
          <Link
            to="/register"
            className="font-bold text-blue-500 text-xs hover:underline uppercase"
          >
            sign up
          </Link>
        </h1>
      </div>
    </div>
  );
}

export default Login;
