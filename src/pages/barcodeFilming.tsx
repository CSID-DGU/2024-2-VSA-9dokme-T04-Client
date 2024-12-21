//import "../css/receiptFilming.css";
import Webcam from "react-webcam";
import Camera from "../lib/cameras";
const WebcamComponent = () => <Webcam />;
const BarcodeFilming = () => {
  return (
    <div className="full_container">
      <div className="FilmingPage" style={{ backgroundColor: "#F9F9F9" }}>
        <div id="camera">
          <Camera />
        </div>
      </div>
    </div>
  );
};

export default BarcodeFilming;
