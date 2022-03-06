import React, { useState } from "react";

import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import MonetizationOnOutlinedIcon from "@mui/icons-material/MonetizationOnOutlined";
import HeaderMenuOption from "./HeaderMenuOption";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";

import {
  GlobeIcon,
  LightningBoltIcon,
  MicrophoneIcon,
  QuestionMarkCircleIcon,
  SearchIcon,
  ShieldCheckIcon,
  UserIcon,
} from "@heroicons/react/outline";
import { ChevronDownIcon } from "@heroicons/react/solid";
import { Link } from "react-router-dom";
import { Checkbox } from "@mui/material";

function Header() {
  const [menuState, setMenuState] = useState(false);

  return (
    <div className="flex-item justify-between py-2 px-4 bg-white">
      <div>
        <img src="/redditLogo.svg" alt="" className="h-8" />
      </div>
      <div className="flex-item p-1 w-[75%] sm:w-[50%] md:w-[59%] space-x-2 rounded-sm bg-[#f4f4f4] ring-1 ring-outlineColor hover:ring-blue-500 focus-within:ring-blue-500">
        <SearchIcon className="h-6 text-gray-500 ml-1" />
        <input
          type="text"
          placeholder="Search Reddit"
          className="flex-grow outline-none bg-transparent text-slate-600"
        />
      </div>
      <div className="hidden sm:flex-item space-x-3 md:space-x-4 px-2">
        <Link
          to="/login"
          className="header-auth-btn ring-1 ring-blue-500 text-blue-500 hover:bg-gray-100"
        >
          Log In
        </Link>
        <Link
          to="/register"
          className="header-auth-btn bg-blue-500 text-white hover:bg-blue-600"
        >
          Sign Up
        </Link>
      </div>
      <div
        className="flex-item p-1 ring-1 ring-outlineColor rounded-sm cursor-pointer"
        onClick={() => setMenuState(!menuState)}
      >
        <UserIcon className="h-5 text-gray-500" />
        <ChevronDownIcon className="h-5 text-gray-600" />
      </div>

      <div
        className={
          menuState
            ? `absolute right-0 top-10 mt-2 w-[40%] bg-white rounded-sm`
            : `hidden`
        }
      >
        <h1 className="text-gray-500 text-[10px] font-bold ml-3 uppercase">
          View options
        </h1>
        <div className="flex-item justify-between px-2 hover:bg-blue-500 cursor-pointer group my-1">
          <div className="flex-item space-x-2">
            <DarkModeOutlinedIcon className="text-gray-700 -rotate-90 group-hover:text-white" />
            <h1 className="text-slate-600 group-hover:text-white">Dark Mode</h1>
          </div>
          <div>
            <Checkbox />
          </div>
        </div>
        <h1 className="text-gray-500 text-[10px] font-bold ml-3 uppercase">
          More stuff
        </h1>
        <div className="hover:bg-blue-500 cursor-pointer group my-1 relative">
          <HeaderMenuOption
            Icon={<MonetizationOnOutlinedIcon />}
            text="Coins"
          />
        </div>
        <HeaderMenuOption
          Icon={<ShieldCheckIcon className="h-6" />}
          text="Premium"
        />
        <HeaderMenuOption
          Icon={<LightningBoltIcon className="h-6" />}
          text="Powerups"
        />
        <HeaderMenuOption
          Icon={<MicrophoneIcon className="h-6" />}
          text="Talk"
        />
        <HeaderMenuOption
          Icon={<GlobeIcon className="h-6" />}
          text="Predictions"
        />
        <HeaderMenuOption
          Icon={<QuestionMarkCircleIcon className="h-6" />}
          text="Help Center"
        />
        <div className="border-t border-gray-400"></div>
        <Link to="/register">
          <HeaderMenuOption Icon={<ExitToAppIcon />} text="Sign Up" />
        </Link>
        <Link to="/login">
          <HeaderMenuOption Icon={<LockOpenIcon />} text="Log In" />
        </Link>
      </div>
    </div>
  );
}

export default Header;
