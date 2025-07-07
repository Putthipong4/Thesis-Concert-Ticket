import React from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './screen/Home';
import Detail from './screen/Detail';
import Profile from './screen/Profile';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Detail/:id" element={<Detail/>} />
        <Route path="/Profile" element = {<Profile/>} />
        {/* เพิ่มเส้นทางหน้าอื่นตามต้องการ */}
      </Routes>
    </BrowserRouter>
  );
}

export default App