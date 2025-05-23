// Paso 1: Definición de las Clases (Entidades)

// Clase para representar un Equipo Tecnológico
class Equipo {
    idEquipo: number;
    nombre: string;
    tipo: string; // 'Computadora', 'Proyector', 'Pantalla', etc.
    aulaAsignada: number | null; // ID del aula, null si no está asignado
    valor: number;

    constructor(idEquipo: number, nombre: string, tipo: string, valor: number, aulaAsignada: number | null = null) {
        this.idEquipo = idEquipo;
        this.nombre = nombre;
        this.tipo = tipo;
        this.aulaAsignada = aulaAsignada;
        this.valor = valor;
    }

    asignarAula(idAula: number): void {
        this.aulaAsignada = idAula;
    }

    desasignarAula(): void {
        this.aulaAsignada = null;
    }
}

// Clase para representar un Aula
class Aula {
    idAula: number;
    nombre: string;

    constructor(idAula: number, nombre: string) {
        this.idAula = idAula;
        this.nombre = nombre;
    }
}

// Paso 2: Implementación del Sistema de Registro

class SistemaRegistroEquiposAulas {
    equipos: Equipo[] = [];
    aulas: Aula[] = [];

    agregarEquipo(equipo: Equipo): void {
        this.equipos.push(equipo);
    }

    agregarAula(aula: Aula): void {
        this.aulas.push(aula);
    }

    obtenerAula(idAula: number): Aula | undefined {
        return this.aulas.find(aula => aula.idAula === idAula);
    }

    obtenerEquipo(idEquipo: number): Equipo | undefined {
        return this.equipos.find(equipo => equipo.idEquipo === idEquipo);
    }

    asignarEquipoAula(idEquipo: number, idAula: number): void {
        const equipo = this.obtenerEquipo(idEquipo);
        if (equipo && this.obtenerAula(idAula)) {
            equipo.asignarAula(idAula);
        }
    }

    desasignarEquipoAula(idEquipo: number): void {
        const equipo = this.obtenerEquipo(idEquipo);
        if (equipo) {
            equipo.desasignarAula();
        }
    }

    // 1. Filtrar equipos disponibles (no asignados)
    filtrarEquiposDisponibles(): Equipo[] {
        return this.equipos.filter(equipo => equipo.aulaAsignada === null);
    }

    // 2. Obtener todos los equipos asignados a un aula específica
    obtenerEquiposPorAula(idAula: number): Equipo[] {
        return this.equipos.filter(equipo => equipo.aulaAsignada === idAula);
    }

    // 3. Transformar datos de equipos para generar un inventario
    generarInventario(): { [tipo: string]: { nombre: string; cantidad: number; valorTotal: number }[] } {
        const inventario: { [tipo: string]: { nombre: string; cantidad: number; valorTotal: number }[] } = {};
        this.equipos.forEach(equipo => {
            if (!inventario[equipo.tipo]) {
                inventario[equipo.tipo] = [];
            }
            const equipoExistente = inventario[equipo.tipo].find(item => item.nombre === equipo.nombre);
            if (equipoExistente) {
                equipoExistente.cantidad++;
                equipoExistente.valorTotal += equipo.valor;
            } else {
                inventario[equipo.tipo].push({ nombre: equipo.nombre, cantidad: 1, valorTotal: equipo.valor });
            }
        });
        return inventario;
    }

    // 4. Verificar aulas sin equipos esenciales (por ejemplo, proyector)
    verificarAulasSinEquipoEsencial(tipoEquipoEsencial: string): Aula[] {
        return this.aulas.filter(aula => {
            return !this.equipos.some(equipo => equipo.aulaAsignada === aula.idAula && equipo.tipo === tipoEquipoEsencial);
        });
    }

    // 5. Calcular el valor total de equipos asignados por aula
    calcularValorTotalPorAula(): { [idAula: number]: number } {
        const valorPorAula: { [idAula: number]: number } = {};
        this.equipos.forEach(equipo => {
            if (equipo.aulaAsignada !== null) {
                valorPorAula[equipo.aulaAsignada] = (valorPorAula[equipo.aulaAsignada] || 0) + equipo.valor;
            }
        });
        return valorPorAula;
    }
}

// Paso 3: Ejemplo de Uso

const sistemaRegistro = new SistemaRegistroEquiposAulas();

// Crear aulas
const aula1 = new Aula(101, "Aula A");
const aula2 = new Aula(102, "Aula B");
const aula3 = new Aula(103, "Aula C");
sistemaRegistro.agregarAula(aula1);
sistemaRegistro.agregarAula(aula2);
sistemaRegistro.agregarAula(aula3);

// Crear equipos
const equipo1 = new Equipo(1, "Dell XPS", "Computadora", 1200);
const equipo2 = new Equipo(2, "Epson Proyector", "Proyector", 800, 101);
const equipo3 = new Equipo(3, "Samsung Pantalla 55\"", "Pantalla", 500, 101);
const equipo4 = new Equipo(4, "HP Laptop", "Computadora", 1100, 102);
const equipo5 = new Equipo(5, "BenQ Proyector", "Proyector", 750, 102);
const equipo6 = new Equipo(6, "LG Pantalla 60\"", "Pantalla", 600, 102);
const equipo7 = new Equipo(7, "Lenovo ThinkPad", "Computadora", 1050); // No asignado
const equipo8 = new Equipo(8, "Acer Proyector", "Proyector", 700); // No asignado
sistemaRegistro.agregarEquipo(equipo1);
sistemaRegistro.agregarEquipo(equipo2);
sistemaRegistro.agregarEquipo(equipo3);
sistemaRegistro.agregarEquipo(equipo4);
sistemaRegistro.agregarEquipo(equipo5);
sistemaRegistro.agregarEquipo(equipo6);
sistemaRegistro.agregarEquipo(equipo7);
sistemaRegistro.agregarEquipo(equipo8);

// Paso 4: Probar las operaciones

console.log("\n--- Equipos disponibles (no asignados) ---");
const disponibles = sistemaRegistro.filtrarEquiposDisponibles();
disponibles.forEach(equipo => console.log(`ID: ${equipo.idEquipo}, Nombre: ${equipo.nombre}`));

console.log("\n--- Equipos asignados al Aula 101 ---");
const equiposAula101 = sistemaRegistro.obtenerEquiposPorAula(101);
equiposAula101.forEach(equipo => console.log(`ID: ${equipo.idEquipo}, Nombre: ${equipo.nombre}, Tipo: ${equipo.tipo}`));

console.log("\n--- Inventario de equipos ---");
const inventario = sistemaRegistro.generarInventario();
console.log(inventario);

console.log("\n--- Aulas sin Proyector ---");
const aulasSinProyector = sistemaRegistro.verificarAulasSinEquipoEsencial("Proyector");
aulasSinProyector.forEach(aula => console.log(`Aula ID: ${aula.idAula}, Nombre: ${aula.nombre}`));

console.log("\n--- Valor total de equipos por aula ---");
const valorPorAula = sistemaRegistro.calcularValorTotalPorAula();
console.log(valorPorAula);