import { useNavigate } from 'react-router-dom';
import img1 from '../assets/img1.png';

export default function Home() {

  const navigate = useNavigate();

  const ORO = "#D4AF37";
  const ROJO = "#9E1B1B";
  const VERDE = "#1B5E20";

  return (
    <div style={{ background: '#000', minHeight: '100vh', color: 'white' }}>

      {/* HERO CON IMAGEN DE FONDO */}
      <section
        style={{
          position: 'relative',
          height: '90vh',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          textAlign: 'center',
          overflow: 'hidden'
        }}
      >

        {/* IMAGEN DE FONDO */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            backgroundImage: `url(${img1})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            opacity: 0.7,
            zIndex: 1
          }}
        />

        {/* OVERLAY OSCURO */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(to bottom, rgba(0,0,0,0.2), rgba(0,0,0,0.95))',
            zIndex: 2
          }}
        />

        {/* CONTENIDO */}
        <div style={{ zIndex: 3, padding: '20px' }}>

          <h1
            style={{
              fontSize: '4.5rem',
              color: ORO,
              fontStyle: 'italic',
              letterSpacing: '2px',
              textShadow: '2px 2px 20px black'
            }}
          >
            Creaciones Betina
          </h1>

          <p
            style={{
              fontSize: '1.2rem',
              color: '#eee',
              letterSpacing: '5px',
              textTransform: 'uppercase'
            }}
          >
            Moda Tradicional Boliviana con Elegancia Moderna
          </p>

          {/* BANDERA MINI */}
          <div style={{ display: 'flex', justifyContent: 'center', marginTop: 20 }}>
            <div style={{ width: 60, height: 4, background: ROJO }} />
            <div style={{ width: 60, height: 4, background: ORO }} />
            <div style={{ width: 60, height: 4, background: VERDE }} />
          </div>

          <button
            onClick={() => navigate('/productos')}
            style={{
              marginTop: '40px',
              padding: '15px 45px',
              background: 'transparent',
              border: `2px solid ${ORO}`,
              color: ORO,
              cursor: 'pointer',
              letterSpacing: '3px',
              textTransform: 'uppercase'
            }}
          >
            Ver Colección
          </button>

        </div>

      </section>

      {/* HISTORIA */}
      <section style={{ padding: '80px 20px', textAlign: 'center' }}>

        <h2 style={{ color: ORO, fontStyle: 'italic' }}>
          Nuestra Historia
        </h2>

        <div
          style={{
            maxWidth: 800,
            margin: '30px auto',
            background: '#111',
            padding: 40,
            border: `1px solid ${ORO}`
          }}
        >

          <p style={{ color: '#ccc', lineHeight: '1.8' }}>
            Creaciones Betina nace en Bolivia como un homenaje a la mujer
            que mantiene viva la tradición textil andina, combinando
            elegancia moderna con raíces culturales profundas.
          </p>

          <p style={{ color: '#ccc', lineHeight: '1.8', marginTop: 20 }}>
            Cada diseño refleja identidad, fuerza y orgullo boliviano,
            pensado para una mujer que quiere verse elegante sin perder su esencia.
          </p>

        </div>

      </section>

      {/* FRASE FINAL */}
      <section style={{ padding: '70px 20px', background: '#0a0a0a', textAlign: 'center' }}>

        <h2 style={{ color: ORO, fontStyle: 'italic' }}>
          Tradición que inspira. Elegancia que trasciende.
        </h2>

      </section>

    </div>
  );
}