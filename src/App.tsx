import { Routes, Route } from 'react-router-dom'
import Home from '@/pages/Home/Home'
import ResearchProjectShow from '@/pages/Detail/ResearchProjectShow'

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/rp/:slug/:id" element={<ResearchProjectShow />} />
      </Routes>
    </>
  )
}

export default App
