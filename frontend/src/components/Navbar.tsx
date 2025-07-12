import { Link, useNavigate } from 'react-router-dom';
import { FaBook, FaList, FaPlus, FaSignOutAlt } from 'react-icons/fa';

export default function Navbar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/');
  };

  return (
    <nav style={styles.navbar}>
      <div style={styles.logo}>
        <Link to="/" style={styles.logoLink}>
          <FaBook style={styles.logoIcon} />
          Mi Biblioteca
        </Link>
      </div>
      <div style={styles.links}>
        <Link to="/libros" style={{ ...styles.link, ...styles.flexCenter }}>
          <FaList /> Listado de Libros
        </Link>
        <Link to="/libros/nuevo" style={{ ...styles.link, ...styles.flexCenter }}>
          <FaPlus /> Agregar Libro
        </Link>
        <button onClick={handleLogout} style={{ ...styles.logoutButton, ...styles.flexCenter }}>
          <FaSignOutAlt /> Cerrar Sesión
        </button>
      </div>
    </nav>
  );
}

const styles = {
  navbar: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#004d99',
    padding: '0.75rem 1.5rem',
  },
  logo: {
    fontSize: '1.5rem',
    fontWeight: 'bold',
  },
  logoLink: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    fontSize: '1.8rem',
    color: '#e0f0ff', // azul claro o blanco azulado
    textDecoration: 'none',
    fontWeight: 'bold',
  },
  logoIcon: {
    fontSize: '2rem',
  },
  links: {
    display: 'flex',
    gap: '1rem',
    alignItems: 'center',
  },
  link: {
    color: '#e0f0ff',
    textDecoration: 'none',
    fontWeight: 500,
    padding: '0.5rem 1rem',
    borderRadius: 4,
    border: '1px solid #fff',
    whiteSpace: 'nowrap',
  },
  logoutButton: {
    padding: '0.5rem 1rem',
    backgroundColor: '#d9534f',
    border: 'none',
    color: '#fff',
    cursor: 'pointer',
    borderRadius: 4,
    fontWeight: 500,
    whiteSpace: 'nowrap',
  },
  flexCenter: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
  },
};
