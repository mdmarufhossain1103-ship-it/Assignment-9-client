"use server";

import { revalidatePath } from "next/cache";
import { headers } from "next/headers";
import { auth } from "./auth";

export const getUsers = async () => {
    const res = await fetch("http://localhost:5000/users");
    const data = await res.json();
    return data;
};


export const updateUser = async(email,updatedFields) =>{
    if (!email) return {error: "Email is required"};

    const res = await fetch(`http://localhost:5000/users/${email}`,{
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedFields),
    });

    const data = await res.json();

    return data;
}

export const getIdeas = async ({email= "",search="",category ="",startDate ="", endDate = ""} = {}) => {
    const params = new URLSearchParams();

    if (email) params.append("email", email);
    if(search) params.append("search", search);
    if(category) params.append("category",category);
    if(startDate) params.append("startDate", startDate);
    if(endDate) params.append("endDate", endDate);

    const res = await fetch(`http://localhost:5000/ideas?${params.toString()}`,{
        cache: "no-store"
    });
    const data = await res.json();
    return data;
};

export const getUserByComments = async(email) =>{
    const res = await fetch(`http://localhost:5000/comments?email=${email}`);
    const data = await res.json();

    return data;
}

export const updateIdea = async(ideaId,updatedIdea) =>{
    const res = await fetch(`http://localhost:5000/ideas/${ideaId}`,{
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedIdea),
    });

    const data = await res.json();

    if(data.modifiedCount > 0){
        revalidatePath('/ideas');
    }

    return data;
}



export const deleteIdea = async (ideaId) =>{
    const res = await fetch(`http://localhost:5000/ideas/${ideaId}`,{
        method: "DELETE",
    });

    const data = await res.json();
    if(data.deletedCount > 0){
        revalidatePath('/ideas');
    }
    return data;
}

export const getUserById = async (userId) => {
    console.log(userId);
    const res = await fetch(`http://localhost:5000/users/${userId}`);
    const data = await res.json();
    return data;
};

export const getCommentsByIdeaId = async (ideaId) => {
    const res = await fetch(`http://localhost:5000/comments/${ideaId}`);
    const data = await res.json();
    return data;
};

export const createComment = async (commentData) => {
    const res = await fetch(`http://localhost:5000/comments`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(commentData),
    });

    const data = await res.json();

    if (data._id) {
        revalidatePath("/users");
    }

    return data;
};

export const updateComment = async (commentId, updatedText) => {
    const res = await fetch(`http://localhost:5000/comments/${commentId}`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            text: updatedText,
        }),
    });

    const data = await res.json();
    if (data.modifiedCount > 0) {
        revalidatePath("/users");
    }
    return data;
};

export const deleteComment = async (commentId) => {
    const res = await fetch(`http://localhost:5000/comments/${commentId}`, {
        method: "DELETE",
    });
    const data = await res.json();

    if (data.deletedCount > 0) {
        revalidatePath("/users");
    }
    return data;
};

export const createIdea = async (formData) => {
    const newUser = Object.fromEntries(formData.entries());
    if (newUser.tags) {
        newUser.tags = newUser.tags.split(",").map((t) => t.trim());
    }

    const session = await auth.api.getSession({
        headers: await headers(),
    });
    const email = session?.user?.email ?? newUser.email;
    const ideaData = { ...newUser, email };

    const res = await fetch("http://localhost:5000/ideas", {
        method: "POST",
        headers: {
            "Content-type": "application/json",
        },

        body: JSON.stringify(ideaData),
    });
    const data = await res.json();

    if (data.insertedId) {
        revalidatePath("/ideas");
        revalidatePath("/users");
    }
    return data;
};
