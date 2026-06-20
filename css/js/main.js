import { getFeaturedProducts } from "./products.js";
import { addToCart, changeQty, renderCartUI } from "./cart.js";

// Create a product card
function createProductCard(product) {
  const card = document.createElement("div");
  card.className = "card";
  card.innerHTML = `
    <img loading="lazy" src="${product.image}" alt="${product.name}" />
    <div class="card-body">
      <h3 class="product-title">${product.name}</h3>
      <p class="product-price">$${product.price.toFixed(2)}</p>
      <div class="actions">
        <button class="primary-btn" data-action="add" data-id="${product.id}">Add to Cart</button>
      </div>
    </div>
  `;
  return card;
}

// Render featured products
function renderFeaturedProducts() {
  const container = document.getElementById("product-grid");
  container.innerHTML = "";
  const featured = getFeaturedProducts();
  featured.forEach(product => {
    container.appendChild(createProductCard(product));
  });
}

// Cart drawer toggle
function toggleCart(open) {
  const drawer = document.getElementById("cart-drawer");
  const backdrop = document.getElementById("drawer-backdrop");
  if (open) {
    drawer.classList.add("open");
    backdrop.classList.add("show");
  } else {
    drawer.classList.remove("open");
    backdrop.classList.remove("show");
  }
}

document.addEventListener("DOMContentLoaded", () => {
  renderFeaturedProducts();
  renderCartUI();

  document.getElementById("year").textContent = new Date().getFullYear();

  document.body.addEventListener("click", e => {
    const target = e.target;

    if (target.matches("[data-action='add']")) {
      addToCart(target.dataset.id);
      toggleCart(true);
    }
    if (target.matches("[data-op]")) {
      changeQty(target.dataset.id, target.dataset.op);
    }
    if (target.id === "open-cart") toggleCart(true);
    if (target.id === "close-cart" || target.id === "drawer-backdrop") toggleCart(false);
    if (target.id === "shop-now") {
      document.getElementById("shop").scrollIntoView({ behavior: "smooth" });
    }
  });
});
// Contact form handling
document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("contact-form");
  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const name = document.getElementById("name").value.trim();
      const email = document.getElementById("email").value.trim();
      const message = document.getElementById("message").value.trim();

      console.log("Form submitted:", { name, email, message });
      alert("Thank you for your message, we will get back to you soon!");

      form.reset();
    });
  }
});
