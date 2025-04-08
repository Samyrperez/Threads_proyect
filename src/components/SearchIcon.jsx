const SearchIcon = ({ active }) => {
    return (
        <svg
            className={active ? "icon active" : "icon"}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            aria-label="Buscar"
            role="img"
        >
            <path
                fill="currentColor"
                d="M10 2a8 8 0 105.293 14.293l4.707 4.707 1.414-1.414-4.707-4.707A8 8 0 0010 2zm0 2a6 6 0 110 12 6 6 0 010-12z"
            />
        </svg>
    );
};

export default SearchIcon;
