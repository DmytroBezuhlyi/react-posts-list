import React, { useEffect, useState } from 'react';
import { useParams } from "react-router-dom";
import PostsService from "../API/PostsService";
import { useFetching } from "../hooks/useFetching";
import Loader from "../components/UI/Loader/Loader";

const PostIdPage = () => {
  const params = useParams();
  const [post, setPost] = useState({});
  const [comments, setComments] = useState([]);

  const [fetchPostByID, isLoading, error] = useFetching(async (id) => {
    const response = await PostsService.getByID(id);
    setPost(response.data);
  });
  const [fetchComments, isCommLoading, commError] = useFetching(async (id) => {
    const response = await PostsService.getComments(id);
    setComments(response.data)
  });

  useEffect(() => {
    fetchPostByID(params.id);
    fetchComments(params.id);
  }, [])

  return (
    <div>
      <h1>Post page id: { params.id }</h1>
      { isLoading
        ? <Loader />
        : <div>{ post.id } { post.title }</div>
      }
      <h1>Comments: </h1>
      { isCommLoading
        ? <Loader />
        : <div>
          { comments.map(comm =>
            <div style={ { marginTop: 15 } } key={comm.id}>
              <h5>{ comm.email }</h5>
              <div>{ comm.body  }</div>
            </div>)
          }
        </div> }
    </div>
  );
};

export default PostIdPage;