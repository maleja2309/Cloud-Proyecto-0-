// Auth_token.js
import React, { useState, createContext, useContext } from "react";
import { useNavigate } from "react-router-dom";
import Authentication from "./Auth";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState(null);
  const [id_, setId] = useState([]);
  const navigate = useNavigate();

  const login = async (userData) => {
    try {
      const response = await fetch("http://localhost:5000/usuarios/iniciar-sesion", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(userData)
      });

      if (response.ok) {
        const data = await response.json();
        console.log(data);
        setAuth(data.token);
        setId(data.id);
        console.log('Token almacenado:', data.token);
        navigate("/usuario/"+ data.id + "/tareas");
      } else {
        console.error('Error al iniciar sesión:', response.statusText);
        alert("Revisar el usuario o la contraseña introducida")
      }
    } catch (error) {
      console.error('Error al realizar la solicitud:', error);
    }
  };

  return (
    <AuthContext.Provider value={{ auth, id_, login, setAuth }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
