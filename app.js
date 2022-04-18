require('colors'); //Paquete de colores 

const { inquirerMenu, pausa, leerInput, listadoTareasBorrar, confirmar, listadoCompletarTareas } = require('./helpers/inquirer'); //Importacion de mensajes
const Tareas = require('./models/tareas'); //Importar del modelo las Tareas
const {guardarDB, leerDB} = require('./helpers/dbcontroller'); //Importar cambios a la base de datos

console.clear(); // Limpiar la consola de todo lo que tiene anteriormente   

const main = async()=>{ //Se crea un metodo main, que se utiliza abajo
    let opt='';// Se abre la variable para la seleccion del menu
    const tareas = new Tareas();
    const tareasDB=leerDB();

    if(tareasDB){
        tareas.cargarTareasCreadas(tareasDB);
    }
    do {//Menu infinito hasta salir
        opt = await inquirerMenu(); //Abrir Menu
        switch (opt) {
            case '1'://Abrir opcion de creacion de tareas
                const desc= await leerInput('Descripcion: '); //Solicitar la descripcion de la tarea(El id se coloca aleatoriamente) 
                tareas.crearTarea(desc); // Crear y almacenar la tarea
                break;
            case '2'://Listar tareas
                tareas.listadoCompleto();
                 //Enter para volver al menu
                break;
            case '3':
                tareas.listarPendienteCompletadas(true);
                break;
            case '4':
                tareas.listarPendienteCompletadas(false);
            break;
            case '5': //Completado pendiente
                 const ids = await listadoCompletarTareas(tareas.listadoArr);
                tareas.toglleCompletadas(ids);
                 break;
            case '6':
                const id = await listadoTareasBorrar(tareas.listadoArr);
                if(!(id=='0')){
                    const ok= await confirmar('¿Esta seguro de borrar esta tarea?');
                    if(ok){
                    tareas.borrarTarea(id); 
                    console.log('Tarea borrada');
                } 
                }
                
                break;
            case '0':
                if(opt==0);//Salir del programa
                break;                
            default:
                break;
        }
        guardarDB(tareas.listadoArr);
        
        await pausa();

    } while (opt !== '0');//Salida y fin del programa
    
}

main();