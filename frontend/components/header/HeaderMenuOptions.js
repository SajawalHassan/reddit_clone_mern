import React from 'react'

function HeaderMenuOptions({ Icon, text, payload }) {
  return (
    <div className="group relative flex cursor-pointer items-center space-x-2 px-3 py-3 hover:bg-[#0079D3]">
      <i className="text-slate-800 group-hover:text-white">{Icon}</i>
      <h1 className="text-zinc-900 group-hover:text-white">{text}</h1>
      <p className="absolute left-9 top-8  text-xs font-extralight text-gray-500 group-hover:text-white">
        {payload}
      </p>
    </div>
  )
}

export default HeaderMenuOptions
