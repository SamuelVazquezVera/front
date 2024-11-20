import React, { useEffect, useState } from "react";
import axios from "axios";
import { SeguridadButtons } from "../../utils/UsuarioHelper";

const SecurityGuardViewRegister = () => {
  const [visitafilter, setVisitaFilter] = useState([]);
  const [visitas, setVisitas] = useState([]);
  const [visitasLoading, setVisitasLoading] = useState(false);
  const uri = import.meta.env.VITE_API_URL

  useEffect(() => {
    const visitas = async () => {
      setVisitasLoading(true);
      try {
        let now = new Date();
        let yearNow = now.getFullYear();
        let monthNow = now.getMonth();
        let dayNow = now.getDate();
        monthNow = monthNow + 1;
        const month = monthNow < 10 ? "0" + monthNow : monthNow;
        const day = dayNow < 10 ? "0" + dayNow : dayNow;
        let fecha = day + "/" + month + "/" + yearNow;
        const response = await axios.post(
          `${uri}visitante/getvisitantes`,
          {
            fecha: fecha,
          },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        if (response.data.success) {
          const data = await response.data.visitantes.map((visita) => ({
            id: visita._id,
            nombre: visita.nombreVisita,
            direccion: visita.nombrePrivada,
            casa: visita.casa,
            motivo: visita.motivo,
            ficha: visita.ficha,
            placa: visita.placa,
            marca: visita.marca,
            color: visita.color,
            hora: visita.hora,
            privadaVisitante: visita.nombrePrivada + " " + visita.casa,
          }));
          setVisitas(data);
          setVisitaFilter(data);
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

  const filtrarVisitas = (e) => {
    const filterVisitas = visitas.filter((v) =>
      v.privadaVisitante.toLowerCase().includes(e.target.value.toLowerCase())
    );
    setVisitaFilter(filterVisitas);
  };

  return (
    <>
      {visitasLoading ? (
        <div>Cargando ...</div>
      ) : (
        <div className=" p-5 max-3-3xl mx-auto mt-10 bg-white P-8 rounded-md shadow-md W-96">
          <div className="flex justify-between items-center">
            <input
              type="text"
              placeholder="Buscar por dirección"
              onChange={filtrarVisitas}
              className="px-6 py-0.5 border"
            />
          </div>
          <section className="md:h-full flex items-center">
            <div className="container px-5 py-24 mx-auto">
              <div className="flex flex-wrap -m-4">
                {visitafilter.map((visita) => (
                  <div key={visita.id} className="p-4 sm:w-1/2 lg:w-1/3">
                    <div className="h-full border-2 border-gray-200 border-opacity-60 rounded-lg overflow-hidden bg-cyan-100">
                      <h2 className="font-bold text-2xl text-black mb-3 ">
                        Nombre:
                        <span className=" text-gray-600">
                          {" "}
                          {visita.nombre}{" "}
                        </span>
                      </h2>
                      <h2 className="font-bold text-2xl text-black mb-3 ">
                        {" "}
                        Dirección:
                        <span className=" text-gray-600">
                          {" "}
                          {visita.direccion}{" "}
                        </span>
                      </h2>
                      <h2 className="font-bold text-2xl text-black mb-3 ">
                        {" "}
                        Casa:
                        <span className=" text-gray-600"> {visita.casa} </span>
                      </h2>
                      <h2 className="font-bold text-2xl text-black mb-3 ">
                        {" "}
                        Motivo:
                        <span className=" text-gray-600">
                          {" "}
                          {visita.motivo}{" "}
                        </span>
                      </h2>
                      <h2 className="font-bold text-2xl text-black mb-3 ">
                        {" "}
                        Ficha:
                        <span className=" text-gray-600"> {visita.ficha} </span>
                      </h2>
                      <h2 className="font-bold text-2xl text-black mb-3 ">
                        {" "}
                        Placa:
                        <span className=" text-gray-600"> {visita.placa} </span>
                      </h2>
                      <h2 className="font-bold text-2xl text-black mb-3 ">
                        {" "}
                        Marca:
                        <span className=" text-gray-600"> {visita.marca} </span>
                      </h2>
                      <h2 className="font-bold text-2xl text-black mb-3 ">
                        {" "}
                        Color:
                        <span className=" text-gray-600"> {visita.color} </span>
                      </h2>
                      <h2 className="font-bold text-2xl text-black mb-3 ">
                        {" "}
                        Hora:
                        <span className=" text-gray-600"> {visita.hora} </span>
                      </h2>
                      <SeguridadButtons _id={visita.id} />
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

export default SecurityGuardViewRegister;
