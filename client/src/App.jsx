import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Sidebar from './components/Sidebar'
import StarryBackground from './components/StarryBackground'
import Home from './pages/Home'
import About from './pages/About'
import Résume from './pages/Résume'
import Projects from './pages/Projects'
import Contacts from './pages/Contacts'

function App() {
  return (
    <BrowserRouter>
      <div style={{ minHeight: '100vh', color: '#ffffff', position: 'relative' }}>
        {/* Full-screen starry background behind everything */}
        <StarryBackground />
        <Sidebar />
        <main className="ml-16 p-8" style={{ position: 'relative', zIndex: 1 }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/resume" element={<Résume />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/contact" element={<Contacts />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  )
}

export default App