export default function Ubicacion() {

  const ORO = "#D4AF37";

  return (
    <div
      style={{
        minHeight: '100vh',
        background: '#000',
        color: 'white',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '40px'
      }}
    >

      <div
        style={{
          width: '100%',
          maxWidth: '700px',
          background: '#0A0A0A',
          border: `1px solid ${ORO}`,
          padding: '50px',
          textAlign: 'center',
          boxShadow: '0 0 25px rgba(212,175,55,0.12)'
        }}
      >

        {/* TITULO */}
        <h1
          style={{
            color: ORO,
            fontStyle: 'italic',
            marginBottom: '10px',
            letterSpacing: '2px'
          }}
        >
          Ubicación
        </h1>

        <div
          style={{
            width: 80,
            height: 3,
            background: ORO,
            margin: '0 auto 30px'
          }}
        />

        {/* INFO */}
        <p style={{ color: '#ccc', fontSize: '1.1rem', marginBottom: '15px' }}>
          📍 La Paz - Bolivia
        </p>

        <p style={{ color: '#aaa', marginBottom: '25px' }}>
          Boutique de moda tradicional boliviana con estilo moderno
        </p>

        {/* BLOQUE DESTACADO */}
        <div
          style={{
            marginTop: '30px',
            padding: '20px',
            border: `1px solid ${ORO}33`,
            background: '#111'
          }}
        >

          <p style={{ color: '#ddd', marginBottom: '10px' }}>
            Próximamente tienda física
          </p>

          <p style={{ color: '#888', fontSize: '0.9rem' }}>
            Atención personalizada · Diseños exclusivos · Moda cultural
          </p>

        </div>

        {/* DECORACION */}
        <div
          style={{
            marginTop: '40px',
            display: 'flex',
            justifyContent: 'center',
            gap: '8px'
          }}
        >
          <div style={{ width: 40, height: 3, background: '#9E1B1B' }} />
          <div style={{ width: 40, height: 3, background: ORO }} />
          <div style={{ width: 40, height: 3, background: '#1B5E20' }} />
        </div>

      </div>

    </div>
  );
}