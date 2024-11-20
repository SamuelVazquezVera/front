import React, { useEffect, useState } from "react";
import { useAuth } from "../../context/authContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import swal from 'sweetalert'

const AdminCreate = () => {
  const { user } = useAuth();
  const [privada, setPrivada] = useState("");
  const [casa, setCasa] = useState(0);
  const [nombrePrivada, setNombrePrivada] = useState("");
  const [nombreUsuario, setNombreUsuario] = useState("");
  const [role, setRole] = useState("");
  const [moroso, setMoroso] = useState("");
  const uri = import.meta.env.VITE_API_URL;

  let nomUsuario;
  const navigate = useNavigate();
  const returnToView = (url) => {
    navigate(url);
  };
  const handlePrivadaChange = (e) => {
    let index = e.target.selectedIndex;
    nomUsuario = e.target.options[index].text + casa;
    setNombrePrivada(e.target.options[index].text);
    setPrivada(e.target.value);
    setNombreUsuario(nomUsuario);
  };
  const handleCasaChange = (e) => {
    nomUsuario = nombrePrivada + e.target.value;

    setCasa(e.target.value);
    setNombreUsuario(nomUsuario);
  };
  const handleRolechange = (e) => {
    setRole(e.target.value);
  };
  const handleMorosochange = (e) => {
    setMoroso(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (casa === "0") {
        swal({
          title: 'Error',
          text: 'El numero de casa no puede ser 0',
          icon: 'error',
          buttons: 'Aceptar'
        })        
      } else if (moroso === "si" && role === "admin") {
        swal({
          title: 'Error',
          text: 'Un moroso no puede ser administrador',
          icon: 'error',
          buttons: 'Aceptar'
        })
      } else {
        let objAgregar = {
          idPrivada: privada,
          casa: casa,
          role: role,
          nombreusuario: nombreUsuario,
          esMoroso: moroso === "si" ? true : false,
        };
        const response = await axios.post(
          `${uri}usuario/addusuarioprivada`,
          objAgregar,
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
  };

  return (
    <div className="max-3-3xl mx-auto mt-10 bg-white P-8 rounded-md shadow-md W-96">
      <form className="max-w-md mx-auto" onSubmit={handleSubmit}>
        <h2 className="text-2xl font-bold mb-6">Agregar Nuevo Usuario</h2>
        <div className="relative z-0 w-full mb-5 group">
          <label
            htmlFor="privada"
            className="block mb-2 text-sm font-medium text-gray-600 dark:text-white"
          >
            Selecciona la privada
          </label>
          <select
            id="privadas"
            className="bg-gray-50 border border-gray-300 text-gray-600 text-sm rounded-lg
           focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5
           dark:bg-gray-700 dark:border-gray-300 dark:placeholder-gray-400
            dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            onChange={handlePrivadaChange}
            required
          >
            <option value="">Selecciona una privada</option>
            <option key={user.idprivada} value={user.idprivada}>
              {user.privada}
            </option>
          </select>
        </div>
        <div className="relative z-0 w-full mb-5 group">
          <input
            type="number"
            name="casa"
            id="casa"
            onChange={handleCasaChange}
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2
             border-gray-300 appearance-none dark:text-white dark:border-gray-600
              dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            placeholder=" "
            required
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
            name="nombre"
            id="nombre"
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2
             border-gray-300 appearance-none dark:text-white dark:border-gray-600
             dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            placeholder=" "
            required=""
            disabled
            value={nombreUsuario}
          />
          <label
            htmlFor="nombre"
            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            nombre
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
            Agregar
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
  );
};

export default AdminCreate;
