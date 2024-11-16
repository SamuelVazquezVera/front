import React, { useState, useEffect } from "react";
import { useAuth } from "../../context/authContext";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const AdminUpdate = () => {
  const navigate = useNavigate();
  const returnToView = (url) => {
    navigate(url);
  };
  const [userLoading, setUserLoading] = useState(false);
  const { user } = useAuth;
  const [usr, setUsr] = useState({});
  const [role, setRole] = useState("");
  const [moroso, setMoroso] = useState("");
  const { id } = useParams();
  const uri = import.meta.env.VITE_API_URL

  const handleRolechange = (e) => {
    setRole(e.target.value);
  };
  const handleMorosochange = (e) => {
    setMoroso(e.target.value);
  };

  useEffect(() => {
    const usuario = async () => {
      setUserLoading(true);
      try {
        const response = await axios.post(
          `${uri}usuario/usuarioprivada`,
          { id: id },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        if (response.data.success) {
          setUsr(response.data.user);
          const m = response.data.user.esMoroso ? "si" : "no";
          setRole(response.data.user.role);
          setMoroso(m);
        }
      } catch (error) {
        alert(error.message);
      } finally {
        setUserLoading(false);
      }
    };
    usuario();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (moroso === "si" && role === "admin") {
        alert("Un moroso no puede ser administrador");
      } else {
        const response = await axios.post(
          `${uri}usuario/changeusuario`,
          {
            id: id,
            role: role,
            moroso: moroso === "si" ? true : false,
          },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        if (response.data.success) {
          returnToView("/admin");
        }
      }
    } catch (error) {
      if (error.response && !error.response.data.success) {
        alert(error.response.data.error);
        location.reload();
      } else {
        alert(error.message);
        location.reload();
      }
    }
  };

  return (
    <>
      {userLoading ? (
        <div>Cargando ...</div>
      ) : (
        <div className="max-3-3xl mx-auto mt-10 bg-white P-8 rounded-md shadow-md W-96">
          <form className="max-w-md mx-auto" onSubmit={handleSubmit}>
            <h2 className="text-2xl font-bold mb-6">Modificar Usuario</h2>
            <div className="relative z-0 w-full mb-5 group">
              <input
                type="text"
                name="nombre"
                id="nombre"
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2
                    border-gray-300 appearance-none dark:text-white dark:border-gray-600
                    dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder=" "
                required
                value={usr.nombre}
                readOnly
              />
              <label
                htmlFor="nombre"
                className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 
                    duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] 
                    peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 
                    peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                Nombre
              </label>
            </div>
            <div className="relative z-0 w-full mb-5 group">
              <input
                type="number"
                name="casa"
                id="casa"
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2
                    border-gray-300 appearance-none dark:text-white dark:border-gray-600
                    dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder=" "
                required
                value={usr.casa}
                readOnly
              />
              <label
                htmlFor="casa"
                className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 
                    duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] 
                    peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 
                    peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                Casa
              </label>
            </div>
            <div className="relative z-0 w-full mb-5 group">
              <input
                type="text"
                name="privada"
                id="privada"
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2
                    border-gray-300 appearance-none dark:text-white dark:border-gray-600
                    dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder=" "
                required
                value={usr.privada}
                readOnly
              />
              <label
                htmlFor="privada"
                className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 
                    duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] 
                    peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 
                    peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                Privada
              </label>
            </div>
            <div className="relative z-0 w-full mb-5 group">
              <label
                htmlFor="roles"
                className="block mb-2 text-sm font-medium text-gray-600 dark:text-white"
              >
                Selecciona el tipo de usuario
              </label>
              <select
                id="roles"
                className="bg-gray-50 border border-gray-300 text-gray-600 text-sm rounded-lg
                focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5
                dark:bg-gray-700 dark:border-gray-300 dark:placeholder-gray-400
                    dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                required
                onChange={handleRolechange}
                value={role}
              >
                <option key="" value="">
                  Seleccione el tipo de usuario
                </option>
                <option key="admin" value="admin">
                  admin
                </option>
                <option key="residente" value="residente">
                  residente
                </option>
              </select>
            </div>
            <div className="relative z-0 w-full mb-5 group">
              <label
                htmlFor="roles"
                className="block mb-2 text-sm font-medium text-gray-600 dark:text-white"
              >
                ¿Es Moroso?
              </label>
              <select
                id="roles"
                className="bg-gray-50 border border-gray-300 text-gray-600 text-sm rounded-lg
                focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5
                dark:bg-gray-700 dark:border-gray-300 dark:placeholder-gray-400
                    dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                required
                onChange={handleMorosochange}
                value={moroso}
              >
                <option key="" value="">
                  Seleccione si es moroso
                </option>
                <option key="si" value="si">
                  Si
                </option>
                <option key="no" value="no">
                  No
                </option>
              </select>
            </div>
            <div className="gflex space-x-1">
              <button
                type="submit"
                className="text-white bg-blue-400 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 
                    font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700
                    dark:focus:ring-blue-800"
              >
                Modificar
              </button>
              <button
                type="button"
                onClick={() => returnToView("/admin")}
                className="text-white bg-red-500 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-blue-300 
                    font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700
                    dark:focus:ring-blue-800 "
              >
                Cancelar
              </button>
            </div>
          </form>
        </div>
      )}
    </>
  );
};

export default AdminUpdate;
