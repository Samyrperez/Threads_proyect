import React from "react";

const SaveIcon = ({ size = 24, ...props }) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth="2"
        width={size}
        height={size}
        {...props}
    >
        <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M5 5v14l7-5 7 5V5z"
        />
    </svg>
);

export default SaveIcon;
