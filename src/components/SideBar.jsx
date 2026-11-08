import { Link, useLocation } from "react-router"
import { sidebarOptions } from "../common/staticData"
import { useEffect, useState } from "react";

const SideBar = () =>{
    const link = useLocation().pathname
    return(
        <div className="flex flex-col items-center w-[100%] gap-2">
            {
                sidebarOptions.map((s)=>{
                    return(
                        <Link className={`ps-5 p-2 w-[90%] text-lg font-semibold text-purple-900 ${s.path!=link?"hover:bg-purple-200":""} rounded-lg ${s.path==link?"bg-purple-500 text-white":""}`} to={s.path}>{s.title}</Link>
                    )
                })
            }
        </div>
    )
}

export default SideBar