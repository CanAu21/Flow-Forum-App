import { Route, Routes } from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login";
import MainPage from "./pages/MainPage/index";
import Profile from "./pages/Profile";
import ProtectedRoute from "./pages/ProtectedRoute";
import Layout from "./pages/Layout";
import DetailPage from "./pages/DetailPage";

function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route element={<ProtectedRoute />}>
        <Route  element={<Layout />}>
          <Route path="" element={<MainPage />} />
          <Route path="/post/:id" element={<DetailPage />} />
        </Route>
        
        <Route path="/profile" element={<Profile />} />
      </Route>
    </Routes>
  );
}

export default App;
