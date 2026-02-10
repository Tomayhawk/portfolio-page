import { Routes, Route } from 'react-router-dom';
import Layout from './components/layout/Layout.tsx';
import HomePage from './pages/HomePage.tsx';
import BlogPage from './features/blog/pages/BlogPage.tsx';
import BlogDetailPage from './features/blog/pages/BlogDetailPage.tsx';
import ProjectsPage from './features/projects/pages/ProjectsPage.tsx';
import ProjectDetailPage from './features/projects/pages/ProjectDetailPage.tsx';
import PhotographyPage from './features/photography/pages/PhotographyPage.tsx';
import ChessPage from './features/chess/pages/ChessPage.tsx';
import ChessGameDetailPage from './features/chess/pages/ChessGameDetailPage.tsx';
import ChessOpeningDetailPage from './features/chess/pages/ChessOpeningDetailPage.tsx';
import SearchResultsPage from './features/search/pages/SearchResultsPage.tsx';

export default function App() {
  return (
    <Layout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/blog" element={<BlogPage />} />
          <Route path="/blog/:id" element={<BlogDetailPage />} />
          <Route path="/projects" element={<ProjectsPage />} />
          <Route path="/projects/:id" element={<ProjectDetailPage />} />
          <Route path="/photography" element={<PhotographyPage />} />
          <Route path="/chess" element={<ChessPage />} />
          <Route path="/chess/game/:id" element={<ChessGameDetailPage />} />
          <Route path="/chess/opening/:id" element={<ChessOpeningDetailPage />} />
          <Route path="/search" element={<SearchResultsPage />} />
        </Routes>
    </Layout>
  );
}
