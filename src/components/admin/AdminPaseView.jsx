import React, { useEffect, useState } from "react";
import axios from "axios";
import { AdminPaseButtons } from "../../utils/UsuarioHelper";
import { useAuth } from "../../context/authContext";

const AdminPaseView = () => {
  const [pasefilter, setPaseFilter] = useState([]);
  const [pases, setPases] = useState([]);
  const [pasesLoading, setPasesLoading] = useState(false);
  const { user } = useAuth();
  const uri = import.meta.env.VITE_API_URL

  useEffect(() => {
    const pases = async () => {
      setPasesLoading(true);
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
          `${uri}pase/extraer`,
          {
            fecha: fecha,
            privada: user.privada,
          },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        if (response.data.success) {
          const data = await response.data.pases.map((pase) => ({
            _id: pase._id,
            nombreSolicitante: pase.datoSolicitante,
            casa: pase.casa,
            privada: pase.nombrePrivada,
            elaboro: pase.userSolicitante,
            esMoroso: pase.esMoroso,
            moroso: pase.esMoroso ? "Si" : "No",
            movimiento: pase.tipoMovimiento,
          }));
          setPases(data);
          setPaseFilter(data);
        }
      } catch (error) {
        alert(error.message);
      } finally {
        setPasesLoading(false);
      }
    };
    pases();
  }, []);
  const filtrarPases = (e) => {
    const filterPases = pases.filter((p) =>
      p.casa.toString().includes(e.target.value)
    );
    setPaseFilter(filterPases);
  };

  return (
    <div className=" p-5 max-3-3xl mx-auto mt-10 bg-white P-8 rounded-md shadow-md W-96">
      <div className="text-center">
        <h3 className="text-2xl font-bold">Pases Privada {user.privada}</h3>
      </div>
      <div className="flex justify-between items-center">
        <input
          type="number"
          placeholder="Buscar por casa"
          onChange={filtrarPases}
          className="px-6 py-0.5 border"
        />
      </div>
      <section className="md:h-full flex items-center">
        <div className="container px-5 py-24 mx-auto">
          <div className="flex flex-wrap -m-4">
            {pasefilter.map((pase) => (
              <div key={pase._id} className="p-4 sm:w-1/2 lg:w-1/3">
                <div className="h-full border-2 border-gray-200 border-opacity-60 rounded-lg overflow-hidden bg-cyan-100">
                  <h2 className="font-bold text-2xl text-black mb-3 ">
                    Solicitante:
                    <span className=" text-gray-600">
                      {" "}
                      {pase.nombreSolicitante}{" "}
                    </span>
                  </h2>
                  <h2 className="font-bold text-2xl text-black mb-3 ">
                    {" "}
                    Casa:
                    <span className=" text-gray-600"> {pase.casa} </span>
                  </h2>
                  <h2 className="font-bold text-2xl text-black mb-3 ">
                    Privada:
                    <span className=" text-gray-600"> {pase.privada} </span>
                  </h2>
                  <h2 className="font-bold text-2xl text-black mb-3 ">
                    Elaboró:
                    <span className=" text-gray-600"> {pase.elaboro} </span>
                  </h2>
                  <h2 className="font-bold text-2xl text-black mb-3 ">
                    Movimiento:
                    <span className=" text-gray-600"> {pase.movimiento} </span>
                  </h2>
                  <h2 className="font-bold text-2xl text-black mb-3 ">
                    Moroso:
                    <span
                      className={`${
                        pase.esMoroso ? "text-red-600" : "text-gray-600"
                      }`}
                    >
                      {" "}
                      {pase.moroso}{" "}
                    </span>
                  </h2>
                  <AdminPaseButtons id={pase._id} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default AdminPaseView;
