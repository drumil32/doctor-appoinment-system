import { BrowserRouter, Routes, Route } from "react-router-dom";

import React from 'react';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from "./pages/Register";
import NotFound from "./pages/NotFound";
import { useCookies } from 'react-cookie';
import Spinner from "./components/Spinner";
import { useSelector } from "react-redux";

const App = () => {
  const { loading } = useSelector(state => state.alerts)
  const [cookies, setCookies, removeCookies] = useCookies(['token']);

  const handleSetCookies = (key, data) => {
    setCookies(`${key}`, data, { path: '/' });
  }
  const handleRemoveCookies = (key) => {
    removeCookies(`${key}`, { path: '/' });
  }

  return (
    <div>
      <BrowserRouter>
        {loading && <Spinner />}
        <Routes>
          <Route path="/" element={<Home cookies={cookies} />} />
          <Route path="/login" element={<Login setCookies={handleSetCookies} />} />
          <Route path="/register" element={<Register />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;