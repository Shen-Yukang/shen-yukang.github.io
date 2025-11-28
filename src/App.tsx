import { Routes, Route } from 'react-router-dom'
import Home from '@/pages/Home/Home'
import ResearchProjectShow from '@/pages/Detail/ResearchProjectShow'

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/rp/synthetic_data_engine/:id" element={<ResearchProjectShow />} />
      </Routes>
    </>
  )
}

export default App
