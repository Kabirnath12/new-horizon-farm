const API_BASE = "http://localhost:5000/api";

let products = [];
let filteredProducts = [];
let cart = JSON.parse(localStorage.getItem("nhf-cart") || "[]");
let activeProduct = null;

const productContainer = document.querySelector("#productContainer");
const productCount = document.querySelector("#productCount");
const searchInput = document.querySelector("#searchInput");
const categoryFilter = document.querySelector("#categoryFilter");
const sortFilter = document.querySelector("#sortFilter");
const cartCount = document.querySelector("#cartCount");
const cartItems = document.querySelector("#cartItems");
const cartTotal = document.querySelector("#cartTotal");
const cartDrawer = document.querySelector("#cartDrawer");
const drawerBackdrop = document.querySelector("#drawerBackdrop");
const modal = document.querySelector("#productModal");

const fallbackProducts = [
  { id: "chicken", name: "Farm Chicken", category: "poultry", price: 250, unit: "kg", available: true, description: "Fresh farm-raised chicken from New Horizon Farm.", image: "assets/chicken.svg" },
  { id: "duck", name: "Farm Duck", category: "poultry", price: 400, unit: "kg", available: true, description: "Fresh farm-raised duck from our farm.", image: "assets/duck.svg" },
  { id: "eggs", name: "Farm Eggs", category: "eggs", price: 10, unit: "egg", available: true, description: "Fresh farm eggs produced at New Horizon Farm.", image: "assets/eggs.svg" },
  { id: "vegetables", name: "Farm Vegetables", category: "farm", price: 80, unit: "kg", available: true, description: "Seasonal vegetables and farm produce.", image: "assets/vegetables.svg" }
];

async function loadProducts() {
  productCount.textContent = "Loading products...";
  try {
    const response = await fetch(`${API_BASE}/products`);
    if (!response.ok) throw new Error("API unavailable");
    products = await response.json();
  } catch (error) {
    products = fallbackProducts;
    console.info("Backend unavailable; using local product data.");
  }
  applyFilters();
}

function applyFilters() {
  const search = searchInput.value.trim().toLowerCase();
  const category = categoryFilter.value;
  const sort = sortFilter.value;

  filteredProducts = products.filter(product => {
    const text = `${product.name} ${product.description}`.toLowerCase();
    return text.includes(search) && (category === "all" || product.category === category);
  });

  if (sort === "price-low") filteredProducts.sort((a,b) => a.price - b.price);
  if (sort === "price-high") filteredProducts.sort((a,b) => b.price - a.price);
  if (sort === "name") filteredProducts.sort((a,b) => a.name.localeCompare(b.name));

  renderProducts();
}

function renderProducts() {
  productCount.textContent = `${filteredProducts.length} product${filteredProducts.length === 1 ? "" : "s"} found`;

  if (!filteredProducts.length) {
    productContainer.innerHTML = `<p class="no-results">No products found. Try another search or category.</p>`;
    return;
  }

  productContainer.innerHTML = filteredProducts.map(product => `
    <article class="product-card">
      <div class="product-image">
        <img src="${product.image}" alt="${escapeHtml(product.name)}">
        <span class="availability">${product.available ? "Available" : "Currently unavailable"}</span>
      </div>
      <div class="product-content">
        <div class="product-meta">${escapeHtml(product.category)}</div>
        <h3>${escapeHtml(product.name)}</h3>
        <p>${escapeHtml(product.description)}</p>
        <div class="product-bottom">
          <strong class="price">₹${Number(product.price).toLocaleString("en-IN")} / ${escapeHtml(product.unit)}</strong>
          <button class="small-btn" data-view="${product.id}">View</button>
          <button class="small-btn" data-add="${product.id}" ${!product.available ? "disabled" : ""}>Add</button>
        </div>
      </div>
    </article>
  `).join("");

  productContainer.querySelectorAll("[data-view]").forEach(button => {
    button.addEventListener("click", () => openProduct(button.dataset.view));
  });
  productContainer.querySelectorAll("[data-add]").forEach(button => {
    button.addEventListener("click", () => addToCart(button.dataset.add));
  });
}

function openProduct(id) {
  activeProduct = products.find(product => product.id === id);
  if (!activeProduct) return;

  document.querySelector("#modalImage").src = activeProduct.image;
  document.querySelector("#modalImage").alt = activeProduct.name;
  document.querySelector("#modalCategory").textContent = activeProduct.category;
  document.querySelector("#modalTitle").textContent = activeProduct.name;
  document.querySelector("#modalDescription").textContent = activeProduct.description;
  document.querySelector("#modalPrice").textContent = `₹${Number(activeProduct.price).toLocaleString("en-IN")} / ${activeProduct.unit}`;
  modal.classList.remove("hidden");
}

function closeModal() {
  modal.classList.add("hidden");
  activeProduct = null;
}

function addToCart(id) {
  const product = products.find(item => item.id === id);
  if (!product || !product.available) return;

  const existing = cart.find(item => item.id === id);
  if (existing) existing.quantity += 1;
  else cart.push({ id, quantity: 1 });

  saveCart();
  openCart();
}

