import { useEffect, useState } from 'react';
import api from '../../api/axios';

export default function ProductosAdmin() {

  const [productos, setProductos] = useState([]);

  const [modalOpen, setModalOpen] = useState(false);
  const [editId, setEditId] = useState(null);

  const [form, setForm] = useState({
    nombre: '',
    precio: '',
    stock: '',
    detalle: ''
  });

  const cargar = async () => {
    const res = await api.get('/productos');
    setProductos(res.data);
  };

  useEffect(() => {
    cargar();
  }, []);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const abrirCrear = () => {
    setForm({
      nombre: '',
      precio: '',
      stock: '',
      detalle: ''
    });
    setEditId(null);
    setModalOpen(true);
  };

  const abrirEditar = (p) => {
    setForm({
      nombre: p.nombre || '',
      precio: p.precio || '',
      stock: p.stock || '',
      detalle: p.detalle || ''
    });
    setEditId(p.id);
    setModalOpen(true);
  };

  const guardar = async () => {

    const payload = {
      nombre: form.nombre.trim(),
      detalle: form.detalle.trim(),
      precio: Number(form.precio),
      stock: Number(form.stock)
    };

    try {
      if (editId) {
        await api.patch(`/productos/${editId}`, payload);
      } else {
        await api.post('/productos', payload);
      }

      setModalOpen(false);
      cargar();

    } catch (error) {
      console.log(error.response?.data);
    }
  };

  const eliminar = async (id) => {
    await api.delete(`/productos/${id}`);
    cargar();
  };

  return (
    <div style={styles.container}>

      <h1 style={styles.title}>
        Administración de Productos
      </h1>

      <button style={styles.btnAdd} onClick={abrirCrear}>
        + Nuevo Producto
      </button>

      {/* LISTA */}
      <div style={styles.grid}>

        {productos.map((p) => (
          <div key={p.id} style={styles.card}>

            <h3 style={styles.name}>{p.nombre}</h3>

            <p style={styles.text}>Precio: Bs {p.precio}</p>
            <p style={styles.text}>Stock: {p.stock}</p>

            <p style={styles.desc}>
              {p.detalle}
            </p>

            <div style={styles.actions}>

              <button
                style={styles.editBtn}
                onClick={() => abrirEditar(p)}
              >
                Editar
              </button>

              <button
                style={styles.deleteBtn}
                onClick={() => eliminar(p.id)}
              >
                Eliminar
              </button>

            </div>

          </div>
        ))}

      </div>

      {/* MODAL */}
      {modalOpen && (
        <div style={styles.overlay}>

          <div style={styles.modal}>

            <h2 style={styles.modalTitle}>
              {editId ? 'Editar Producto' : 'Nuevo Producto'}
            </h2>

            <input
              name="nombre"
              placeholder="Nombre"
              value={form.nombre}
              onChange={handleChange}
              style={styles.input}
            />

            <input
              name="precio"
              placeholder="Precio"
              value={form.precio}
              onChange={handleChange}
              style={styles.input}
            />

            <input
              name="stock"
              placeholder="Stock"
              value={form.stock}
              onChange={handleChange}
              style={styles.input}
            />

            <textarea
              name="detalle"
              placeholder="Detalle"
              value={form.detalle}
              onChange={handleChange}
              style={styles.textarea}
            />

            <button style={styles.saveBtn} onClick={guardar}>
              Guardar
            </button>

            <button
              style={styles.cancelBtn}
              onClick={() => setModalOpen(false)}
            >
              Cancelar
            </button>

          </div>

        </div>
      )}

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
    marginBottom: 20
  },

  btnAdd: {
    background: '#D4AF37',
    color: '#000',
    border: 'none',
    padding: '12px 20px',
    fontWeight: 'bold',
    cursor: 'pointer',
    marginBottom: 25
  },

  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
    gap: 20
  },

  card: {
    background: '#0A0A0A',
    border: '1px solid rgba(212,175,55,.2)',
    padding: 20
  },

  name: {
    color: '#D4AF37',
    marginBottom: 10
  },

  text: {
    color: '#ccc'
  },

  desc: {
    color: '#888',
    marginTop: 10,
    minHeight: 50
  },

  actions: {
    marginTop: 15,
    display: 'flex',
    gap: 10
  },

  editBtn: {
    flex: 1,
    background: '#1B5E20',
    border: 'none',
    color: 'white',
    padding: 10,
    cursor: 'pointer'
  },

  deleteBtn: {
    flex: 1,
    background: '#9E1B1B',
    border: 'none',
    color: 'white',
    padding: 10,
    cursor: 'pointer'
  },

  overlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'rgba(0,0,0,.9)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },

  modal: {
    background: '#0A0A0A',
    border: '1px solid rgba(212,175,55,.3)',
    padding: 30,
    width: '400px'
  },

  modalTitle: {
    color: '#D4AF37',
    marginBottom: 20
  },

  input: {
    width: '100%',
    marginBottom: 10,
    padding: 10,
    background: '#111',
    border: '1px solid #333',
    color: 'white'
  },

  textarea: {
    width: '100%',
    height: 80,
    marginBottom: 15,
    padding: 10,
    background: '#111',
    border: '1px solid #333',
    color: 'white'
  },

  saveBtn: {
    width: '100%',
    padding: 12,
    background: '#D4AF37',
    border: 'none',
    color: '#000',
    fontWeight: 'bold',
    cursor: 'pointer',
    marginBottom: 10
  },

  cancelBtn: {
    width: '100%',
    padding: 12,
    background: 'transparent',
    border: '1px solid #D4AF37',
    color: '#D4AF37',
    cursor: 'pointer'
  }
};