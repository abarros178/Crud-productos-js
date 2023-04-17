const form = document.getElementById("product-form");

form.addEventListener("submit", (event) => {
  event.preventDefault();
  const name = document.getElementById("name").value;
  const description = document.getElementById("description").value;
  const price = document.getElementById("price").value;
  const imageUrl = document.getElementById("image-url").value;
  const product = {
    name: name,
    description: description,
    price: price,
    imageUrl: imageUrl, // cambiar "image" por "imageUrl"
  };
  let products = JSON.parse(localStorage.getItem("products")) || [];
  products.push(product);
  localStorage.setItem("products", JSON.stringify(products));
  form.reset();
  renderProducts();
});

function renderProducts() {
  let products = JSON.parse(localStorage.getItem("products")) || [];
  const productsContainer = document.getElementById("products-container");
  productsContainer.innerHTML = "";
  products.forEach((product) => {
    const card = document.createElement("div");
    card.classList.add("card");
    card.innerHTML = `
            <img src="${product.imageUrl}" class="card-img-top" alt="${product.name}">
            <div class="card-body">
                <h5 class="card-title">${product.name}</h5>
                <p class="card-text">${product.description}</p>
                <p class="card-text">${product.price}</p>
            </div>
        `;
    productsContainer.appendChild(card);
  });
}

window.addEventListener("load", renderProducts);
