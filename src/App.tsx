import { Routes, Route } from 'react-router-dom';
import Layout from './components/layout/Layout';
import HomePage from './pages/HomePage';
import BlogPage from './pages/blog/BlogPage';
import BlogEntry from './pages/blog/BlogEntry';
import ProjectsPage from './pages/projects/ProjectsPage';
import ProjectEntry from './pages/projects/ProjectEntry';
import PhotographyPage from './pages/photography/PhotographyPage';
import ChessPage from './pages/chess/ChessPage';
import ChessEntry from './pages/chess/ChessEntry';
import SearchResultsPage from './pages/SearchResultsPage';

export default function App() {
  return (
    <Layout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/blog" element={<BlogPage />} />
          <Route path="/blog/:id" element={<BlogEntry />} />
          <Route path="/projects" element={<ProjectsPage />} />
          <Route path="/projects/:id" element={<ProjectEntry />} />
          <Route path="/photography" element={<PhotographyPage />} />
          <Route path="/chess" element={<ChessPage />} />
          <Route path="/chess/game/:id" element={<ChessEntry />} />
          <Route path="/chess/opening/:id" element={<ChessEntry />} />
          <Route path="/search" element={<SearchResultsPage />} />
        </Routes>
    </Layout>
  );
}
