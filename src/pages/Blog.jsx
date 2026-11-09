import { useEffect, useRef, useState } from "react";
import { defaultBlog } from "../db/schemas/blogSchema";
import { createBlog, deleteBlogById, getAllBlogs } from "../db/services/blogService";

const Blog = ({blogs,setBlogs})=>{
    const [currBlog,setCurrBlog] = useState(null)
    const [response,setResponse] = useState({message:"",status:"",output:""})
    const fileInputRef = useRef(null)

    useEffect(()=>{
           setResponse({message:"",status:"",output:""})
    },[currBlog])

    const handleSave = async ()=>{
        try{
        setResponse({message:"saving lifelog...",status:"loading"})
        if(currBlog.title==""){
            throw("title can not be empty")
        }
        if(currBlog.description==""){
            throw("description can not be empty")
        }
        await createBlog({...currBlog,createdAt: new Date()});
        const blogs = await getAllBlogs();
        console.log(blogs)
        setBlogs(blogs);
        setCurrBlog(null)
        setResponse({message:"lifelog saved!",status:"success"})
        }catch(err){
            setResponse({message:`${err},`,status:"failed",output:""})
        }
    }

    const handleBlogDelete = async (id)=>{
         try{
        setResponse({message:"deleting lifelog...",status:"loading"})
        await deleteBlogById(id);
        const blogs = await getAllBlogs();
        console.log(blogs)
        setBlogs(blogs);
        setCurrBlog(null)
        setResponse({message:"",status:"success"})
        }catch(err){
            setResponse({message:`${err},`,status:"failed",output:""})
        }
    }
    return (
       <div className="flex flex-col gap-4 p-4 h-[100%] w-[100%] items-center">
        <div className="overflow-y-auto w-[100%] lg:w-[60%]">
        <div className={`flex my-4 flex-col gap-4 p-4 mt-10 overflow-y-auto justify-center items-center w-[100%] min-h-[20vh] border border-2 rounded-lg border-purple-900 shadow-lg`}>
            {currBlog?<>
                <p className="text-xl font-semibold text-center text-purple-900">Write New LifeLog</p>
                <input className="p-2 rounded-lg border border-zinc-200 shadow w-[80%] " value={currBlog.title||""} onChange={(e)=>{setCurrBlog((prev)=>{return{...prev,title:e.target.value}})}} placeholder="Enter Title" type="text" />
                <div className="h-[12rem] w-[100%] flex justify-center items-center">
                <textarea className="p-2 h-[12rem] rounded-lg border border-zinc-200 shadow w-[80%] " value={currBlog.description||""} onChange={(e)=>{setCurrBlog((prev)=>{return{...prev,description:e.target.value}})}} placeholder="Enter Description" type="text"></textarea>
                </div>
                <input type="file" accept="image/*" ref={fileInputRef} multiple className="hidden" onChange={(e)=>{if(e.target.files.length>5){setResponse({message:"maximum 5 images are allowed",status:"failed"}); return;} setCurrBlog((prev)=>{ return{...prev,images:[...e.target.files]}})}} />
                <button onClick={()=>{fileInputRef.current.click()}} className="text-lg p-2 bg-purple-900 text-white font-semibold rounded-lg shadow-lg cursor-pointer">Add Images</button>
                <div className="w-[100%] flex flex-wrap gap-4 max-h-[20rem] justify-center">
                  {
                    currBlog.images.map((img,idx)=>{
                        return(
                            <div className="w-[10rem] h-[10rem] flex flex-col items-center justify-center gap-2 border border-purple-900 rounded-lg border-2">
                                <img className="h-[5rem] max-w-[10rem]" src={URL.createObjectURL(img)} alt="" />
                                <button onClick={()=>{setCurrBlog((prev)=>{return{...prev,images:prev.images.filter((img,i)=>i!=idx)}})}} className="p-1 text-red-500 border border-red-500 rounded-lg shadow-lg cursor-pointer">remove</button>
                            </div>
                        )
                    })
                  }
                
                </div>
                <div className="flex justify-between p-4 w-[100%]">
                <button onClick={()=>{setCurrBlog(null)}} className="test-lg font-semibold rounded-lg p-2 px-4 border border-purple-900 text-purple-900 border-2 shadow cursor-pointer">Cancel</button>
                <button onClick={()=>{handleSave()}} className="rounded-lg shadow bg-purple-900 px-4 text-white text-lg font-semibold cursor-pointer p-2">Save</button>
                </div>
                </>:<button onClick={()=>setCurrBlog(defaultBlog)} className="rounded-lg cursor-pointer p-4 border border-dashed border-2 border-purple-900 text-purple-900 font-semibold text-xl">ADD LIFE LOG</button>}
        </div>
            {response.status=="failed"&&<p className="text-red-500 text-center">{response.message}</p>}
            {response.status=="success"&&<p className="text-green-500 text-center">{response.message}</p>}
            {response.status=="loading"&&<p className="text-center">{response.message}</p>}
        {
            blogs.map((b,idx)=>{
                const createdAt = new Date(b.createdAt).toLocaleString('en-us',{
                    year:"numeric",
                    day:"numeric",
                    month:"long",
                    hour:"2-digit",
                    minute:"2-digit"
                });
                return (
                <div key={idx} className="p-2.5 flex flex-col gap-2 overflow-y-auto items-center w-[100%] my-4 h-auto min-h-[20vh]  rounded-lg border-purple-500 shadow-lg">
                <pre className="whitespace-pre-wrap text-justify rounded-lg w-[80%] font-semibold text-lg">{b.title||""}</pre>
                <p key={idx} className="px-2 text-zinc-600 text-right w-[80%]">- {createdAt}</p>
                <pre className="text-justify whitespace-pre-wrap rounded-lg w-[80%] " >{b.description||""}</pre>
                <input disabled type="file" accept="image/*" ref={fileInputRef} multiple className="hidden" onChange={(e)=>{if(e.target.files.length>5){setResponse({message:"maximum 5 images are allowed",status:"failed"}); return;} setCurrBlog((prev)=>{ return{...prev,images:[...e.target.files]}})}} />
                {/* <button onClick={()=>{fileInputRef.current.click()}} className="text-lg p-2 bg-purple-900 text-white font-semibold rounded-lg shadow-lg cursor-pointer">Add Images</button> */}
                <div className="w-[100%] flex flex-wrap gap-4 justify-center max-h-[20rem]">
                  {
                    b.images.map((img,idx)=>{
                        return(
                            <div className="w-[10rem] h-[10rem] flex flex-col items-center justify-center gap-2 border border-purple-500 rounded-lg border">
                                <img className="h-[5rem] max-w-[10rem]" src={URL.createObjectURL(img)} alt="" />
                                {/* <button onClick={()=>{setCurrBlog((prev)=>{return{...prev,images:prev.images.filter((img,i)=>i!=idx)}})}} className="p-1 text-red-500 border border-red-500 rounded-lg shadow-lg cursor-pointer">remove</button> */}
                            </div>
                        )
                    })
                  }
                </div>
                <div className="flex justify-center p-4 w-[100%]">
                <button onClick={()=>{handleBlogDelete(b.id)}} className="test-lg font-semibold rounded-lg p-2 border border-red-500 text-red-500 border shadow cursor-pointer">Delete</button>
                </div>
                {/* {response.status=="failed"&&<p className="text-red-500 text-center">{response.message}</p>} */}
        </div>
                )
            })
        }
         </div>
       </div>
    )
}

export default Blog;