import React from 'react'
import { useLocation, Navigate } from 'react-router-dom'
import useStore from '../context/Global'
import PropTypes from 'prop-types'

const PrivateRoute = ({ children }) => {
  const isAuthenticated = useStore((state) => state.isAuthenticated)
  const location = useLocation()
  if (!isAuthenticated) {
    return (
      <>
        <Navigate to="/login" state={{ from: location }} replace />
      </>
    )
  }

  return children
}
PrivateRoute.propTypes = {
  children: PropTypes.node
}

export default PrivateRoute
