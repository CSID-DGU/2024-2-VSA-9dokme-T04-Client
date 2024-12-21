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
import Payment from "./pages/Payment";
import WritingForm from "./components/WritingForm";
import PostDetail from "./components/PostDetail";
import AdminPaymentList from "./pages/AdminPaymentList";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/writingform/" element={<WritingForm />} />
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
        <Route path="/admin/adminPaymentList/" element={<AdminPaymentList />} />
        <Route path="/login/oauth2/callback/kakao" element={<LoginLoading />} />
        <Route path="/myarticle/" element={<MyArticle />} />
        <Route path="/payment/" element={<Payment />} />
        <Route path="/post/:questionId" element={<PostDetail />} />

      </Routes>
    </>
  );
}

export default App;
