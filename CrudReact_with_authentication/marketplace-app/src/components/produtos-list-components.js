import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function ProdutosList() {
  const [lista, setLista] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();
  let token = sessionStorage.getItem("token");

  const handleRemove = (event) => {
    let res = window.confirm('Deseja realmente excluir este produto?');
    if (res) {
      const productId = event.target.getAttribute('data-id');
      token = sessionStorage.getItem("token");
      axios.delete(`http://localhost:4000/remove/${productId}`, {
        headers: {'authorization' : 'Bearer ' + token},
        withCredentials: true
      }).then(resposta => {
        console.log(resposta.data);
        navigate('/');
        window.location.reload();
      }).catch(erro => {
        if(erro.message.indexOf('403') > -1){
            sessionStorage.removeItem('token');
            window.location.reload();
        }else{
            console.log(erro);
        }
      });
    }
  }

  const handleEdit = (productId) => {
    let res2 = window.confirm('Deseja editar este produto?');
    if (res2) {
        navigate(`/edit/${productId}`);
        window.location.reload();
    }
  }

  useEffect(() => {
    axios.get('http://localhost:4000/', {
      headers: {'authorization' : 'Bearer ' + token},
      withCredentials: true
    }).then(resposta => {
      setLista(resposta.data);
    }).catch(erro => {
      if(erro.message.indexOf('403') > -1){
          sessionStorage.removeItem('token');
          window.location.reload();
      }else{
          console.log(erro);
      }
    });
  }, [token]);

  const filteredList = lista.filter((itemLista) =>
    itemLista.produto.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div id="lista">
      <input
        id="filtro"
        type="text"
        placeholder="Pesquise o produto"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      <div className="card-container">
        {filteredList.map(itemLista => {
          const { _id, produto, quantidade, preco, categoria, descricao } = itemLista;
          return (
            <div id="teste" className="card" key={_id}>
              <h2>{produto}</h2>
              <p>{categoria}</p>
              <p>{descricao}</p>
              <p>{quantidade}</p>
              <p>{preco}</p>
              <p>
                <Link to={`/editar/${_id}`}>
                  <i className="bi-pencil-square" title="Editar produto" data-id={_id} onClick={() => handleEdit(_id)}></i>
                </Link>
                <i className="bi-trash" title="Excluir produto" data-id={_id} onClick={handleRemove}></i>
              </p>
            </div>
          )
        })}
      </div>
    </div>
  );
}

export default ProdutosList;
