import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const SecurityGuardUpdate = () => {
  const { id } = useParams();
  const [visitasLoading, setVisitasLoading] = useState(false);
  const [nombreVisita, setNombreVisita] = useState("");
  const [ficha, setFicha] = useState("");
  const [placa, setPlaca] = useState("");
  const [marca, setMarca] = useState("");
  const [color, setColor] = useState("");
  const [hora, setHora] = useState("");
  const [casa, setCasa] = useState(0);
  const [nombrePrivada, setNombrePrivada] = useState("");
  const [motivo, setMotivo] = useState("");
  const uri = import.meta.env.VITE_API_URL

  const navigate = useNavigate();

  const returnToView = (url) => {
    navigate(url);
  };
  const handleNombreVisita = (e) => {
    setNombreVisita(e.target.value);
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

  useEffect(() => {
    const visitas = async () => {
      setVisitasLoading(true);
      try {
        const response = await axios.get(
          `${uri}visitante/getvisitante/${id}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        if (response.data.success) {
          const data = await response.data.visitante;
          setNombreVisita(data.nombreVisita);
          setNombrePrivada(data.nombrePrivada);
          setCasa(data.casa);
          setMotivo(data.motivo);
          setFicha(data.ficha);
          setPlaca(data.placa);
          setMarca(data.marca);
          setColor(data.color);
          setHora(data.hora);
        }
      } catch (error) {
        swal({
          title: 'Error',
          text: error.message,
          icon: 'error',
          buttons: 'Aceptar'
        })
      } finally {
        setVisitasLoading(false);
      }
    };
    visitas();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const objModify = {
        id: id,
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
        `${uri}visitante/modifyvisitante`,
        objModify,
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
    <>
      {visitasLoading ? (
        <div>Cargando ...</div>
      ) : (
        <div className="max-3-3xl mx-auto mt-10 bg-white P-8 rounded-md shadow-md W-96">
          <form className="max-w-md mx-auto" onSubmit={handleSubmit}>
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
                autoComplete="off"
                onChange={handleNombreVisita}
                value={nombreVisita}
              />
              <label
                htmlFor="nombre"
                className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                nombre
              </label>
            </div>
            <div className="relative z-0 w-full mb-5 group">
              <input
                type="text"
                name="direccion"
                id="direccion"
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2
                border-gray-300 appearance-none dark:text-white dark:border-gray-600
                dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder=" "
                required=""
                disabled
                value={nombrePrivada}
                autoComplete="off"
                readOnly
              />
              <label
                htmlFor="direccion"
                className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                Dirección
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
                autoComplete="off"
                disabled
                value={casa}
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
                name="motivo"
                id="motivo"
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2
                border-gray-300 appearance-none dark:text-white dark:border-gray-600
                dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder=" "
                required
                autoComplete="off"
                disabled
                value={motivo}
                readOnly
              />
              <label
                htmlFor="motivo"
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
                autoComplete="off"
                onChange={handleFicha}
                value={ficha}
              />
              <label
                htmlFor="ficha"
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
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2
                border-gray-300 appearance-none dark:text-white dark:border-gray-600
                dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder=" "
                value={placa}
                autoComplete="off"
                onChange={handlePlaca}
              />
              <label
                htmlFor="placa"
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
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2
                border-gray-300 appearance-none dark:text-white dark:border-gray-600
                dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder=" "
                autoComplete="off"
                value={marca}
                onChange={handleMarca}
              />
              <label
                htmlFor="marca"
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
                autoComplete="off"
                value={color}
                onChange={handleColor}
              />
              <label
                htmlFor="color"
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
                autoComplete="off"
                value={hora}
                onChange={handleHora}
              />
              <label
                htmlFor="hora"
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
                Modificar
              </button>
              <button
                type="button"
                onClick={() => returnToView("/seguridad")}
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

export default SecurityGuardUpdate;
