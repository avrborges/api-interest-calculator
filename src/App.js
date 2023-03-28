import Navbar from "./Navbar"
import Intereses from "./pages/Intereses PEX/intereses"
import CostoFinanciero from "./pages/Costo Financiero CA/costofinanciero"
import { Route, Routes } from "react-router-dom"
import React from 'react'

function App() {
  return (
    <>
      <Navbar />
      <div className="container">
        <Routes>
          <Route path="/" element={<Intereses />} />
          <Route path="/costofinancieroca" element={<CostoFinanciero />} />
        </Routes>
      </div>
    </>
  )
}

export default App
