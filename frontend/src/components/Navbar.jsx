import { Link, useNavigate } from 'react-router-dom';
import api from '../api/axios';

export default function Navbar() {

  const navigate = useNavigate();

  const usuario = JSON.parse(
    localStorage.getItem('usuario')
  );

  const esAdmin =
    usuario &&
    (
      usuario.rol === 'ADMIN' ||
      usuario.rol === 'JEFE'
    );

  const logout = async () => {

    try {

      await api.post('/auth/logout', {
        usuarioId: usuario.id,
        usuario: usuario.nombre,
      });

    } catch (error) {
      console.log(error);
    }

    localStorage.removeItem('token');
    localStorage.removeItem('usuario');

    navigate('/');
  };

  return (
    <>
      <nav style={styles.nav}>

        <div>
          <h2 style={styles.logo}>
            Creaciones Betina
          </h2>

          <p style={styles.slogan}>
            Tradición • Elegancia • Bolivia
          </p>
        </div>

        <div style={styles.links}>

          <Link style={styles.link} to="/">
            Inicio
          </Link>

          <Link style={styles.link} to="/productos">
            Colección
          </Link>

          <Link style={styles.link} to="/ubicacion">
            Ubicación
          </Link>

          {esAdmin && (
            <Link style={styles.link} to="/admin">
              Panel
            </Link>
          )}

          {!usuario ? (
            <Link style={styles.loginBtn} to="/login">
              Ingresar
            </Link>
          ) : (
            <button
              onClick={logout}
              style={styles.logoutBtn}
            >
              Salir
            </button>
          )}

        </div>

      </nav>

      <div style={styles.bandera}></div>
    </>
  );
}

const styles = {

  nav: {
    background: '#0A0A0A',
    color: 'white',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '15px 5%',
    flexWrap: 'wrap'
  },

  logo: {
    color: '#D4AF37',
    margin: 0,
    fontStyle: 'italic',
    letterSpacing: '2px'
  },

  slogan: {
    margin: 0,
    color: '#ccc',
    fontSize: '0.8rem'
  },

  links: {
    display: 'flex',
    gap: '20px',
    alignItems: 'center'
  },

  link: {
    color: 'white',
    textDecoration: 'none',
    textTransform: 'uppercase',
    fontSize: '.9rem'
  },

  loginBtn: {
    border: '1px solid #D4AF37',
    color: '#D4AF37',
    padding: '8px 15px',
    textDecoration: 'none'
  },

  logoutBtn: {
    background: 'transparent',
    border: '1px solid #D4AF37',
    color: '#D4AF37',
    padding: '8px 15px',
    cursor: 'pointer'
  },

  bandera: {
    height: '4px',
    background:
      'linear-gradient(90deg,#9E1B1B 0%,#9E1B1B 33%,#D4AF37 33%,#D4AF37 66%,#1B5E20 66%,#1B5E20 100%)'
  }
};