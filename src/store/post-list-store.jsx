import React, { createContext, useReducer } from "react";

const DEFAULT_POST_LIST = [
  {
    id: "1",
    title: "Going to Mumbai!✈✈",
    body: "Hi Friends, I am going to Mumbai for my vacations. Hope to enjoy a lot Peace out...🧳⛺🥾",
    reactions: 2,
    userId: "user-9",
    tags: ["vacation", "Mumbai", "Enjoying"],
  },
  {
    id: "2",
    title: "Pass Ho Gya!✅✅✅",
    body: "4 Saal ki Masti k baad Pass ho gya finally...😁🥳🥳",
    reactions: 15,
    userId: "user-12",
    tags: ["Graduating", "Unbelievable"],
  },
];

const DEFAULT_CONTEXT = {
  postList: DEFAULT_POST_LIST, // Initialize postList with DEFAULT_POST_LIST
  addPost: () => {},
  deletePost: () => {},
};

export const PostListContext = createContext(DEFAULT_CONTEXT);

const postListReducer = (currPostList, action) => {
  let newPostList = currPostList; // Fix variable name
  if(action.type ==="DELETE_POST"){
    newPostList = currPostList.filter(
        (post) => post.id !== action.payload.postId
    );

  }else if(action.type === "ADD_POST"){
    newPostList = [action.payload, ...currPostList]
  }
  return newPostList;
};

const PostListProvider = ({ children }) => {
  const [postList, dispatchPostList] = useReducer(
    postListReducer,
    DEFAULT_POST_LIST
  );

  const addPost = (userId, postTitle,postBody, reactions, tags) => {
dispatchPostList({
    type:'ADD_POST',
    payload:{
        id:Date.now(),
        title:postTitle,
        body:postBody,
        reactions: reactions,
        userId: userId,
        tags: tags,
    }
})
}; // Define addPost function if needed

  const deletePost = (postId) => { 
    dispatchPostList({
      type: "DELETE_POST",
      payload: {
        postId,
      },
    });
  };

  return (
    <PostListContext.Provider value={{ postList, addPost, deletePost }}>
      {children}
    </PostListContext.Provider>
  );
};

export default PostListProvider;
