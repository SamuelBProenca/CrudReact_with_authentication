export default function ProdutosFilter(){
    const handleFilter = (event) => {
        let termo = event.target.value.toLowerCase();
        let qtde = document.getElementsByClassName('card').length;

        for(let i=0; i < qtde; i++){
            let produto = document.getElementsByClassName('produto')[i].innerHTML.toLowerCase();
            if(produto.indexOf(termo) > -1){
                document.getElementsByClassName('card')[i].style.display='';
            }else{
                document.getElementsByClassName('card')[i].style.display='none';
            }
        }
    };

    return(
        <div id="filtro">
            <input type="text" id="txt-busca" placeholder="Digite um produto para a busca..." onKeyUp={handleFilter} />
        </div>
    )
}