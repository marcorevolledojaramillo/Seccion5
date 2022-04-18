
require('colors');
const Tarea = require('./tarea');

class Tareas {
    _listado = {};
    get listadoArr() {
        const listado = [];
        Object.keys(this._listado).forEach(key => {
            const tarea = this._listado[key];
            listado.push(tarea);
        });

        return listado;
    }

    constructor() {
        this._listado = {};
    }
    borrarTarea(id=''){
        if(this._listado[id]){
            delete this._listado[id];
        }
    }

    cargarTareasCreadas(data = []) {
        data.forEach(tarea => {
            this._listado[tarea.id] = tarea;
        })
    };


    crearTarea(desc = '') {
        const tarea = new Tarea(desc);
        this._listado[tarea.id] = tarea;
    }
    listadoCompleto() {
        console.clear();
        const listado = this.listadoArr;
        console.log('========================================================================');
        console.log('                             LISTADO DE TAREAS                          ');
        console.log('========================================================================');
        let estado = '';
        listado.forEach((tarea, i) => {
            const idx = `${i + 1}`.green;
            const { desc, completadoEn } = tarea;
            const estado = (completadoEn)
                ? 'Completada'.green
                : 'Pendiente'.red;
            console.log(`${idx}  ${desc}  ::  ${estado}`);

        });
    }

    listarPendienteCompletadas(completada = true) {
        console.clear();
        const listado = this.listadoArr;
        console.log('========================================================================');
        console.log(`                      LISTADO DE TAREAS ${(completada) ? 'COMPLETADAS' : 'PENDIENTES'}                            `);
        console.log('========================================================================');
        let contador = 1;
        listado.forEach((tarea) => {
            
            const { desc, completadoEn } = tarea;
            const estado = (completadoEn)
                ? 'Completada'.green
                : 'Pendiente'.red;
            if (completada) {
                if (tarea.completadoEn) {
                    console.log(`${contador}  ${desc}  ::\t\tCompletado en: ${completadoEn.green}`);
                    contador++;
                };
            } else {
                if (!tarea.completadoEn) {        
                    console.log(`${contador}  ${desc}  ::  ${estado}`);
                    contador++;
                };
            };
        });
    }

    toglleCompletadas(ids=[]){
        ids.forEach(id =>{
            const tarea=this._listado[id];
            if(!tarea.completadoEn){
                tarea.completadoEn = new Date().toISOString();
            }
        });

        this.listadoArr.forEach(tarea=>{
            if (!ids.includes(tarea.id)){
                this._listado[tarea.id].completadoEn=null;
            }
        });
    }
}

module.exports = Tareas;