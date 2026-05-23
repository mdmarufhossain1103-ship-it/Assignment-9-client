'use server'
import { email, json } from "better-auth";
import { revalidatePath } from "next/cache";
import { authClient } from "./auth-client";

export const getUsers = async() =>{
    const res = await fetch('http://localhost:5000/users');
    const data = await res.json();
    return data;
}

export const getIdeas = async(email) =>{
    const res = await fetch(`http://localhost:5000/ideas?email=${email}`);
   const data = await res.json();
   return data;
};

export const getUserById = async(userId) =>{
    console.log(userId);
    const res = await fetch(`http://localhost:5000/users/${userId}`)
    const data = await res.json();
    return data;
}

export const getCommentsByIdeaId = async(ideaId) =>{
    const res = await fetch(`http://localhost:5000/comments/${ideaId}`);
    const data = await res.json();
    return data;
};

export const createComment = async(commentData) =>{
    const res = await fetch(`http://localhost:5000/comments`,{
        method: 'POST',
        headers:{
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(commentData)
    });

    const data = await res.json();

    if(data._id){
        revalidatePath('/users');
    }

    return data;
};

export const updateComment = async (commentId,updatedText) =>{
    const res = await fetch(`http://localhost:5000/comments/${commentId}`, {
        method: 'PATCH',
        headers:{
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            text: updatedText
        })
    });

    const data = await res.json();
    if(data.modifiedCount > 0){
        revalidatePath('/users');
    }
    return data;
}

export const deleteComment = async(commentId) =>{
    const res = await fetch(`http://localhost:5000/comments/${commentId}`,{
        method: 'DELETE'
    });
    const data = await res.json();

    if(data.deletedCount > 0){
        revalidatePath('/users');
    }
    return data;
};

export const createIdea = async(formData) =>{
    const newUser = Object.fromEntries(formData.entries());
    if(newUser.tags){
        newUser.tags = newUser.tags.split(',').map(t => t.trim());
    }

    const session = await authClient.getSession();
    const email = session?.data?.user?.email;
    const ideaData = {...newUser,email:"abc@gamil.com"}

    const res = await fetch('http://localhost:5000/ideas',{
        method: 'POST',
        headers: {
            'Content-type': 'application/json'
        },

        body: JSON.stringify(ideaData)
    })
    const data = await res.json();

    if(data.insertedId){
        revalidatePath('/ideas');
    }
     return data;
}