import { useEffect, useState } from "react";
import { getUser } from "../db/services/userService";
import image from "../assets/logo.png"
import { useNavigate } from "react-router";
import profile from "../assets/profile.png"

const NabBar = ({user})=>{
    const navigate = useNavigate();
    return (
        <div className="w-[100%] h-[7.1%] flex justify-between items-center p-2 border border-b border-zinc-200 shagow-lg">
              <div className="h-[100%] flex gap-2 items-center">
                <img className="rounded-[100%] h-[95%]" src={image} alt="" />
                <p className="text-purple-900 text-lg font-semibold">LifeLog</p>
              </div>
              {user?
                <div onClick={()=>navigate("/profile")} className="h-[100%] flex gap-2 justify-end items-center cursor-pointer">
                    <p className="text-lg font-semibold text-purple-900">{user?.name}</p>
                    <img className="rounded-[100%] w-[2.2rem] h-[2.2rem] border border-purple-400" src={user?.profileImage?URL.createObjectURL(user?.profileImage)||"":profile} alt="" />
                </div>
                :
                <div></div>
              }
        </div>
    )
}

export default NabBar;