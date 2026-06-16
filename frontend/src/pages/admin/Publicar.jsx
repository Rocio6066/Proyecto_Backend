import { useEffect, useState } from 'react';
import api from '../../api/axios';

export default function Publicar() {

  const [productos, setProductos] = useState([]);
  const [publicaciones, setPublicaciones] = useState([]);
  const [productoId, setProductoId] = useState('');
  const [file, setFile] = useState(null);

  const ORO = '#D4AF37';
  const ROJO = '#9E1B1B';
  const VERDE = '#1B5E20';

  useEffect(() => {
    cargarProductos();
    cargarPublicaciones();
  }, []);

  const cargarProductos = async () => {
    const res = await api.get('/productos');
    setProductos(res.data);
  };

  const cargarPublicaciones = async () => {
    const res = await api.get('/publicaciones/admin');
    setPublicaciones(res.data);
  };

  const publicar = async () => {
    if (!productoId) return alert('Selecciona un producto');
    if (!file) return alert('Selecciona una imagen');

    const formData = new FormData();
    formData.append('productoId', productoId);
    formData.append('file', file);

    await api.post('/publicaciones', formData);

    setFile(null);
    setProductoId('');
    cargarPublicaciones();
  };

  const eliminarPublicacion = async (id) => {
    await api.delete(`/publicaciones/${id}`);
    cargarPublicaciones();
  };

  const cambiarEstado = async (id) => {
    await api.patch(`/publicaciones/${id}/toggle`);
    cargarPublicaciones();
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: '#000',
      color: 'white',
      padding: '40px 5%'
    }}>

      <h1 style={{
        color: ORO,
        fontStyle: 'italic',
        letterSpacing: '2px',
        marginBottom: '30px'
      }}>
        Gestión de Publicaciones
      </h1>

      {/* FORMULARIO */}
      <div style={{
        background: '#0A0A0A',
        border: `1px solid ${ORO}33`,
        padding: '25px',
        marginBottom: '40px'
      }}>

        <h3 style={{
          color: ORO,
          marginBottom: '20px'
        }}>
          Nueva publicación
        </h3>

        <select
          value={productoId}
          onChange={(e) => setProductoId(e.target.value)}
          style={{
            width: '100%',
            padding: '12px',
            background: '#111',
            color: 'white',
            border: `1px solid ${ORO}`,
            marginBottom: '15px'
          }}
        >
          <option value="">Selecciona un producto</option>
          {productos.map(p => (
            <option key={p.id} value={p.id}>
              {p.nombre}
            </option>
          ))}
        </select>

        <input
          type="file"
          onChange={(e) => setFile(e.target.files[0])}
          style={{
            width: '100%',
            color: 'white',
            marginBottom: '20px'
          }}
        />

        <button
          onClick={publicar}
          style={{
            background: ORO,
            color: '#000',
            border: 'none',
            padding: '12px 25px',
            fontWeight: 'bold',
            cursor: 'pointer',
            letterSpacing: '1px'
          }}
        >
          Publicar
        </button>

      </div>

      {/* LISTADO */}
      <h2 style={{
        color: ORO,
        marginBottom: '20px'
      }}>
        Publicaciones
      </h2>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit,minmax(300px,1fr))',
        gap: '25px'
      }}>

        {publicaciones.map(pub => (

          <div
            key={pub.id}
            style={{
              background: '#0A0A0A',
              border: `1px solid ${pub.activa ? VERDE : ROJO}55`,
              overflow: 'hidden'
            }}
          >

            <img
              src={pub.imagenUrl}
              style={{
                width: '100%',
                height: '260px',
                objectFit: 'cover'
              }}
            />

            <div style={{ padding: '20px' }}>

              <h3 style={{ color: ORO }}>
                {pub.producto?.nombre}
              </h3>

              <p style={{
                color: '#ccc',
                marginBottom: '15px'
              }}>
                Estado: {' '}
                <span style={{
                  color: pub.activa ? VERDE : ROJO,
                  fontWeight: 'bold'
                }}>
                  {pub.activa ? 'ACTIVA' : 'INACTIVA'}
                </span>
              </p>

              <div style={{
                display: 'flex',
                gap: '10px'
              }}>

                <button
                  onClick={() => eliminarPublicacion(pub.id)}
                  style={{
                    flex: 1,
                    background: ROJO,
                    border: 'none',
                    color: 'white',
                    padding: '10px',
                    cursor: 'pointer'
                  }}
                >
                  Eliminar
                </button>

                <button
                  onClick={() => cambiarEstado(pub.id)}
                  style={{
                    flex: 1,
                    background: pub.activa ? '#a87400' : VERDE,
                    border: 'none',
                    color: 'white',
                    padding: '10px',
                    cursor: 'pointer'
                  }}
                >
                  {pub.activa ? 'Desactivar' : 'Activar'}
                </button>

              </div>

            </div>

          </div>

        ))}

      </div>

    </div>
  );
}