import React from 'react'

function CommentShow({comment , onDeleteComment , onEditComment}) {


  const handleDelete = () => {
    onDeleteComment(comment.id)
  }


  return (
    <div>
      <div>
         {comment.text}
         <button onClick={handleDelete}>Delete</button>
         <button>Edit</button>
      </div>
    </div>
  )
}

export default CommentShow;