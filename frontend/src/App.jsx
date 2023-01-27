import { BrowserRouter, Routes, Route } from "react-router-dom";

import React from 'react';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from "./pages/Register";

const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;