import "../css/styles_dashboard.css";
import AddIcon from "../dashboard/components/icons/AddIcon"; // ajustá la ruta si estás en otra carpeta


const BtnFloating = () => {
    return (
        <div className="container-btnFloating">
            <button className="btn-floating">
                <a href="">
                    <AddIcon/>
                </a>
            </button>
        </div>
    );
}

export default BtnFloating;