import { Routes, Route } from 'react-router-dom';
import Layout from './components/layout/Layout';
import Home from './pages/Home';
import Blog from './pages/Blog';
import Projects from './pages/Projects';
import ProjectDetail from './pages/ProjectDetail';
import Photography from './pages/Photography';
import Chess from './pages/Chess';
import SearchResults from './pages/SearchResults';

export default function App() {
  return (
    <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/projects/:id" element={<ProjectDetail />} />
          <Route path="/photography" element={<Photography />} />
          <Route path="/chess" element={<Chess />} />
          <Route path="/search" element={<SearchResults />} />
        </Routes>
    </Layout>
  );
}
