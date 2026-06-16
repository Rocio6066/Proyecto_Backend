import { Link, Outlet } from 'react-router-dom';

export default function AdminLayout() {
  return (
    <div
      style={{
        display: 'flex',
        minHeight: '100vh',
        background: '#000'
      }}
    >

      {/* SIDEBAR */}
      <div
        style={{
          width: '260px',
          background: '#0A0A0A',
          borderRight: '1px solid rgba(212,175,55,.25)',
          padding: '30px 20px',
          display: 'flex',
          flexDirection: 'column'
        }}
      >

        <h1
          style={{
            color: '#D4AF37',
            fontStyle: 'italic',
            textAlign: 'center',
            marginBottom: '40px',
            fontSize: '1.8rem',
            letterSpacing: '2px'
          }}
        >
          ADMIN
        </h1>

        <nav
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '12px'
          }}
        >

          {[
            ['📦 Productos', '/admin/productos'],
            ['🛍️ Publicar', '/admin/publicar'],
            ['👆 Clicks', '/admin/clicks'],
            ['📋 Logs', '/admin/logs'],
            ['👥 Usuarios', '/admin/usuarios']
          ].map(([label, path]) => (
            <Link
              key={path}
              to={path}
              style={{
                color: '#D4AF37',
                textDecoration: 'none',
                padding: '12px 14px',
                border: '1px solid rgba(212,175,55,.2)',
                background: '#111',
                borderRadius: 6,
                transition: '0.3s'
              }}
              onMouseEnter={(e) => {
                e.target.style.background = '#D4AF37';
                e.target.style.color = '#000';
              }}
              onMouseLeave={(e) => {
                e.target.style.background = '#111';
                e.target.style.color = '#D4AF37';
              }}
            >
              {label}
            </Link>
          ))}

        </nav>

        {/* footer decorativo */}
        <div
          style={{
            marginTop: 'auto',
            textAlign: 'center',
            color: '#555',
            fontSize: 12,
            paddingTop: 20
          }}
        >
          Creaciones Betina ©
        </div>

      </div>

      {/* CONTENIDO */}
      <div
        style={{
          flex: 1,
          padding: '30px',
          background: '#000',
          color: 'white'
        }}
      >
        <Outlet />
      </div>

    </div>
  );
}