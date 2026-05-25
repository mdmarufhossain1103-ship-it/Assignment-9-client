'use client';
import { createComment, deleteComment, getCommentsByIdeaId, updateComment } from '@/lib/data';
import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';

const CommentSection = ({ ideaId,session }) => {
    const [comments,setComments] = useState([]);
    const [newCommentText, setNewCommentText] = useState('');
    const [loading,setLoading] = useState(true);
    const [editingCommentId, setEditingCommentId] = useState(null);
    const [editText,setEditText] = useState('');
    useEffect(() =>{
        if (!ideaId) return;
        const fetchComments = async() =>{
            try{
                setLoading(true)
                const data = await getCommentsByIdeaId(ideaId);
                setComments(data);
            } catch(error){
                console.error('Error fetching comments: ', error);
            } finally {
                setLoading(false);
            }
        };
        fetchComments();
    },[ideaId]);


    const handleAddComment = async (e) => {

        e.preventDefault();

        if (!newCommentText.trim() ) return;

        try {

            const commentData = {
                ideaId,
                userName: session?.user?.name,
                email: session?.user?.email,
                text: newCommentText
            };

            const createdComment = await createComment(commentData);

            setComments([createdComment, ...comments]);

            setNewCommentText('');

            toast.success('Comment added successfully');

        } catch (error) {

            console.error('Error creating comment:', error);
            toast.error('Failed to post comment');

        }
    };

    const startEditing = (comment) =>{
        setEditingCommentId(comment._id);
        setEditText(comment.text);
    }

    const handleSaveEdit = async(id) =>{
        if(!editText.trim()) return;

        try {
            const result = await updateComment(id,editText);
            if (result.modifiedCount > 0){
                setComments(
                    comments.map(comment =>
                        comment._id === id
                        ?{
                            ...comment,
                            text: editText,
                            isEdited: true
                        }
                        : comment
                    )
                );
                setEditingCommentId(null);
                setEditText('');
                toast.success("Comment updated");
            }
        } catch (error) {
            console.error("Error updating comment:",error);
        }
    };
    const handleDeleteComment = async (id) => {

        const confirmDelete = confirm(
            "Are you sure you want to delete this comment?"
        );

        if (!confirmDelete) return;

        try {

            const result = await deleteComment(id);

            if (result.deletedCount > 0) {

                setComments(
                    comments.filter(comment => comment._id !== id)
                );

                toast.success('Comment deleted');
            }

        } catch (error) {

            console.error("Error deleting comment:", error);

        }
    };
    const formatDate = (dateString) =>{
        if (!dateString) return 'Just now';
        const date = new Date(dateString);

        return date.toLocaleDateString(undefined,{
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };


    return (
        <div>

            <div className="bg-white dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800/80 rounded-3xl p-6 md:p-8 shadow-[0_8px_30px_rgb(0,0,0,0.03)] space-y-6">

                <h2 className="text-lg font-bold text-white dark:text-white flex items-center gap-2">
                    💬 Discussion ({comments.length})
                </h2>

                <form
                    onSubmit={handleAddComment}
                    className="space-y-3 bg-zinc-50/50 dark:bg-zinc-800/20 p-4 rounded-2xl border border-zinc-100 dark:border-zinc-800/60"
                >

                    <p className="text-xs font-bold uppercase tracking-wider text-zinc-400">
                        Join the discussion
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3">

                        {/* <input
                            type="text"
                            placeholder="Your Name"
                            value={authorName}
                            onChange={(e) => setAuthorName(e.target.value)}
                            className="md:col-span-1 px-4 py-2.5 rounded-xl text-sm border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all"
                            required
                        /> */}

                        <input
                            type="text"
                            placeholder="Add your feedback, critique, or questions..."
                            value={newCommentText}
                            onChange={(e) => setNewCommentText(e.target.value)}
                            className="md:col-span-2 px-4 py-2.5 rounded-xl text-sm border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all"
                            required
                        />
                    </div>

                    <div className="flex justify-end">

                        <button
                            type="submit"
                            className="px-5 py-2 rounded-xl bg-zinc-950 hover:bg-zinc-800 dark:bg-zinc-50 dark:hover:bg-zinc-200 text-white dark:text-zinc-950 font-medium text-xs tracking-wide transition-colors shadow-sm"
                        >
                            Post Comment
                        </button>
                    </div>
                </form>

                <div className="divide-y divide-zinc-100 dark:divide-zinc-800/60 space-y-4 pt-2">

                    {loading ? (

                        <p className="text-center text-sm text-zinc-400">
                            Loading comments...
                        </p>

                    ) : comments.length === 0 ? (

                        <p className="text-sm text-zinc-400 text-center py-6">
                            No comments posted yet. Be the first to share your thoughts!
                        </p>

                    ) : (

                        comments.map((comment,index) => (

                            <div
                                key={index}
                                className="pt-4 first:pt-0 flex flex-col gap-2 group"
                            >

                                <div className="flex items-center justify-between">

                                    <div className="flex items-baseline gap-2">

                                        <span className="text-sm font-bold text-zinc-800 dark:text-zinc-200">
                                            {comment.userName}
                                        </span>

                                        <span className="text-[11px] text-zinc-400 font-medium">
                                            {formatDate(comment.createdAt)}
                                        </span>

                                        {comment.isEdited && (
                                            <span className="text-[10px] text-indigo-500">
                                                (edited)
                                            </span>
                                        )}
                                    </div>

                                    <div className="flex items-center gap-3 opacity-100 md:opacity-0 group-hover:opacity-100 transition-opacity">

                                        {editingCommentId !== comment._id && (
                                            <>
                                                <button
                                                    onClick={() => startEditing(comment)}
                                                    className="text-xs font-semibold text-zinc-500 hover:text-indigo-600 transition-colors"
                                                >
                                                    Edit
                                                </button>

                                                <button
                                                    onClick={() => handleDeleteComment(comment._id)}
                                                    className="text-xs font-semibold text-zinc-400 hover:text-red-500 transition-colors"
                                                >
                                                    Delete
                                                </button>
                                            </>
                                        )}
                                    </div>
                                </div>

                                {editingCommentId === comment._id ? (

                                    <div className="flex flex-col sm:flex-row gap-2 mt-1">

                                        <input
                                            type="text"
                                            value={editText}
                                            onChange={(e) => setEditText(e.target.value)}
                                            className="flex-1 px-3 py-1.5 rounded-xl text-sm border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                                            autoFocus
                                        />

                                        <div className="flex items-center gap-1.5 self-end sm:self-center">

                                            <button
                                                onClick={() => handleSaveEdit(comment._id)}
                                                className="px-3 py-1.5 rounded-lg bg-indigo-600 text-white font-medium text-xs hover:bg-indigo-700 transition-colors"
                                            >
                                                Save
                                            </button>

                                            <button
                                                onClick={() => setEditingCommentId(null)}
                                                className="px-3 py-1.5 rounded-lg bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 font-medium text-xs hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-colors"
                                            >
                                                Cancel
                                            </button>
                                        </div>
                                    </div>

                                ) : (

                                    <p className="text-sm leading-relaxed text-zinc-600 dark:text-zinc-400 pl-0.5">
                                        {comment.text}
                                    </p>
                                )}
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
};

export default CommentSection;