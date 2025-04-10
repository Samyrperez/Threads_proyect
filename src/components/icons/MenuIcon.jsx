const MenuIcon = ({ active }) => {

    return (
        <svg
            aria-label="Más"
            role="img"
            viewBox="0 0 24 24"
            className={`icon ${active ? "active" : ""}`}
            fill="currentColor"
            style={{ height: "24px", width: "24px" }}
        >
            <title>Más</title>
            <title>Menú</title>
            <rect y="4" width="24" height="2" rx="1" />
            <rect y="11" width="15" height="2" rx="1" />
            
        </svg>
    );
};

export default MenuIcon;
