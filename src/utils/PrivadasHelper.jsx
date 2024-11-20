import axios from "axios";

const uri = import.meta.env.VITE_API_URL
export const Privadas = async () => {
  let privadas;
  try {
    const response = await axios.get(
      `${uri}privada/privadas`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    if (response.data.success) {
      privadas = response.data.privadas;
    }
  } catch (error) {
    swal({
      title: 'Error',
      text: error.message,
      icon: 'error',
      buttons: 'Aceptar'
    })
  }
  return privadas;
};
export const PrivadasSeguridad = async () => {
  let privadas;
  try {
    const response = await axios.get(
      `${uri}privada/privadaseguridad`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    if (response.data.success) {
      privadas = response.data.privadas;
    }
  } catch (error) {
    swal({
      title: 'Error',
      text: error.message,
      icon: 'error',
      buttons: 'Aceptar'
    })
  }
  return privadas;
};
