
"use strict";

// ======================================
// TOP FASTFOOD — ОСНОВНАЯ ЛОГИКА
// ======================================

const products = [
  {
    id: "burger1",
    name: "Classic Burger",
    category: "burger",
    price: 1200,
    image: "burger1.jpg",
    emoji: "🍔",
    description: "Сочный бургер для настоящих гурманов.",
    badge: "ХИТ"
  },
  {
    id: "burger2",
    name: "Double Burger",
    category: "burger",
    price: 1700,
    image: "burger2.jpg",
    emoji: "🍔",
    description: "Больше вкуса, больше удовольствия.",
    badge: "TOP"
  },
  {
    id: "burger3",
    name: "Special Burger",
    category: "burger",
    price: 2000,
    image: "burger3.jpg",
    emoji: "🍔",
    description: "Особенный бургер для большого аппетита.",
    badge: "SPECIAL"
  },
  {
    id: "pizza1",
    name: "Classic Pizza",
    category: "pizza",
    price: 2200,
    image: "pizza1.jpg",
    emoji: "🍕",
    description: "Вкусная пицца с любимой начинкой.",
    badge: "ХИТ"
  },
  {
    id: "pizza2",
    name: "Special Pizza",
    category: "pizza",
    price: 2700,
    image: "pizza2.jpg",
    emoji: "🍕",
    description: "Яркий вкус для хорошего настроения.",
    badge: "TOP"
  },
  {
    id: "pizza3",
    name: "Premium Pizza",
    category: "pizza",
    price: 3200,
    image: "pizza3.jpg",
    emoji: "🍕",
    description: "Большое удовольствие в каждом кусочке.",
    badge: "SPECIAL"
  },
  {
    id: "cola",
    name: "Cola",
    category: "drink",
    price: 500,
    image: "cola.jpg",
    emoji: "🥤",
    description: "Освежающий газированный напиток."
  },
  {
    id: "fanta",
    name: "Fanta",
    category: "drink",
    price: 500,
    image: "fanta.jpg",
    emoji: "🥤",
    description: "Яркий апельсиновый вкус."
  },
  {
    id: "sprite",
    name: "Sprite",
    category: "drink",
    price: 500,
    image: "sprite.jpg",
    emoji: "🥤",
    description: "Лимонно-лаймовое освежение."
  },
  {
    id: "coffee",
    name: "Coffee",
    category: "drink",
    price: 700,
    image: "coffe.jpg",
    emoji: "☕",
    description: "Ароматный кофе для бодрого дня."
  },
  {
    id: "tea",
    name: "Tea",
    category: "drink",
    price: 400,
    image: "tea.jpg",
    emoji: "🍵",
    description: "Тёплый напиток для отдыха."
  },
  {
    id: "kefir",
    name: "Kefir",
    category: "drink",
    price: 450,
    image: "kefir.jpg",
    emoji: "🥛",
    description: "Лёгкий молочный напиток."
  }
];

const ingredientData = {
  burger: [
    { id: "cheese", name: "Сыр", emoji: "🧀", price: 150 },
    { id: "tomato", name: "Помидор", emoji: "🍅", price: 100 },
    { id: "lettuce", name: "Салат", emoji: "🥬", price: 100 },
    { id: "onion", name: "Лук", emoji: "🧅", price: 80 },
    { id: "patty", name: "Котлета", emoji: "🥩", price: 350 },
    { id: "bacon", name: "Бекон", emoji: "🥓", price: 250 },
    { id: "pickles", name: "Огурцы", emoji: "🥒", price: 100 },
    { id: "sauce", name: "Соус", emoji: "🫙", price: 80 }
  ],
  pizza: [
    { id: "mozzarella", name: "Сыр", emoji: "🧀", price: 200 },
    { id: "pepperoni", name: "Пепперони", emoji: "🍖", price: 250 },
    { id: "tomato", name: "Помидор", emoji: "🍅", price: 100 },
    { id: "mushroom", name: "Грибы", emoji: "🍄", price: 150 },
    { id: "olive", name: "Оливки", emoji: "🫒", price: 150 },
    { id: "pepper", name: "Перец", emoji: "🫑", price: 120 },
    { id: "onion", name: "Лук", emoji: "🧅", price: 80 },
    { id: "basil", name: "Базилик", emoji: "🌿", price: 100 }
  ]
};

const bases = {
  burger: [
    { id: "classic", name: "Классическая булочка", emoji: "🍔", price: 1200 },
    { id: "black", name: "Чёрная булочка", emoji: "🍔", price: 1400 },
    { id: "sesame", name: "Булочка с кунжутом", emoji: "🍔", price: 1300 }
  ],
  pizza: [
    { id: "thin", name: "Тонкое тесто", emoji: "🍕", price: 1800 },
    { id: "classic", name: "Классическое тесто", emoji: "🍕", price: 2000 },
    { id: "cheese", name: "Сырный бортик", emoji: "🍕", price: 2400 }
  ]
};

