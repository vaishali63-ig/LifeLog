import db from "../db"

export const getAllBlogs= async ()=>{
   return await db.blogs.orderBy("createdAt").reverse().toArray();
}

export const getBlogById = async(id)=>{
    return await db.blogs.get(id)
}

export const updateBlogById = async(data)=>{
   return  await db.blogs.update(data.id,{
        ...data
    })
}

export const createBlog = async(data)=>{
    const {id,...blogData} = data
    await db.blogs.add(blogData)
}

export const deleteBlogById = async(id)=>{
    await db.blogs.delete(id);
}