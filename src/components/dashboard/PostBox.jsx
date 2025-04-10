import React, { useState } from 'react';
import '../../css/post_box.css';

const PostBox = ({ user }) => {
    const [text, setText] = useState('');

    const handlePost = () => {
        if (text.trim() !== '') {
            console.log('Post enviado:', text);
            setText('');
        }
    };

    return (
        <div className="post-box">
            <div className="post-box-header">
                <img src={user?.avatar || 'https://i.pravatar.cc/150'} alt="Avatar" className="avatar" />
                <input
                    placeholder="¿Qué hay de nuevo?"
                    value={text}
                    readOnly
                    onChange={(e) => setText(e.target.value)}
                />
            </div>
            <div className="post-box-actions">
                <button onClick={handlePost}>Publicar</button>
            </div>
        </div>
    );
};

export default PostBox;
