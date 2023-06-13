import './App.css';
import { Link, Route, Routes } from 'react-router-dom';
import ProdutosList from './components/produtos-list-components';
import ProdutosForm from './components/produtos-form-components';
import CadastroUsuarioForm from './components/cadastro-component';
import Login from './components/login-components';
import axios from 'axios';

function App() {
  
  const token = sessionStorage.getItem("token");
  

  const handleLogout = (event) =>{
      axios.post('http://localhost:4000/users/logout',{withCredentials: true}).then(resposta => {
      console.log(resposta);
      sessionStorage.removeItem('token');
      window.location.reload();
    });
  };


  if (!token)
    return < Login />
  

  return (
    <div className="App">
      <nav>
        <ul>
          <li>
            <Link to={'/'}>Home</Link>
          </li>
          <li>
          <Link to={'/form'}>cadastrar</Link> 
          </li>
          <li>
            <Link to={'/logout'} onClick={handleLogout}>Sair</Link>
          </li>
        </ul>
      </nav>

      
      <h1> Projeto React</h1>

      <div className='banner-container'>
        <div id='banner'></div>
      </div>

      <Routes>
        <Route path='/' element={<ProdutosList />}></Route>
        <Route path='/produtos' element={<ProdutosList />}></Route>
        <Route path='/form' element={<ProdutosForm />}></Route>
        <Route path='/edit/:id' element={<ProdutosForm />}></Route>
        <Route exact path="/" component={Login} />
        <Route path="/register" element={<CadastroUsuarioForm />} />
      </Routes>

    </div>
  );
}

export default App;
