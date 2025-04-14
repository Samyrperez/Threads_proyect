const ImageIcon = ({ size = 20 }) => (
    <svg xmlns="http://www.w3.org/2000/svg" color = "#444" height={size} width={size} viewBox="0 0 24 24" fill="currentColor">
        <path d="M21 19V5H3v14h18zm0-16q.825 0 1.413.588Q23 4.175 23 5v14q0 .825-.587 1.412Q21.825 21 21 21H3q-.825 0-1.412-.588Q1 19.825 1 19V5q0-.825.588-1.412Q2.175 3 3 3h18zm-4.5 7.5q.825 0 1.413-.588.587-.587.587-1.412t-.587-1.412Q17.325 6 16.5 6t-1.412.588Q14.5 7.175 14.5 8t.588 1.412Q15.675 10.5 16.5 10.5zM5 17h14l-4.75-6.25-3.75 4.75L8 13z" />
    </svg>
);
export default ImageIcon;
