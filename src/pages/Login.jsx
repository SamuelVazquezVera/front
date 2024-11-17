import React, { useContext, useState } from "react";
import axios from "axios";
import { useAuth } from "../context/authContext";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [nombre, setNombre] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const { login } = useAuth();
  const navigate = useNavigate();
  const uri = import.meta.env.VITE_API_URL

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${uri}auth/login`,
        {
          nombre,
          password,
        }
      );
      if (response.data.success) {
        login(response.data.user);
        localStorage.setItem("token", response.data.token);
        e.target.reset();
        if (response.data.user.role === "superadmin") {
          navigate("/admin-general");
        } else if (response.data.user.role === "admin") {
          if (response.data.user.primeraVez) {
            navigate("/admin/cambiar");
          } else {
            navigate("/admin");
          }
        } else if (response.data.user.role === "residente") {
          if (response.data.user.primeraVez) {
            navigate("/residente/cambiar");
          } else {
            navigate("/residente");
          }
        } else if (response.data.user.role === "seguridad") {
          if (response.data.user.primeraVez) {
            navigate("/seguridad/cambiar");
          } else {
            navigate("/seguridad");
          }
        } else {
          navigate("/error");
        }
      }
    } catch (error) {
      e.target.reset();
      if (error.response && !error.response.data.success) {
        setError(error.response.data.error);
      } else {
        setError("Error de comunicación");
      }
    }
  };
  return (    
    <div    
      className="min-h-screen flex flex-col items-center h-screen justify-center bg-gradient-to-r from-gray-300 from-10%
    via-gray-200 via-70%"
    >
      
      <h2 className="font-pacific text-3xl text-white">Login</h2>
      <div className="border shadow p-6 w-80 bg-white">
        <h2 className="text-2xl font-bold mb-4"></h2>
        {error && <p className="text-red-500">{error}</p>}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="Nombre" className="block text-gray-700">
              Nombre
            </label>
            <input
              type="text"
              className="w-full px-3 py-2 border"
              placeholder="Ingrese el nombre registrado"
              onChange={(e) => setNombre(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="Contraseña" className="block text-gray-700">
              Contraseña
            </label>
            <input
              type="password"
              className="w-full px-3 py-2 border"
              placeholder="******"
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <button
              type="submit"
              className="w-full bg-cyan-500 text-white py-2"
            >
              Ingresar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
