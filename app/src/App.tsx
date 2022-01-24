import React from 'react'
import { Toaster } from 'react-hot-toast'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import NavBar from './components/NavBar'
import Profile from './pages/Profile'
import './style.module.css'

export default function App() {
  return (
    <BrowserRouter>
      <NavBar />
      <Routes>
        <Route path="/freelance/:id" element={<Profile />} />
      </Routes>
      <Toaster position="top-right" />
    </BrowserRouter>
  )
}
