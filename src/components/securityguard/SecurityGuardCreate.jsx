import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { PrivadasSeguridad } from "../../utils/PrivadasHelper";
import axios from "axios";

const SecurityGuardCreate = () => {
  const [privadas, setPrivadas] = useState([]);
  const [casa, setCasa] = useState(0);
  const [nombrePrivada, setNombrePrivada] = useState("");
  const [nombreVisita, setNombreVisita] = useState("");
  const [motivo, setMotivo] = useState("");
  const [ficha, setFicha] = useState("");
  const [placa, setPlaca] = useState("");
  const [marca, setMarca] = useState("");
  const [color, setColor] = useState("");
  const [hora, setHora] = useState("");
  const uri = import.meta.env.VITE_API_URL

  useEffect(() => {
    const getPrivadas = async () => {
      const priv = await PrivadasSeguridad();
      setPrivadas(priv);
    };
    getPrivadas();
  }, []);

  const navigate = useNavigate();

  const returnToView = (url) => {
    navigate(url);
  };
  const handleNombreVisita = (e) => {
    setNombreVisita(e.target.value);
  };
  const handleNombrePrivada = (e) => {
    let index = e.target.selectedIndex;
    setNombrePrivada(e.target.options[index].text);
  };
  const handleCasaChange = (e) => {
    setCasa(e.target.value);
  };
  const handleMotivo = (e) => {
    setMotivo(e.target.value);
  };
  const handleFicha = (e) => {
    setFicha(e.target.value);
  };
  const handlePlaca = (e) => {
    setPlaca(e.target.value);
  };
  const handleMarca = (e) => {
    setMarca(e.target.value);
  };
  const handleColor = (e) => {
    setColor(e.target.value);
  };
  const handleHora = (e) => {
    setHora(e.target.value);
  };
  const handleSubmit = async (e) => {
    try {
      let now = new Date();
      let yearNow = now.getFullYear();
      let monthNow = now.getMonth();
      let dayNow = now.getDate();

      monthNow = monthNow + 1;
      const month = monthNow < 10 ? "0" + monthNow : monthNow;
      const day = dayNow < 10 ? "0" + dayNow : dayNow;
      let fechaV = day + "/" + month + "/" + yearNow;
      let objAgregarVisitante = {
        fecha: fechaV,
        privada: nombrePrivada,
        nombreVisita: nombreVisita,
        casa: casa,
        motivo: motivo,
        placa: placa,
        marca: marca,
        color: color,
        hora: hora,
        ficha: ficha,
      };
      const response = await axios.post(
        `${uri}visitante/addvisitante`,
        objAgregarVisitante,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (response.data.success) {
        returnToView("/seguridad");
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
      <form className="max-w-md mx-auto" onSubmit={handleSubmit}>
        <h2 className="text-2xl font-bold mb-6">Agregar Nueva Visita</h2>
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
            onChange={handleNombreVisita}
            autoComplete="off"
          />
          <label
            htmlFor="floating_repeat_password"
            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            nombre
          </label>
        </div>
        <div className="relative z-0 w-full mb-5 group">
          <label
            htmlFor="privadas"
            className="block mb-2 text-sm font-medium text-gray-600 dark:text-white"
          >
            Dirección
          </label>
          <select
            id="privadas"
            className="bg-gray-50 border border-gray-300 text-gray-600 text-sm rounded-lg
           focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5
           dark:bg-gray-700 dark:border-gray-300 dark:placeholder-gray-400
            dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            required
            onChange={handleNombrePrivada}
          >
            <option value="">Dirección</option>
            {privadas.map((privada) => (
              <option key={privada.idprivada} value={privada.idprivada}>
                {privada.nombre}
              </option>
            ))}
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
            type="text"
            name="motivo"
            id="motivo"
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2
             border-gray-300 appearance-none dark:text-white dark:border-gray-600
             dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            placeholder=" "
            required
            autoComplete="off"
            onChange={handleMotivo}
          />
          <label
            htmlFor="floating_repeat_password"
            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Motivo
          </label>
        </div>
        <div className="relative z-0 w-full mb-5 group">
          <input
            type="text"
            name="ficha"
            id="ficha"
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2
             border-gray-300 appearance-none dark:text-white dark:border-gray-600
             dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            placeholder=" "
            onChange={handleFicha}
            autoComplete="off"
          />
          <label
            htmlFor="floating_repeat_password"
            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Ficha
          </label>
        </div>
        <div className="relative z-0 w-full mb-5 group">
          <input
            type="text"
            name="placa"
            id="placa"
            onChange={handlePlaca}
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2
             border-gray-300 appearance-none dark:text-white dark:border-gray-600
             dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            placeholder=" "
            autoComplete="off"
          />
          <label
            htmlFor="floating_repeat_password"
            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Placa
          </label>
        </div>
        <div className="relative z-0 w-full mb-5 group">
          <input
            type="text"
            name="marca"
            id="marca"
            onChange={handleMarca}
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2
             border-gray-300 appearance-none dark:text-white dark:border-gray-600
             dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            placeholder=" "
            autoComplete="off"
          />
          <label
            htmlFor="floating_repeat_password"
            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Marca
          </label>
        </div>
        <div className="relative z-0 w-full mb-5 group">
          <input
            type="text"
            name="color"
            id="color"
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2
             border-gray-300 appearance-none dark:text-white dark:border-gray-600
             dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            placeholder=" "
            onChange={handleColor}
            autoComplete="off"
          />
          <label
            htmlFor="floating_repeat_password"
            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Color
          </label>
        </div>
        <div className="relative z-0 w-full mb-5 group">
          <input
            type="text"
            name="hora"
            id="hora"
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2
             border-gray-300 appearance-none dark:text-white dark:border-gray-600
             dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            placeholder=" "
            onChange={handleHora}
            autoComplete="off"
          />
          <label
            htmlFor="floating_repeat_password"
            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Hora
          </label>
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
        </div>
      </form>
    </div>
  );
};

export default SecurityGuardCreate;
