const ProfileIcon = ({ active }) => {
    return (
        <svg
            className={active ? "icon active" : "icon"}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            aria-label="Perfil"
            role="img"
        >
            <path
                fill="currentColor"
                d="M12 12c2.7 0 4.8-2.1 4.8-4.8S14.7 2.4 12 2.4 
             7.2 4.5 7.2 7.2 9.3 12 12 12zm0 
             2.4c-3.2 0-9.6 1.6-9.6 4.8V22h19.2v-2.8c0-3.2-6.4-4.8-9.6-4.8z"
            />
        </svg>
    );
};

export default ProfileIcon;
