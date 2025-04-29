
import ThreadsLogo from "./ThreadsLogo";

const LogoSplash = ({ onClick }) => {
    return (
        <div className="overlay" onClick={onClick}>
            <ThreadsLogo className="center-logo" />
        </div>
    );
};

export default LogoSplash;