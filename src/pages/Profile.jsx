import { useEffect, useState } from "react";
import { getUser, updateUser } from "../db/services/userService";
import EditProfile from "../components/EditProfile";
import profile from "../assets/profile.png"

const Profile = ({user,setUser})=>{
    const [currUser,setCurrUser] = useState(user)
    const[profileEdit,setProfileEdit] = useState(false)
    const [response,setResponse] = useState({message:"",status:"",output:""})
    useEffect(()=>{
        setResponse({message:"",status:"",output:""})
    },[currUser])
    const handleUserUpdate = async ()=>{
       try{
        setResponse({message:"saving data...",status:"loading"})
        await updateUser(currUser);
        const dbuser = await getUser(1);
        setUser(dbuser)
        setResponse({message:"saved!",status:"success"})
       }catch(err){
        setResponse({message:`${err}`,status:"failed"})
       }
    }
    return(
        
        <div className="p-1 h-[100%] w-[100%] flex flex-col items-center justify-center">
            {profileEdit&& <EditProfile setProfileEdit={setProfileEdit} user={currUser} setUser={setCurrUser}/>}
            <div className="flex flex-col gap-2 items-center p-5">
                <img onClick={()=>{setProfileEdit(true)}} className="cursor-pointer shadow shadow-purple-500 w-[10rem] h-[10rem] rounded-[100%]" src={currUser?.profileImage?URL.createObjectURL(currUser?.profileImage)||"":profile} alt="" />
                <p className="text-center text-lg font-semibold text-purple-900">{user?.name||""}</p>
            </div>

            <div className=" w-[100%] lg:w-[60%] p-4 flex gap-4 justify-center">
            <div className="w-[45%] flex flex-col items-cente gap-4">
             <input onChange={(e)=>{setCurrUser((prev)=>{return{...prev,name:e.target.value}})}} value={currUser?.name||""} className="text-lg text-purple-900 font-semibold p-2 rounded-lg w-[100%] border border-zinc-200 shadow" type="text" placeholder="Enter Your Name" />
             <input onChange={(e)=>{setCurrUser((prev)=>{return{...prev,email:e.target.value}})}} value={currUser?.email||""} className="text-lg text-purple-900 font-semibold p-2 rounded-lg w-[100%] border border-zinc-200 shadow" type="text" placeholder="Enter Email" />
            </div>
            <div className="w-[45%] flex flex-col items-center gap-4">
             <input onChange={(e)=>{setCurrUser((prev)=>{return{...prev,dateOfBirth:e.target.value}})}} value={currUser?.dateOfBirth} className="text-lg text-purple-900 font-semibold p-2 rounded-lg w-[100%] border border-zinc-200 shadow" type="date" placeholder="Enter Date of Birth" />
             <input onChange={(e)=>{setCurrUser((prev)=>{return{...prev,bio:e.target.value}})}} value={currUser?.bio} className="text-lg text-purple-900 font-semibold p-2 rounded-lg w-[100%] border border-zinc-200 shadow" type="text" placeholder="Enter Bio" />
            </div>
            </div>
            <div>
            <button className="p-2 px-5 cursor-pointer text-white font-semibold bg-purple-900 rounded-lg shadow-lg border border-zinc-400" onClick={handleUserUpdate}>Save</button>        
            {response.status=="success"&& <p className="text-center text-green-500">{response.message}</p>}
            {response.status=="failed"&& <p className="text-center text-red-500">{response.message}</p>}
            {response.status=="loading"&& <p className="text-center text-zinc-500">{response.message}</p>}

            </div>
        </div>
    )
}

export default Profile;