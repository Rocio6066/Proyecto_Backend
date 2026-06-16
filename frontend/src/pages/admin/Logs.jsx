import { useEffect, useState } from 'react';
import api from '../../api/axios';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

export default function Logs() {

  const usuarioLogueado = JSON.parse(
    localStorage.getItem('usuario')
  );

  if (usuarioLogueado?.rol !== 'JEFE') {
    return (
      <div style={styles.container}>
        <h1 style={styles.title}>Acceso denegado</h1>
        <p style={styles.text}>
          No tiene permisos para acceder a esta sección.
        </p>
      </div>
    );
  }

  const [usuarios, setUsuarios] = useState([]);
  const [logs, setLogs] = useState([]);

  const [usuarioSeleccionado, setUsuarioSeleccionado] = useState('');
  const [mesSeleccionado, setMesSeleccionado] = useState('');

  useEffect(() => {
    cargarUsuarios();
  }, []);

  const cargarUsuarios = async () => {
    const res = await api.get('/logs/usuarios');
    setUsuarios(res.data);
  };

  const buscarLogs = async () => {
    try {
      let url = '/logs';

      if (usuarioSeleccionado && mesSeleccionado) {
        url = `/logs/usuario/${usuarioSeleccionado}/mes/${mesSeleccionado}`;
      } else if (usuarioSeleccionado) {
        url = `/logs/usuario/${usuarioSeleccionado}`;
      } else if (mesSeleccionado) {
        url = `/logs/mes/${mesSeleccionado}`;
      }

      const res = await api.get(url);
      setLogs(res.data);

    } catch (error) {
      console.log(error);
    }
  };

  const formatearFecha = (fecha) => {
    const fechaBolivia = new Date(fecha);
    fechaBolivia.setHours(fechaBolivia.getHours() - 4);

    return fechaBolivia.toLocaleString('es-BO', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false,
    });
  };

  const generarPDF = () => {
    const doc = new jsPDF();

    doc.setFontSize(18);
    doc.setTextColor(212, 175, 55);
    doc.text('Reporte de Actividad del Sistema', 14, 15);

    doc.setFontSize(10);
    doc.setTextColor(150);
    doc.text(`Generado: ${formatearFecha(new Date())}`, 14, 25);

    autoTable(doc, {
      startY: 35,
      head: [['Usuario', 'Evento', 'Fecha']],
      body: logs.map(log => [
        log.usuario,
        log.evento,
        formatearFecha(log.fecha),
      ]),
      headStyles: {
        fillColor: [212, 175, 55],
        textColor: [0, 0, 0],
      },
      bodyStyles: {
        textColor: 30,
      }
    });

    doc.save('reporte_logs.pdf');
  };

  return (
    <div style={styles.container}>

      <h1 style={styles.title}>
        Historial del Sistema
      </h1>

      {/* FILTROS */}
      <div style={styles.filters}>

        <select
          style={styles.select}
          value={usuarioSeleccionado}
          onChange={(e) => setUsuarioSeleccionado(e.target.value)}
        >
          <option value="">Todos los usuarios</option>
          {usuarios.map((u, i) => (
            <option key={i} value={u.usuario}>
              {u.usuario}
            </option>
          ))}
        </select>

        <select
          style={styles.select}
          value={mesSeleccionado}
          onChange={(e) => setMesSeleccionado(e.target.value)}
        >
          <option value="">Todos los meses</option>
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

        <button style={styles.btnPrimary} onClick={buscarLogs}>
          Buscar
        </button>

        <button style={styles.btnSecondary} onClick={generarPDF}>
          Exportar PDF
        </button>

      </div>

      {/* TABLA */}
      <div style={styles.tableWrapper}>
        <table style={styles.table}>

          <thead>
            <tr>
              <th style={styles.th}>Usuario</th>
              <th style={styles.th}>Evento</th>
              <th style={styles.th}>Fecha</th>
            </tr>
          </thead>

          <tbody>
            {logs.map((log) => (
              <tr key={log.id}>
                <td style={styles.td}>{log.usuario}</td>
                <td style={styles.td}>{log.evento}</td>
                <td style={styles.td}>{formatearFecha(log.fecha)}</td>
              </tr>
            ))}
          </tbody>

        </table>
      </div>

    </div>
  );
}

const styles = {

  container: {
    minHeight: '100vh',
    background: '#000',
    color: 'white',
    padding: '40px 5%',
    fontFamily: 'serif'
  },

  title: {
    color: '#D4AF37',
    fontStyle: 'italic',
    marginBottom: 30
  },

  text: {
    color: '#aaa'
  },

  filters: {
    display: 'flex',
    gap: 10,
    flexWrap: 'wrap',
    marginBottom: 25
  },

  select: {
    padding: '10px',
    background: '#111',
    color: '#D4AF37',
    border: '1px solid rgba(212,175,55,.3)'
  },

  btnPrimary: {
    padding: '10px 15px',
    background: '#D4AF37',
    color: '#000',
    border: 'none',
    cursor: 'pointer',
    fontWeight: 'bold'
  },

  btnSecondary: {
    padding: '10px 15px',
    background: '#1B5E20',
    color: '#fff',
    border: 'none',
    cursor: 'pointer'
  },

  tableWrapper: {
    overflowX: 'auto'
  },

  table: {
    width: '100%',
    borderCollapse: 'collapse',
    background: '#0A0A0A',
    border: '1px solid rgba(212,175,55,.2)'
  },

  th: {
    textAlign: 'left',
    padding: 12,
    color: '#000',
    background: '#D4AF37',
    borderBottom: '2px solid #111',
    letterSpacing: '1px'
  },

  td: {
    padding: 12,
    color: '#ddd',
    borderBottom: '1px solid #222'
  }
};