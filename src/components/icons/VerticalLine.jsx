const VerticalLine = ({ className, color = "#555" }) => (
    <svg
        className={className}
        width="1"
        height="100%"        // ⚠️ Cambia esto si estaba fijo (como "30")
        viewBox="0 0 2 100"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="none"
    >
        <line x1="1" y1="0" x2="1" y2="100" stroke={color} strokeWidth="2" />
    </svg>
);

export default VerticalLine;
