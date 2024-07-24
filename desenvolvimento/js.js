const formatCurrency = (number) => {
    return number.toLocaleString('pt-BR', {
              style: 'currency',
              currency: 'BRL',
      })
  }

const getProducts = async () => {
    const response = await fetch('js/burguers.json')
    const data = await response.json()
    return data
}

const generateCard = async () => {

    const products = await getProducts()

    products.map(product => {
        let card = document.createElement('div')
        card.classList.add('card__burguer')
        
        card.innerHTML = `
        <figure>
            <img src="images/${product.image}" alt="${product.burguer_name}" class="img__burguer"/>
        </figure>

        <div class="card__produto_detalhes">
            <h4>${product.burguer_name}</h4>
            <h5>${product.product_description}</h5>
        </div>

        <h6>${formatCurrency(product.price)}</h6>
        <button class="btn__order">Peça já <i class="bi bi-hand-index-thumb"></i></button>
        `

        const listaProdutos = document.querySelector('.lista__burguers')
        listaProdutos.appendChild(card)

    })
   
}

generateCard();

const getBebidas = async () => {
    const response = await fetch('js/bebidas.json')
    const data = await response.json()
    return data
}

const generateCardBebidas = async () => {

    const bebidas = await getBebidas()

    bebidas.map(bebidas => {
        let card = document.createElement('div')
        card.classList.add('card__bebida')
        
        card.innerHTML = `
        <figure>
            <img src="images/${bebidas.image}" alt="${bebidas.bebida_name}" class="img__bebida"/>
        </figure>

        <div class="card__bebida_detalhes">
            <h4>${bebidas.bebida_name}</h4>
            <h5>${bebidas.bebida_description}</h5>
        </div>

        <h6>${formatCurrency(bebidas.price)}</h6>
        <button class="btn__order">Peça já <i class="bi bi-hand-index-thumb"></i></button>
        `

        const listaBebidas = document.querySelector('.lista__bebidas')
        listaBebidas.appendChild(card)

    })
   
}

generateCardBebidas();

const bebidas = document.querySelector('#bebidas');
const listaBurguers = document.querySelector('.lista__burguers');

bebidas.addEventListener('click', () => {
    apagaItens();
    generateCardBebidas();
});

function apagaItens() {
    listaBurguers.classList.add('ocuto')
    const listaBebidas = document.querySelector('.lista__bebidas');
    listaBebidas.classList.remove('ocuto');
}
