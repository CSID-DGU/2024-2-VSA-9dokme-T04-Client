import Modal from "react-modal";
import React from "react";
import "../../app/sendPhotoModal.css";

type SendPhotoModalProps = {
  isModalOpen: boolean;
  setIsModalOpen: (isOpen: boolean) => void;
};

const SendPhotoModal: React.FC<SendPhotoModalProps> = ({
  isModalOpen,
  setIsModalOpen,
}) => {
  const handleCloseModal = () => {
    setIsModalOpen(false);
  };
  return (
    <div className="full_container">
      <Modal
        ariaHideApp={false}
        isOpen={isModalOpen}
        className="absolute top-1/4 left-1/8 max-h-[60vw] rounded-[2vw] flex items-center bg-white p-6"
      >
        <div className="xbutton">
          <button
            id="xbutton"
            onClick={() => {
              handleCloseModal();
            }}
          >
            X
          </button>
        </div>
        <div className="middle">
          <img
            style={{ width: "40vw" }}
            src="https://img.freepik.com/free-psd/barcode-illustration-isolated_23-2150584094.jpg?size=626&ext=jpg"
            alt="barcode"
          />
          <div className="text">
            <b>바코드 사진이 전송되었습니다.</b>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default SendPhotoModal;
