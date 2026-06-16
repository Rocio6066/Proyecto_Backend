import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Navbar from './components/Navbar';

import Home from './pages/Home';
import Productos from './pages/Productos';
import Ubicacion from './pages/Ubicacion';
import Login from './pages/Login';

import AdminLayout from './pages/admin/AdminLayout';

import ProductosAdmin from './pages/admin/Productos';
import Publicar from './pages/admin/Publicar';
import Clicks from './pages/admin/Clicks';
import Logs from './pages/admin/Logs';
import Usuarios from './pages/admin/Usuarios';

function AdminRoute({ children }) {

  const usuario = JSON.parse(
    localStorage.getItem('usuario') || 'null'
  );

  if (!usuario) {
    return (
      <h1 style={{ padding: 20 }}>
        No has iniciado sesión
      </h1>
    );
  }

  if (
    usuario.rol !== 'ADMIN' &&
    usuario.rol !== 'JEFE'
  ) {
    return (
      <h1 style={{ padding: 20 }}>
        No tienes permisos
      </h1>
    );
  }

  return children;
}

export default function App() {
  return (
    <BrowserRouter>
      <Navbar />

      <Routes>

        {/* 🌐 CLIENTE */}
        <Route path="/" element={<Home />} />
        <Route path="/productos" element={<Productos />} />
        <Route path="/ubicacion" element={<Ubicacion />} />
        <Route path="/login" element={<Login />} />

        {/* 🧑‍💼 ADMIN PROTEGIDO */}
        <Route
          path="/admin"
          element={
            <AdminRoute>
              <AdminLayout />
            </AdminRoute>
          }
        >

          <Route index element={<h1>Bienvenido Admin</h1>} />
          <Route path="productos" element={<ProductosAdmin />} />
          <Route path="publicar" element={<Publicar />} />
          <Route path="clicks" element={<Clicks />} />
          <Route path="logs" element={<Logs />} />
          <Route path="usuarios" element={<Usuarios />} />

        </Route>

      </Routes>
    </BrowserRouter>
  );
}