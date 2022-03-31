import React from "react";

function HeaderMenuOption({ Icon, text }) {
  return (
    <div className="flex-item p-2 space-x-2 hover:bg-blue-500 cursor-pointer group rounded-bl-sm">
      <i className="text-gray-700 group-hover:text-white">{Icon}</i>
      <h1 className="text-gray-600 group-hover:text-white">{text}</h1>
    </div>
  );
}

export default HeaderMenuOption;
