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

generateCard()