let activeCategory = "all";
let cart = [];
let builderType = "burger";
let selectedBase = "classic";
let selectedIngredients = [];
let toastTimer;

// ======================================
// ВСПОМОГАТЕЛЬНЫЕ ФУНКЦИИ
// ======================================

function money(value) {
  return new Intl.NumberFormat("ru-RU").format(value) + " ֏";
}

function escapeHTML(value) {
  return String(value).replace(/[&<>"']/g, character => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#39;"
  })[character]);
}

function showToast(message) {
  const toast = document.getElementById("toast");

  toast.textContent = message;
  toast.classList.add("show");

  clearTimeout(toastTimer);

  toastTimer = setTimeout(() => {
    toast.classList.remove("show");
  }, 2400);
}

function getImagePath(filename) {
  return "images/" + filename;
}

function imageHTML(filename, emoji, alt) {
  return `
    <img
      src="${getImagePath(filename)}"
      alt="${escapeHTML(alt)}"
      loading="lazy"
      onerror="this.hidden=true; this.nextElementSibling.hidden=false"
    >
    <span class="fallback-emoji" hidden>${emoji}</span>
  `;
}

// ======================================
// АНИМАЦИЯ ЗАПУСКА
// ======================================

const intro = document.getElementById("intro");
const loginOverlay = document.getElementById("loginOverlay");

window.addEventListener("load", () => {
  setTimeout(() => {
    intro.classList.add("hide");
  }, 1900);
});

// ======================================
// ОКНО ВХОДА
// ======================================

document.getElementById("loginForm").addEventListener("submit", event => {
  event.preventDefault();

  if (!event.currentTarget.reportValidity()) return;

  loginOverlay.classList.add("hidden");
  document.body.classList.remove("modal-open");

  showToast("Добро пожаловать в TOP FASTFOOD! 🍔");
});

// ======================================
// КАТАЛОГ ТОВАРОВ
// ======================================

const productGrid = document.getElementById("productGrid");

function renderProducts() {
  const filtered = activeCategory === "all"
    ? products
    : products.filter(product => product.category === activeCategory);

  productGrid.innerHTML = filtered.map(product => `
    <article class="product-card">
      <div class="product-image">
        ${product.badge
          ? `<span class="product-badge">${product.badge}</span>`
          : ""}
        ${imageHTML(product.image, product.emoji, product.name)}
      </div>

      <div class="product-info">
        <h3>${product.name}</h3>
        <p>${product.description}</p>

        <div class="product-bottom">
          <span class="product-price">${money(product.price)}</span>
          <button
            class="add-button"
            data-add-product="${product.id}"
            aria-label="Добавить ${product.name} в корзину"
          >+</button>
        </div>
      </div>
    </article>
  `).join("");
}

document.getElementById("categoryTabs").addEventListener("click", event => {
  const button = event.target.closest("[data-category]");

  if (!button) return;

  activeCategory = button.dataset.category;

  document.querySelectorAll(".category-tab").forEach(tab => {
    tab.classList.toggle("active", tab === button);
  });

  renderProducts();
});

productGrid.addEventListener("click", event => {
  const button = event.target.closest("[data-add-product]");

  if (!button) return;

  const product = products.find(item => item.id === button.dataset.addProduct);

  if (product) {
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      emoji: product.emoji,
      quantity: 1
    });

    showToast(product.name + " добавлен в корзину!");
  }
});

// ======================================
// КОНСТРУКТОР БУРГЕРА И ПИЦЦЫ
// ======================================

const baseOptions = document.getElementById("baseOptions");
const ingredientOptions = document.getElementById("ingredientOptions");
const foodBase = document.getElementById("foodBase");
const ingredientLayer = document.getElementById("ingredientLayer");
const foodStage = document.getElementById("foodStage");

function currentBase() {
  return bases[builderType].find(base => base.id === selectedBase);
}

function currentIngredients() {
  return ingredientData[builderType].filter(ingredient =>
    selectedIngredients.includes(ingredient.id)
  );
}

function builderTotal() {
  return currentBase().price +
    currentIngredients().reduce((sum, item) => sum + item.price, 0);
}

function renderBases() {
  baseOptions.innerHTML = bases[builderType].map(base => `
    <label class="base-option">
      <input
        type="radio"
        name="builderBase"
        value="${base.id}"
        ${base.id === selectedBase ? "checked" : ""}
      >
      ${base.name}
      <span>${money(base.price)}</span>
    </label>
  `).join("");
}

