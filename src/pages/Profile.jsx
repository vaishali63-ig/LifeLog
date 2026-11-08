const Profile = ({user})=>{
    return(
        <div className="p-1 h-[100%] w-[100%] flex flex-col items-center">

            <div className="flex flex-col gap-2 items-center p-5">
                <img className="w-[10rem] h-[10rem] rounded-[100%]" src={user?.profileImage||""} alt="" />
                <p className="text-center text-lg font-semibold text-purple-900">{user?.name||""}</p>
            </div>

            <div className="h-[100%] w-[100%] lg:w-[60%]">


               
            </div>
            
        </div>
    )
}

export default Profile;