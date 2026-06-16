import { useState } from 'react';
import api from '../api/axios';
import { useNavigate } from 'react-router-dom';
import ReCAPTCHA from "react-google-recaptcha";

export default function Login() {

  const [correo, setCorreo] = useState('');
  const [password, setPassword] = useState('');
  const [captcha, setCaptcha] = useState(null);

  const navigate = useNavigate();

  const ORO = "#D4AF37";
  const FONDO = "#000";
  const TARJETA = "#0A0A0A";

  const login = async () => {

    if (!captcha) {
      alert("Por favor completa el captcha");
      return;
    }

    try {

      const res = await api.post('/auth/login', {
        correo,
        password
      });

      localStorage.setItem('token', res.data.access_token);
      localStorage.setItem(
        'usuario',
        JSON.stringify(res.data.usuario)
      );

      window.dispatchEvent(new Event('storage'));

      if (
        res.data.usuario.rol === 'JEFE' ||
        res.data.usuario.rol === 'ADMIN'
      ) {
        navigate('/admin');
      } else {
        navigate('/');
      }

    } catch (err) {
      alert('Credenciales incorrectas');
    }
  };

  return (
    <div
      style={{
        minHeight: '100vh',
        background: FONDO,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '30px'
      }}
    >

      {/* TARJETA */}
      <div
        style={{
          width: '100%',
          maxWidth: '450px',
          background: TARJETA,
          border: `1px solid ${ORO}`,
          padding: '45px',
          boxShadow: `0 0 30px rgba(212,175,55,0.15)`
        }}
      >

        <h1
          style={{
            color: ORO,
            textAlign: 'center',
            marginBottom: '8px',
            fontStyle: 'italic',
            letterSpacing: '2px'
          }}
        >
          Creaciones Betina
        </h1>

        <p
          style={{
            textAlign: 'center',
            color: '#aaa',
            marginBottom: '30px',
            letterSpacing: '3px',
            textTransform: 'uppercase',
            fontSize: '0.8rem'
          }}
        >
          Acceso Administrativo
        </p>

        {/* INPUT CORREO */}
        <input
          placeholder="Correo"
          value={correo}
          onChange={(e) => setCorreo(e.target.value)}
          style={{
            width: '100%',
            marginBottom: '15px',
            padding: '12px',
            background: '#111',
            border: `1px solid ${ORO}33`,
            color: 'white',
            outline: 'none'
          }}
        />

        {/* INPUT PASSWORD */}
        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{
            width: '100%',
            marginBottom: '20px',
            padding: '12px',
            background: '#111',
            border: `1px solid ${ORO}33`,
            color: 'white',
            outline: 'none'
          }}
        />

        {/* CAPTCHA */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            marginBottom: '20px'
          }}
        >
          <ReCAPTCHA
            sitekey="6LeUExktAAAAAPCtGy6sN4zooAX0EI5T7kgxn9SD"
            onChange={(value) => setCaptcha(value)}
          />
        </div>

        {/* BOTÓN */}
        <button
          onClick={login}
          disabled={!captcha}
          style={{
            width: '100%',
            background: ORO,
            color: '#000',
            border: 'none',
            padding: '15px',
            fontWeight: 'bold',
            cursor: 'pointer',
            letterSpacing: '2px',
            textTransform: 'uppercase'
          }}
        >
          Iniciar Sesión
        </button>

      </div>
    </div>
  );
}