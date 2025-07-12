import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '../config/axios';

export default function LoginPage() {
  const [email, setEmail] = useState(process.env.REACT_APP_DEFAULT_EMAIL || '');
  const [password, setPassword] = useState(process.env.REACT_APP_DEFAULT_PASSWORD || '');
  const [error, setError] = useState('');
  const navigate = useNavigate();

const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  setError('');
  try {
    const res = await axios.post('/auth/login', { email, password });

    if (res.status === 201 && res.data.access_token) {
      localStorage.setItem('token', res.data.access_token);
      navigate('/libros');
    } else {
      setError('Error credenciales');
    }
  } catch (err: any) {
    if (err.response?.status === 401) {
      setError('Credenciales incorrectas22222');
    } else {
      setError('Error al iniciar sesión. Intenta más tarde333.');
    }
  }
};

  return (
    <div
      className="d-flex align-items-center justify-content-center min-vh-100"
      style={{
        background: 'linear-gradient(to right, #6a11cb, #2575fc)',
      }}
    >
      <div className="card p-5 shadow-lg" style={{ width: '100%', maxWidth: '500px', borderRadius: '1rem' }}>
        <h2 className="text-center mb-4 text-primary">Biblioteca CMPC Login</h2>
        <form onSubmit={handleSubmit} autoComplete="off">
          <div className="mb-4">
            <label className="form-label text-white">Email</label>
            <input
              type="email"
              className="form-control form-control-lg"
              placeholder="admin@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              autoComplete="off"
            />
          </div>
          <div className="mb-4">
            <label className="form-label text-white">Contraseña</label>
            <input
              type="password"
              className="form-control form-control-lg"
              placeholder="********"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                if (error) setError('');
              }}
              required
              autoComplete="new-password"
            />

          </div>

          {error && (
            <div className="alert alert-danger text-center py-2" role="alert">
              {error}
            </div>
          )}

          <button
            type="submit"
            className="btn btn-success w-100 btn-lg fw-bold"
            style={{
              backgroundColor: '#28a745',
              borderColor: '#28a745',
              transition: 'all 0.3s ease-in-out',
            }}
            onMouseOver={(e) => (e.currentTarget.style.backgroundColor = '#218838')}
            onMouseOut={(e) => (e.currentTarget.style.backgroundColor = '#28a745')}
          >
            Ingresar
          </button>
        </form>
      </div>
    </div>
  );
}
