class TicketManager {
    #precioBaseDeGanancia;
    #eventos;
    static idAutoincrementable = 1;

    constructor(precioBaseDeGanancia) {
        this.#precioBaseDeGanancia = precioBaseDeGanancia;
        this.#eventos = [];
    }

    getEventos() {
        return this.#eventos;
    }

    agregarEvento(nombre, lugar, precio, capacidad = 50, fecha = new Date()) {
        const evento = {
            id: TicketManager.idAutoincrementable++,
            nombre,
            lugar,
            precio: precio + (precio * 0.15) + this.#precioBaseDeGanancia,
            capacidad,
            fecha,
            participantes: []
        };
        this.#eventos.push(evento);
    }

    agregarUsuario(idEvento, idUsuario) {
        const evento = this.#eventos.find(e => e.id === idEvento);
        if (!evento) {
            console.log('Evento no encontrado');
            return;
        }
        if (evento.participantes.includes(idUsuario)) {
            console.log('El usuario ya está registrado en el evento');
            return;
        }
        evento.participantes.push(idUsuario);
    }

    ponerEventoEnGira(idEvento, nuevaLocalidad, nuevaFecha) {
        const eventoOriginal = this.#eventos.find(e => e.id === idEvento);
        if (!eventoOriginal) {
            console.log('Evento no encontrado');
            return;
        }

        const nuevoEvento = {
            ...eventoOriginal,
            id: TicketManager.idAutoincrementable++,
            lugar: nuevaLocalidad,
            fecha: nuevaFecha,
            participantes: []
        };

        this.#eventos.push(nuevoEvento);
    }
}

// Ejemplo de uso:
const manager = new TicketManager(1000); // Precio: 1000
manager.agregarEvento('Concierto', 'Estadio Nacional', 50000); // Evento agregado
console.log(manager.getEventos());

manager.agregarUsuario(1, 123); // Agregar usuario con id 1
console.log(manager.getEventos());

manager.ponerEventoEnGira(1, 'Estadio Monumental', new Date('2024-12-25')); // Crear gira
console.log(manager.getEventos());
