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
import NotificationPage from "./pages/NotificationPage";
import Doctors from "./pages/admin/Doctors";
import Users from "./pages/admin/Users";
import Profile from "./pages/doctor/Profile";
import BookingPage from "./pages/doctor/BookingPage";
import Appointments from "./pages/Appointments";
import DoctorAppointments from "./pages/doctor/DoctorAppointments";
import { useEffect } from "react";
import axios from "axios";
import DiabetesPredictor from "./pages/DiabetesPredictor";

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
            path='/diabetes-predictor'
            element={
              <ProtectedRoute cookies={cookies} removeCookies={handleRemoveCookies}>
                <DiabetesPredictor cookies={cookies} removeCookies={handleRemoveCookies} />
              </ProtectedRoute>
            }
          />
          <Route
            path="/notification"
            element={
              <ProtectedRoute cookies={cookies} removeCookies={handleRemoveCookies}>
                <NotificationPage cookies={cookies} removeCookies={handleRemoveCookies} />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/doctors"
            element={
              <ProtectedRoute cookies={cookies} removeCookies={handleRemoveCookies}>
                <Doctors cookies={cookies} removeCookies={handleRemoveCookies} />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/users"
            element={
              <ProtectedRoute cookies={cookies} removeCookies={handleRemoveCookies}>
                <Users cookies={cookies} removeCookies={handleRemoveCookies} />
              </ProtectedRoute>
            }
          />
          <Route
            path="/doctor/profile"
            element={
              <ProtectedRoute cookies={cookies} removeCookies={handleRemoveCookies}>
                <Profile cookies={cookies} removeCookies={handleRemoveCookies} />
              </ProtectedRoute>
            }
          />
          <Route
            path="/doctor/book-appointment/:doctorId"
            element={
              <ProtectedRoute cookies={cookies} removeCookies={handleRemoveCookies}>
                <BookingPage cookies={cookies} removeCookies={handleRemoveCookies} />
              </ProtectedRoute>
            }
          />
          <Route
            path="/appointments"
            element={
              <ProtectedRoute cookies={cookies} removeCookies={handleRemoveCookies}>
                <Appointments cookies={cookies} removeCookies={handleRemoveCookies} />
              </ProtectedRoute>
            }
          />
          <Route
            path="/doctor-appointments"
            element={
              <ProtectedRoute cookies={cookies} removeCookies={handleRemoveCookies}>
                <DoctorAppointments cookies={cookies} removeCookies={handleRemoveCookies} />
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