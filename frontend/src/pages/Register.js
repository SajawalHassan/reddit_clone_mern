import React, { useState } from "react";

import RemoveRedEyeOutlinedIcon from "@mui/icons-material/RemoveRedEyeOutlined";
import VisibilityOffOutlinedIcon from "@mui/icons-material/VisibilityOffOutlined";

import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { register } from "../state/actions/auth";

function Register() {
  const dispatch = useDispatch();
  const history = useHistory();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [visible, setVisible] = useState(false);

  const error = useSelector((state) => state.error);
  const registerUser = useSelector((state) => state.register);

  const handleOnClick = (e) => {
    e.preventDefault();

    dispatch(register(username, email, password));

    if (registerUser.redirect) {
      history.push("/login");
    }
  };

  return (
    <div className="h-screen flex items-center justify-center bg-[#f59d7d]">
      <div className="shadow-2xl px-4 pb-8 pt-3 mx-1 bg-orange-200 rounded-md max-w-md md:max-w-lg lg:max-w-2xl">
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
          <div className="flex items-center bg-white rounded-md">
            <input
              className="auth-input"
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

          {error.message && (
            <h1 className="text-sm text-red-500 text-center">
              {error.message}
            </h1>
          )}

          <button
            type="submit"
            className="bg-blue-500 py-2 w-[70%] rounded-full text-center mx-14 md:mx-15 lg:mx-16"
            onClick={handleOnClick}
          >
            <h1 className="font-bold text-white">Register</h1>
          </button>
        </form>
      </div>
    </div>
  );
}

export default Register;
