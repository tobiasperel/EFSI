var tareas = [];
var cantidadTareas = 0;
var idTareaMarCorta = 0;
var masCorto = 0;
texto = document.querySelector("#texto");

function crearTareas(){
    cantidadTareas++;
    var TareaEjemplo = new Tarea(cantidadTareas,texto.value,Date.now());
    tareas.push(TareaEjemplo);
    crearHTMl();
}

texto.addEventListener("keypress", function(e) {
    if (e.key === 'Enter') {
        crearTareas();
    }
    
});

class Tarea{
    constructor(id, contenido, fechaCreacion,fechaFinalizacion){
        this.id = id;
        this.contenido = contenido;
        this.fechaCreacion = fechaCreacion;
        this.estaRealizada = false;
        this.fechaFinalizacion = 0;
    }
}

function crearHTMl(){
    todasLasTareas = document.querySelector("#tareasEnProceso");
    todasLasTareas.innerHTML = `<ul>${tareas.map(tarea => `<li> <input type="checkbox" onclick = "tareaRealizada(${tarea.id})"><p id = "${tarea.id}">${tarea.contenido}</p></li>`).join('')}</ul>`;
    document.querySelector("#texto").value = '';
}

function tareaRealizada(id){
    
    let texto = document.getElementById(`${id}`);
    estaRealizada = tareas[id-1].estaRealizada;

    if(tareas[id-1].estaRealizada){
        texto.style.textDecoration= 'none'; //lo destacha 
        tareas[id-1].estaRealizada = false;
    }else{
        texto.style.textDecoration= 'line-through'; //lo tacha 
        tareas[id-1].estaRealizada = true;
        masRapido(id)
    }
}

function masRapido(id){

    tarea = tareas[id-1];
    tarea.fechaFinalizacion = Date.now()
    let {fechaCreacion,fechaFinalizacion} = tarea;

    tiempoDeRealizacion = fechaFinalizacion - fechaCreacion;

    console.log(masCorto,tiempoDeRealizacion)

    if(tiempoDeRealizacion > masCorto){
        masCorto = tiempoDeRealizacion;
        idTareaMarCorta = id;
    }
}
function mostrarTareaMasRapida(){

    tareasMasRapida = document.querySelector("#tareasMasRapida");
    
    if(idTareaMarCorta==0){
        tareasMasRapida.innerHTML = `<p>No hay tareas realizadas</p>`
    }else{
        tareasMasRapida.innerHTML = `<p>${tareas[idTareaMarCorta-1].contenido}</p>`
    }

}

