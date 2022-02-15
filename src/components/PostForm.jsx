import React, { useState } from 'react';
import MyInput from "./UI/input/MyInput";
import MyButton from "./UI/button/MyButton";

const PostForm = ({ create }) => {
  const [post, setPost] = useState({ title: '', body: '' });

  const addNewPost = (ev) => {
    ev.preventDefault();
    const newPost = { ...post, id: Date.now() };
    create(newPost);
    setPost({ title: '', body: '' });
  }

  return (
    <form>
      <MyInput
        type="text"
        placeholder="Post Title"
        value={ post.title }
        onChange={ ev => setPost({ ...post, title: ev.target.value }) }
      />
      <MyInput
        type="text"
        placeholder="Post Description"
        value={ post.body }
        onChange={ ev => setPost({ ...post, body: ev.target.value }) }
      />
      <MyButton onClick={ addNewPost }>Create Post</MyButton>
    </form>
  );
};

export default PostForm;