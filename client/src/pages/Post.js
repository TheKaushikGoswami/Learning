import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

function Post() {
    let { id } = useParams();
    const [post, setPost] = useState({});
    const [comments, setComments] = useState([]);
    const [comment, setComment] = useState('');

    useEffect(() => {
        axios.get('http://localhost:3001/posts/' + id).then((res) => {
            setPost(res.data);
        });

        axios.get('http://localhost:3001/comments/' + id).then((res) => {
            setComments(res.data);
        });
    }, []);

    const addComment = () => {
        axios.post('http://localhost:3001/comments',
        {
            comment: comment,
            PostId: id
        },
        {
            headers: 
            {
                accessToken: sessionStorage.getItem('accessToken')
            }
        }

        ).then((res) => {
            if (res.data.error) {
                alert(res.data.error);
            }
            else{
                const newComment = { comment: comment };
                setComments([...comments, newComment]);
                setComment('');
            }
        });
    }

    return (
        <div>
            <div className='postPage'>
                <div className='postitem'>
                    <div className='title'>{post.title}</div>
                    <div className='content'>{post.content}</div>
                    <div className='author'>- {post.username}</div>
                </div>
                <div className='comments'>
                    <div className='addComment'>
                        <input type='text' placeholder='Add a comment' value={comment} onChange={(event) => {
                            setComment(event.target.value);
                        }} />
                        <button onClick={addComment}>Submit</button>
                    </div>
                    <div className='commentList'>
                        {
                            comments.map((comment, key) => {
                                return (
                                    <div key={key} className='comment'>
                                        <div className='comment-content'>{comment.comment}</div>
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Post
