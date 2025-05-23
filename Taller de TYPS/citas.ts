// Paso 1: Definición de las Clases (Entidades)

// Definimos la estructura para un Paciente
class Paciente {
    idPaciente: number;
    nombre: string;
    apellido: string;
    fechaNacimiento: string;
    telefono: string;
    email: string;

    constructor(idPaciente: number, nombre: string, apellido: string, fechaNacimiento: string, telefono: string, email: string) {
        this.idPaciente = idPaciente;
        this.nombre = nombre;
        this.apellido = apellido;
        this.fechaNacimiento = fechaNacimiento;
        this.telefono = telefono;
        this.email = email;
    }
}

// Definimos la estructura para un Médico
class Medico {
    idMedico: number;
    nombre: string;
    apellido: string;
    especialidad: string;

    constructor(idMedico: number, nombre: string, apellido: string, especialidad: string) {
        this.idMedico = idMedico;
        this.nombre = nombre;
        this.apellido = apellido;
        this.especialidad = especialidad;
    }
}


// Definimos la estructura para una Cita
class Cita {
    idCita: number;
    idPaciente: number;
    idMedico: number;
    fechaHora: string;
    especialidad: string;
    estado: string; // Ej: 'Programada', 'Cancelada', 'Completada'

    constructor(idCita: number, idPaciente: number, idMedico: number, fechaHora: string, especialidad: string, estado: string = "Programada") {
        this.idCita = idCita;
        this.idPaciente = idPaciente;
        this.idMedico = idMedico;
        this.fechaHora = fechaHora;
        this.especialidad = especialidad;
        this.estado = estado;
    }
}

// Paso 2: Implementación del Sistema de Gestión de Citas

class SistemaGestionCitas {
    pacientes: Paciente[] = [];
    medicos: Medico[] = [];
    citas: Cita[] = [];

    // Método para agregar un nuevo paciente al sistema
    agregarPaciente(paciente: Paciente): void {
        this.pacientes.push(paciente);
    }

    // Método para agregar un nuevo médico al sistema
    agregarMedico(medico: Medico): void {
        this.medicos.push(medico);
    }

    // Método para programar una nueva cita
    programarCita(cita: Cita): void {
        this.citas.push(cita);
    }

    // 1. Filtrar citas por especialidad médica
    filtrarCitasPorEspecialidad(especialidad: string): Cita[] {
        // Usamos el método 'filter' del array 'citas' para retornar solo las citas cuya especialidad coincida (ignorando mayúsculas/minúsculas)
        return this.citas.filter(cita => cita.especialidad.toLowerCase() === especialidad.toLowerCase());
    }

    // 2. Obtener todas las citas de un paciente específico
    obtenerCitasPorPaciente(idPaciente: number): Cita[] {
        // Filtramos las citas para obtener solo aquellas cuyo 'idPaciente' coincida con el proporcionado
        return this.citas.filter(cita => cita.idPaciente === idPaciente);
    }

    // 3. Listar citas programadas para una fecha determinada
    listarCitasPorFecha(fecha: string): Cita[] {
        // Filtramos las citas para obtener solo aquellas cuya 'fechaHora' comience con la fecha proporcionada
        // Esto asume que el formato de 'fechaHora' es 'YYYY-MM-DD HH:MM'
        return this.citas.filter(cita => cita.fechaHora.startsWith(fecha));
    }

    // 4. Transformar datos de citas para generar un reporte diario
    generarReporteDiario(fecha: string): string {
        const citasDelDia = this.listarCitasPorFecha(fecha);
        let reporte = `--- Reporte de Citas para el ${fecha} ---\n`;
        // Iteramos sobre las citas del día para formatear la información en el reporte
        for (const cita of citasDelDia) {
            // Buscamos el paciente y el médico correspondientes a la cita por sus IDs
            const paciente = this.pacientes.find(p => p.idPaciente === cita.idPaciente);
            const medico = this.medicos.find(m => m.idMedico === cita.idMedico);
            const nombrePaciente = paciente ? `${paciente.nombre} ${paciente.apellido}` : "Paciente no encontrado";
            const nombreMedico = medico ? `${medico.nombre} ${medico.apellido}` : "Médico no encontrado";
            reporte += `ID Cita: ${cita.idCita}, Paciente: ${nombrePaciente}, Médico: ${nombreMedico} (${cita.especialidad}), Hora: ${cita.fechaHora}\n`;
        }
        reporte += "--------------------------------------";
        return reporte;
    }

