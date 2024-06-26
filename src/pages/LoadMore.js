import React, { useState, useEffect } from "react";
import { slice } from "lodash";
import { Helmet } from "react-helmet";

function LoadMore() {
  const [post, setPost] = useState([]);
  const [isCompleted, setIsCompleted] = useState(false);
  const [index, setIndex] = useState(15);
  const initialPosts = slice(post, 0, index);
  const getData = () => {
    fetch("https://jsonplaceholder.typicode.com/posts")
      .then((res) => res.json())
      .then((json) => setPost(json))
      .catch((e) => console.log(e));
  };
  console.log("initialPosts", initialPosts);
  const loadMore = () => {
    setIndex((prev)=> prev + 5);
    console.log('Index',index);
    if (index >= post.length) {
      setIsCompleted(true);
    } else {
      setIsCompleted(false);
    }
  };
  useEffect(() => {
    getData();

    // const handleScroll = () => {
    //   // console.log(window.innerHeight, window.scrollY, document.body.offsetHeight);
    //   if (
    //     window.innerHeight + window.scrollY >= document.body.offsetHeight
    //     ) {
    //       loadMore();
    //   }
    // };
  
    // window.addEventListener('scroll', handleScroll);
    // return () => {
    //   window.removeEventListener('scroll', handleScroll);
    // };

  }, []);
  return (
    <div className="row">
      <Helmet>
        <title>LoadMore</title>
      </Helmet>
      
      <h2 className='mb-3'>React Js Load More Example</h2>
      {initialPosts.map((item) => {
        return (
          <div
            className='mb-3 card bg-primary p-2 text-dark bg-opacity-25'
            key={item.id}
          >
            <div className='card-body'>{item.title}</div>
          </div>
        );
      })}
      <div className='d-grid mt-3 mb-5'>
        {isCompleted ? (
          <button
            onClick={loadMore}
            type='button'
            className='btn btn-danger disabled'
          >
            That's It
          </button>
        ) : (
          <button onClick={loadMore} type='button' className='btn btn-danger'>
            Load More +
          </button>
        )}
      </div>
    </div>
  );
}
export default LoadMore;
