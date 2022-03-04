import React, { useEffect, useState } from "react";

import RemoveRedEyeOutlinedIcon from "@mui/icons-material/RemoveRedEyeOutlined";
import VisibilityOffOutlinedIcon from "@mui/icons-material/VisibilityOffOutlined";

import { useDispatch, useSelector } from "react-redux";
import { useHistory, Link } from "react-router-dom";
import { register } from "../state/actions/auth";

function Register() {
  const dispatch = useDispatch();
  const history = useHistory();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [visible, setVisible] = useState(false);

  const error = useSelector((state) => state.error);
  const registeredUser = useSelector((state) => state.auth);

  useEffect(() => {
    // Pushing user to login
    if (loading && registeredUser.redirect) {
      history.push("/login");
      setLoading(false);
    }

    // Before if the user enters right credentials after entering the wrong ones it would just remove the error
    // Here we are just fixing that
    if (error.message && registeredUser.redirect) {
      history.push("/login");
      setLoading(false);
    }
  }, [loading, registeredUser]);

  const handleOnClick = (e) => {
    e.preventDefault();

    setLoading(true);
    dispatch(register(username, email, password)); // Dispatch the register action
  };

  // Setting loading to false after error is displayed
  if (error.message && loading) {
    setLoading(false);
  }

  return (
    <div className="h-screen flex items-center justify-center bg-gradient-to-bl from-[#f59d7d] to-[#fab8a0]">
      <div className="shadow-2xl px-4 pb-3 pt-3 mx-1 bg-orange-200 rounded-md max-w-md md:max-w-lg lg:max-w-2xl">
        <h1 className="text-2xl uppercase">signup</h1>
        <p className="text-gray-600 text-sm mt-2">Welcome to Reddit!</p>

        <p className="text-gray-600 text-xs mt-4">
          By continuing, you are setting up a Reddit account and agree to our{" "}
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
            placeholder="Username"
            autoComplete="on"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
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
            className="bg-blue-500 py-2 w-[70%] rounded-full text-center ml-16 md:ml-20 hover:bg-blue-600 transition-colors duration-300"
            onClick={handleOnClick}
          >
            <h1 className="font-bold text-white">Register</h1>
          </button>
        </form>
        <h1 className="text-xs text-slate-600 mt-4 text-center">
          Already a redditor?{" "}
          <Link
            to="/login"
            className="font-bold text-blue-500 text-xs hover:underline uppercase"
          >
            log in
          </Link>
        </h1>
      </div>
    </div>
  );
}

export default Register;
