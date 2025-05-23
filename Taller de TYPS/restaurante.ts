// Paso 1: Definición de las Clases (Entidades)

// Clase para representar un Plato
class Plato {
    idPlato: number;
    nombre: string;
    precio: number;

    constructor(idPlato: number, nombre: string, precio: number) {
        this.idPlato = idPlato;
        this.nombre = nombre;
        this.precio = precio;
    }
}

// Clase para representar una Comanda
class Comanda {
    idComanda: number;
    idMesa: number;
    platos: { idPlato: number; cantidad: number }[]; // Array de platos con su cantidad
    estado: string; // 'pendiente', 'en preparación', 'lista', 'entregada'
    horaPedido: Date;

    constructor(idComanda: number, idMesa: number, horaPedido: Date = new Date()) {
        this.idComanda = idComanda;
        this.idMesa = idMesa;
        this.platos = [];
        this.estado = 'pendiente';
        this.horaPedido = horaPedido;
    }

    agregarPlato(idPlato: number, cantidad: number = 1): void {
        const existingItem = this.platos.find(item => item.idPlato === idPlato);
        if (existingItem) {
            existingItem.cantidad += cantidad;
        } else {
            this.platos.push({ idPlato, cantidad });
        }
    }
}

// Paso 2: Implementación del Sistema de Comandas

class SistemaComandas {
    platos: Plato[] = [];
    comandas: Comanda[] = [];

    agregarPlato(plato: Plato): void {
        this.platos.push(plato);
    }

    tomarComanda(comanda: Comanda): void {
        this.comandas.push(comanda);
    }

    obtenerPlato(idPlato: number): Plato | undefined {
        return this.platos.find(plato => plato.idPlato === idPlato);
    }

    // 1. Filtrar comandas por estado
    filtrarComandasPorEstado(estado: string): Comanda[] {
        return this.comandas.filter(comanda => comanda.estado.toLowerCase() === estado.toLowerCase());
    }

    // 2. Calcular el total a pagar por mesa
    calcularTotalPorMesa(idMesa: number): number {
        let total = 0;
        const comandasMesa = this.comandas.filter(comanda => comanda.idMesa === idMesa && comanda.estado === 'entregada');
        comandasMesa.forEach(comanda => {
            comanda.platos.forEach(item => {
                const plato = this.obtenerPlato(item.idPlato);
                if (plato) {
                    total += plato.precio * item.cantidad;
                }
            });
        });
        return total;
    }

    // 3. Transformar datos de comandas para el equipo de cocina
    transformarParaCocina(): { [idComanda: number]: { nombrePlato: string; cantidad: number }[] } {
        const preparacion: { [idComanda: number]: { nombrePlato: string; cantidad: number }[] } = {};
        const comandasEnPreparacion = this.comandas.filter(comanda => comanda.estado === 'pendiente' || comanda.estado === 'en preparación');
        comandasEnPreparacion.forEach(comanda => {
            preparacion[comanda.idComanda] = [];
            comanda.platos.forEach(item => {
                const plato = this.obtenerPlato(item.idPlato);
                if (plato) {
                    preparacion[comanda.idComanda].push({ nombrePlato: plato.nombre, cantidad: item.cantidad });
                }
            });
        });
        return preparacion;
    }

    // 4. Obtener platos más vendidos en un período (simulado, sin período específico aquí)
    obtenerPlatosMasVendidos(): { nombrePlato: string; cantidadVendida: number }[] {
        const ventas: { [idPlato: number]: number } = {};
        this.comandas.filter(c => c.estado === 'entregada').forEach(comanda => {
            comanda.platos.forEach(item => {
                ventas[item.idPlato] = (ventas[item.idPlato] || 0) + item.cantidad;
            });
        });

        return Object.entries(ventas)
            .sort(([, a], [, b]) => b - a)
            .map(([id, cantidad]) => {
                const plato = this.obtenerPlato(parseInt(id, 10));
                return { nombrePlato: plato ? plato.nombre : 'Plato Desconocido', cantidadVendida: cantidad };
            });
    }

    // 5. Agrupar comandas por hora del día para analizar horas pico
    agruparComandasPorHora(): { [hora: number]: number } {
        const agrupacion: { [hora: number]: number } = {};
        this.comandas.forEach(comanda => {
            const hora = comanda.horaPedido.getHours();
            agrupacion[hora] = (agrupacion[hora] || 0) + 1;
        });
        return agrupacion;
    }
}

// Paso 3: Ejemplo de Uso

const sistemaComandas = new SistemaComandas();

// Crear platos
const plato1 = new Plato(1, "Hamburguesa", 10.99);
const plato2 = new Plato(2, "Pizza Margarita", 12.50);
const plato3 = new Plato(3, "Ensalada César", 8.75);
sistemaComandas.agregarPlato(plato1);
sistemaComandas.agregarPlato(plato2);
sistemaComandas.agregarPlato(plato3);

// Tomar comandas
const comanda1 = new Comanda(101, 1);
comanda1.agregarPlato(1, 2); // 2 Hamburguesas
comanda1.agregarPlato(3, 1); // 1 Ensalada César
comanda1.estado = 'en preparación';
sistemaComandas.tomarComanda(comanda1);

const comanda2 = new Comanda(102, 2);
comanda2.agregarPlato(2, 1); // 1 Pizza Margarita
comanda2.agregarPlato(1, 1); // 1 Hamburguesa
comanda2.estado = 'lista';
sistemaComandas.tomarComanda(comanda2);

const comanda3 = new Comanda(103, 1);
comanda3.agregarPlato(2, 1); // 1 Pizza Margarita
comanda3.estado = 'entregada';
sistemaComandas.tomarComanda(comanda3);

const comanda4 = new Comanda(104, 3);
comanda4.agregarPlato(3, 2); // 2 Ensaladas César
comanda4.estado = 'entregada';
sistemaComandas.tomarComanda(comanda4);

const comanda5 = new Comanda(105, 2, new Date('2025-05-14T19:30:00'));
comanda5.agregarPlato(1, 1);
comanda5.estado = 'entregada';
sistemaComandas.tomarComanda(comanda5);

const comanda6 = new Comanda(106, 1, new Date('2025-05-14T12:00:00'));
comanda6.agregarPlato(1, 1);
sistemaComandas.tomarComanda(comanda6);

// Paso 4: Probar las operaciones

console.log("\n--- Comandas en preparación ---");
const enPreparacion = sistemaComandas.filtrarComandasPorEstado('en preparación');
enPreparacion.forEach(comanda => console.log(`Comanda ID: ${comanda.idComanda}, Mesa: ${comanda.idMesa}, Estado: ${comanda.estado}`));

console.log("\n--- Total a pagar por la Mesa 1 (comandas entregadas) ---");
const totalMesa1 = sistemaComandas.calcularTotalPorMesa(1);
console.log(`Total Mesa 1: $${totalMesa1.toFixed(2)}`);

console.log("\n--- Datos de comandas para la cocina ---");
const paraCocina = sistemaComandas.transformarParaCocina();
console.log(paraCocina);

console.log("\n--- Platos más vendidos ---");
const masVendidos = sistemaComandas.obtenerPlatosMasVendidos();
console.log(masVendidos);

console.log("\n--- Agrupación de comandas por hora del día ---");
const comandasPorHora = sistemaComandas.agruparComandasPorHora();
console.log(comandasPorHora);