import Webcam from "react-webcam";
import Camera from "../lib/cameras";
const WebcamComponent = () => <Webcam className="w-full h-auto object-cover" />;
const BarcodeFilming = () => {
  return (
    <div className="full_container">
      <div className="h-[%]">
        <div id="camera">
          <Camera />
        </div>
      </div>
    </div>
  );
};

export default BarcodeFilming;
