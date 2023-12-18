import React from 'react'
import { useLocation, Navigate } from 'react-router-dom'
import useStore from '../context/Global'
import PropTypes from 'prop-types'

const PublicRoute = ({ children }) => {
  const isAuthenticated = useStore((state) => state.isAuthenticated)
  const location = useLocation()
  if (isAuthenticated && (location.pathname === '/login' || location.pathname === '/register')) {
    return (
      <>
        <Navigate to="/" state={{ from: location }} replace />
      </>
    )
  }
  return children
}
PublicRoute.propTypes = {
  children: PropTypes.node
}

export default PublicRoute
