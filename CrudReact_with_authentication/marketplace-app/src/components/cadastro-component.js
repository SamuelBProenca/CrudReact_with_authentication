import React, { useState } from 'react';
import axios from 'axios';

const CadastroUsuarioForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');

  const handleCadastro = async (e) => {
    e.preventDefault();

    try {
      // Enviar dados do formulário para o backend
      const response = await axios.post('http://localhost:4000/users/register', {
        email: email,
        username: username,
        password: password,
      });
      
      console.log(response.data); // Exemplo de tratamento de resposta
    } catch (error) {
      console.error(error); // Tratamento de erros
    }
  };

  return (
    <form >
      <label htmlFor="username">Usuário:</label>
      <input
        type="text"
        id="username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />

      <label htmlFor="password">Senha:</label>
      <input
        type="password"
        id="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <label htmlFor="email">Email:</label>
      <input
        type="email"
        id="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <button type="button" onClick={handleCadastro}>Cadastrar</button>
    </form>
  );
};

export default CadastroUsuarioForm;
