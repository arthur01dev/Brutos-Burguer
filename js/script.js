document.addEventListener("DOMContentLoaded", () => {
  const burguerSection = document.querySelector(".lista__burguers");
  const bebidasSection = document.querySelector(".lista__bebidas");
  const porcoesSection = document.querySelector(".lista__porcoes");
  const burguerButton = document.getElementById("burguer");
  const bebidasButton = document.getElementById("bebidas");
  const porcoesButton = document.getElementById("porcoes");

  burguerButton.addEventListener("click", () => {
    burguerSection.classList.remove("oculta");
    bebidasSection.classList.add("oculta");
    porcoesSection.classList.add("oculta");
  });

  bebidasButton.addEventListener("click", () => {
    bebidasSection.classList.remove("oculta");
    burguerSection.classList.add("oculta");
    porcoesSection.classList.add("oculta");
  });

  porcoesButton.addEventListener("click", () => {
    porcoesSection.classList.remove("oculta");
    burguerSection.classList.add("oculta");
    bebidasSection.classList.add("oculta");
  });

  const formatCurrency = (number) => {
    return number.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    });
  };

  async function fetchData(url) {
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error("Error fetching data:", error);
      return [];
    }
  }

  function createCard(product, type) {
    const card = document.createElement("div");
    card.classList.add(`card__${type}`);
    card.innerHTML = `
        <img class="img__${type}" src="${product.image}" alt="${product.name}">
        <div class="card__produto_detalhes">
          <h4>${product.name}</h4>
          <h5>${product.description}</h5>
          <h6>${formatCurrency(product.price)}</h6>
        </div>
        
        <button class="btn__order">Peça já <i class="bi bi-hand-index-thumb"></i></button>
      `;
    return card;
  }

  function populateSection(data, section, type) {
    data.forEach((item) => {
      const product = {
        name: item.burguer_name || item.bebida_name || item.porcao_name,
        description:
          item.product_description ||
          item.bebida_description ||
          item.porcao_description,
        price: item.price,
        image: item.image,
      };
      section.appendChild(createCard(product, type));
    });
  }

  async function initializeMenu() {
    const burgerData = await fetchData("js/burguers.json");
    const drinksData = await fetchData("js/bebidas.json");
    const porcoesData = await fetchData("js/porcoes.json");

    populateSection(burgerData, burguerSection, "burguer");
    populateSection(drinksData, bebidasSection, "bebida");
    populateSection(porcoesData, porcoesSection, "porcoes");
  }

  initializeMenu();
});
