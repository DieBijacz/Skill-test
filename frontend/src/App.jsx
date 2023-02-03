import React from 'react'
import Navbar from './components/Navbar'
import Dashboard from './pages/Dashboard'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Footer from './components/Footer'
import Memory from './components/Memory-Game/Memory'
import ReactionTime from './pages/ReactionTime'

const App = () => {
  return (
    <div id='App'>
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/memory' element={<Memory />} />
        <Route path='/reaction-time' element={<ReactionTime />} />
        <Route path='/dashboard' element={<Dashboard />} />
      </Routes>
      <Footer />
    </div>
  )
}

export default App