import React from "react";
import { useAuth } from "../context/authContext";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const ChangePassword = () => {
  const { login } = useAuth();
  const { user } = useAuth();
  const [password, setPassword] = useState("");
  const [passwordChange, setPasswordChange] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const uri = import.meta.env.VITE_API_URL
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (password === passwordChange) {
        const response = await axios.post(
          `${uri}usuario/usuarioprivada/change`,
          {
            id: user.id,
            password,
          },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        if (response.data.success) {
          e.target.reset();
          navigate("/login");
        }
      } else {
        setError("Las contraseña no son iguales");
      }
    } catch (error) {
      if (error.response && !error.response.data.success) {
        setError(error.response.data.error);
      } else {
        setError("Error de comunicación");
      }
    } finally {
      e.target.reset();
    }
  };
  return (
    <div
      className="min-h-screen flex flex-col items-center h-screen justify-center bg-gradient-to-r from-gray-300 from-10%
    via-gray-200 via-70%"
    >
      <h2 className="font-pacific text-3xl text-blue-700">
        Cambiar contraseña
      </h2>
      <div className="border shadow p-6 w-80 bg-white">
        <h2 className="text-2xl font-bold mb-4"></h2>
        {error && <p className="text-red-500">{error}</p>}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="Contraseña" className="block text-gray-700">
              Contraseña
            </label>
            <input
              id="contraseña"
              type="password"
              className="w-full px-3 py-2 border"
              placeholder="******"
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="Contraseñachange" className="block text-gray-700">
              Repetir Contraseña
            </label>
            <input
              id="repetircontraseña"
              type="password"
              className="w-full px-3 py-2 border"
              placeholder="******"
              onChange={(e) => setPasswordChange(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <button
              type="submit"
              className="w-full bg-cyan-500 text-white py-2"
            >
              Cambiar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ChangePassword;
