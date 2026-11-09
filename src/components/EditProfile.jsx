import { useEffect, useRef, useState } from "react"
import profile from "../assets/profile.png"

const EditProfile = ({user,setUser,setProfileEdit})=>{
    const [profileImg,setProfileImage] = useState(user?.profileImage)
    const fileInputRef = useRef(null)

    const [imageView,setImageView] = useState(profile)
        useEffect(()=>{
            let objectUrl;
              try{
                if(!profileImg){
                  setImageView(profile)
                  return;
                }
                 objectUrl = profileImg?URL.createObjectURL(profileImg)||"":profile
                setImageView(objectUrl)
              }catch(err){
                console.log("err image loading: ",err)
              }
              return ()=>{
                if (objectUrl) URL.revokeObjectURL(objectUrl)
              }
            },[user,profileImg])

    const handleImageUpdate = ()=>{
         setUser((prev)=>{return{...prev,profileImage :profileImg}})
        setProfileEdit(false)
    }

    const handleFileChange = (file)=>{
       // alert(file)
         setProfileImage(file)
    }
    return (
        <div className="fixed inset-0 z-[999] flex justify-center items-center bg-black/10">
             <div className="w-[25rem] h-[28rem] rounded shadow-lg border border-zinc-200 bg-white flex flex-col items-center gap-4 justify-between">
              <input accept="image/*" onChange={(e)=>{handleFileChange(e.target.files[0])}} ref={fileInputRef} type="file" className="hidden" />
              <img onClick={()=>{fileInputRef.current.click()}} className="cursor-pointer w-[21rem] h-[21rem] mt-[1rem] rounded-[100%] border border-purple-900" src={imageView} alt="" />
              <div className="flex justify-between p-4 w-[100%]">
                <button onClick={()=>{setProfileEdit(false)}} className="test-lg font-semibold rounded-lg p-2 border border-purple-900 text-purple-900 border-2 shadow cursor-pointer">Cancel</button>
                <button onClick={()=>{setProfileImage(null)}} className="test-lg font-semibold rounded-lg p-2 border border-red-500 text-red-500 border-2 shadow cursor-pointer">Remove</button>
                <button onClick={handleImageUpdate} className="rounded-lg shadow bg-purple-900 text-white text-lg font-semibold cursor-pointer p-2">Done</button>
              </div>
             </div>
        </div>
    )
}

export default EditProfile;