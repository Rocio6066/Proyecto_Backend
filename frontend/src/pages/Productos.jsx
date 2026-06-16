import { useEffect, useState } from 'react';
import api from '../api/axios';
import ProductCard from '../components/ProductCard';

export default function Productos() {

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const ORO = "#D4AF37";

  useEffect(() => {
    cargar();
  }, []);

  const cargar = async () => {
    try {
      const res = await api.get('/publicaciones');
      setData(res.data);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div
        style={{
          background: '#000',
          minHeight: '100vh',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center'
        }}
      >
        <h2
          style={{
            color: ORO,
            fontStyle: 'italic',
            letterSpacing: '2px'
          }}
        >
          Cargando colección...
        </h2>
      </div>
    );
  }

  return (
    <div
      style={{
        background: '#000',
        minHeight: '100vh',
        padding: '60px 5%',
        color: 'white'
      }}
    >

      {/* HEADER */}
      <div
        style={{
          textAlign: 'center',
          marginBottom: '60px'
        }}
      >
        <h1
          style={{
            color: ORO,
            fontStyle: 'italic',
            fontSize: '3rem',
            marginBottom: '10px',
            letterSpacing: '2px'
          }}
        >
          Colección Betina
        </h1>

        <div
          style={{
            width: 120,
            height: 3,
            background: ORO,
            margin: '0 auto 20px'
          }}
        />

        <p
          style={{
            color: '#ccc',
            letterSpacing: '3px',
            textTransform: 'uppercase',
            fontSize: '0.9rem'
          }}
        >
          Moda tradicional boliviana con elegancia moderna
        </p>
      </div>

      {/* GRID */}
      {data.length === 0 ? (
        <p style={{ textAlign: 'center', color: '#aaa' }}>
          No hay productos publicados
        </p>
      ) : (
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '35px'
          }}
        >
          {data.map((item) => (
            <ProductCard
              key={item.id}
              item={item}
            />
          ))}
        </div>
      )}

    </div>
  );
}