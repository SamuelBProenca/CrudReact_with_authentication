import './cadastroProduto.css'
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

export default function ProdutosForm(){
    const [produto,setProduto] = useState('');
    const [preco,setPreco] = useState('');
    const [descricao,setDescricao] = useState('');
    const [quantidade,setQuantidade] = useState('');
    const [categoria,setCategoria] = useState('');
    const navigate = useNavigate();
    const {id} = useParams();
    const token = sessionStorage.getItem("token");

    useEffect(()=> {

        if(id){
            axios.get(`http://localhost:4000/${id}`,{
                headers: {'authorization' : 'Bearer ' + token},
                withCredentials: true
            }).then((resposta) => {
            const {produto, preco, descricao, quantidade, categoria} = resposta.data;
            setProduto (produto);
            setPreco (preco);
            setDescricao (descricao);
            setQuantidade (quantidade);
            setCategoria (categoria); 
        }).catch(erro =>{
            console.log(erro);
            if(erro.message.indexOf('403') > -1){
                sessionStorage.removeItem('token');
                window.location.reload();
            }
        })
        }else{
            setProduto('');
            setPreco('');
            setDescricao('');
            setQuantidade('');
            setCategoria('');
        }
    }, [id, token]);

    const handleSalvar = (event)=>{
        event.preventDefault();
        
        if(produto)
        {   
            if(id){ 
            event.preventDefault();
            axios.put(`http://localhost:4000/edit/${id}`, {id: id, produto : produto, preco : preco, descricao : descricao, quantidade : quantidade, categoria : categoria },{
                headers: { 'authorization' : 'Bearer ' + token},
                withCredentials: true
            }).then(resposta => {
                console.log(resposta.data);
                navigate('/home');
            }).catch(erro => {
                console.log(erro);
                if(erro.message.indexOf('403') > -1){
                    sessionStorage.removeItem('token');
                    window.location.reload();
                }
            });
            
            }else{
                axios.post('http://localhost:4000/add', {
                    produto : produto, 
                    preco : preco, 
                    descricao : descricao, 
                    quantidade : quantidade, 
                    categoria : categoria}, {
                        headers: { 'authorization' : 'Bearer ' + token},
                        withCredentials: true
                    }).then((resposta) => {
                    alert(resposta.data.message);
                    navigate('/');
                }).catch(erro => {
                    console.log(erro);
                    if(erro.message.indexOf('403') > -1){
                        sessionStorage.removeItem('token');
                        window.location.reload();
                    }
                });
            }
        }
        navigate("/")
    };

    return(
        <div id="formulario">
            <h1>
                {id? 'Editar Produto' : 'Cadastrar Produto'}
            </h1>
            <form>
                <label>Produto:</label>
                <input type="text" id="Produto" placeholder="Produto" onChange={(e) => setProduto(e.target.value)} value={produto} required />

                <label>Preço:</label>
                <input type="number" id="Preco" placeholder="Preco" onChange={(e) => setPreco(e.target.value)} value={preco} required />

                <label>Descrição:</label>
                <input type="text" id="Descricao" placeholder="Descricao" onChange={(e) => setDescricao(e.target.value)} value={descricao} required />

                <label>Quantidade:</label>
                <input type="text" id="Quantidade" placeholder="Quantidade" onChange={(e) => setQuantidade(e.target.value)} value={quantidade} required />

                <label>Categoria:</label>
                <input type="text" id="Categoria" placeholder="Categoria" onChange={(e) => setCategoria(e.target.value)} value={categoria} required />

                <button onClick={handleSalvar}>Salvar</button>
            </form>
        </div>
    );
}

//export default ProdutosForm
