import { registrarInteraccion } from './registrarInteraccion.js';

export class GroupChatManager {
  constructor() {
    this.planner = new AlmaPlanner();
    this.engineer = new AlmaEngineer();
    this.executor = new AlmaExecutor();
    this.writer = new AlmaWriter();
    this.admin = new AlmaAdmin();
  }

  async procesarMensaje(mensaje) {
    const plan = this.planner.planear(mensaje);
    const funcion = this.engineer.generarFuncion(plan);
    const resultado = this.executor.ejecutar(funcion);
    const respuesta = this.writer.redactar(resultado);
    return this.admin.revisar(respuesta);
  }
}

class AlmaPlanner {
  planear(intencion) {
    if (typeof intencion === 'string' && intencion.length > 20) {
      registrarInteraccion('intencionCompleja', { mensaje: intencion });
    }
    return `plan(${intencion})`;
  }
}

class AlmaEngineer {
  generarFuncion(descripcion) {
    registrarInteraccion('funcionGenerada', { descripcion });
    return () => `ejecutando ${descripcion}`;
  }
}

class AlmaExecutor {
  ejecutar(tareaFn) {
    const resultado = tareaFn();
    registrarInteraccion('tareaEjecutada', { resultado });
    return resultado;
  }
}

class AlmaWriter {
  redactar(texto) {
    registrarInteraccion('contenidoRedactado', { texto });
    return `AlmaWriter: ${texto}`;
  }
}

class AlmaAdmin {
  revisar(tarea) {
    registrarInteraccion('revisionTarea', { tarea });
    return `AlmaAdmin revisó: ${tarea}`;
  }
}
