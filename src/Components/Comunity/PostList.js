import React, { useEffect, useState } from 'react'
import axios from "axios";
import PostShow from './PostShow'
function PostList() {
  const [text, setText] = useState('')
  const [posts, setPosts] = useState([])

  const handleChange = (e) => {
    setText(e.target.value)
  }


  useEffect(() => {
    axios.get(`http://localhost:3002/posts`)
    .then((response) => {
      setPosts(response.data)
    })
  }, [])
  
  const handleSubmit = async (e) => {
    e.preventDefault()
    const response  = await axios.post(`http://localhost:3002/posts` , {
      text,
      comments: []
    })
    console.log(response.data)

    setPosts([...posts, response.data]);
    setText("");
  } 

  //Delete: 
  const handleDelete = async(id) => {
    await axios.delete(`http://localhost:3002/posts/${id}`);
    const updatedPosts = posts.filter((el) => {
      return id !== el.id
    })

    setPosts(updatedPosts);
  }

  // el = { text, id: Math.round(Math.random()*9999) }
  const PostsArr = posts.map((el) => {
    return(
      <PostShow post={el} onDelete={handleDelete} />
    )
  })
  //postsArr = [<div>{el.text}</div> ,<div>{el.text}</div> , <div>{el.text}</div> ]


  
  

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <textarea
          value={text}
          onChange={handleChange}
          placeholder="Add your post"
        ></textarea>
        <button>Add Post</button>
      </form>
      {PostsArr}
    </div>
  )
}

export default PostList
