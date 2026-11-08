import { useState } from "react";
import { defaultUser } from "../db/schemas/userSchema";
import { createUser } from "../db/services/userService";

const WelCome = ({setUserData})=>{
    const [user,setUser] = useState(defaultUser)
    const [response,setResponse] = useState({status:"",message:"",output:null})
    const create = async ()=>{
        setResponse({status:"loading",message:"please wait..."})
        try{
           const dbuser =  await createUser(user);
            setResponse({status:"success",message:"success"})
            setUserData(dbuser)
        }catch(err){
            setResponse({status:"failed",message:`${err}`})
        }
    }
    return (
        <div className="fixed inset-0 z-[999] flex justify-center items-center bg-black/2">
            <div className="w-[50%] rounded-lg shadow-lg border border-zinc-200 bg-white flex flex-col items-center p-4 gap-4 justify-between">
                <div className="flex flex-col items-center gap-4 w-[100%]">
                   <p className="text-lg font-semibold text-purple-900">WELCOME TO LIFELOG</p>
                    <input value={user.name} onChange={(e)=>{setUser((prev)=>{return{...prev,name:e.target.value}})}} type="text" className="text-center text-purple-900 font-semibold p-1 w-[60%] border border-purple-900 rounded shadow-sm" placeholder="Enter Your Name" />
                    {user.name&&(
                        <button onClick={create} className="cursor-pointer bg-purple-900 text-white p-2 rounded-lg shadow-lg">Get Started</button>
                    )}
                    {response.status=="loading"&&(
                        <p className="text-sm text-center text-orange-400">{response.message}</p>
                    )}
                    {response.status=="failed"&&(
                       <p className="text-red-900 text-center text-sm">{response.message}</p>
                    )
                    }
                </div>
                    <p className="text-sm text-zinc-400">Capture moments. Remember forever.</p>
            </div>
        </div>
    )
}
export default WelCome;