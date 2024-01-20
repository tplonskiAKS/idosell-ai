import React from "react";
import { useRouter } from 'next/router';
import { headlineName, hint } from './hints';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import { BsQuestionCircleFill } from 'react-icons/bs'


const Navbar = () => {
  const router = useRouter();

  return (
    <>
      <div className="w-full h-20 bg-slate-600 sticky top-0 ">
        <Popup
          trigger={<BsQuestionCircleFill className="button text-4xl mt-6 float-left"> Open Modal </BsQuestionCircleFill>}
          modal
          nested
        >
          {close => (
            <div className="modal p-5">
              <button className="close" onClick={close}>
                &times;
              </button>
              <div className="header">
                <h1 className="text-2xl text-center">{headlineName(router.pathname)}</h1>
              </div>
              <div className="content mt-6 whitespace-pre-line">
                {hint(router.pathname)}
              </div>
            </div>
          )}
        </Popup>

        <div className="container mx-auto px-12 h-full">
          <div className="flex justify-between items-center h-full">
            <ul className="hidden md:flex gap-x-6 text-white">
              <li>
                <p className="text-xl">{headlineName(router.pathname)}</p>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  )
}

export default Navbar;