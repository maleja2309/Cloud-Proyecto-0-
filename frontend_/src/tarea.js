import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import TareasList from "./tareas";
import { useAuth } from "./Auth_token";

function Tareas() {
  const { id } = useParams();
  const { auth} = useAuth(); 
  const [tareas, setdata] = useState([]);
  useEffect(() => {
    const fetchTareas = async () => {
      try {
        const URL = "http://localhost:5000/usuario/" + id + '/tareas';
        console.log(`Bearer ${auth}`);
        const response = await fetch(URL,
          {
            method: 'GET',
            mode:'cors',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${auth}`
          },});

        const data = await response.json();
        setdata(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchTareas();
  }, [id]);

  

  return (
    <TareasList
      tareas={tareas} />);
}

export default Tareas;

