// Paso 1: Definición de las Clases (Entidades)

// Clase para representar un Evento
class Evento {
    idEvento: number;
    nombre: string;
    fechaHora: string;
    categoria: string;
    capacidad: number;

    constructor(idEvento: number, nombre: string, fechaHora: string, categoria: string, capacidad: number) {
        this.idEvento = idEvento;
        this.nombre = nombre;
        this.fechaHora = fechaHora;
        this.categoria = categoria;
        this.capacidad = capacidad;
    }
}

// Clase para representar un Participante
class Participante {
    idParticipante: number;
    nombre: string;
    apellido: string;
    email: string;

    constructor(idParticipante: number, nombre: string, apellido: string, email: string) {
        this.idParticipante = idParticipante;
        this.nombre = nombre;
        this.apellido = apellido;
        this.email = email;
    }
}

// Clase para representar una Inscripción
class Inscripcion {
    idInscripcion: number;
    idEvento: number;
    idParticipante: number;
    fechaInscripcion: string;

    constructor(idInscripcion: number, idEvento: number, idParticipante: number, fechaInscripcion: string) {
        this.idInscripcion = idInscripcion;
        this.idEvento = idEvento;
        this.idParticipante = idParticipante;
        this.fechaInscripcion = fechaInscripcion;
    }
}

// Paso 2: Implementación del Sistema de Gestión de Eventos

class SistemaGestionEventos {
    eventos: Evento[] = [];
    participantes: Participante[] = [];
    inscripciones: Inscripcion[] = [];

    agregarEvento(evento: Evento): void {
        this.eventos.push(evento);
    }

    agregarParticipante(participante: Participante): void {
        this.participantes.push(participante);
    }

    inscribirParticipante(inscripcion: Inscripcion): boolean {
        const evento = this.obtenerEvento(inscripcion.idEvento);
        if (evento && this.verificarDisponibilidadCupos(evento.idEvento)) {
            this.inscripciones.push(inscripcion);
            return true;
        }
        return false;
    }

    obtenerEvento(idEvento: number): Evento | undefined {
        return this.eventos.find(evento => evento.idEvento === idEvento);
    }

    obtenerParticipante(idParticipante: number): Participante | undefined {
        return this.participantes.find(participante => participante.idParticipante === idParticipante);
    }

    // 1. Filtrar eventos por fecha o categoría
    filtrarEventos(fecha?: string, categoria?: string): Evento[] {
        return this.eventos.filter(evento => {
            const fechaCoincide = !fecha || evento.fechaHora.startsWith(fecha);
            const categoriaCoincide = !categoria || evento.categoria.toLowerCase() === categoria.toLowerCase();
            return fechaCoincide && categoriaCoincide;
        });
    }

    // 2. Obtener lista de participantes inscritos en un evento específico
    obtenerParticipantesEvento(idEvento: number): Participante[] {
        const inscritos = this.inscripciones.filter(inscripcion => inscripcion.idEvento === idEvento);
        return inscritos.map(inscripcion => this.obtenerParticipante(inscripcion.idParticipante)).filter(p => p !== undefined) as Participante[];
    }

    // 3. Verificar disponibilidad de cupos en un evento
    verificarDisponibilidadCupos(idEvento: number): boolean {
        const evento = this.obtenerEvento(idEvento);
        if (evento) {
            const numInscritos = this.inscripciones.filter(inscripcion => inscripcion.idEvento === idEvento).length;
            return numInscritos < evento.capacidad;
        }
        return false;
    }

    // 4. Transformar datos de inscripciones para generar certificados
    generarCertificado(idInscripcion: number): string | undefined {
        const inscripcion = this.inscripciones.find(i => i.idInscripcion === idInscripcion);
        if (inscripcion) {
            const evento = this.obtenerEvento(inscripcion.idEvento);
            const participante = this.obtenerParticipante(inscripcion.idParticipante);
            if (evento && participante) {
                return `Certificado: ${participante.nombre} ${participante.apellido} participó en '${evento.nombre}' el ${evento.fechaHora}.`;
            }
        }
        return undefined;
    }