function renderIngredients() {
  ingredientOptions.innerHTML = ingredientData[builderType].map(item => `
    <label class="ingredient-option">
      <input
        type="checkbox"
        value="${item.id}"
        ${selectedIngredients.includes(item.id) ? "checked" : ""}
      >
      <span class="ingredient-emoji">${item.emoji}</span>
      <span>${item.name}</span>
      <span class="ingredient-cost">+${item.price}</span>
    </label>
  `).join("");
}

function renderIngredientAnimation() {
  const ingredients = currentIngredients();

  ingredientLayer.innerHTML = ingredients.map((item, index) => {
    // Размещаем выбранные ингредиенты вокруг центра блюда.
    const positions = [
      [36, 28],
      [58, 24],
      [47, 42],
      [30, 53],
      [64, 51],
      [42, 64],
      [55, 68],
      [70, 37]
    ];

    const position = positions[index % positions.length];

    return `
      <span
        class="ingredient-float"
        style="left:${position[0]}%;top:${position[1]}%;animation-delay:${index * 35}ms"
        title="${item.name}"
      >${item.emoji}</span>
    `;
  }).join("");

  foodStage.classList.remove("pulse");
  void foodStage.offsetWidth;
  foodStage.classList.add("pulse");
}

function renderBuilder() {
  const base = currentBase();
  const ingredients = currentIngredients();

  foodBase.textContent = builderType === "burger"
    ? (selectedBase === "black" ? "🍔" : "🍔")
    : "🍕";

  foodBase.style.filter =
    builderType === "burger" && selectedBase === "black"
      ? "grayscale(.8) brightness(.7) drop-shadow(0 15px 15px #0008)"
      : "drop-shadow(0 15px 15px #0008)";

  document.getElementById("builderFoodName").textContent =
    builderType === "burger" ? "Мой бургер" : "Моя пицца";

  document.getElementById("builderDescription").textContent =
    base.name + (ingredients.length
      ? " · " + ingredients.map(item => item.name).join(", ")
      : " · Добавь ингредиенты");

  document.getElementById("builderPrice").textContent =
    money(builderTotal());

  renderIngredientAnimation();
}

function updateBuilder() {
  renderBases();
  renderIngredients();
  renderBuilder();
}

document.querySelectorAll(".builder-type").forEach(button => {
  button.addEventListener("click", () => {
    builderType = button.dataset.type;
    selectedBase = "classic";
    selectedIngredients = [];

    document.querySelectorAll(".builder-type").forEach(item => {
      item.classList.toggle("active", item === button);
    });

    updateBuilder();
  });
});

baseOptions.addEventListener("change", event => {
  if (event.target.name !== "builderBase") return;

  selectedBase = event.target.value;
  renderBuilder();
});

ingredientOptions.addEventListener("change", event => {
  const input = event.target;

  if (input.type !== "checkbox") return;

  if (input.checked) {
    if (!selectedIngredients.includes(input.value)) {
      selectedIngredients.push(input.value);
    }
  } else {
    selectedIngredients = selectedIngredients.filter(
      id => id !== input.value
    );
  }

  renderBuilder();
});

document.getElementById("addCustom").addEventListener("click", () => {
  const base = currentBase();
  const ingredients = currentIngredients();

  const name = builderType === "burger"
    ? "Мой бургер"
    : "Моя пицца";

  const description = [
    base.name,
    ...ingredients.map(item => item.name)
  ].join(", ");

  const emoji = builderType === "burger" ? "🍔" : "🍕";

  addToCart({
    id: "custom-" + builderType + "-" + Date.now(),
    name,
    price: builderTotal(),
    image: null,
    emoji,
    description,
    quantity: 1
  });

  showToast("Твоё блюдо добавлено в корзину!");
});

// ======================================
// КОРЗИНА
// ======================================

function addToCart(item) {
  const existing = cart.find(product =>
    product.id === item.id &&
    !String(item.id).startsWith("custom-")
  );

  if (existing) {
    existing.quantity += 1;
  } else {
    cart.push({ ...item });
  }

  renderCart();
}

function cartTotal() {
  return cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
}

