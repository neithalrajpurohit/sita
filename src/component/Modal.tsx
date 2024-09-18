import { ReactElement } from "react";
import Modal from "react-bootstrap/Modal";
import { ModalCloseButton } from "./GlobalComponentStyles";
import { HiOutlineXMark } from "react-icons/hi2";

interface ICustomModalProps {
  onHide: () => void;
  show: boolean;
  modalTitle?: string;
  modalBody: ReactElement;
  modalFooter?: ReactElement;
  dialogClassName?: any;
  size?: any;
  centered?: boolean;
  showCloseBtn?: boolean;
}

const CustomModal = (props: ICustomModalProps) => {
  return (
    <Modal
      onHide={props.onHide}
      show={props.show}
      dialogClassName={props.dialogClassName}
      size={props?.size}
      aria-labelledby="contained-modal-title-vcenter"
      centered={props.centered ?? true}
      className="special-modal"
    >
      <Modal.Header className="border-0 modalHeader" closeButton={false}>
        <Modal.Title id="contained-modal-title-vcenter ">
          {props.modalTitle}
        </Modal.Title>
        {props.showCloseBtn && (
          <ModalCloseButton>
            <button onClick={props.onHide}>
              <HiOutlineXMark fontSize="1rem" color="inherent" />
            </button>
          </ModalCloseButton>
        )}
      </Modal.Header>
      <Modal.Body className="">{props.modalBody}</Modal.Body>
      <Modal.Footer className="border-0">{props.modalFooter}</Modal.Footer>
    </Modal>
  );
};

export default CustomModal;
