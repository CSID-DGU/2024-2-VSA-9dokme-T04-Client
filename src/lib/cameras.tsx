import React, { useState, useRef, useCallback } from "react";
import Webcam from "react-webcam";
import SendPhotoModal from "./sendPhotoModal";
import refreshBtn from "../images/refreshBtn.png";
import captureBtn from "../images/captureBtn.png";
import RedirectPdfModal from "../components/RegisterPdfModal";
import RegisterPdfModal from "../components/RegisterPdfModal";
import axios from "axios";
import { BASE_URL } from "../env";

const videoConstraints = {
  width: 400,
  height: 400,
  facingMode: "user",
};

const Camera: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isSubmitModalOpen, setIsSubmitModalOpen] = useState<boolean>(false);
  const [isExisted, setIsExisted] = useState<boolean>(true); // 책 존재 여부 상태
  const [bookInfo, setBookInfo] = useState<any | null>(null);

  const [url, setUrl] = useState<string | null>(null);
  const webcamRef = useRef<Webcam | null>(null);

  const handleOpenModal = () => setIsModalOpen(true);

  const capturePhoto = useCallback(() => {
    if (webcamRef.current) {
      const imageSrc = webcamRef.current.getScreenshot();
      if (imageSrc) {
        setUrl(imageSrc);
        console.log("url: ", imageSrc);

        // 이미지 다운로드 링크 생성 및 다운로드 실행
        const downloadLink = document.createElement("a");
        downloadLink.href = imageSrc;
        downloadLink.download = "captured_image.png"; // 다운로드 파일 이름 지정

        document.body.appendChild(downloadLink); // 링크를 문서에 추가
        downloadLink.click(); // 클릭 이벤트로 다운로드 실행
        document.body.removeChild(downloadLink); // 링크 요소 제거
      }
    }
  }, [webcamRef]);

  // const sendPhotoServer = async () => {
  //   setIsSubmitModalOpen(true);
  //   handleOpenModal();
  //   if (!url) return;

  //   const formData = new FormData();
  //   formData.append("image", url);
  //   console.log("Photo sent!");
  // };
  const sendPhotoServer = async () => {
    if (!url) return;

    try {
      // 이미지 데이터를 Blob 형태로 변환
      const blob = await fetch(url).then((res) => res.blob());

      const formData = new FormData();
      formData.append("file", "barcode.png"); // 이미지 파일 추가

      const response = await axios.post(
        `${BASE_URL}/api/barcode/extract`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data", // 반드시 form-data로 설정
          },
        }
      );

      // API 응답 처리
      if (response.data.bookId) {
        // 책이 존재할 경우
        setIsExisted(true);
        setBookInfo(response.data);
        console.log("Book Info: ", response.data);
      } else {
        // 책이 존재하지 않을 경우
        setIsExisted(false);
      }
      setIsSubmitModalOpen(true); // 결과 모달 열기
    } catch (error) {
      console.error("Failed to send photo to server", error);
    }
  };

  const handleCloseModal = () => {
    setIsSubmitModalOpen(false);
  };

  return (
    <div className="flex flex-col items-center mt-[5vw] h-screen bg-gray-100">
      <p>바코드 사진을 촬영하여 전송하세요!</p>
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
          className="fixed top-80 left-1/2 transform -translate-x-1/2 bg-white shadow-lg rounded-lg p-4 w-[90%] max-w-md"
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
              {isSubmitModalOpen && (
                <RegisterPdfModal
                  handleModalClose={handleCloseModal}
                  isExisted={isExisted}
                />
              )}
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
