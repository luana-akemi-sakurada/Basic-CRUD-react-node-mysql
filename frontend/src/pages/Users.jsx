import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import axios from 'axios' 
import { Link } from 'react-router-dom';



const Users = () => {
    const [users, setUsers] = useState([]); // useState para armazenar os users

    useEffect(() => {
        const fetchAllUsers = async () => {
          try {
            const res = await axios.get("http://localhost:8000/users"); // get para o backend
            setUsers(res.data); 
          } catch (err) {
            console.log(err)
          }
        };
        fetchAllUsers();
      }, []);

      const handleDelete = async (id) => { // função para deletar um users
        try {
          await axios.delete(`http://localhost:8000/users/${id}`); // delete para o backend
          window.location.reload();
        } catch (err) {
          console.log(err)
        }
      };


  return (
    <div>
      <h1>
        users lista
      </h1>
      <div className='users'>
        {users.map((users) => ( // map para percorrer os users
          <div className='users' key={users.id}>
            <h3>{users.email}</h3>
            <p>{users.password}</p>
            <button className='delete' onClick={() => handleDelete(users.id)}>Deletar</button>
            <button className='update'> <Link to={`/update/${users.id}`}> Editar </Link> </button>
          </div>
        ))}
      </div>
        <button> 
          <Link to="/add"> Adicionar </Link> 
        </button>
    </div>
  )
}

export default Users