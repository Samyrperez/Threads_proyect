// Para el botón “Publicar”
import "../../../Tabs/TabHilos/ModalHilo.css";
const ModalFooter = ({ onPublicar }) => (
    <div className="modal-footer">
        <p>Cualquiera puede responder y citar</p>
        <button className="btn-publicar" onClick={onPublicar}>
            Publicar
        </button>
    </div>
);

export default ModalFooter;
