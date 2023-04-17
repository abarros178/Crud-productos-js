let contenido =  document.getElementById("contenido");
let carrito   =  JSON.parse(localStorage.getItem("carrito")) || [];
let imprimir = () => {

	contenido.innerHTML = carrito.map( x => {
		let {id, cantidad } = x; 
		let buscar  = productos.find(x  => x.id === id);
		
		let subtotal = new Intl.NumberFormat("eu-ES").format(cantidad* buscar.precio);
		// let cantItem  = buscar === undefined ? 0 : buscar.cantidad;
		return `
		<div class="card mt-3" style="width: 18rem;margin-right:10px">
		  <img src="${buscar.foto}" class="card-img-top" alt="...">
		  <div class="card-body">
		    <h5 class="card-title">${buscar.nombre}</h5>
		    <h6 class="card-title">Precio unitario:$${buscar.precio}</h6>
		    <h6 class="card-title">Subtotal: $${subtotal}</h6>
		    <p class="card-text">${buscar.descripcion}</p>
		    <div style="display:flex">
		    		<i onclick="disminuir(${id})" class="bi bi-dash-lg"></i>
		    				<div id="${id}"> ${cantidad} </div>
		    		<i onclick="aumentar(${id})" class="bi bi-plus-lg"></i>
		    </div>
		  </div>
		</div>
	`;
	}).join("");
}
imprimir();

let aumentar = (id) => { 
	console.log(id);
	let item = id;
	let buscar = carrito.find(x => x.id === item.id);
	console.log(buscar);
	if(buscar=== undefined ){
		let pro = {
			id: item.id,
			cantidad: 1
		}
		carrito.push(pro);		
	}else{
		buscar.cantidad+=1;
	}
	localStorage.setItem("carrito", JSON.stringify(carrito));
	imprimir();
	actualizar();
	totalPagarCompra();
}

let disminuir = (id) => {
	let item = id;
	let buscar = carrito.find(x => x.id === item.id);
	console.log(carrito)
	if(buscar=== undefined ) 
		return true;
	else if (buscar.cantidad > 0) 
		buscar.cantidad-=1;

	carrito = carrito.filter( x => x.cantidad !== 0);
	localStorage.setItem("carrito", JSON.stringify(carrito));
	imprimir();
	actualizar();
	totalPagarCompra();
}

let actualizar = () => {
	let totalItems = document.getElementById("totalItems");
	let total      = carrito.map( x => x.cantidad).reduce((x, y) => x + y, 0);
    totalItems.innerHTML = `[${total}]`;
}
actualizar();


let totalPagarCompra = () => {
	let totalPagar = document.getElementById("totalPagar");
	let TC = carrito.map( x => {
		let buscar = productos.find(w => w.id === x.id);
		return (x.cantidad * buscar.precio);
	}).reduce((r, z) => r + z, 0);
	TC = new Intl.NumberFormat("eu-ES").format(TC);
	totalPagar.innerHTML = TC;
}
totalPagarCompra();