import axios from "axios";
import { useNavigate } from "react-router-dom";


const uri = import.meta.env.VITE_API_URL
export const Usuario = async (id) => {
  let usuario;
  try {
    const response = await axios.get(
      `${uri}usuario/usuariosprivadas/${id}`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    if (response.data.success) {
      usuario = response.data.usuario;
    }
  } catch (error) {
    swal({
      title: 'Error',
      text: error.message,
      icon: 'error',
      buttons: 'Aceptar'
    })
  }
  return usuario;
};

export const AdminPaseButtons = ({ id }) => {
  const handleDelete = async (id) => {
    const confirm = window.confirm("¿Seguro que quieres eliminar el usuario?");
    if (confirm) {
      try {
        const response = await axios.delete(
          `${uri}pase/delete/${id}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        if (response.data.success) {
          location.reload();
        }
      } catch (error) {
        swal({
          title: 'Error',
          text: error.message,
          icon: 'error',
          buttons: 'Aceptar'
        })
      }
    }
  };

  return (
    <div className="flex space-x-1">
      <button
        className="px-3 py-1 bg-red-600 text-white"
        onClick={() => handleDelete(id)}
      >
        Eliminar
      </button>
    </div>
  );
};

export const AdminButtons = ({ id }) => {
  const navigate = useNavigate();
  const handleDelete = async (id) => {
    const confirm = window.confirm("¿Seguro que quieres eliminar el usuario?");
    if (confirm) {
      try {
        const response = await axios.delete(
          `${uri}usuario/usuariosprivadas/${id}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        if (response.data.success) {
          location.reload();
        }
      } catch (error) {
        swal({
          title: 'Error',
          text: error.message,
          icon: 'error',
          buttons: 'Aceptar'
        })
      }
    }
  };

  return (
    <div className="flex space-x-1">
      <button
        className="px-3 py-1 bg-red-600 text-white"
        onClick={() => handleDelete(id)}
      >
        Eliminar
      </button>
      <button
        className="px-3 py-1 bg-teal-500 text-white"
        onClick={() => navigate(`/admin/modificar/${id}`)}
      >
        Modificar
      </button>
    </div>
  );
};

export const SeguridadButtons = ({ _id }) => {
  const navigate = useNavigate();
  return (
    <div className="flex space-x-1">
      <button
        className="px-3 py-1 bg-teal-500 text-white"
        onClick={() => navigate(`/seguridad/modificar/${_id}`)}
      >
        Modificar
      </button>
    </div>
  );
};

export const UsuarioButtons = ({ _id }) => {
  const handleDelete = async (id) => {
    const confirm = window.confirm("¿Seguro que quieres eliminar el usuario?");
    if (confirm) {
      try {
        const response = await axios.delete(
          `${uri}usuario/usuariosprivadas/${id}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        if (response.data.success) {
          location.reload();
        }
      } catch (error) {
        swal({
          title: 'Error',
          text: error.message,
          icon: 'error',
          buttons: 'Aceptar'
        })
      }
    }
  };
  const handleResetPassword = async (id) => {
    const confirm = window.confirm(
      "¿Seguro que quieres Restaurar el password?"
    );
    if (confirm) {
      try {
        const response = await axios.post(
          `${uri}usuario/usuariosprivadasr`,
          { id: id },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        if (response.data.success) {
          location.reload();
        }
      } catch (error) {
        if (error.response && !error.response.data.success) {
          swal({
            title: 'Error',
            text: error.response.data.error,
            icon: 'error',
            buttons: 'Aceptar'
          })          
          location.reload();
        } else {
          swal({
            title: 'Error',
            text: error.message,
            icon: 'error',
            buttons: 'Aceptar'
          })
          location.reload();
        }
      }
    }
  };
  return (
    <div className="flex space-x-1">
      <button
        className="px-3 py-1 bg-red-600 text-white"
        onClick={() => handleDelete(_id)}
      >
        Eliminar
      </button>
      <button
        className="px-3 py-1 bg-yellow-500 text-white"
        onClick={() => handleResetPassword(_id)}
      >
        Restaurar Password
      </button>
    </div>
  );
};
