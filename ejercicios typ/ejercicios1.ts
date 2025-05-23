// 1. Clase Persona
class Persona {
  nombre: string;
  edad: number;
  documentoIdentidad: string;

  constructor(nombre: string, edad: number, documentoIdentidad: string) {
    this.nombre = nombre;
    this.edad = edad;
    this.documentoIdentidad = documentoIdentidad;
  }

  caminar(): void {
    console.log(`${this.nombre} está caminando.`);
  }

  hablar(): void {
    console.log(`${this.nombre} está hablando.`);
  }

  comer(): void {
    console.log(`${this.nombre} está comiendo.`);
  }
}


const persona1 = new Persona("Ana", 30, "123456789");
const persona2 = new Persona("Carlos", 25, "987654321");


console.log(persona1.nombre); 
persona2.hablar(); 
persona1.comer(); 
console.log("\n");




// 2. Clase CuentaBancaria
class CuentaBancaria {
  numeroCuenta: string;
  titular: string;
  saldo: number;

  constructor(numeroCuenta: string, titular: string, saldoInicial: number = 0) {
    this.numeroCuenta = numeroCuenta;
    this.titular = titular;
    this.saldo = saldoInicial;
  }

  depositar(cantidad: number): void {
    this.saldo += cantidad;
    console.log(`Se depositaron $${cantidad} en la cuenta ${this.numeroCuenta}. Nuevo saldo: $${this.saldo}`);
  }

  retirar(cantidad: number): void {
    if (cantidad <= this.saldo) {
      this.saldo -= cantidad;
      console.log(`Se retiraron $${cantidad} de la cuenta ${this.numeroCuenta}. Nuevo saldo: $${this.saldo}`);
    } else {
      console.log(`Saldo insuficiente en la cuenta ${this.numeroCuenta}.`);
    }
  }

  consultarSaldo(): void {
    console.log(`Saldo de la cuenta ${this.numeroCuenta} (${this.titular}): $${this.saldo}`);
  }
}


const cuenta1 = new CuentaBancaria("001-123", "Pedro", 1000);
const cuenta2 = new CuentaBancaria("002-456", "Luisa");

cuenta1.depositar(500);
cuenta2.depositar(100);
cuenta1.retirar(200);
cuenta2.retirar(150);
cuenta1.consultarSaldo();
cuenta2.consultarSaldo();
console.log("\n");





// 3. Clase Vehículo y subclases
class Vehiculo {
  marca: string;

  constructor(marca: string) {
    this.marca = marca;
  }

  desplazarse(): void {
    console.log("El vehículo se está desplazando.");
  }
}

class Coche extends Vehiculo {
  tipo: string = "Coche";
  desplazarse(): void {
    console.log(`El coche ${this.marca} está rodando por la carretera.`);
  }
}

class Barco extends Vehiculo {
  tipo: string = "Barco";
  desplazarse(): void {
    console.log(`El barco ${this.marca} está navegando por el agua.`);
  }
}

class Avion extends Vehiculo {
  tipo: string = "Avión";
  desplazarse(): void {
    console.log(`El avión ${this.marca} está volando por el cielo.`);
  }
}


const miCoche = new Coche("Toyota");
const miBarco = new Barco("Beneteau");
const miAvion = new Avion("Boeing");

miCoche.desplazarse();
miBarco.desplazarse();
miAvion.desplazarse();
console.log("\n");




// 4. Clase FiguraGeometrica y subclases
class FiguraGeometrica {
  area(): number {
    return 0; 
  }
}

class Triangulo extends FiguraGeometrica {
  base: number;
  altura: number;

  constructor(base: number, altura: number) {
    super();
    this.base = base;
    this.altura = altura;
  }

  area(): number {
    return (this.base * this.altura) / 2;
  }
}

class Circulo extends FiguraGeometrica {
  radio: number;

  constructor(radio: number) {
    super();
    this.radio = radio;
  }

  area(): number {
    return Math.PI * this.radio * this.radio;
  }
}

class Cuadrado extends FiguraGeometrica {
  lado: number;

  constructor(lado: number) {
    super();
    this.lado = lado;
  }

  area(): number {
    return this.lado * this.lado;
  }
}


const triangulo = new Triangulo(5, 10);
const circulo = new Circulo(7);
const cuadrado = new Cuadrado(6);

console.log(`Área del triángulo: ${triangulo.area()}`);
console.log(`Área del círculo: ${circulo.area()}`);
console.log(`Área del cuadrado: ${cuadrado.area()}`);
console.log("\n");





// 5. Clase Electrodoméstico y subclases
class Electrodomestico {
  precio: number;
  color: string;

  constructor(precio: number, color: string) {
    this.precio = precio;
    this.color = color;
  }
}

class Televisor extends Electrodomestico {
  pulgadas: number;

  constructor(precio: number, color: string, pulgadas: number) {
    super(precio, color);
    this.pulgadas = pulgadas;
  }
}

class Nevera extends Electrodomestico {
  litros: number;

  constructor(precio: number, color: string, litros: number) {
    super(precio, color);
    this.litros = litros;
  }
}

