import { useEffect, useState } from "react";
import { getUser } from "../db/services/userService";
import image from "../assets/logo.png"
import { useNavigate } from "react-router";

const NabBar = ({user})=>{
    const navigate = useNavigate();
    return (
        <div className="w-[100%] h-[3.5rem] flex justify-between items-center p-2 border border-b border-zinc-200 shagow-lg">
              <div className="h-[100%]">
                <img className="rounded-[100%] h-[95%]" src={image} alt="" />
              </div>
              {user?
                <div onClick={()=>navigate("/profile")} className="h-[100%] flex gap-2 justify-end items-center cursor-pointer">
                    <p className="text-lg font-semibold text-purple-900">{user.name}</p>
                    <img className="rounded-[100%] h-[95%] border border-purple-400" src={user.profileImage} alt="" />
                </div>
                :
                <div></div>
              }
        </div>
    )
}

export default NabBar;