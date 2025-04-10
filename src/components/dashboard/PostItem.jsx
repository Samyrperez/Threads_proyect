import React from 'react';
import '../../css/post_item.css';
import { HeartIcon, CommentIcon, RepostIcon, MessageIcon } from '../icons';


const PostItem = ({ avatar, username, time, text, media, likes, comments, reposts, stats }) => {
    return (
        <div className="post-item">
            <div className="post-avatar">
                <img src={avatar} alt="Avatar" />
            </div>
            <div className="post-content">
                <div className="post-header">
                    <span className="username">@{username}</span>
                    <span className="time">· {time}</span>
                </div>
                <p className="post-text">{text}</p>
                {media && (
                    <div className="post-media">
                        <img src={media} alt="media" />
                    </div>
                )}
                <div className="post-actions">
                <span><HeartIcon size={18} color="#fff" /> {likes}</span>
                    <span><CommentIcon size={18} color="#fff" /> {comments}</span>
                    <span><RepostIcon size={18} color="#fff" /> {reposts}</span>
                    <span><MessageIcon size={18} color="#fff" /> {stats}</span>
                </div>
            </div>
        </div>
    );
};

export default PostItem;
