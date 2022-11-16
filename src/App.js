import { BrowserRouter, Routes, Route } from "react-router-dom";
import GlobalStyle from "./assets/css/GlobalStyle";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";

export default function App() {
  return (
    <BrowserRouter>
      <GlobalStyle />
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
        </Routes>
    </BrowserRouter>

  );
}