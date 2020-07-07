let inputSearch = null;
let btnSearch = null;
let divPanel = null;


window.addEventListener('load',() => {

    /* getData(); */
    mapElements();
    addEvents();

});

/* function getData() {
    var getData = dados.produtos.map(produtos => {
        return {
            codBarra: produtos.EAN,
            nome: produtos.NOME,
            preco: produtos.PMC_17,
        };
    });
    console.log(getData)
} */

function mapElements() {
    inputSearch = document.querySelector('#inputSearch')
    btnSearch = document.querySelector('#btnSearch')
    divPanel = document.querySelector('#divPanel')
}

function addEvents(){
    inputSearch.addEventListener('keyup',handleKeyUp);
}

function handleKeyUp(event){
    const currentKey = event.key;

    if(currentKey != 'Enter'){
        return;
    }

    const filterText = event.target.value;
    
   
    if(filterText.trim() !== ''){
        filterProd(filterText.toLowerCase());
    }
}

async function filterProd(filterText){
    const filteredProd = await dados.produtos.filter(produtos =>{
        return (
            produtos.NOME.includes(filterText)||
            produtos.NOME.toLowerCase().includes(filterText)||
            produtos.EAN === filterText
            );
    });

   let prod = filteredProd.map(produtos => {
        return {
            codBarra: produtos.EAN,
            nome: produtos.NOME,
            composicao: produtos.COMPOSICAO,
            fabricante: produtos.NOME_FABRICANTE,
            precoFabrica: produtos.PF_17_ALC,
            preco: produtos.PMC_17,
            descricao: produtos.DESCRICAO,
            classeTerapeutica: produtos.CLASSE_TERAPEUTICA,
        };
    });
    renderProd(prod)
}

function renderProd(prod){
    divPanel.innerHTML = '';

    const h6 = document.createElement('h6');
    h6.textContent = `${prod.length} Produto(s) encontrado(s).`;

    const ul = document.createElement('ul');

    prod.forEach(el => {
        const li = document.createElement('li');
        li.classList.add('list')

        let codBarra = `${el.codBarra}`
        let nome = `${el.nome}`
        let composicao = `${el.composicao}`
        let classeTerapeutica = `${el.classeTerapeutica}`
        let fabricante = `${el.fabricante}`
        let precoFabrica = `${el.precoFabrica}`
        let preco = `${el.preco}`
        let desc = `${el.descricao}`

        li.innerHTML = `
        Nome: ${nome} <br> 
        Descrição: ${desc} <br> 
        Composição: ${composicao} <br> 
        Classe Terapeutica: ${classeTerapeutica} <br> 
        Fabricante: ${fabricante} <br> 
        Codigo de Barra: ${codBarra} <br> 
        Preço de Fabrica R$: ${precoFabrica} <br> 
        Preço de Venda R$: ${preco}
        `

        ul.appendChild(li);
    });

    divPanel.appendChild(h6);
    divPanel.appendChild(ul);
}



