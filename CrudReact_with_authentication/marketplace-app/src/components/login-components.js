// import '../login.css';
// import axios from "axios";
// import { useState } from "react";

// export default function Login(){
//     const [usuario,setUsuario] = useState('');
//     const [senha,setSenha] = useState('');

//     const handleLogin = (event) => {
//         if(usuario && senha){
//             event.preventDefault();//cancela a submissão externa do form
//             axios.post('http://localhost:4000/users/login',{usuario: usuario, senha: senha},{withCredentials: true}).then(resposta => {
//                 if(resposta.data.token){
//                     sessionStorage.setItem('token', resposta.data.token);
//                     window.location.reload();
//                 }else{
//                     alert(resposta.data.message);
//                 }
//             });
//         }
//     }

//     const handleCad = (event) => {
        
//     }

//     return(
//         <div className="form-login">
//             <h1>Faça Login Com seu User</h1>
//             <form>
//                 <label>Usuário</label>
//                 <input type="text" id="usuario" className='item-form' onChange={(e)=> setUsuario(e.target.value)} required />
//                 <label>Senha</label>
//                 <input type="password" id="senha" className='item-form' onChange={(e)=> setSenha(e.target.value)} required />
//                 <button type="submit" className='item-form' onClick={handleLogin}>Entrar</button>
//             </form>
        
//             <p>Não possui conta?</p>
//             <button type="submit" className='form-cad' onClick={handleCad}>Cadastre-se</button>

//         </div>
        
//     );
// }

import '../login.css';
import axios from "axios";
import { useState } from "react";
import CadastroUsuarioForm from './cadastro-component';

export default function Login() {
  const [usuario, setUsuario] = useState('');
  const [senha, setSenha] = useState('');
  const [cadastroClicked, setCadastroClicked] = useState(false);

  const handleLogin = (event) => {
    if (senha && senha) {
      event.preventDefault();
      axios.post('http://localhost:4000/users/login', { usuario: usuario, senha: senha }, { withCredentials: true }).then(resposta => {
        if (resposta.data.token) {
          sessionStorage.setItem('token', resposta.data.token);
          window.location.reload();
        } else {
          alert(resposta.data.message);
        }
      });
    }
  }

  const handleCad = (event) => {
    event.preventDefault();
    setCadastroClicked(true);
  }

  return (
    <div className="form-login">
      <h1>Faça Login Com seu User</h1>
      <form>
        <label>Usuário</label>
        <input type="text" id="usuario" className='item-form' onChange={(e) => setUsuario(e.target.value)} required />
        <label>Senha</label>
        <input type="password" id="senha" className='item-form' onChange={(e) => setSenha(e.target.value)} required />
        <button type="submit" className='item-form' onClick={handleLogin}>Entrar</button>
      </form>

      <p>Não possui conta?</p>
      <button type="submit" className='form-cad' onClick={handleCad}>Cadastre-se</button>

      {cadastroClicked && <CadastroUsuarioForm />}
    </div>
  );
}
