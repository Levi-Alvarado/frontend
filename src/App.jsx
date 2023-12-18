import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import Dashboard from './pages/Dashboard'
import React, { useEffect } from 'react'
import LoginPage from './pages/Login'
import RegisterPage from './pages/Register'
import PrivateRoute from './components/PrivateRoute'
import ConfigPage from './pages/Config/Config'
import PublicRoute from './components/PublicRoute'
import ProductDetail from './pages/ProductDetail'
import Cart from './pages/Cart'
import useStore from './context/Global'

function App () {
  const [getProducts, getCategories] = useStore((state) => [
    state.getProducts,
    state.getCategories
  ])

  useEffect(() => {
    getProducts()
  }, [getProducts])

  useEffect(() => {
    getCategories()
  }, [getCategories])

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <PublicRoute>
              <Layout />
            </PublicRoute>
          }
        >
          <Route
            index
            element={
              <PublicRoute>
                <Dashboard />
              </PublicRoute>
            }
          />
          <Route
            path="/login"
            element={
              <PublicRoute>
                <LoginPage />
              </PublicRoute>
            }
          />
          <Route
            path="/carrito"
            element={
              <PrivateRoute>
                <Cart />
              </PrivateRoute>
            }
          />
          <Route
            path="/register"
            element={
              <PublicRoute>
                <RegisterPage />
              </PublicRoute>
            }
          />
          <Route
            path="*"
            element={
              <PublicRoute>
                <h1>Not Found</h1>
              </PublicRoute>
            }
          />
          <Route
            path="/config"
            element={
              <PrivateRoute>
                <ConfigPage />
              </PrivateRoute>
            }
          />
          <Route
            path="/publication/:id"
            element={
              <PrivateRoute>
                <ProductDetail />
              </PrivateRoute>
            }
          />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
