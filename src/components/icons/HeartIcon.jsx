const HeartIcon = ({ size = 20, color = 'currentColor', className = '' }) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={className}
    >
        <path d="M12 21s-6.716-4.658-9.264-8.36C1.176 9.484 3.22 5 7.5 5c2.014 0 3.538 1.538 4.5 3 0.962-1.462 2.486-3 4.5-3 4.28 0 6.324 4.484 4.764 7.64C18.716 16.342 12 21 12 21z" />
    </svg>
);
export default HeartIcon;