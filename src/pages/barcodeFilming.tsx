import Webcam from "react-webcam";
import Camera from "../lib/cameras";
import Sidebanner from "../components/Sidebanner";

const WebcamComponent = () => <Webcam className="w-full h-auto object-cover" />;

const BarcodeFilming = () => {
  return (
    <div className="bg-gradient-to-br from-indigo-500 to-white-500 min-h-screen flex flex-col items-center justify-center">
      <Sidebanner />
      <header className="w-full py-8 bg-white bg-opacity-30 text-white text-center shadow-lg rounded-b-lg">
        <h1 className="text-3xl font-extrabold tracking-wide drop-shadow-lg">
          9dokme 바코드 교재 조회 서비스
        </h1>
        <p className="mt-2 text-lg font-medium drop-shadow-md">
          쉽고 빠르게 바코드로 교재를 조회 및 등록 요청 하세요!
        </p>
      </header>

      <div className="h-[65vh] w-full max-w-lg mx-auto mt-8 bg-white bg-opacity-90 shadow-2xl rounded-lg overflow-hidden">
        <div id="camera" className="p-4">
          <Camera />
        </div>
      </div>

      <footer className="mt-8 text-white text-sm">
        © 2024 9dokme. All rights reserved.
      </footer>
    </div>
  );
};

export default BarcodeFilming;
