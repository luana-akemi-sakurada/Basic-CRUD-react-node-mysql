import React from 'react'
import { useState } from 'react'
import axios from 'axios' 
import { useNavigate } from 'react-router-dom';

const Add = () => {

  const [users, setUsers] = useState({ 
    email: "",
    password: "", 
  });

  const navigate = useNavigate(); // hook para navegar entre as páginas

  const handleChange = (e) => { // função para pegar o valor do input
    setUsers({...users, [e.target.name]: e.target.value}); 
  }

  const handleClick = async e => {
    try {
      await axios.post("http://localhost:8000/users", users); // post para o backend
      navigate("/")
    } catch (err) {
      console.log(err)
    }
  }

  console.log(users)

  return (
    <div className='add'>
      <h1>Adicionar um aluno</h1>
      <input type="text" placeholder='email' onChange={handleChange} name='email'/> 
      <input type="text" placeholder='password' onChange={handleChange} name='password'/> 
      <button onClick={handleClick}>Adicionar</button>
    </div>
  )
}

export default Add