import React, { useState } from "react";

import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import MonetizationOnOutlinedIcon from "@mui/icons-material/MonetizationOnOutlined";
import HeaderMenuOption from "./HeaderMenuOption";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";

import HeaderSearchOption from "./HeaderSearchOption";
import useDarkMode from "../../hooks/useDarkMode";

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
import { deepOrange } from "@mui/material/colors";

function Header() {
  const [colorTheme, setTheme] = useDarkMode();

  const [menuState, setMenuState] = useState(false);
  const [isFocus, setIsFocus] = useState(false);

  return (
    <div className="flex-item justify-between py-2 px-4 bg-white dark:bg-[#1A1A1B]">
      <Link to="/" className="flex-item space-x-2">
        <img src="/redditLogo.svg" alt="" className="h-8" />
        <img
          src="/redditLogoText.svg"
          alt=""
          className="hidden lg:block dark:hidden h-5"
        />
        <img
          src="/redditLogoTextDark.svg"
          alt=""
          className="hidden lg:dark:block h-5"
        />
      </Link>
      <div className="relative w-[75%] sm:w-[50%] md:w-[50%]">
        <div className="flex-item  pl-2 rounded-sm bg-[#f4f4f4] dark:bg-[#272729] ring-1 ring-outlineColor hover:dark:ring-outlineColor focus-within:dark:ring-outlineColor dark:ring-slate-700 hover:ring-blue-500 focus-within:ring-blue-500 focus-within:bg-white hover:bg-white header-input">
          <SearchIcon className="h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search Reddit"
            className="flex-grow p-1 ml-1 outline-none bg-transparent text-slate-600 text-sm dark:text-white"
            onFocus={() => setIsFocus(true)}
            onBlur={() => setIsFocus(false)}
          />
        </div>
        <div
          className={
            isFocus
              ? `flex-item justify-center absolute top-10 w-full bg-white`
              : `hidden`
          }
        >
          {/* WILL COMPLETE LATER */}
          <HeaderSearchOption />
        </div>
      </div>

      <div className="hidden sm:flex-item space-x-3 md:space-x-4 px-2">
        <Link
          to="/login"
          className="header-auth-btn ring-1 ring-blue-500 dark:ring-white text-blue-500 dark:text-white hover:dark:bg-zinc-800 hover:bg-gray-100"
        >
          Log In
        </Link>
        <Link
          to="/register"
          className="header-auth-btn bg-blue-500 dark:bg-white text-white dark:text-black hover:dark:bg-gray-300 hover:bg-blue-600"
        >
          Sign Up
        </Link>
      </div>
      <div
        className="flex-item p-1 ring-1 ring-outlineColor dark:ring-slate-600 rounded-sm cursor-pointer"
        onClick={() => setMenuState(!menuState)}
      >
        <UserIcon className="h-5 text-gray-500" />
        <ChevronDownIcon className="h-5 text-gray-600" />
      </div>

      <div
        className={
          menuState
            ? `absolute right-0 top-10 mt-2 w-[40%] sm:w-[30%] md:w-[25%] lg:w-[20%] bg-white dark:bg-black rounded-sm`
            : `hidden`
        }
      >
        <h1 className="text-gray-500 text-[10px] font-bold ml-3 uppercase mt-1">
          View options
        </h1>
        <div className="flex-item justify-between px-2 hover:bg-blue-500 cursor-pointer group my-1 dark:hover:bg-gray-300">
          <div className="flex-item space-x-2">
            <DarkModeOutlinedIcon className="text-gray-700 -rotate-90 group-hover:text-white dark:text-white dark:group-hover:text-black" />
            <h1 className="text-slate-600 group-hover:text-white dark:text-white dark:group-hover:text-black">
              Dark Mode
            </h1>
          </div>
          <div>
            <Checkbox
              sx={{
                color: deepOrange[800],
                "&.Mui-checked": {
                  color: deepOrange[600],
                },
              }}
              onClick={() => setTheme(colorTheme)}
            />
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
