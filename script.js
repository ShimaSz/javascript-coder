class Producto {
    constructor(nombre, marca, modelo, precio, stock){
        this.nombre = nombre;
        this.marca = marca;
        this.modelo = modelo;
        this.precio = precio;
        this.stock = false;
    }
    modificarPrecio(nuevoPrecio) {
        this.precio = nuevoPrecio;
    }
    modificarModelo(nuevoModelo) {
        this.modelo = nuevoModelo;
    }
    modificarNombre(nuevoNombre) {
        this.nombre = nuevoNombre;
    }
}

const productos = [];


const usb = new Producto('usb', 'generico', '1.1', 100, true);
const motherboard = new Producto('motherboard', 'Gigabyte', 'B450', 2000, true);
const ssd = new Producto('ssd 512gb', 'Adata', '2.0', 900, true);
const hdd = new Producto('ssd 1tb', 'seagate', '2.0', 800, true);

productos.push(usb, motherboard, ssd,hdd);
console.log(productos);

alert('Bienvenido a Regisuma');

let nombre = prompt('Ingrese su nombre');

while ((nombre == '') & (nombre !== '')) {
    nombre = prompt('Ingrese su nombre')
}

let bienvenida = document.getElementById('container');
bienvenida.innerHTML = `<h2>Bienvenido a Regisuma</h2> <p>Es un placer atenderte, ${nombre}.</p>`;
console.log(bienvenida.innerHTML);
