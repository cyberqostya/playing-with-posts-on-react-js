import { useState, useRef, useMemo, useEffect } from 'react';
import React from 'react';
import PostList from '../components/PostList';
import PostForm from '../components/PostForm';
import PostFilter from '../components/PostFilter';
import MyModal from '../components/UI/modal/MyModal';
import MyButton from '../components/UI/button/MyButton';
import { usePosts } from '../hooks/usePosts';
import PostService from '../API/PostService';
import MyLoader from '../components/UI/loader/MyLoader';
import { useFetching } from '../hooks/useFetching';
import { getPageCount, getPagesArray } from '../utils/pages';
import Pagination from '../components/UI/pagination/Pagination';
import useObserver from '../hooks/useObserver';
import MySelect from '../components/UI/select/MySelect';

const Posts = () => {

  const [posts, setPosts] = useState([]);
  const [modal, setModal] = useState(false);
  const [filter, setFilter] = useState({ sort: '', query: '' });
  const [totalPages, setTotalPages] = useState(0);
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(1);
  const sortedAndSearchedPosts = usePosts(posts, filter.sort, filter.query);
  const lastElement = useRef();

  const [fetchPosts, isPostsLoading, postError] = useFetching(async (limit, page) => {
    const response = await PostService.getAll(limit, page);
    setPosts([...posts, ...response.data]);
    const totalCount = response.headers['x-total-count'];
    setTotalPages(getPageCount(totalCount, limit));
  });

  useObserver(lastElement, page < totalPages, isPostsLoading, () => {
    setPage(page + 1);
  });

  useEffect(() => {
    fetchPosts(limit, page);
  }, [page, limit]);

  const createPost = (newPost) => { 
    setPosts([...posts, newPost]);
    setModal(false); 
  };
  const removePost = (post) => { setPosts(posts.filter(item => item.id !== post.id )) };

  const changePage = (page) => { 
    setPage(page);
  }



  return (
    <section className="App">
      <MyButton style={{marginTop: 30}} onClick={() => setModal(true)}>
        Add post
      </MyButton>

      <MyModal visible={modal} setVisible={setModal}>
        <PostForm create={createPost} />
      </MyModal>

      <hr style={{margin: '15px 0'}} />

      <PostFilter filter={filter} setFilter={setFilter} />

      <MySelect
        value={limit}
        onChange={value => setLimit(value)}
        defaultValue='Posts on page'
        options={[
          {value:5, name:'5'},
          {value:10, name:'10'},
          {value:25, name:'25'},
          {value:-1, name:'all'},
        ]}
      />

      {postError && <h1>Error! Look at this: {postError}</h1>}

      <PostList posts={sortedAndSearchedPosts} title={'Posts list'} remove={removePost} /> 
      <div ref={lastElement} style={{height: 20, backgroundColor: 'red'}} />
      {isPostsLoading &&
        <div style={{display: 'flex', justifyContent: 'center', marginTop: 50}}><MyLoader /></div>
      }

      <Pagination 
        page={page} 
        changePage={changePage} 
        totalPages={totalPages} 
      />
      
    </section>
  );
};

export default Posts;