function saveCart() {
  localStorage.setItem("nhf-cart", JSON.stringify(cart));
  renderCart();
}

function renderCart() {
  const detailed = cart.map(item => {
    const product = products.find(p => p.id === item.id);
    return product ? {...item, product} : null;
  }).filter(Boolean);

  const count = detailed.reduce((sum, item) => sum + item.quantity, 0);
  const total = detailed.reduce((sum, item) => sum + item.product.price * item.quantity, 0);

  cartCount.textContent = count;
  cartTotal.textContent = `₹${total.toLocaleString("en-IN")}`;

  if (!detailed.length) {
    cartItems.innerHTML = `<p class="no-results">Your basket is empty.</p>`;
    return;
  }

  cartItems.innerHTML = detailed.map(item => `
    <div class="cart-row">
      <img src="${item.product.image}" alt="${escapeHtml(item.product.name)}">
      <div>
        <strong>${escapeHtml(item.product.name)}</strong>
        <small>₹${item.product.price} / ${item.product.unit}</small>
        <div class="qty">
          <button data-dec="${item.id}">−</button>
          <span>${item.quantity}</span>
          <button data-inc="${item.id}">+</button>
          <button class="remove" data-remove="${item.id}">Remove</button>
        </div>
      </div>
      <strong>₹${(item.product.price * item.quantity).toLocaleString("en-IN")}</strong>
    </div>
  `).join("");

  cartItems.querySelectorAll("[data-inc]").forEach(btn => btn.onclick = () => changeQty(btn.dataset.inc, 1));
  cartItems.querySelectorAll("[data-dec]").forEach(btn => btn.onclick = () => changeQty(btn.dataset.dec, -1));
  cartItems.querySelectorAll("[data-remove]").forEach(btn => btn.onclick = () => removeFromCart(btn.dataset.remove));
}

function changeQty(id, delta) {
  const item = cart.find(entry => entry.id === id);
  if (!item) return;
  item.quantity += delta;
  if (item.quantity <= 0) cart = cart.filter(entry => entry.id !== id);
  saveCart();
}

function removeFromCart(id) {
  cart = cart.filter(item => item.id !== id);
  saveCart();
}

function openCart() {
  cartDrawer.classList.add("open");
  cartDrawer.setAttribute("aria-hidden", "false");
  drawerBackdrop.classList.remove("hidden");
}

function closeCart() {
  cartDrawer.classList.remove("open");
  cartDrawer.setAttribute("aria-hidden", "true");
  drawerBackdrop.classList.add("hidden");
}

function escapeHtml(value) {
  return String(value).replace(/[&<>"']/g, char => ({
    "&":"&amp;", "<":"&lt;", ">":"&gt;", '"':"&quot;", "'":"&#039;"
  }[char]));
}

document.querySelector("#modalAddButton").addEventListener("click", () => {
  if (activeProduct) addToCart(activeProduct.id);
  closeModal();
});

document.querySelectorAll("[data-close-modal]").forEach(el => el.addEventListener("click", closeModal));
document.querySelector("#cartButton").addEventListener("click", openCart);
document.querySelector("#closeCart").addEventListener("click", closeCart);
drawerBackdrop.addEventListener("click", closeCart);

searchInput.addEventListener("input", applyFilters);
categoryFilter.addEventListener("change", applyFilters);
sortFilter.addEventListener("change", applyFilters);

document.querySelector("#menuToggle").addEventListener("click", () => {
  const nav = document.querySelector("#mainNav");
  const open = nav.classList.toggle("open");
  document.querySelector("#menuToggle").setAttribute("aria-expanded", String(open));
});

document.querySelector("#contactForm").addEventListener("submit", async event => {
  event.preventDefault();
  const message = document.querySelector("#formMessage");
  const payload = {
    name: document.querySelector("#nameInput").value.trim(),
    phone: document.querySelector("#phoneInput").value.trim(),
    message: document.querySelector("#messageInput").value.trim()
  };

  message.textContent = "Sending enquiry...";
  try {
    const response = await fetch(`${API_BASE}/enquiries`, {
      method: "POST",
      headers: {"Content-Type":"application/json"},
      body: JSON.stringify(payload)
    });
    if (!response.ok) throw new Error("Request failed");
    message.textContent = "Enquiry sent successfully. Thank you!";
    event.target.reset();
  } catch {
    message.textContent = "Backend is offline. Your form is ready, but start the server to submit enquiries.";
  }
});

document.querySelector("#sendOrderButton").addEventListener("click", () => {
  if (!cart.length) {
    alert("Add at least one product to your basket.");
    return;
  }

  const lines = cart.map(item => {
    const product = products.find(p => p.id === item.id);
    return `${product.name} x ${item.quantity}`;
  });

  document.querySelector("#messageInput").value = `Order enquiry:\n${lines.join("\n")}`;
  closeCart();
  document.querySelector("#contact").scrollIntoView({behavior:"smooth"});
  setTimeout(() => document.querySelector("#nameInput").focus(), 500);
});

document.querySelector("#year").textContent = new Date().getFullYear();

loadProducts();
renderCart();
