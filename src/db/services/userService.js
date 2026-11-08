import db from "../db"
import { defaultUser } from "../schemas/userSchema";

export const createUser = async (data)=>{
   if (!data){
   await db.users.add({...defaultUser,name:"default"})
   }
   await db.users.add(data)
   return await db.users.get(1);
}

export const getUser = async () =>{
   return await db.users.get(1);
}

export const updateUser = async (data)=>{
   return await db.users.update(1,{
    ...data,
    updatedAt: new Date()
   })
}

export const deleteUser =async()=>{
    return await db.users.delete(1);
}