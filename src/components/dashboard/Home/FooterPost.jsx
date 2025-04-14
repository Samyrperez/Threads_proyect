// src/components/icons/FooterPost.jsx
import React, { useState } from "react";
import HeartIcon from "../icons/HeartIcon";
// import CommentIcon from "../icons/CommentIcon";
// import ShareIcon from "../icons/ShareIcon";
import SaveIcon from "../icons/SaveIcon"; // Los agregamos luego

const FooterPost = ({ likes, respuestas, compartidos, guardados }) => {
    const [liked, setLiked] = useState(false);
    const [saved, setSaved] = useState(false);

    return (
        <div className="post-footer" style={{ display: 'flex', gap: '12px' }}>
            <span onClick={() => setLiked(!liked)} style={{ cursor: "pointer", display: 'flex', alignItems: 'center', gap: '4px' }}>
                <HeartIcon filled={liked} />
                <span>{liked ? likes + 1 : likes}</span>
            </span>

            <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                💬 <span>{respuestas}</span>
            </span>

            <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                🔁 <span>{compartidos}</span>
            </span>

            <span onClick={() => setSaved(!saved)} style={{ cursor: "pointer", display: 'flex', alignItems: 'center', gap: '4px' }}>
                {saved ? '🔖' : '📑'} <span>{guardados}</span>
            </span>
        </div>
    );
};

export default FooterPost;
