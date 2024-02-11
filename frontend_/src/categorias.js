import CategoriaList from "./categoria";
import React, {useState, useEffect} from "react";

function Categorias(){
    const [categorias, setdata] = useState([]);

  useEffect(() =>{
    fetch("http://localhost:5000/categorias",
    {'methods':'GET',
    headers:
    {
      'Content-Type':'application/json'
    }
    })
    .then(response => response.json())
    .then(response => setdata(response))
    .catch(error => console.log(error))
  },[]);

  return (
    <CategoriaList 
    categorias={categorias}/>
  );

}


export default Categorias;
