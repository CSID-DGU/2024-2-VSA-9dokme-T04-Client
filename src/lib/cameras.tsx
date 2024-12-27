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
  const [isExisted, setIsExisted] = useState<boolean>(false); // 책 존재 여부 상태
  const [bookInfo, setBookInfo] = useState<any | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isValidBarcode, setIsValidBarcode] = useState<boolean>(false);

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

  const handleCloseModal = () => {
    setIsSubmitModalOpen(false);
  };
  const bringPhoto = () => {
    const fileInput = document.createElement("input");
    fileInput.type = "file";
    fileInput.accept = "image/*"; // 이미지 파일만 허용
    fileInput.onchange = (event) => {
      const file = (event.target as HTMLInputElement).files?.[0];
      if (!file) return;

      const reader = new FileReader();
      reader.onload = () => {
        if (reader.result && typeof reader.result === "string") {
          setUrl(reader.result); // 이미지 미리보기
        }
      };
      reader.readAsDataURL(file);

      setSelectedFile(file); // 선택된 파일을 상태로 저장
      setIsSubmitModalOpen(true); // 전송 모달 열기
    };
    fileInput.click();
  };

  const sendPhotoServer = async () => {
    if (!selectedFile && !url) return;

    try {
      const formData = new FormData();

      if (selectedFile) {
        // 선택된 파일 전송
        formData.append("file", selectedFile);
      } else if (url) {
        // 캡처된 이미지를 전송
        const blob = await fetch(url).then((res) => res.blob());
        const file = new File([blob], "captured_image.png", {
          type: blob.type,
        });
        formData.append("file", file);
      }

      const response = await axios.post(
        `${BASE_URL}/api/barcode/extract`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          validateStatus: (status) => true,
        }
      );
      console.log("response: ", response);

      if (response.status === 200) {
        setIsExisted(true);
        setBookInfo(response.data);
        setIsValidBarcode(true);
      } else {
        setIsExisted(false);
        setBookInfo(response.data);
        setIsValidBarcode(true);
      }

      console.log("Book Info: ", response);
      setIsSubmitModalOpen(true); // 결과 모달 열기
    } catch (error) {
      setIsValidBarcode(false);
      console.error("Failed to send photo to server", error);
      alert("바코드를 인식할 수 없습니다. 다시 시도해주세요. 📸");
    }
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

      <div className="mt-6 flex flex-row gap-4">
        <button
          onClick={capturePhoto}
          className="flex items-center px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 shadow-md"
        >
          <img src={captureBtn} alt="Capture" className="w-6 h-6 mr-2" />
          사진 촬영
        </button>
        <button
          onClick={bringPhoto}
          className="flex items-center px-4 py-2 bg-green-400 text-white rounded-lg hover:bg-green-600 shadow-md"
        >
          사진 불러오기
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
              {isSubmitModalOpen && isValidBarcode && (
                <RegisterPdfModal
                  handleModalClose={handleCloseModal}
                  isExisted={isExisted}
                  bookId={bookInfo?.bookId || 0}
                  publisher={bookInfo?.publisher || "출판사 없음."}
                  title={bookInfo?.title || "제목  없음."}
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
