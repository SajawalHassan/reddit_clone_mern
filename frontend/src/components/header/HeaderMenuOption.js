import React from "react";

function HeaderMenuOption({ Icon, text }) {
  return (
    <div className="flex-item p-2 space-x-2 hover:bg-blue-500 dark:hover:bg-gray-300 cursor-pointer group">
      <i className="text-gray-700 group-hover:text-white dark:text-white dark:group-hover:text-black">
        {Icon}
      </i>
      <h1 className="text-gray-600 group-hover:text-white dark:text-white dark:group-hover:text-black">
        {text}
      </h1>
    </div>
  );
}

export default HeaderMenuOption;
