import React from 'react';
import PostItem from "./PostItem";
import { CSSTransition, TransitionGroup } from "react-transition-group";

const PostList = ({ posts, title, remove }) => {
  if (!posts.length) {
    return (
      <h1 style={ { textAlign: 'center' } }>
        There's no Posts
      </h1>
    )
  }

  return (
    <div>
      <h1 style={ { textAlign: 'center' } }>{ title }</h1>
      <TransitionGroup>
        { posts.map((post, idx) =>
          <CSSTransition
            key={ post.id }
            timeout={ 500 }
            className="post"
          >
            <PostItem
              remove={ remove }
              post={ post }
              number={ idx + 1 }
              key={ post.id }
            />
          </CSSTransition>
        ) }
      </TransitionGroup>
    </div>
  );
};

export default PostList;