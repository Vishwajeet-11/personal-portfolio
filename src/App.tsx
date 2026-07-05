import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import Projects from './pages/Projects'
import ProjectCaseStudy from './pages/ProjectCaseStudy'
import Blog from './pages/Blog'
import SystemDesigns from './pages/SystemDesigns'
import Testimonials from './pages/Testimonials'

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/projects/:slug" element={<ProjectCaseStudy />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/system-designs" element={<SystemDesigns />} />
        <Route path="/testimonials" element={<Testimonials />} />
      </Routes>
    </>
  )
}

export default App
