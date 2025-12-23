import React from 'react'
import {Routes, Route} from 'react-router-dom';
import ProtectedRoute from './components/auth/ProtectedRoute';
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/protected" element={
          <ProtectedRoute>
            <div>Protected Content</div>
          </ProtectedRoute>
        } />
        <Route path="/" element={<LandingPage/>} />
        <Route path="/login" element={<LoginPage/>} />
        <Route path="/signup" element={<SignupPage/>} />

      </Routes>
    </div>
  )
}

export default App