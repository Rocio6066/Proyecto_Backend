import { Link } from 'react-router-dom';

export default function Admin() {

  const ORO = "#D4AF37";

  return (
    <div
      style={{
        minHeight: '100vh',
        background: '#000',
        color: 'white',
        padding: '60px 20px'
      }}
    >

      {/* HEADER */}
      <div style={{ textAlign: 'center', marginBottom: '50px' }}>

        <h1
          style={{
            color: ORO,
            fontStyle: 'italic',
            fontSize: '3rem',
            marginBottom: '10px',
            letterSpacing: '2px'
          }}
        >
          Panel Administrativo
        </h1>

        <div
          style={{
            width: 120,
            height: 3,
            background: ORO,
            margin: '0 auto'
          }}
        />

        <p
          style={{
            color: '#aaa',
            marginTop: '15px',
            letterSpacing: '3px',
            textTransform: 'uppercase',
            fontSize: '0.8rem'
          }}
        >
          Creaciones Betina
        </p>

      </div>

      {/* CARDS MENU */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: '25px',
          maxWidth: '900px',
          margin: '0 auto'
        }}
      >

        <Link to="/admin/productos" style={cardStyle(ORO)}>
          📦 Productos CRUD
        </Link>

        <Link to="/admin/publicar" style={cardStyle(ORO)}>
          📤 Publicar Producto
        </Link>

        <Link to="/admin/clicks" style={cardStyle(ORO)}>
          📊 Clicks
        </Link>

        <Link to="/admin/logs" style={cardStyle(ORO)}>
          📜 Logs
        </Link>

        <Link to="/admin/usuarios" style={cardStyle(ORO)}>
          👤 Usuarios
        </Link>

      </div>

    </div>
  );
}

const cardStyle = (ORO) => ({
  background: '#0A0A0A',
  border: `1px solid ${ORO}`,
  padding: '30px',
  textAlign: 'center',
  textDecoration: 'none',
  color: 'white',
  fontSize: '1rem',
  letterSpacing: '1px',
  transition: '0.3s',
  boxShadow: '0 0 15px rgba(212,175,55,0.08)',
});