import landingPage from "../images/landingPage.png";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

import { KAKAO_AUTH_URL } from "../auth/Auth";
const Landing = () => {
  const navigate = useNavigate();
  const handleKakaoButtonClick = () => {
    window.location.href = KAKAO_AUTH_URL;
  };
  const handleLoginBtn = () => {
    navigate("/api/mainPage");
  };

  return (
    <Div className="flex justify-center w-[100%]">
      <img src={landingPage} className="w-[65%] md:w-[50%] " />
      <GradientDiv
        onClick={handleKakaoButtonClick}
        className="w-[55%] min-h-[4%] md:w-[40%] fixed bottom-[5%] bg-cumtomColor"
      >
        로그인하기
      </GradientDiv>
    </Div>
  );
};

const Div = styled.div`
  background: radial-gradient(
    circle at 40% 40%,
    rgb(163, 175, 243) 0%,
    rgb(220, 182, 232) 100.2%
  );
`;
const GradientDiv = styled.div`
  background-image: linear-gradient(
    to right,
    #918fff 0%,
    #5956ff 45%,
    #3f3cff 55%,
    #3431ff 79%,
    #0011ff 100%
  );
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: bold;
  padding: 0.8vw 0vw;
  height: 3.7vw;
  border-radius: 0.5vw;
  font-size: 1.2vw;
  box-shadow: rgba(0, 0, 0, 0.2) 0px 20px 30px;
  box-sizing: border-box;
  cursor: pointer;
`;
export default Landing;
