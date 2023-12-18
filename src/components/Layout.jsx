import React from 'react'
import { Outlet } from 'react-router-dom'
import PageNavbar from './Navbar'

const Layout = () => {
  return (
    <>
      <PageNavbar></PageNavbar>

      <Outlet />
    </>
  )
}

export default Layout
