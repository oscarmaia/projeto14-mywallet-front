import { BrowserRouter, Routes, Route } from "react-router-dom";
import GlobalStyle from "./assets/css/GlobalStyle";
import LoginPage from "./pages/LoginPage";
import MainPage from "./pages/MainPage";
import RegisterPage from "./pages/RegisterPage";
import EntryPage from "./pages/IncomingPage"
import ExpensePage from "./pages/ExpensePage";
import { LoginContext } from "./contexts/LoginContext";
import { useState } from "react";
import UpdateIncoming from "./pages/UpdateIncoming";
import PageNotFound from "./pages/PageNotFound";

export default function App() {
  const [user,setUser] = useState({})
  return (
    <BrowserRouter>
      <GlobalStyle />
      <LoginContext.Provider value={{user,setUser}}>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/main" element={<MainPage />} />
          <Route path="/main/incoming" element={<EntryPage />} />
          <Route path="/main/expense" element={<ExpensePage />} />
          <Route path="/main/incoming/update" element={<UpdateIncoming />} />
          <Route path="/main/expense/update" element={<UpdateIncoming />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </LoginContext.Provider>
    </BrowserRouter>

  );
}