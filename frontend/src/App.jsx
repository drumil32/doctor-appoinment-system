import { BrowserRouter, Routes, Route } from "react-router-dom";

import React from 'react';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from "./pages/Register";
import NotFound from "./pages/NotFound";
import { useCookies } from 'react-cookie';
import Spinner from "./components/Spinner";
import { useSelector } from "react-redux";
import ProtectedRoute from "./components/ProtectedRoute";
import PublicRoute from "./components/PublicRoute";
import ApplyDoctor from "./pages/ApplyDoctor";

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
          <Route
            path="/"
            element={
              <ProtectedRoute cookies={cookies} removeCookies={handleRemoveCookies}>
                <Home cookies={cookies} removeCookies={handleRemoveCookies} />
              </ProtectedRoute>
            }
          />
          <Route
            path="/apply-doctor"
            element={
              <ProtectedRoute cookies={cookies} removeCookies={handleRemoveCookies}>
                <ApplyDoctor cookies={cookies} removeCookies={handleRemoveCookies} />
              </ProtectedRoute>
            }
          />
          <Route
            path="/login"
            element={
              <PublicRoute cookies={cookies}>
                <Login setCookies={handleSetCookies} />
              </PublicRoute>
            }
          />
          <Route
            path="/register"
            element={
              <PublicRoute cookies={cookies} >
                <Register />
              </PublicRoute>
            }
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;