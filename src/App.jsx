import { use, useEffect, useState } from 'react'
import './App.css'
import NabBar from './components/NavBar'
import { Route, Routes } from 'react-router'
import Home from './pages/Home'
import WelCome from './components/Welcome'
import { getUser } from './db/services/userService'
import SideBar from './components/SideBar'
import Blog from './pages/Blog'
import Profile from './pages/Profile'
import { getAllBlogs } from './db/services/blogService'

function App() {
  const [user,setUser] = useState(null)
  const [blogs,setBlogs] = useState([])
    useEffect(()=>{
      const getBlogs = async()=>{
        const blogs = await getAllBlogs();
        setBlogs(blogs||[])
        //console.log(blogs)
      }
      getBlogs()
    },[])
  useEffect(()=>{

      const getData = async ()=>{
      const user = await getUser();
      setUser(user)
      }
      getData();
    },[])
  return (
   <div className='w-full h-[100vh] '>
        {/* <button onClick={deleteUser}>clear</button> */}
       <NabBar user={user}/>
       {
        !user&&(
          <WelCome setUserData={setUser}/>
        )
       }
       <div className='flex w-[100%] h-[92.9%]'>
         <div className='w-[18%] border-r border-zinc-200 p-2'>
            <SideBar/>
         </div>
         <div className='w-[100%] h-[100%]'>
          <Routes>
            <Route path='/' element={<Home user={user} blogs={blogs} />}/>
            <Route path='/blogs' element={<Blog blogs={blogs} setBlogs={setBlogs} />}/>
            <Route path='/profile' element={<Profile user={user} setUser={setUser}/>}/>
          </Routes>
        </div>
       </div>
   </div>
  )
}

export default App