class Lavadora extends Electrodomestico {
  cargaKg: number;

  constructor(precio: number, color: string, cargaKg: number) {
    super(precio, color);
    this.cargaKg = cargaKg;
  }
}

const tv = new Televisor(500, "negro", 55);
const nevera = new Nevera(800, "blanca", 300);
const lavadora = new Lavadora(400, "gris", 7);

console.log(`Televisor - Precio: $${tv.precio}, Color: ${tv.color}, Pulgadas: ${tv.pulgadas}`);
console.log(`Nevera - Precio: $${nevera.precio}, Color: ${nevera.color}, Litros: ${nevera.litros}`);
console.log(`Lavadora - Precio: $${lavadora.precio}, Color: ${lavadora.color}, Carga: ${lavadora.cargaKg}kg`);
console.log("\n");






// 6. Clase Hotel y Habitación
class Habitacion {
  numero: number;
  precio: number;
  estado: "libre" | "ocupada";

  constructor(numero: number, precio: number) {
    this.numero = numero;
    this.precio = precio;
    this.estado = "libre";
  }

  reservar(): boolean {
    if (this.estado === "libre") {
      this.estado = "ocupada";
      console.log(`Habitación ${this.numero} reservada.`);
      return true;
    } else {
      console.log(`La habitación ${this.numero} ya está ocupada.`);
      return false;
    }
  }

  liberar(): void {
    this.estado = "libre";
    console.log(`Habitación ${this.numero} liberada.`);
  }
}

class Hotel {
  nombre: string;
  ubicacion: string;
  habitaciones: Habitacion[] = [];

  constructor(nombre: string, ubicacion: string) {
    this.nombre = nombre;
    this.ubicacion = ubicacion;
  }

  agregarHabitacion(habitacion: Habitacion): void {
    this.habitaciones.push(habitacion);
    console.log(`Habitación ${habitacion.numero} agregada al hotel ${this.nombre}.`);
  }

  reservarHabitacion(numeroHabitacion: number): void {
    const habitacion = this.habitaciones.find(hab => hab.numero === numeroHabitacion);
    if (habitacion) {
      habitacion.reservar();
    } else {
      console.log(`No se encontró la habitación ${numeroHabitacion} en el hotel ${this.nombre}.`);
    }
  }

  liberarHabitacion(numeroHabitacion: number): void {
    const habitacion = this.habitaciones.find(hab => hab.numero === numeroHabitacion);
    if (habitacion) {
      habitacion.liberar();
    } else {
      console.log(`No se encontró la habitación ${numeroHabitacion} en el hotel ${this.nombre}.`);
    }
  }
}

const hotelPlaya = new Hotel("Hotel Playa Linda", "Cartagena");
const habitacion101 = new Habitacion(101, 150);
const habitacion102 = new Habitacion(102, 200);

hotelPlaya.agregarHabitacion(habitacion101);
hotelPlaya.agregarHabitacion(habitacion102);

hotelPlaya.reservarHabitacion(101);
hotelPlaya.reservarHabitacion(101); 
hotelPlaya.liberarHabitacion(101);
hotelPlaya.reservarHabitacion(102);
console.log("\n");






// 7. Clase Película y CatalogoPeliculas
class Pelicula {
  titulo: string;
  duracion: number; 
  director: string;

  constructor(titulo: string, duracion: number, director: string) {
    this.titulo = titulo;
    this.duracion = duracion;
    this.director = director;
  }
}

class CatalogoPeliculas {
  peliculas: Pelicula[] = [];

  agregarPelicula(pelicula: Pelicula): void {
    this.peliculas.push(pelicula);
    console.log(`Película "${pelicula.titulo}" agregada al catálogo.`);
  }

  buscarPorTitulo(titulo: string): Pelicula | undefined {
    return this.peliculas.find(p => p.titulo.toLowerCase() === titulo.toLowerCase());
  }

  filtrarPorDirector(director: string): Pelicula[] {
    return this.peliculas.filter(p => p.director.toLowerCase() === director.toLowerCase());
  }
}


const catalogo = new CatalogoPeliculas();
const peli1 = new Pelicula("El Señor de los Anillos: La Comunidad del Anillo", 178, "Peter Jackson");
const peli2 = new Pelicula("El Señor de los Anillos: Las Dos Torres", 179, "Peter Jackson");
const peli3 = new Pelicula("Interestelar", 169, "Christopher Nolan");

catalogo.agregarPelicula(peli1);
catalogo.agregarPelicula(peli2);
catalogo.agregarPelicula(peli3);

const encontrada = catalogo.buscarPorTitulo("interestelar");
if (encontrada) {
  console.log(`Película encontrada: ${encontrada.titulo} (Dirigida por ${encontrada.director})`);
} else {
  console.log("Película no encontrada.");
}

const peliculasDeJackson = catalogo.filtrarPorDirector("Peter Jackson");
console.log("\nPelículas de Peter Jackson:");
peliculasDeJackson.forEach(p => console.log(`- ${p.titulo}`));