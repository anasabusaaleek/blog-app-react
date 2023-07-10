import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { v4 as uuidv4 } from 'uuid';
import CommentShow from './CommentShow'

function PostShow({ post, onDelete }) {
  const [text, setText] = useState('')
  const [commentsArr, setCommentsArr] = useState([])


  useEffect(() => {
    axios.
    get(`http://localhost:3002/posts/${post.id}`)
    .then((response) => {
        setCommentsArr(response.data.comments)
    } )
  }, [])



  const handleDelete = () => {
    onDelete(post.id)
  }

  const handleChange = (e) => {
    setText(e.target.value)
  }

  //const Arr = [1 , 2 , 3 , 4] >>
  //const Arr1 = [...Arr , 22 , 11] >>> Arr1 = [1 , 2 , 3 , 4 , 22 , 11 ]

  const handleSubmit = async (e) => {
    e.preventDefault()
    const response = await axios.patch(
      `http://localhost:3002/posts/${post.id}`,
      {
        comments: [...commentsArr, { text, commentId: uuidv4() }],
      }
    )
    const newComment = response.data.comments
    setCommentsArr(newComment);
    setText('')
  }


  //Delete Comments: 
  const handleDeleteComment = (id) => {
    const filteredCommentsArr = commentsArr.filter((el) => {
        return el.id !== id
    })
  } 
aklmelfa
  //Edit comments: 
  const handleEditComment = () => {

  }

  const newCommentsArr = commentsArr.map((el , index) => {
    return(
        <CommentShow key={index} comment={el}  onDeleteComment={handleDeleteComment} onEditComment={handleEditComment}/>
    )
  })

  console.log(text)
  return (
    <div
      style={{
        border: 'solid red 1px',
        padding: '2em 1em',
        marginBottom: '2em',
      }}
    >
      <div>
        {post.text}
        <button onClick={handleDelete}>Delete</button>
      </div>
      <form onSubmit={handleSubmit}>
        <input
          onChange={handleChange}
          value={text}
          placeholder="enter your comment"
        />
        <button>Add comment</button>
      </form>
      {newCommentsArr}
    </div>
  )
}

export default PostShow
