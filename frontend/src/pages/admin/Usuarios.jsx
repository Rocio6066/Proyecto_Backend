import { useEffect, useState } from 'react';
import api from '../../api/axios';

export default function Usuarios() {

  const usuarioLogueado = JSON.parse(
    localStorage.getItem('usuario')
  );

  if (usuarioLogueado?.rol !== 'JEFE') {
    return (
      <div style={{
        minHeight: '100vh',
        background: '#000',
        color: 'white',
        padding: 40
      }}>
        <h1 style={{ color: '#D4AF37' }}>
          Acceso denegado
        </h1>
        <p style={{ color: '#ccc' }}>
          No tiene permisos para acceder a esta sección.
        </p>
      </div>
    );
  }

  const esJefe = usuarioLogueado?.rol === 'JEFE';

  const [usuarios, setUsuarios] = useState([]);
  const [nombre, setNombre] = useState('');
  const [correo, setCorreo] = useState('');
  const [password, setPassword] = useState('');
  const [fortaleza, setFortaleza] = useState('');

  const ORO = '#D4AF37';
  const ROJO = '#9E1B1B';
  const VERDE = '#1B5E20';

  useEffect(() => {
    cargarUsuarios();
  }, []);

  const cargarUsuarios = async () => {
    const res = await api.get('/usuarios');
    setUsuarios(res.data);
  };

  const crearUsuario = async () => {
    if (fortaleza === 'Débil') {
      alert('La contraseña es demasiado débil');
      return;
    }

    await api.post('/usuarios', {
      nombre,
      correo,
      password,
    });

    setNombre('');
    setCorreo('');
    setPassword('');
    setFortaleza('');

    cargarUsuarios();
  };

  const evaluarPassword = (password) => {
    let puntos = 0;

    if (password.length >= 8) puntos++;
    if (/[A-Z]/.test(password)) puntos++;
    if (/[a-z]/.test(password)) puntos++;
    if (/[0-9]/.test(password)) puntos++;
    if (/[^A-Za-z0-9]/.test(password)) puntos++;

    if (puntos <= 2) setFortaleza('Débil');
    else if (puntos <= 4) setFortaleza('Media');
    else setFortaleza('Fuerte');
  };

  const cambiarEstado = async (id) => {
    await api.patch(`/usuarios/${id}/estado`);
    cargarUsuarios();
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: '#000',
      padding: 40,
      color: 'white'
    }}>

      <h1 style={{
        color: ORO,
        fontStyle: 'italic',
        marginBottom: 30
      }}>
        Gestión de Usuarios
      </h1>

      {/* FORMULARIO */}
      {esJefe && (
        <div style={{
          background: '#0A0A0A',
          border: `1px solid ${ORO}33`,
          padding: 25,
          marginBottom: 40
        }}>

          <h2 style={{ color: ORO, marginBottom: 20 }}>
            Nuevo Administrador
          </h2>

          <input
            placeholder="Nombre"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            style={inputStyle}
          />

          <input
            placeholder="Correo"
            value={correo}
            onChange={(e) => setCorreo(e.target.value)}
            style={inputStyle}
          />

          <input
            type="password"
            placeholder="Contraseña"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              evaluarPassword(e.target.value);
            }}
            style={inputStyle}
          />

          <p style={{ color: '#ccc' }}>
            Fortaleza:{' '}
            <strong style={{
              color:
                fortaleza === 'Fuerte'
                  ? VERDE
                  : fortaleza === 'Media'
                    ? ORO
                    : ROJO
            }}>
              {fortaleza}
            </strong>
          </p>

          <button
            onClick={crearUsuario}
            style={btnGold}
          >
            Crear Administrador
          </button>

        </div>
      )}

      {/* LISTA */}
      <h2 style={{ color: ORO }}>
        Usuarios Registrados
      </h2>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit,minmax(280px,1fr))',
        gap: 20,
        marginTop: 20
      }}>

        {usuarios.map(usuario => (
          <div
            key={usuario.id}
            style={{
              background: '#0A0A0A',
              border: `1px solid ${usuario.activo ? VERDE : ROJO}55`,
              padding: 20
            }}
          >
            <h3 style={{ color: ORO }}>
              {usuario.nombre}
            </h3>

            <p style={{ color: '#ccc' }}>
              {usuario.correo}
            </p>

            <p>Rol: {usuario.rol}</p>

            <p style={{
              color: usuario.activo ? VERDE : ROJO,
              fontWeight: 'bold'
            }}>
              {usuario.activo ? 'ACTIVO' : 'INACTIVO'}
            </p>

            <button
              onClick={() => cambiarEstado(usuario.id)}
              style={{
                width: '100%',
                marginTop: 10,
                padding: 10,
                border: 'none',
                cursor: 'pointer',
                background: usuario.activo ? ROJO : VERDE,
                color: 'white'
              }}
            >
              Cambiar estado
            </button>

          </div>
        ))}

      </div>

    </div>
  );
}

const inputStyle = {
  width: '100%',
  padding: 12,
  marginBottom: 15,
  background: '#111',
  border: '1px solid #D4AF37',
  color: 'white'
};

const btnGold = {
  background: '#D4AF37',
  color: '#000',
  padding: 12,
  border: 'none',
  cursor: 'pointer',
  fontWeight: 'bold',
  width: '100%'
};