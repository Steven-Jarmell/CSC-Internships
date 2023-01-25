import { createPortal } from "react-dom";
import "../../styles/Modal.css";

type Props = {
    toggleModal: React.Dispatch<React.SetStateAction<boolean>>;
    content: JSX.Element;
};

const Modal = ({ toggleModal, content }: Props) => {
    const closeModal = (
        e:
            | React.MouseEvent<HTMLDivElement>
            | React.MouseEvent<HTMLButtonElement>
    ) => {
        toggleModal(false);
    };

    return createPortal(
        <div className="modal-container" onClick={closeModal}>
            <div
                className="modal"
                onClick={(e: React.MouseEvent<HTMLDivElement>) => {
                    // do not close modal if anything inside modal content is clicked
                    e.stopPropagation();
                }}
            >
                {content}
                <button className="modal-button" onClick={closeModal}>
                    X
                </button>
            </div>
        </div>,
        document.getElementById("modal-location")!
    );
};

export default Modal;
