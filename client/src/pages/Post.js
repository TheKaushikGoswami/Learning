import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

function Post() {
    let { id } = useParams();
    const [post, setPost] = useState({});

    useEffect(() => {
        axios.get('http://localhost:3001/posts/' + id).then((res) => {
            setPost(res.data);
        });
    });

    return (
        <div>
            <div className='postPage'>
                <div className='post'>
                    <div className='title'>{post.title}</div>
                    <div className='content'>{post.content}</div>
                    <div className='author'>- {post.username}</div>
                </div>
                <div className='comments'>
                    Comment Section
                </div>
            </div>
        </div>
    )
}

export default Post
