import React from "react";
import LoginModal from "./LoginModal";
import RegisterModal from "./RegisterModal";

import { XIcon } from "@heroicons/react/outline";
import { useDispatch, useSelector } from "react-redux";
import { changeModalState } from "../../features/modalSlice";
import { loginErrorClear } from "../../features/loginSlice";
import { registerErrorClear } from "../../features/registerSlice";

function AuthModal() {
  const { isOpened, view } = useSelector((state) => state.modal);

  const dispatch = useDispatch();

  return (
    <div
      className={
        isOpened
          ? `bg-black bg-opacity-20 absolute inset-0 flex-item justify-center`
          : `hidden`
      }
    >
      <div className="bg-white flex-item rounded md:w-[70vw] w-screen h-[70%] relative">
        <div className="hidden sm:block h-full">
          <img
            src="https://www.redditstatic.com/accountmanager/bbb584033aa89e39bad69436c504c9bd.png"
            alt=""
            className="h-full"
          />
        </div>
        <XIcon
          className="h-8 text-slate-500 absolute right-2 top-2 cursor-pointer"
          onClick={() => {
            dispatch(changeModalState(false));
            dispatch(loginErrorClear());
            dispatch(registerErrorClear());
          }}
        />

        {view === "login" ? <LoginModal /> : <RegisterModal />}
      </div>
    </div>
  );
}

export default AuthModal;
