class Producto {
    constructor(nombre, marca, modelo, precio){
        this._nombre = nombre;
        this._marca = marca;
        this._modelo = modelo;
        this._precio = precio;
    }
    modificarPrecio(nuevoPrecio) {
        this._precio = nuevoPrecio;
    }
    modificarModelo(nuevoModelo) {
        this._modelo = nuevoModelo;
    }
    modificarNombre(nuevoNombre) {
        this._nombre = nuevoNombre;
    }
}

const productos = [];

const usb = new Producto('usb', 'generico', '1.1', 100);
const ssd = new Producto('ssd 512gb', 'Adata', '2.0', 900);
const hdd = new Producto('ssd 1tb', 'seagate', '2.0', 800);
productos.push(usb, ssd,hdd);

const bienvenidaUsuario = () => {
    let nombre = prompt('Ingrese su nombre');
    
    while ((nombre == '') && (nombre !== NaN)) {
        nombre = prompt('Ingrese su nombre');
    }    
    swal({
        title: "Bienvenido a Regisuma!",
        text: "Nos complace verte por aquí de nuevo",
        icon: "info",
      });
    let bienvenida = document.getElementById('container');
    bienvenida.innerHTML = `<h2>Bienvenido a Regisuma</h2> <p>Es un placer verte de nuevo, ${nombre}.</p>`;
    bienvenida.className = 'titulo';
    console.log(bienvenida.innerHTML);
    localStorage.setItem('nombreUsuario', 1);   /* Se setea el nombre de usuario */
}
const mostrarFormulario = () => {
    let contenedorInputs = document.getElementById('inputsProducto');
    contenedorInputs.innerHTML = `  <form id='formularioProducto'>
                                        <label for="nombreFormulario">Nombre</label>
                                        <input type='text' id='nombreFormulario' placeholder='Ingrese nombre'>
                                        <label for="marcaFormulario">Marca</label>
                                        <input type='text' id='marcaFormulario' placeholder='Ingrese marca'>
                                        <label for="modeloFormulario">Modelo</label>
                                        <input type='text' id='modeloFormulario' placeholder='Ingrese modelo'>      
                                        <label for="precioFormulario">Precio</label>
                                        <input type='number' id='precioFormulario' placeholder='Ingrese precio'>
                                        <input type="submit" id="enviarFormularioProducto" value="Agregar Producto">
                                    <form>`;
    let formularioProducto = document.getElementById('formularioProducto');
    formularioProducto.style.display = 'flex';
    formularioProducto.style.flexDirection = 'column';
    formularioProducto.style.gap = '10px';

    /* Eventos del formulario */

    formularioProducto.addEventListener("submit", (e) => {
        e.preventDefault();
        console.log("Se envio el formulario");
        let valoresFormulario = e.target
        console.log(valoresFormulario.children[1].value);   /* Se obtiene el valor del segundo hijo del formulario */
        console.log(valoresFormulario.children[3].value);
        console.log(valoresFormulario.children[5].value);
        console.log(valoresFormulario.children[7].value);

        let aniadirProducto = new Producto(valoresFormulario.children[1].value, valoresFormulario.children[3].value, valoresFormulario.children[5].value, valoresFormulario.children[7].value);
        productos.push(aniadirProducto);
        ocultarFormulario();
        Toastify({
            text: "Producto agregado con exito",
            offset: {
              x: 50,
              y: 10 
            },
            style: {
                background: "orange",
              }
          }).showToast();    });
}
const agregarCardProducto = (nombre,marca,modelo,precio) => {     /* Funcion para agregar cards */
    const mostrarProductos = document.getElementById('mostrarProductos');       /* Se obtiene la seccion del html */
    let card = document.createElement('div');
    card.className = 'tarjeta';
    let divisionImagenCard = document.createElement('div');
    divisionImagenCard.className = 'imagenProducto'
    let imagenCard = document.createElement('h5');
    imagenCard.innerText = 'Imagen de producto';
    divisionImagenCard.append(imagenCard);
    /* Espacio para hacer el append de la imagen al div imagenCard */
    let contenidoCard = document.createElement('div');
    contenidoCard.className = 'textoProductos';
    let marcaContenidoCard = document.createElement('h5');
    marcaContenidoCard.innerText = 'Regisuma';
    let descripcionCard = document.createElement('p');
    descripcionCard.innerText = `${nombre}, ${marca}, Modelo: ${modelo}`;
    descripcionCard.style.textAlign = 'center';
    let precioCard = document.createElement('p');
    precioCard.innerText = `$${precio}`;
    contenidoCard.append(marcaContenidoCard,descripcionCard,precioCard);
    card.append(divisionImagenCard, contenidoCard);
    mostrarProductos.append(card);
}
const ocultarFormulario = () => {
    return formularioProducto.style.display = "none";
}
const botonCerrarSesion = () => {
    let botonLogout = document.getElementById('botonLogout');
    botonLogout.style.display = 'block';
    botonLogout.addEventListener("click", ()=>{
        localStorage.clear();
    })
}

botonLogout.style.display = 'none';
let nombreUsuario = localStorage.getItem('nombreUsuario');

nombreUsuario == null? bienvenidaUsuario() : botonCerrarSesion();   /* Se usa operador ternario */
botonCerrarSesion();

/* Empieza interaccion con boton 1  */
let botonProducto = document.getElementById('agregarProducto');     
botonProducto.onclick = () => {
    mostrarFormulario();        /* Se agrega formulario cuando se le da click al boton */
    mostrarProductos.innerHTML = "";
    localStorage.setItem("productos", JSON.stringify(productos));
}

/* Empiezan eventos del boton 2 */

let botonInventario = document.getElementById("consultarProductos");
botonInventario.addEventListener("click", () => {
    ocultarFormulario();
    mostrarProductos.innerHTML = "";
    productos.forEach(element => {
        agregarCardProducto(element._nombre, element._marca,element._modelo, element._precio);
    });
});