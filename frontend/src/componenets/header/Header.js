import React, { useState } from "react";

import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import MonetizationOnOutlinedIcon from "@mui/icons-material/MonetizationOnOutlined";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import HeaderMenuOption from "./HeaderMenuOption";
import AuthModal from "../modals/AuthModal";
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
import { Switch } from "@mui/material";
import { useDispatch } from "react-redux";
import { changeModalState, changeView } from "../../features/modalSlice";

function Header() {
  const [menu, setMenu] = useState(false);
  const [setTheme, colorTheme] = useDarkMode();

  const dispatch = useDispatch();

  return (
    <div>
      <div className="flex-item justify-between py-2 px-4 bg-white dark:bg-darkBgColor">
        <Link className="flex-item space-x-2 p" to="/">
          <img src="/redditLogo.svg" alt="" className="h-8" />
          <img
            src="/redditLogoText.svg"
            alt=""
            className="h-5 hidden lg:block dark:lg:hidden"
          />
          <img
            src="/redditLogoTextDark.svg"
            alt=""
            className="h-5 hidden lg:dark:block"
          />
        </Link>
        <div className="flex-item p-1 w-[70%] sm:w-[50%] md:w-[55%] space-x-2 rounded-sm bg-[#f4f4f4] ring-1 ring-outlineColor hover:ring-blue-500 focus-within:ring-blue-500 dark:bg-[#2b2929] dark:ring-[#444040]">
          <SearchIcon className="h-6 text-gray-500 ml-1" />
          <input
            type="text"
            placeholder="Search Reddit"
            className="flex-grow outline-none bg-transparent text-slate-600 dark:text-white"
          />
        </div>
        <div className="hidden sm:flex-item space-x-3 md:space-x-4 px-2">
          <div
            className="header-auth-btn ring-1 ring-blue-500 text-blue-500 hover:bg-gray-100 dark:ring-white dark:text-white dark:bg-transparent dark:hover:bg-slate-800"
            onClick={() => {
              dispatch(changeView("login"));
              dispatch(changeModalState(true));
            }}
          >
            Log In
          </div>
          <div
            className="header-auth-btn bg-blue-500 text-white hover:bg-blue-600 dark:bg-gray-200 dark:text-black dark:hover:bg-gray-300"
            onClick={() => {
              dispatch(changeView("register"));
              dispatch(changeModalState(true));
            }}
          >
            Sign Up
          </div>
        </div>
        <div
          className="flex-item p-1 ring-1 ring-outlineColor rounded-sm cursor-pointer "
          onClick={() => setMenu(!menu)}
        >
          <UserIcon className="h-5 text-gray-500" />
          <ChevronDownIcon className="h-5 text-gray-600" />
        </div>

        <div
          className={
            menu
              ? `absolute right-0 top-10 mt-2 w-56 bg-white rounded-sm dark:bg-darkBgColor`
              : `hidden`
          }
        >
          <h1 className="text-gray-500 text-[10px] font-bold ml-3 uppercase">
            View options
          </h1>
          <div className="flex-item justify-between px-2 hover:bg-blue-500 cursor-pointer group my-1 dark:hover:bg-gray-200">
            <div className="flex-item space-x-2">
              <DarkModeOutlinedIcon className="text-gray-700 -rotate-90 group-hover:text-white dark:group-hover:text-black dark:text-white" />
              <h1 className="text-slate-600 group-hover:text-white dark:group-hover:text-black dark:text-white">
                Dark Mode
              </h1>
            </div>
            <div>
              <Switch color="warning" onClick={() => setTheme(colorTheme)} />
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
          <div className="border-t border-gray-400" />
          <div
            onClick={() => {
              dispatch(changeModalState(true));
              setMenu(!menu);
            }}
          >
            <HeaderMenuOption
              Icon={<ExitToAppIcon />}
              text="Log In / Sign Up"
            />
          </div>
        </div>
      </div>
      <AuthModal />
    </div>
  );
}

export default Header;
