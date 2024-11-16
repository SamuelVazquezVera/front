import React, { useState } from "react";
import { useAuth } from "../../context/authContext";
import { useNavigate } from "react-router-dom";
import Datepicker from "react-tailwindcss-datepicker";
import axios from "axios";

const AdminPaseCreate = () => {
  const { user } = useAuth();
  const [value, setValue] = useState({
    startDate: null,
    endDate: null,
  });
  const [moroso, setMoroso] = useState("");
  const [solicitante, setSolicitante] = useState("");
  const [casa, setCasa] = useState(0);
  const [movimiento, setMovimiento] = useState("");
  const uri = import.meta.env.VITE_API_URL

  const navigate = useNavigate();
  const returnToView = (url) => {
    navigate(url);
  };
  const handleCasaChange = (e) => {
    setCasa(e.target.value);
  };
  const handleSolicitanteChange = (e) => {
    setSolicitante(e.target.value);
  };
  const handleMovimientoChange = (e) => {
    setMovimiento(e.target.value);
  };
  const handleMorosochange = (e) => {
    setMoroso(e.target.value);
  };
  const handleSubmit = async (e) => {
    try {
      let fechaValido = value.startDate;
      let now = new Date();
      let yearValido = fechaValido.getFullYear();
      let monthValido = fechaValido.getMonth();
      let dayValido = fechaValido.getDate();

      let yearNow = now.getFullYear();
      let monthNow = now.getMonth();
      let dayNow = now.getDate();

      if (
        yearValido >= yearNow &&
        monthValido >= monthNow &&
        dayValido >= dayNow
      ) {
        monthValido = monthValido + 1;
        const month = monthValido < 10 ? "0" + monthValido : monthValido;
        const day = dayValido < 10 ? "0" + dayValido : dayValido;
        let fechaV = day + "/" + month + "/" + yearValido;
        let objAgregarPase = {
          fecha: fechaV,
          privada: user.privada,
          solicitante: solicitante,
          casa: casa,
          movimiento: movimiento,
          elabora: user.nombre,
          esMoroso: moroso === "si" ? true : false,
        };
        const response = await axios.post(
          `${uri}pase/addpase`,
          objAgregarPase,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        if (response.data.success) {
          returnToView("/admin/verpase");
        }
      } else {
        alert("No se pueden crear Pases de accesos con fechas pasadas");
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
    <div className="max-3-3xl mx-auto mt-10 bg-white P-8 rounded-md shadow-md W-96">
      <form className="max-w-md mx-auto">
        <h2 className="text-2xl font-bold mb-6">Agregar Nuevo Pase </h2>
        <div className="relative z-0 w-full mb-5 group">
          <input
            type="texto"
            name="privada"
            id="privada"
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2
             border-gray-300 appearance-none dark:text-white dark:border-gray-600
              dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            placeholder=" "
            required
            readOnly
            value={user.privada}
            disabled
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
          <input
            type="texto"
            name="datospropietario"
            id="datospropietario"
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2
             border-gray-300 appearance-none dark:text-white dark:border-gray-600
              dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            placeholder=" "
            required
            onChange={handleSolicitanteChange}
            autoComplete="off"
          />
          <label
            htmlFor="datospropietario"
            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 
            duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] 
            peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 
            peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Dato del Propietario / Administrador
          </label>
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
            autoComplete="off"
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
            type="texto"
            name="tipomovimiento"
            id="tipomovimiento"
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2
             border-gray-300 appearance-none dark:text-white dark:border-gray-600
              dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            placeholder=" "
            required
            onChange={handleMovimientoChange}
            autoComplete="off"
          />
          <label
            htmlFor="tipomovimiento"
            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 
            duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] 
            peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 
            peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Tipo de Movimiento
          </label>
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
            value={user.nombre}
          />
          <label
            htmlFor="nombre"
            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Nombre de quien lo crea
          </label>
        </div>
        <div className="relative z-0 w-full mb-5 group">
          <Datepicker
            required
            useRange={false}
            asSingle={true}
            value={value}
            onChange={(newValue) => setValue(newValue)}
            showShortcuts={false}
            displayFormat="DD/MM/YYYY"
            placeholder="Selecciona la fecha del pase"
            inputClassName="w-full rounded-md focus:ring-0 text-2xl 
                placeholder:text-blue-700 text-gray-700 dark:bg-blue-900 dark:placeholder:text-blue-100"
          />
        </div>
        <div className="gflex space-x-1">
          <button
            type="button"
            onClick={handleSubmit}
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

export default AdminPaseCreate;
