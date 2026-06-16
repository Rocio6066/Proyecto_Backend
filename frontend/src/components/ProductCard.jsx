import { useState } from 'react';
import api from '../api/axios';

export default function ProductCard({ item }) {

  const [modal, setModal] = useState(false);

  const [likes, setLikes] = useState(
    item.likes || 0
  );

  const colores = [
    '#9E1B1B',
    '#D4AF37',
    '#1B5E20'
  ];

  const color =
    colores[item.id % 3];

  const registrarClick = async (tipo) => {

    try {

      await api.post('/clicks', {
        productoId: item.productoId,
        tipo,
      });

    } catch (error) {
      console.log(error);
    }
  };

  const verDetalle = async () => {

    await registrarClick('DETALLE');

    setModal(true);
  };

  const darLike = async () => {

    const key = `like_${item.id}`;

    const yaDioLike =
      localStorage.getItem(key);

    if (yaDioLike) {

      alert(
        'Ya diste like a este producto'
      );

      return;
    }

    try {

      await api.patch(
        `/publicaciones/${item.id}/like`
      );

      setLikes(prev => prev + 1);

      await registrarClick('LIKE');

      localStorage.setItem(
        key,
        'true'
      );

    } catch (error) {

      console.log(error);
    }
  };

  return (
    <>
      <div
        style={{
          background: '#111',
          border: `2px solid ${color}`,
          overflow: 'hidden',
          transition: '.3s',
          boxShadow: '0 0 10px rgba(0,0,0,.3)'
        }}
      >

        <img
          src={item.imagenUrl}
          alt="producto"
          style={{
            width: '100%',
            height: '320px',
            objectFit: 'cover'
          }}
        />

        <div style={{ padding: '20px' }}>

          <h3
            style={{
              color: '#D4AF37',
              marginBottom: '10px'
            }}
          >
            {item.producto?.nombre}
          </h3>

          <p
            style={{
              color: '#ccc',
              minHeight: '60px'
            }}
          >
            {item.producto?.detalle}
          </p>

          <h2
            style={{
              color: color
            }}
          >
            Bs {item.producto?.precio}
          </h2>

          <button
            onClick={verDetalle}
            style={{
              width: '100%',
              padding: '12px',
              background: '#D4AF37',
              border: 'none',
              color: '#000',
              fontWeight: 'bold',
              cursor: 'pointer',
              marginTop: '10px'
            }}
          >
            Ver Detalles
          </button>

          <button
            onClick={darLike}
            disabled={
              !!localStorage.getItem(
                `like_${item.id}`
              )
            }
            style={{
              width: '100%',
              padding: '12px',
              marginTop: '10px',
              background: '#9E1B1B',
              border: 'none',
              color: 'white',
              cursor: 'pointer'
            }}
          >
            {
              localStorage.getItem(
                `like_${item.id}`
              )
                ? '❤️ Ya votaste'
                : `❤️ ${likes}`
            }
          </button>

        </div>

      </div>

      {modal && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'rgba(0,0,0,.9)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 999
          }}
        >
          <div
            style={{
              background: '#111',
              border: `2px solid ${color}`,
              padding: '30px',
              maxWidth: '700px',
              width: '90%',
              color: 'white'
            }}
          >

            <h2
              style={{
                color: '#D4AF37',
                marginBottom: '20px'
              }}
            >
              {item.producto?.nombre}
            </h2>

            <img
              src={item.imagenUrl}
              alt=""
              style={{
                width: '100%',
                maxHeight: '450px',
                objectFit: 'cover'
              }}
            />

            <p
              style={{
                marginTop: '20px',
                color: '#ccc'
              }}
            >
              {item.producto?.detalle}
            </p>

            <h2
              style={{
                color: color
              }}
            >
              Bs {item.producto?.precio}
            </h2>

            <button
              onClick={() =>
                setModal(false)
              }
              style={{
                width: '100%',
                padding: '12px',
                marginTop: '20px',
                background: '#D4AF37',
                border: 'none',
                color: '#000',
                cursor: 'pointer',
                fontWeight: 'bold'
              }}
            >
              Cerrar
            </button>

          </div>
        </div>
      )}
    </>
  );
}