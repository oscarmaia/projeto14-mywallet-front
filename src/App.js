import { BrowserRouter, Routes, Route } from "react-router-dom";
import GlobalStyle from "./assets/css/GlobalStyle";
import LoginPage from "./pages/LoginPage";
import MainPage from "./pages/MainPage";
import RegisterPage from "./pages/RegisterPage";
import EntryPage from "./pages/EntryPage"
import ExpensePage from "./pages/ExpensePage";
import { LoginContext } from "./contexts/LoginContext";
import { useState } from "react";
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
          <Route path="/entry" element={<EntryPage />} />
          <Route path="/expense" element={<ExpensePage />} />
        </Routes>
      </LoginContext.Provider>
    </BrowserRouter>

  );
}