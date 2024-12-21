import React, { useState, useEffect, useRef, useCallback } from "react";
import Webcam from "react-webcam";
import SendPhotoModal from "./sendPhotoModal";
import API from "../api/axios";
import refreshBtn from "../images/refreshBtn.png";
import captureBtn from "../images/captureBtn.png";

const videoConstraints = {
  width: 400,
  height: 400,
  facingMode: "user",
};

const Camera: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [url, setUrl] = useState<string | null>(null);
  const webcamRef = useRef<Webcam | null>(null);

  const handleOpenModal = () => setIsModalOpen(true);

  const capturePhoto = useCallback(() => {
    if (webcamRef.current) {
      const imageSrc = webcamRef.current.getScreenshot();
      if (imageSrc) {
        setUrl(imageSrc);
      }
    }
  }, [webcamRef]);

  const sendPhotoServer = async () => {
    handleOpenModal();
    if (!url) return;

    const formData = new FormData();
    formData.append("image", url);
    console.log("Photo sent!");
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <div className="w-[80%] max-w-md aspect-square bg-black rounded-md overflow-hidden shadow-lg">
        <Webcam
          ref={webcamRef}
          audio={false}
          screenshotFormat="image/png"
          videoConstraints={videoConstraints}
          className="w-full h-full object-cover"
        />
      </div>

      <div className="mt-6">
        <button
          onClick={capturePhoto}
          className="flex items-center px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 shadow-md"
        >
          <img src={captureBtn} alt="Capture" className="w-6 h-6 mr-2" />
          사진 촬영
        </button>
      </div>

      {url && (
        <div
          id="screenShot"
          className="fixed bottom-4 left-1/2 transform -translate-x-1/2 bg-white shadow-lg rounded-lg p-4 w-[90%] max-w-md"
        >
          <div className="flex flex-col items-center gap-4">
            <img
              src={url}
              alt="ScreenShot"
              className="w-full max-h-48 object-contain rounded-md"
            />
            <div className="flex justify-between w-full">
              <button
                onClick={sendPhotoServer}
                className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
              >
                ✓ 전송하기
              </button>
              <button
                onClick={() => setUrl(null)}
                className="flex items-center gap-2 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
              >
                <img src={refreshBtn} alt="Refresh" className="w-4 h-4" />
                다시 찍기
              </button>
            </div>
          </div>
        </div>
      )}
      {/**전송 완료창 모달 */}
      <SendPhotoModal
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
      />
    </div>
  );
};

export default Camera;
