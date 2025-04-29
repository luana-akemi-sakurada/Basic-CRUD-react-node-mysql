import React from 'react'
import { useState } from 'react'
import axios from 'axios' 
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';

const Update = () => {

  const [users, setUsers] = useState({ 
    email: "",
    password: "", 
  });

  const navigate = useNavigate(); // hook para navegar entre as páginas

  const location = useLocation(); // hook para pegar o id

  const id = location.pathname.split("/")[2];

  const handleChange = (e) => { // função para pegar o valor do input
    setUsers({...users, [e.target.name]: e.target.value}); 
  }

  const handleClick = async e => {
    try {
      await axios.put("http://localhost:8000/users/"+ id, users); // update para o backend
      navigate("/")
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <div className='add'>
      <h1>Editar um usuario</h1>
      <input type="text" placeholder='email' onChange={handleChange} name='email'/> 
      <input type="text" placeholder='password' onChange={handleChange} name='password'/> 
      <button className='formButton' onClick={handleClick}>Editar</button>
    </div>
  )
}

export default Update