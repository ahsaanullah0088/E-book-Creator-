import React from 'react'
import { useLocation, Navigate } from 'react-router-dom'


const ProtectedRoute = ( {children}) => {
  const isAuthencated = false // Replace with actual authentication logic
  const loading = false // Replace with actual loading state
  const location = useLocation();

  if (loading) {
    return <div>Loading...</div>
  }
  if (!isAuthencated) {
    return <Navigate to="/login" state={{ from: location }} replace />
  }
  // eslint-disa ble-next-line no-undef
  return children;  
}

export default ProtectedRoute