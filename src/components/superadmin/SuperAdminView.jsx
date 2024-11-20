import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { UsuarioButtons } from "../../utils/UsuarioHelper";
import swal from 'sweetalert'

const SuperAdminView = () => {
  const [userfiler, setUserFilter] = useState([]);

  const [users, setUsers] = useState([]);
  const [userLoading, setUserLoading] = useState(false);
  const uri = import.meta.env.VITE_API_URL

  useEffect(() => {
    const usuarios = async () => {
      setUserLoading(true);
      try {
        const response = await axios.get(
          `${uri}usuario/usuariosprivadas`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        if (response.data.success) {
          const data = await response.data.usuarios.map((user) => ({
            _id: user._id,
            nombre: user.nombre,
            casa: user.casa,
            privada: user.usuarioPrivada.nombre,
            role: user.role,
          }));
          setUsers(data);
          setUserFilter(data);
        }
      } catch (error) {
        swal({
          title: 'Error',
          text: error.message,
          icon: 'error',
          buttons: 'Aceptar'
        })
      } finally {
        setUserLoading(false);
      }
    };
    usuarios();
  }, []);

  const filtrarUsuarios = (e) => {
    const filterUser = users.filter((u) =>
      u.nombre.toLowerCase().includes(e.target.value.toLowerCase())
    );
    setUserFilter(filterUser);
  };

  return (
    <>
      {userLoading ? (
        <div>Cargando ...</div>
      ) : (
        <div className=" p-5 max-3-3xl mx-auto mt-10 bg-white P-8 rounded-md shadow-md W-96">
          <div className="text-center">
            <h3 className="text-2xl font-bold">
              Usuarios Administradores Privadas
            </h3>
          </div>
          <div className="flex justify-between items-center">
            <input
              type="text"
              placeholder="Buscar por nombre"
              onChange={filtrarUsuarios}
              className="px-6 py-0.5 border"
            />
            <Link
              to="/admin-general/alta"
              className="px-4 py-1 bg-teal-600 rounded text-white"
            >
              Agregar Usuario
            </Link>
          </div>
          <section className="md:h-full flex items-center">
            <div className="container px-5 py-24 mx-auto">
              <div className="flex flex-wrap -m-4">
                {userfiler.map((user) => (
                  <div key={user._id} className="p-4 sm:w-1/2 lg:w-1/3">
                    <div className="h-full border-2 border-gray-200 border-opacity-60 rounded-lg overflow-hidden bg-cyan-100">
                      <h2 className="font-bold text-2xl text-black mb-3 ">
                        Nombre:
                        <span className=" text-gray-600"> {user.nombre} </span>
                      </h2>
                      <h2 className="font-bold text-2xl text-black mb-3 ">
                        {" "}
                        Casa:
                        <span className=" text-gray-600"> {user.casa} </span>
                      </h2>
                      <h2 className="font-bold text-2xl text-black mb-3 ">
                        Privada:
                        <span className=" text-gray-600"> {user.privada} </span>
                      </h2>
                      <h2 className="font-bold text-2xl text-black mb-3 ">
                        Tipo de usuario:
                        <span className=" text-gray-600"> {user.role} </span>
                      </h2>
                      <UsuarioButtons _id={user._id} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </div>
      )}
    </>
  );
};

export default SuperAdminView;
