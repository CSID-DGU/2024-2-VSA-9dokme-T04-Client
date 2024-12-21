import React, { useState, useEffect, useRef, useCallback } from "react";
import Webcam from "react-webcam";
//import "../css/receiptFilming.css";
import photoAlbum from "../images/photoAlbum.png";
import SendPhotoModal from "./sendPhotoModal";
import API from "../api/axios";
import refreshBtn from "../images/refreshBtn.png";
import turtleBtn from "../images/turtleBtn.png";
const videoConstraints = {
  width: { ideal: window.innerWidth },
  height: { ideal: window.innerHeight },
  facingMode: "user", // 전면 카메라(PC용): user, 후카메라(모바일용): environment
};

const Camera: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [url, setUrl] = useState<string | null>(null);
  const webcamRef = useRef<Webcam | null>(null);

  const handleOpenModal = () => setIsModalOpen(true);

  const capturePhoto = useCallback(() => {
    if (webcamRef.current) {
      const imageSrc = webcamRef.current.getScreenshot(); // 스크린샷 URL 저장
      if (imageSrc) {
        setUrl(imageSrc);
        console.log(imageSrc);

        // 캡처된 이미지를 다운로드하기 위한 링크 요소 생성
        const downloadLink = document.createElement("a");
        downloadLink.href = imageSrc;
        downloadLink.download = "barcode.png"; // 다운로드될 파일의 이름
        document.body.appendChild(downloadLink);
        downloadLink.click();
        document.body.removeChild(downloadLink);
      }
    }
  }, [webcamRef]);

  const onUserMedia = useCallback((stream: MediaStream) => {
    console.log("User Media accessed", stream);
  }, []);

  // 데이터 URL에서 Blob 객체 생성하는 함수
  const dataURLtoBlob = (dataurl: string): Blob => {
    const arr = dataurl.split(",");
    const mime = arr[0].match(/:(.*?);/)![1];
    const bstr = atob(arr[1]);
    let n = bstr.length;
    const u8arr = new Uint8Array(n);
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }
    return new Blob([u8arr], { type: mime });
  };

  // 서버로 사진 전송하는 함수
  const sendPhotoServer = async () => {
    handleOpenModal();
    if (!url) return;

    const imageBlob = dataURLtoBlob(url);
    const formData = new FormData();
    formData.append("status", "approved");
    formData.append("code", "0036000291452");
    formData.append("image", imageBlob, "barcode.png");

    const endpoint = "/barcodes/";
    const access_token = localStorage.getItem("access");

    try {
      const response = await API.post(endpoint, formData, {
        headers: {
          Authorization: `Bearer ${access_token}`,
          "Content-Type": "multipart/form-data", // formData 형식으로 전달
        },
      });

      if (response.status === 200) {
        console.log("Photo uploaded Successfully!");
      } else {
        console.log("Fail to Upload Photo.");
      }
    } catch (error) {
      console.error("Error: ", error);
    }
  };

  return (
    <>
      <Webcam
        className="webcam"
        ref={webcamRef}
        audio={false}
        screenshotFormat="image/png"
        videoConstraints={videoConstraints}
        onUserMedia={onUserMedia}
        mirrored={false}
        width="100%"
      />

      <div className="container">
        <button id="album">
          <img id="album" src={photoAlbum} alt="photoAlbum" />
        </button>
        <button id="turtleBtn" onClick={capturePhoto}>
          <img id="turtleBtn" src={turtleBtn} alt="captureBtn" />
        </button>
        <button
          id="refresh"
          onClick={() => {
            setUrl(null);
          }}
        >
          <img id="refreshBtn" src={refreshBtn} alt="refreshBtn" />
        </button>
      </div>

      {url && (
        <div id="screenShot">
          <img src={url} alt="ScreenShot" />
          <button id="sendPhotoBtn" onClick={sendPhotoServer}>
            전송하기
          </button>
        </div>
      )}

      <SendPhotoModal
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
      />
    </>
  );
};

export default Camera;
