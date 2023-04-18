const form = document.getElementById("product-form");

function obtener_ruta() {
  const params = new URLSearchParams(window.location.search);
  const index = parseInt(params.get("index"));
  const products = JSON.parse(localStorage.getItem("products")) || [];
  const product = products.find((p, i) => i === index);
  const nameInput = document.getElementById("name");
  nameInput.value = product.name;

  const descriptionInput = document.getElementById("description");
  descriptionInput.value = product.description;

  const priceInput = document.getElementById("price");
  priceInput.value = product.price;

  const imageUrlInput = document.getElementById("image-url");
  imageUrlInput.value = product.imageUrl;

  return index;
}

const help = obtener_ruta();

form.addEventListener("submit", (event) => {
  event.preventDefault();
  const index = help;
  const products = JSON.parse(localStorage.getItem("products")) || [];
  const updatedProduct = {
    name: document.getElementById("name").value,
    description: document.getElementById("description").value,
    price: parseFloat(document.getElementById("price").value),
    imageUrl: document.getElementById("image-url").value
  };
  products[index] = updatedProduct;
  localStorage.setItem("products", JSON.stringify(products));
  window.location.href = "listarproductos.html";
});
