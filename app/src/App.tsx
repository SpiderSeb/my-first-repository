import React from 'react'
import { Toaster } from 'react-hot-toast'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.module.css'
import NavBar from './components/NavBar'
import Profile from './pages/Profile'

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
