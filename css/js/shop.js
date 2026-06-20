import { products } from './products.js';

const grid = document.getElementById("shop-product-grid");
const categorySelect = document.getElementById("category");
const sortSelect = document.getElementById("sort");

let filteredProducts = [...products];

function renderProducts(list) {
  grid.innerHTML = "";

  if (list.length === 0) {
    grid.innerHTML = "<p>No products found.</p>";
    return;
  }

  list.forEach(product => {
    const card = document.createElement("div");
    card.className = "card";
    card.innerHTML = `
      <img src="${product.image}" alt="${product.name}" />
      <div class="card-body">
        <h3 class="product-title">${product.name}</h3>
        <p class="product-price">$${product.price.toFixed(2)}</p>
        <div class="actions">
          <button class="small-btn">View</button>
          <button class="primary-btn" data-id="${product.id}">Add to Cart</button>
        </div>
      </div>
    `;
    grid.appendChild(card);
  });
}

function filterAndSortProducts() {
  const category = categorySelect.value;
  const sort = sortSelect.value;

  filteredProducts = products.filter(p => {
    if (category === "all") return true;
    return p.category === category;
  });

  if (sort === "price-asc") {
    filteredProducts.sort((a, b) => a.price - b.price);
  } else if (sort === "price-desc") {
    filteredProducts.sort((a, b) => b.price - a.price);
  }

  renderProducts(filteredProducts);
}

categorySelect.addEventListener("change", filterAndSortProducts);
sortSelect.addEventListener("change", filterAndSortProducts);

renderProducts(filteredProducts);
