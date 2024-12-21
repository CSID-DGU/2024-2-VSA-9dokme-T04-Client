// import React, { useState, useEffect, useRef, useCallback } from "react";
// import Webcam from "react-webcam";
// //import "../css/receiptFilming.css";
// import SendPhotoModal from "./sendPhotoModal";
// import API from "../api/axios";
// import refreshBtn from "../images/refreshBtn.png";
// import captureBtn from "../images/captureBtn.png";
// const videoConstraints = {
//   //   width: { ideal: window.innerWidth },
//   //   height: { ideal: window.innerHeight },
//   width: 50,
//   height: 50,
//   facingMode: "user", // 전면 카메라(PC용): user, 후카메라(모바일용): environment
// };

// const Camera: React.FC = () => {
//   const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
//   const [url, setUrl] = useState<string | null>(null);
//   const webcamRef = useRef<Webcam | null>(null);

//   const handleOpenModal = () => setIsModalOpen(true);

//   const capturePhoto = useCallback(() => {
//     if (webcamRef.current) {
//       const imageSrc = webcamRef.current.getScreenshot(); // 스크린샷 URL 저장
//       if (imageSrc) {
//         setUrl(imageSrc);
//         console.log(imageSrc);

//         // 캡처된 이미지를 다운로드하기 위한 링크 요소 생성
//         const downloadLink = document.createElement("a");
//         downloadLink.href = imageSrc;
//         downloadLink.download = "barcode.png"; // 다운로드될 파일의 이름
//         document.body.appendChild(downloadLink);
//         downloadLink.click();
//         document.body.removeChild(downloadLink);
//       }
//     }
//   }, [webcamRef]);

//   const onUserMedia = useCallback((stream: MediaStream) => {
//     console.log("User Media accessed", stream);
//   }, []);

//   // 데이터 URL에서 Blob 객체 생성하는 함수
//   const dataURLtoBlob = (dataurl: string): Blob => {
//     const arr = dataurl.split(",");
//     const mime = arr[0].match(/:(.*?);/)![1];
//     const bstr = atob(arr[1]);
//     let n = bstr.length;
//     const u8arr = new Uint8Array(n);
//     while (n--) {
//       u8arr[n] = bstr.charCodeAt(n);
//     }
//     return new Blob([u8arr], { type: mime });
//   };

//   // 서버로 사진 전송하는 함수
//   const sendPhotoServer = async () => {
//     handleOpenModal();
//     if (!url) return;

//     const imageBlob = dataURLtoBlob(url);
//     const formData = new FormData();
//     formData.append("status", "approved");
//     formData.append("code", "0036000291452");
//     formData.append("image", imageBlob, "barcode.png");

//     const endpoint = "/barcodes/";
//     const access_token = localStorage.getItem("access");

//     try {
//       const response = await API.post(endpoint, formData, {
//         headers: {
//           Authorization: `Bearer ${access_token}`,
//           "Content-Type": "multipart/form-data", // formData 형식으로 전달
//         },
//       });

//       if (response.status === 200) {
//         console.log("Photo uploaded Successfully!");
//       } else {
//         console.log("Fail to Upload Photo.");
//       }
//     } catch (error) {
//       console.error("Error: ", error);
//     }
//   };

//   return (
//     <>
//       <Webcam
//         className="webcam"
//         ref={webcamRef}
//         audio={false}
//         screenshotFormat="image/png"
//         videoConstraints={videoConstraints}
//         onUserMedia={onUserMedia}
//         mirrored={false}
//         width="100%"
//       />

//       <div className="h-[100%] text-center">
//         <button onClick={capturePhoto}>
//           <img src={captureBtn} alt="captureBtn" className="w-16" />
//         </button>
//         <div>버튼을 눌러 사진을 촬영하세요!</div>
//       </div>

//       {url && (
//         <div
//           id="screenShot"
//           className="flex flex-col gap-4 fixed bottom-0 left-0 w-full p-4 shadow-lg flex justify-center items-center"
//         >
//           <img src={url} alt="ScreenShot" />
//           <div className="flex flex-row ">
//             <button
//               className="inline-flex items-center px-6 py-2.5 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600 transition-colors"
//               id="sendPhotoBtn"
//               onClick={sendPhotoServer}
//             >
//               ✓ 바코드 전송하기
//             </button>
//             <button
//               id="refresh"
//               onClick={() => {
//                 setUrl(null);
//               }}
//             >
//               <div className="absolute right-8 bottom-4 flex flex-row">
//                 <p>다시 찍기</p>
//                 <img
//                   id="refreshBtn"
//                   src={refreshBtn}
//                   alt="refreshBtn"
//                   className="w-[2vw] "
//                 />
//               </div>
//             </button>
//           </div>
//         </div>
//       )}

//       <SendPhotoModal
//         isModalOpen={isModalOpen}
//         setIsModalOpen={setIsModalOpen}
//       />
//     </>
//   );
// };

// export default Camera;
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

    // Simulate API call
    console.log("Photo sent!");
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      {/* Webcam Display */}
      <div className="w-[80%] max-w-md aspect-square bg-black rounded-md overflow-hidden shadow-lg">
        <Webcam
          ref={webcamRef}
          audio={false}
          screenshotFormat="image/png"
          videoConstraints={videoConstraints}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Capture Button */}
      <div className="mt-6">
        <button
          onClick={capturePhoto}
          className="flex items-center px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 shadow-md"
        >
          <img src={captureBtn} alt="Capture" className="w-6 h-6 mr-2" />
          사진 촬영
        </button>
      </div>

      {/* Screenshot & Actions */}
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

      {/* Modal */}
      <SendPhotoModal
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
      />
    </div>
  );
};

export default Camera;
