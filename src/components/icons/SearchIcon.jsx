const SearchIcon = ({ size = 24, color = "currentColor", className = "", active = false }) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke={active ? "#ffffff" : color}
        className={`icon ${active ? "active" : ""} ${className}`} // ✔️ esto le da tamaño por defecto
        width={size}
        height={size}
    >
        <path
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="currentColor"
            d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 104.5 4.5a7.5 7.5 0 0012.15 12.15z"
        />
    </svg>
);

export default SearchIcon;