function renderCart() {
  const cartItems = document.getElementById("cartItems");

  document.getElementById("cartCount").textContent =
    cart.reduce((sum, item) => sum + item.quantity, 0);

  document.getElementById("cartTotal").textContent = money(cartTotal());

  if (!cart.length) {
    cartItems.innerHTML = `
      <div class="cart-empty">
        🛒<br><br>
        Корзина пока пустая.<br>
        Добавь что-нибудь вкусное из меню!
      </div>
    `;

    return;
  }

  cartItems.innerHTML = cart.map(item => `
    <div class="cart-row">
      <div class="cart-thumb">
        ${item.image
          ? imageHTML(item.image, item.emoji, item.name)
          : item.emoji}
      </div>

      <div>
        <h3>${escapeHTML(item.name)}</h3>
        <p>${money(item.price)} за штуку</p>
        ${item.description
          ? `<p>${escapeHTML(item.description)}</p>`
          : ""}

        <div class="quantity-control">
          <button data-quantity="-1" data-id="${item.id}" aria-label="Уменьшить">−</button>
          <span>${item.quantity}</span>
          <button data-quantity="1" data-id="${item.id}" aria-label="Увеличить">+</button>
          <button class="remove-button" data-remove="${item.id}" aria-label="Удалить">×</button>
        </div>
      </div>

      <div class="cart-row-price">
        ${money(item.price * item.quantity)}
      </div>
    </div>
  `).join("");
}

document.getElementById("cartItems").addEventListener("click", event => {
  const quantityButton = event.target.closest("[data-quantity]");
  const removeButton = event.target.closest("[data-remove]");

  if (quantityButton) {
    const item = cart.find(product =>
      product.id === quantityButton.dataset.id
    );

    if (!item) return;

    item.quantity += Number(quantityButton.dataset.quantity);

    if (item.quantity <= 0) {
      cart = cart.filter(product => product !== item);
    }

    renderCart();
  }

  if (removeButton) {
    cart = cart.filter(item => item.id !== removeButton.dataset.remove);
    renderCart();
    showToast("Товар удалён из корзины");
  }
});

// ======================================
// ОКНА КОРЗИНЫ И ОФОРМЛЕНИЯ
// ======================================

function openModal(id) {
  document.getElementById(id).classList.add("open");
  document.body.classList.add("modal-open");
}

function closeModal(id) {
  document.getElementById(id).classList.remove("open");

  const anotherOpen = document.querySelector(".modal-backdrop.open");

  if (!anotherOpen && loginOverlay.classList.contains("hidden")) {
    document.body.classList.remove("modal-open");
  }
}

document.getElementById("openCart").addEventListener("click", () => {
  renderCart();
  openModal("cartModal");
});

document.querySelectorAll("[data-close]").forEach(button => {
  button.addEventListener("click", () => {
    closeModal(button.dataset.close);
  });
});

document.querySelectorAll(".modal-backdrop").forEach(backdrop => {
  backdrop.addEventListener("click", event => {
    if (event.target === backdrop) {
      closeModal(backdrop.id);
    }
  });
});

document.getElementById("checkoutButton").addEventListener("click", () => {
  if (!cart.length) {
    showToast("Сначала добавь товары в корзину!");
    return;
  }

  renderOrderSummary();
  closeModal("cartModal");
  openModal("checkoutModal");
});

function renderOrderSummary() {
  const summary = document.getElementById("orderSummary");

  summary.innerHTML = cart.map(item => `
    <div>
      ${escapeHTML(item.name)} × ${item.quantity}
      — ${money(item.price * item.quantity)}
    </div>
  `).join("") + `
    <div class="summary-total">
      <span>Итого</span>
      <span>${money(cartTotal())}</span>
    </div>
  `;
}

// ======================================
// ДЕКОРАТИВНЫЙ КОД ЗАКАЗА
// ======================================

const orderCode = document.getElementById("orderCode");
const maskedCode = document.getElementById("maskedCode");

orderCode.addEventListener("input", () => {
  // Разрешаем только цифры и максимум 8 символов.
  orderCode.value = orderCode.value.replace(/\D/g, "").slice(0, 8);

  const length = orderCode.value.length;
  maskedCode.textContent =
    "•".repeat(length).padEnd(8, "•").replace(/(.{4})(.{4})/, "$1 $2");
});

document.getElementById("checkoutForm").addEventListener("submit", event => {
  event.preventDefault();

  if (!cart.length) {
    closeModal("checkoutModal");
    showToast("Корзина пуста!");
    return;
  }

  if (!/^\d{8}$/.test(orderCode.value)) {
    orderCode.setCustomValidity("Введи ровно 8 цифр.");
    orderCode.reportValidity();
    return;
  }

  orderCode.setCustomValidity("");

  const orderNumber = "TF-" + Math.floor(100000 + Math.random() * 900000);
  const total = money(cartTotal());

  cart = [];
  renderCart();

  closeModal("checkoutModal");

  event.currentTarget.reset();
  maskedCode.textContent = "•••• ••••";

  showToast("Заказ " + orderNumber + " оформлен! Итого: " + total);
});

// Убираем сообщение об ошибке при новом вводе.
orderCode.addEventListener("input", () => {
  orderCode.setCustomValidity("");
});

// ======================================
// ЗАПУСК
// ======================================

renderProducts();
updateBuilder();
renderCart();
