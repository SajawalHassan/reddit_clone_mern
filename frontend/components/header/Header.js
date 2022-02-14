// Imports from react
import React, { useState } from 'react'
import Image from 'next/image'

// Imports from files
import HeaderMenuOption from './HeaderMenuOptions'

// Imports from mui
import SearchTwoToneIcon from '@mui/icons-material/SearchTwoTone'
import KeyboardArrowDownTwoToneIcon from '@mui/icons-material/KeyboardArrowDownTwoTone'
import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined'
import ShieldOutlinedIcon from '@mui/icons-material/ShieldOutlined'
import HelpOutlineOutlinedIcon from '@mui/icons-material/HelpOutlineOutlined'
import LoginOutlinedIcon from '@mui/icons-material/LoginOutlined'
import { Checkbox } from '@mui/material'

// Imports from heroicons
import {
  UserIcon,
  LightningBoltIcon,
  MicrophoneIcon,
  GlobeIcon,
  CurrencyDollarIcon,
} from '@heroicons/react/outline'

function Header() {
  const [open, setOpen] = useState(false)

  return (
    <div className="flex items-center justify-between bg-white px-4">
      <a className="mt-2" href="#">
        <Image src="/redditIcon.svg" width={30} height={30} />
      </a>
      <div className="flex w-3/4 items-center rounded-sm bg-[#efefefe9] px-1 py-1.5 ring-1 ring-[#dfdfdf] hover:ring-blue-400">
        <SearchTwoToneIcon className="mr-2 ml-2 text-2xl text-gray-500" />
        <input
          type="text"
          placeholder="Search Reddit"
          className="flex-grow bg-transparent outline-none"
        />
      </div>
      <div
        className="flex cursor-pointer items-center rounded-sm py-1 ring-gray-300 hover:ring-1"
        onClick={() => setOpen(!open)}
      >
        <UserIcon className="h-6 text-gray-500" />
        <KeyboardArrowDownTwoToneIcon className="text-slate-600" />
      </div>
      <div
        bg-white
        className={
          open ? `absolute top-10 right-2 rounded-md bg-white` : `hidden`
        }
      >
        <h1 className="ml-3 mt-1 text-xs font-extrabold uppercase text-gray-400">
          view options
        </h1>
        <div className="group flex cursor-pointer items-center hover:bg-[#0079D3]">
          <div className="group-hover:text-white">
            <HeaderMenuOption
              Icon={<DarkModeOutlinedIcon className="-rotate-90" />}
              text="Dark mode"
            />
          </div>
          <Checkbox color="default" className="ml-9 mr-1" />
        </div>
        <h1 className="ml-3 mt-1 text-xs font-extrabold uppercase text-gray-400">
          more stuff
        </h1>
        <HeaderMenuOption
          Icon={<CurrencyDollarIcon className="h-6" />}
          text="Coins"
          payload="0 coins"
        />
        <HeaderMenuOption Icon={<ShieldOutlinedIcon />} text="Premium" />
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
          Icon={<HelpOutlineOutlinedIcon />}
          text="Help Center"
        />
        <div className="h-0.5 bg-gray-300"></div>
        <HeaderMenuOption
          Icon={<LoginOutlinedIcon />}
          text="Log In / Sign Up"
        />
      </div>
    </div>
  )
}

export default Header
