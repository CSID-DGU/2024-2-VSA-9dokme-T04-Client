import { Route, Routes } from "react-router-dom";
import Main from "./pages/Main";
import Landing from "./pages/Landing";
import PdfViewer from "./pages/PdfViewer";
import QueryBoard from "./pages/QueryBoard";
import MyPage from "./pages/MyPage";
import AdminPDF from "./pages/AdminPDF";
import AdminUser from "./pages/AdminUser";
import AdminQboard from "./pages/AdminQboard";
import LoginLoading from "./pages/LoginLoading";
import MyArticle from "./pages/MyArticle";
import BookDetail from "./pages/BookDetail";
import { PRIMARY } from "./utils/colors.js";
import { BrowserView, MobileView, isMobile } from "react-device-detect";
function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route
          path="/mainPage/"
          element={isMobile ? <Main mobileView /> : <Main />}
        />
        <Route path="/bookdetail/:bookId/" element={<BookDetail />} />
        <Route path="/view/:bookId/" element={<PdfViewer />} />
        <Route path="/queryboard/" element={<QueryBoard />} />
        <Route path="/mypage/" element={<MyPage />} />
        <Route path="/admin/adminPdf/" element={<AdminPDF />} />
        <Route path="/admin/adminUser/" element={<AdminUser />} />
        <Route path="/admin/adminQboard/" element={<AdminQboard />} />
        <Route path="/login/oauth2/callback/kakao" element={<LoginLoading />} />
        <Route path="/myarticle/" element={<MyArticle />} />
      </Routes>
    </>
  );
}

export default App;
