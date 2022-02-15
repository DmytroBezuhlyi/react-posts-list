import React, { useEffect, useRef, useState } from "react";
import PostsService from "../API/PostsService";
import { getPageCount } from "../components/utils/pages";
import { usePosts } from "../hooks/usePosts";
import MyButton from "../components/UI/button/MyButton";
import PostForm from "../components/PostForm";
import MyModal from "../components/MyModal/MyModal";
import PostFilter from "../components/PostFilter";
import PostList from "../components/PostList";
import Pagination from "../components/UI/pagination/Pagination";
import { useFetching } from "../hooks/useFetching";
import Loader from "../components/UI/Loader/Loader";
import { useObserver } from "../hooks/useObserver";
import MySelect from "../components/UI/select/MySelect";

function Posts() {
  const [posts, setPosts] = useState([]);
  const [filter, setFilter] = useState({ sort: '', query: '' });
  const [modal, setModal] = useState(false);
  const [totalPages, setTotalPages] = useState(0);
  const [limit, setTotalLimit] = useState(10);
  const [page, setPage] = useState(1);
  const lastElement = useRef();

  const [fetchPosts, isPostsLoading, postError] = useFetching(async (limit, page) => {
    const response = await PostsService.getAll(limit, page);
    setPosts([...posts, ...response.data]);
    const totalCount = response.headers['x-total-count'];
    setTotalPages(getPageCount(totalCount, limit));
  })

  const sortedAndSearchedPosts = usePosts(posts, filter.sort, filter.query);

  useObserver(lastElement, page < totalPages, isPostsLoading, () => {
    setPage(page + 1);
  });

  useEffect(() => {
    console.log('page change - ' + page);
    fetchPosts(limit, page);
  }, [page, limit]);

  const createPost = (post) => {
    setPosts([...posts, post]);
    setModal(false);
  }

  const removePost = (postID) => {
    setPosts(posts.filter(post => post.id !== postID));
  }

  const changePage = (page) => {
    setPage(page);
  }

  return (
    <div className="App">
      <MyButton style={ { display: 'block', margin: '30px auto 0', } } onClick={ () => setModal(true) }>Create
        Post</MyButton>
      <MyModal visible={ modal } setVisible={ setModal }>
        <PostForm create={ createPost } />
      </MyModal>
      <hr style={ { margin: '15px 0' } } />
      <PostFilter filter={ filter } setFilter={ setFilter } />
      <MySelect
        defaultValue="Posts Per Page"
        options={ [
          { value: 5, name: '5' },
          { value: 10, name: '10' },
          { value: 25, name: '25' },
          { value: -1, name: 'Show All' },
        ] }
        value={ limit }
        onChange={ value => setTotalLimit(value) }
      />
      { postError &&
        <h1 style={ { margin: '30px auto', textAlign: 'center' } }>Error: { postError }</h1>
      }
      { isPostsLoading &&
        <div style={ { display: 'flex', justifyContent: 'center', marginTop: '50px' } }><Loader /></div>
      }
      {
        <PostList
          remove={ removePost }
          posts={ sortedAndSearchedPosts }
          title={ 'Posts List About All Programming Languages' }
        /> }
      <div ref={ lastElement } style={ { height: 20, background: 'red' } }></div>
      <Pagination
        page={ page }
        changePage={ changePage }
        totalPages={ totalPages }
      />
    </div>
  );
}

export default Posts;