    // 5. Verificar disponibilidad de un doctor en una fecha y hora específicas
    verificarDisponibilidadDoctor(idMedico: number, fechaHora: string): boolean {
        // Verificamos si existe alguna cita en la lista 'citas' que tenga el mismo 'idMedico' y la misma 'fechaHora'
        return !this.citas.some(cita => cita.idMedico === idMedico && cita.fechaHora === fechaHora);
    }
}

// Paso 3: Ejemplo de Uso

// Crear una instancia del sistema de gestión de citas
const sistema = new SistemaGestionCitas();

// Crear algunos pacientes
const paciente1 = new Paciente(1, "Ana", "Pérez", "1990-05-15", "123-456-7890", "ana.perez@email.com");
const paciente2 = new Paciente(2, "Carlos", "López", "1985-11-20", "987-654-3210", "carlos.lopez@email.com");
sistema.agregarPaciente(paciente1);
sistema.agregarPaciente(paciente2);

// Crear algunos médicos
const medico1 = new Medico(101, "Sofía", "Gómez", "Cardiología");
const medico2 = new Medico(102, "Javier", "Ruiz", "Medicina General");
sistema.agregarMedico(medico1);
sistema.agregarMedico(medico2);

// Programar algunas citas
sistema.programarCita(new Cita(1, 1, 101, "2025-05-15 10:00", "Cardiología"));
sistema.programarCita(new Cita(2, 2, 102, "2025-05-15 11:30", "Medicina General"));
sistema.programarCita(new Cita(3, 1, 102, "2025-05-16 09:00", "Medicina General"));
sistema.programarCita(new Cita(4, 2, 101, "2025-05-16 14:00", "Cardiología"));

// Paso 4: Probar las operaciones implementadas

console.log("\n--- Citas de Cardiología ---");
const citasCardiologia = sistema.filtrarCitasPorEspecialidad("Cardiología");
citasCardiologia.forEach(cita => console.log(`ID: ${cita.idCita}, Paciente ID: ${cita.idPaciente}, Médico ID: ${cita.idMedico}, Fecha/Hora: ${cita.fechaHora}`));

console.log("\n--- Citas del Paciente con ID 1 ---");
const citasPaciente1 = sistema.obtenerCitasPorPaciente(1);
citasPaciente1.forEach(cita => console.log(`ID: ${cita.idCita}, Médico ID: ${cita.idMedico}, Fecha/Hora: ${cita.fechaHora}, Especialidad: ${cita.especialidad}`));

console.log("\n--- Citas para el 2025-05-15 ---");
const citasFecha = sistema.listarCitasPorFecha("2025-05-15");
citasFecha.forEach(cita => console.log(`ID: ${cita.idCita}, Paciente ID: ${cita.idPaciente}, Médico ID: ${cita.idMedico}, Hora: ${cita.fechaHora}`));

console.log("\n--- Reporte Diario para el 2025-05-15 ---");
console.log(sistema.generarReporteDiario("2025-05-15"));

console.log("\n--- Disponibilidad del Médico 101 el 2025-05-15 a las 10:00 ---");
const disponible1 = sistema.verificarDisponibilidadDoctor(101, "2025-05-15 10:00");
console.log(`¿Disponible? ${disponible1}`);

console.log("\n--- Disponibilidad del Médico 101 el 2025-05-15 a las 12:00 ---");
const disponible2 = sistema.verificarDisponibilidadDoctor(101, "2025-05-15 12:00");
console.log(`¿Disponible? ${disponible2}`);