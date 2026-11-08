import { useEffect, useState } from 'react'
import './App.css'
import NabBar from './components/NavBar'
import { Route, Routes } from 'react-router'
import Home from './pages/Home'
import WelCome from './components/Welcome'
import { deleteUser, getUser } from './db/services/userService'

function App() {
  const [user,setUser] = useState(null)
  useEffect(()=>{

      const getData = async ()=>{
      const user = await getUser();
      console.log("user",user);
      setUser(user)
      }
      getData();
    },[])
  return (
   <div className='w-full h-[100%] bg-zinc-100'>
        <button onClick={deleteUser}>clear</button>
       <NabBar user={user}/>
       {
        !user&&(
          <WelCome setUserData={setUser}/>
        )
       }
       <Routes>
          <Route path='/' element={<Home/>}/>
       </Routes>
   </div>
  )
}

export default App