    // 5. Calcular estadísticas de asistencia por tipo de evento
    calcularEstadisticasAsistencia(): { [categoria: string]: number } {
        const estadisticas: { [categoria: string]: number } = {};
        for (const inscripcion of this.inscripciones) {
            const evento = this.obtenerEvento(inscripcion.idEvento);
            if (evento) {
                estadisticas[evento.categoria] = (estadisticas[evento.categoria] || 0) + 1;
            }
        }
        return estadisticas;
    }
}

// Paso 3: Ejemplo de Uso

const sistemaEventos = new SistemaGestionEventos();

// Crear eventos
const evento1 = new Evento(1, "Conferencia de IA", "2025-06-10 09:00", "Conferencia", 100);
const evento2 = new Evento(2, "Taller de Python", "2025-06-15 14:00", "Taller", 30);
const evento3 = new Evento(3, "Seminario de Marketing Digital", "2025-06-10 11:00", "Seminario", 50);
sistemaEventos.agregarEvento(evento1);
sistemaEventos.agregarEvento(evento2);
sistemaEventos.agregarEvento(evento3);

// Crear participantes
const participante1 = new Participante(101, "Laura", "Gómez", "laura.gomez@email.com");
const participante2 = new Participante(102, "Pedro", "Sánchez", "pedro.sanchez@email.com");
const participante3 = new Participante(103, "Sofía", "Martínez", "sofia.martinez@email.com");
sistemaEventos.agregarParticipante(participante1);
sistemaEventos.agregarParticipante(participante2);
sistemaEventos.agregarParticipante(participante3);

// Inscribir participantes
sistemaEventos.inscribirParticipante(new Inscripcion(1, 1, 101, "2025-06-01"));
sistemaEventos.inscribirParticipante(new Inscripcion(2, 1, 102, "2025-06-02"));
sistemaEventos.inscribirParticipante(new Inscripcion(3, 2, 101, "2025-06-03"));
sistemaEventos.inscribirParticipante(new Inscripcion(4, 3, 103, "2025-06-04"));
sistemaEventos.inscribirParticipante(new Inscripcion(5, 1, 103, "2025-06-05"));

// Paso 4: Probar las operaciones

console.log("\n--- Eventos filtrados por fecha (2025-06-10) ---");
const eventosFecha = sistemaEventos.filtrarEventos("2025-06-10");
eventosFecha.forEach(evento => console.log(`ID: ${evento.idEvento}, Nombre: ${evento.nombre}, Categoría: ${evento.categoria}, Fecha: ${evento.fechaHora}`));

console.log("\n--- Eventos filtrados por categoría (Taller) ---");
const eventosCategoria = sistemaEventos.filtrarEventos(undefined, "Taller");
eventosCategoria.forEach(evento => console.log(`ID: ${evento.idEvento}, Nombre: ${evento.nombre}, Categoría: ${evento.categoria}, Fecha: ${evento.fechaHora}`));

console.log("\n--- Participantes inscritos en el Evento ID 1 ---");
const participantesEvento1 = sistemaEventos.obtenerParticipantesEvento(1);
participantesEvento1.forEach(participante => console.log(`ID: ${participante.idParticipante}, Nombre: ${participante.nombre} ${participante.apellido}, Email: ${participante.email}`));

console.log("\n--- ¿Hay cupos disponibles en el Evento ID 2? ---");
const disponibleEvento2 = sistemaEventos.verificarDisponibilidadCupos(2);
console.log(`Disponibilidad en Evento 2: ${disponibleEvento2}`);

console.log("\n--- Generar certificado para la inscripción 1 ---");
const certificado1 = sistemaEventos.generarCertificado(1);
if (certificado1) {
    console.log(certificado1);
} else {
    console.log("Inscripción no encontrada.");
}

console.log("\n--- Estadísticas de asistencia por tipo de evento ---");
const estadisticas = sistemaEventos.calcularEstadisticasAsistencia();
console.log(estadisticas);