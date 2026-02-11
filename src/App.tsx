import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout.tsx';
import HomePage from './pages/HomePage.tsx';
import BlogPage from './pages/blog/BlogPage.tsx';
import BlogEntry from './pages/blog/BlogEntry.tsx';
import ProjectsPage from './pages/projects/ProjectsPage.tsx';
import ProjectEntry from './pages/projects/ProjectEntry.tsx';
import PhotographyPage from './pages/photography/PhotographyPage.tsx';
import ChessPage from './pages/chess/ChessPage.tsx';
import ChessEntry from './pages/chess/ChessEntry.tsx';
import SearchResultsPage from './pages/SearchResultsPage.tsx';

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
