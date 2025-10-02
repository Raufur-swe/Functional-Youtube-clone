import React, { useState } from "react";
import { Route, Routes } from "react-router-dom";
import Navber from "./components/Navber/Navber";
import Home from "./pages/Home/Home";
import Video from "./pages/Video/Video";

const App = () => {
  const [sidebar, setSidebar] = useState(false);

  return (
    <div>
      <Navber setSidebar={setSidebar} />
      <Routes>
        <Route path="/" element={<Home sidebar={sidebar} />} />
        {/* Video route */}
        <Route path="/Video/:categoryId/:videoId" element={<Video />} />
      </Routes>
    </div>
  );
};

export default App;

