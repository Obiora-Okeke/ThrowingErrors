import React, { useState, useEffect } from 'react';
import { getComments } from '../../services/recipeService';

const CommentSection = ({ recipeId }) => {
  const [comments, setComments] = useState([]);

  useEffect(() => {
    getComments(recipeId).then(setComments);
  }, [recipeId]);


  return (
    <div className="comment-section">
      <h3>Comments</h3>
      {comments.map(c => (
        <div key={c.id} className="comment">
          <strong>{c.author}</strong>: {c.text}
        </div>
      ))}
    </div>
  );
};

export default CommentSection;
