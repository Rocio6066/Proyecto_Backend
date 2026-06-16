import { useEffect, useState } from 'react';
import api from '../../api/axios';

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

import { Bar } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export default function Clicks() {

  const [datos, setDatos] = useState([]);
  const [mes, setMes] = useState(
    new Date().getMonth() + 1
  );

  useEffect(() => {
    cargar();
  }, [mes]);

  const cargar = async () => {
    try {
      const res = await api.get(
        `/clicks/estadisticas?mes=${mes}`
      );
      setDatos(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const chartData = {
    labels: datos.map(item => item.nombre),

    datasets: [
      {
        label: 'Interacciones (Likes)',
        data: datos.map(item => item.likes),
        backgroundColor: '#D4AF37',
      },
      {
        label: 'Visualizaciones (Detalles)',
        data: datos.map(item => item.detalles),
        backgroundColor: '#1B5E20',
      },
    ],
  };

  return (
    <div
      style={{
        minHeight: '100vh',
        background: '#000',
        color: 'white',
        padding: '40px 5%',
        fontFamily: 'serif'
      }}
    >

      <h1
        style={{
          color: '#D4AF37',
          fontStyle: 'italic',
          marginBottom: '30px'
        }}
      >
        Estadísticas de Productos
      </h1>

      {/* FILTRO */}
      <div
        style={{
          marginBottom: 30,
          display: 'flex',
          gap: 15,
          alignItems: 'center'
        }}
      >

        <label style={{ color: '#ccc' }}>
          Filtrar por mes:
        </label>

        <select
          value={mes}
          onChange={(e) =>
            setMes(Number(e.target.value))
          }
          style={{
            padding: '10px',
            background: '#111',
            color: '#D4AF37',
            border: '1px solid rgba(212,175,55,.4)'
          }}
        >
          <option value="1">Enero</option>
          <option value="2">Febrero</option>
          <option value="3">Marzo</option>
          <option value="4">Abril</option>
          <option value="5">Mayo</option>
          <option value="6">Junio</option>
          <option value="7">Julio</option>
          <option value="8">Agosto</option>
          <option value="9">Septiembre</option>
          <option value="10">Octubre</option>
          <option value="11">Noviembre</option>
          <option value="12">Diciembre</option>
        </select>

      </div>

      {/* GRAFICO */}
      <div
        style={{
          maxWidth: '900px',
          marginBottom: 40,
          background: '#0A0A0A',
          padding: 20,
          border: '1px solid rgba(212,175,55,.2)'
        }}
      >
        <Bar data={chartData} />
      </div>

      {/* TABLA */}
      <table
        style={{
          width: '100%',
          borderCollapse: 'collapse',
          background: '#0A0A0A',
          border: '1px solid rgba(212,175,55,.2)'
        }}
      >
        <thead>
          <tr style={{ background: '#111' }}>
            <th style={th}>Producto</th>
            <th style={th}>Likes</th>
            <th style={th}>Detalles</th>
          </tr>
        </thead>

        <tbody>
          {datos.map((item) => (
            <tr key={item.productoId}>
              <td style={td}>{item.nombre}</td>
              <td style={td}>{item.likes}</td>
              <td style={td}>{item.detalles}</td>
            </tr>
          ))}
        </tbody>

      </table>
    </div>
  );
}

const th = {
  padding: 12,
  color: '#D4AF37',
  borderBottom: '1px solid rgba(212,175,55,.2)',
  textAlign: 'left'
};

const td = {
  padding: 12,
  color: '#ccc',
  borderBottom: '1px solid #222'
};