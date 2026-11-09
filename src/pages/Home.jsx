import { NavLink } from "react-router";

const Home = ({blogs,user})=>{

     const lastLogDate = blogs.length!=0? new Date(blogs[0].createdAt).toLocaleString('en-us',{
                    year:"numeric",
                    day:"numeric",
                    month:"long",
                }):"";
    //  const todayDate = new Date().toLocaleString('en-us',{
    //                 year:"numeric",
    //                 day:"numeric",
    //                 month:"long",
    //             });
    return (
        <div className="p-5 flex flex-col justify-center items-center w-[100%] h-[100%] gap-2">
          {user&&(<><p className="text-3xl font-semibold text-purple-900 text-center w-[100%] p-2" >Hi {user?.name.split(" ")?.[0]||""} </p>
          <p className="text-3xl font-semibold text-purple-900 text-center w-[100%] p-2">WELCOME TO LIFELOG</p>
          <p className="text-lg font-semibold">{blogs.length!=0 ?`Your Last LifeLog: ${lastLogDate}`:"You haven't logged anything yet!"}</p>
          <NavLink className="p-2 bg-purple-900 rounded-lg shadow text-lg text-white font-semibold" to="/blogs" >{blogs.length==0?"Write Your First LifeLog":"Write LifeLog"}</NavLink>
          {blogs.length!=0&&(
            <p className="text-zinc-500">{`you have captured ${blogs.length} ${blogs.length == 1?"moment":"moments"}. Keep writing, keep remembering!`}</p>
          )}
          </>)}
        </div>
    )
}
export default Home;