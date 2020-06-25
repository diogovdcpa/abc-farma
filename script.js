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
        filterProd(filterText);
    }
}

function filterProd(filterText){
    const filteredProd = dados.produtos.filter(produtos =>{
        return produtos.NOME.includes(filterText)|| produtos.NOME.toLowerCase().includes(filterText) ||produtos.EAN === filterText;
    });

   let prod = filteredProd.map(produtos => {
        return {
            codBarra: produtos.EAN,
            nome: produtos.NOME,
            preco: produtos.PMC_17,
            descricao: produtos.DESCRICAO,
        };
    });
    console.log(prod)
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
        let preco = `${el.preco}`
        let desc = `${el.descricao}`
        li.innerHTML = `
        Nome: ${nome} <br> 
        Descrição: ${desc} <br> 
        Codigo de Bara: ${codBarra} <br> 
        Valor R$: ${preco}
        `

        ul.appendChild(li);
    });

    divPanel.appendChild(h6);
    divPanel.appendChild(ul);
}



