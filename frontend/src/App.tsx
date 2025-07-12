import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import LibrosFormPage from './pages/LibrosFormPage';
import LibrosListPage from './pages/LibrosListPage';
import Navbar from './components/Navbar';

function App() {
  const token = localStorage.getItem('token');
  const location = useLocation();

  const hideNavbar = location.pathname === '/';

  return (
    <>
      {!hideNavbar && <Navbar />}
      <Routes>
        <Route
          path="/"
          element={token ? <Navigate to="/libros" /> : <LoginPage />}
        />
        <Route
          path="/libros"
          element={token ? <LibrosListPage /> : <Navigate to="/" />}
        />
        <Route
          path="/libros/nuevo"
          element={token ? <LibrosFormPage /> : <Navigate to="/" />}
        />
        {/* fallback */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </>
  );
}

export default App;
