import "./App.css";

import { Route, Routes } from "react-router-dom";
import Home from "./pages/home";
import PostDetail from "./pages/postDetail";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/detail/:id" element={<PostDetail />} />
    </Routes>
  );
}

export default App;
