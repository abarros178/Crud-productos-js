function renderProducts() {
  let products = JSON.parse(localStorage.getItem("products")) || [];
  const productsContainer = document.getElementById("products-container");
  productsContainer.innerHTML = "";
  products.forEach((product, index) => {
    const card = document.createElement("div");
    card.classList.add("card");
    card.innerHTML = `
              <img src="${product.imageUrl}" class="card-img-top" alt="${product.name}">
              <div class="card-body">
                  <h5 class="card-title">${product.name}</h5>
                  <p class="card-text">${product.description}</p>
                  <p class="card-text">${product.price}</p>
                <button class="btn btn-primary edit-btn" data-index="${index}">Editar</button>
                <button class="btn btn-danger delete-product" data-index="${index}">Eliminar</button>
              </div>
          `;
    const editBtn = card.querySelector(".edit-btn");
    editBtn.addEventListener("click", () => {
      editProduct(index);
    });
    const deleteBtn = card.querySelector(".delete-product");
    deleteBtn.addEventListener("click", deleteProduct);
    productsContainer.appendChild(card);
  });
}
renderProducts()

function editProduct(index) {
  // Redirecciona a la página de edición pasando el índice del producto como parámetro
  window.location.href = `editarproducto.html?index=${index}`;
}
function deleteProduct(event) {
  event.preventDefault();

  // obtener el índice del producto a eliminar
  const index = parseInt(event.target.dataset.index);

  // obtener el array de productos guardado en localStorage
  const products = JSON.parse(localStorage.getItem("products")) || [];

  // mostrar un mensaje de confirmación antes de eliminar el producto
  const confirmed = confirm(`¿Estás seguro de que quieres eliminar ${products[index].name}?`);
  
  // si el usuario confirma que desea eliminar el producto, entonces eliminarlo
  if (confirmed) {
    // eliminar el producto del array con splice()
    products.splice(index, 1);

    // guardar el array actualizado de productos en localStorage
    localStorage.setItem("products", JSON.stringify(products));

    // redirigir al usuario a la página de listado de productos actualizada
    window.location.href = "listarproductos.html";
  }
}

