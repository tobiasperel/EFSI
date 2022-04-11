var tareas = [];
var cantidadTareas = 0;
var idTareaMarCorta = 0;
var masCorto = null;
texto = document.querySelector("#texto");

class Tarea{
    constructor(id, contenido, fechaCreacion){
        this.id = id;
        this.contenido = contenido;
        this.fechaCreacion = fechaCreacion;
        this.estaTachada = false;
        this.estaBorrada = false;
        this.fechaFinalizacion = 0;
    }
}

function crearTareas(){
    if(texto.value != ""){
        cantidadTareas++;
        var TareaCrear = new Tarea(cantidadTareas,texto.value,Date.now());
        tareas.push(TareaCrear);
        borrarTarea(-1);
    }
}

texto.addEventListener("keypress", function(e) {
    if (e.key === 'Enter') {
        crearTareas();
    }
});



function crearHTML(tareasAMostrar){
    
    todasLasTareas = document.querySelector("#tareasEnProceso");
    todasLasTareas.innerHTML = `<ul class="" id="toDoList">${tareasAMostrar.map(tarea => `<li class="border-2 border-indigo-500/100 bg-gray-200 rounded-lg mb-3 py-2 grid grid-cols-12" id = "${tarea.id+"-li"}"> <input id="${tarea.id+"-checkbox"}"  class="bg-indigo-200 mx-auto my-auto border-2 border-indigo-500/100" type="checkbox" onclick = "tareaTachada(${tarea.id})"><p class="col-span-9" id = "${tarea.id+"-p"}">${tarea.contenido}</p><button class="col-span-2" id = "btn" onclick = "borrarTarea(${tarea.id})"><i class="fa-solid fa-trash-can"></i></button></li>`).join('')}</ul>`;
    texto.value = '';
    
    for (let i = 0; i < tareas.length; i++) {
        let textoTarea = document.getElementById(`${i+1}-p`);
        estaTachadaBool = tareas[i].estaTachada;
        if(estaTachadaBool && !tareas[i].estaBorrada){
            textoTarea.style.textDecoration= "line-through"; 
            document.getElementById(`${i+1}-checkbox`).checked = true;
        }
    }
    mostrarTareaMasRapida();
}

function borrarTarea(id){
    if(id != -1){
        tareas[id-1].estaBorrada = true;
    }
    nuevasTareas = tareas.filter(tarea => !tarea.estaBorrada);

    if(id == idTareaMarCorta){
        idTareaMarCorta = 0;
        masCorto = null;
    }
    crearHTML(nuevasTareas);
    
}

function tareaTachada(id){
    
    let texto = document.getElementById(`${id}-p`);
    estaTachadaBool = tareas[id-1].estaTachada;

    if(estaTachadaBool){
        texto.style.textDecoration= 'none'; //lo destacha 
        tareas[id-1].estaTachada = false;
        tareas[id-1].fechaFinalizacion = 0;
        if(id == idTareaMarCorta){
            idTareaMarCorta = 0;
            masCorto = null;
        }
        mostrarTareaMasRapida();
    }else{
        texto.style.textDecoration= 'line-through '; //lo tacha
        tareas[id-1].estaTachada = true;
        finalizarTarea(id);
    }
}

function finalizarTarea(id){
    tarea = tareas[id-1];
    tarea.fechaFinalizacion = Date.now();
    mostrarTareaMasRapida();
}

function calcularTareaMasRapida(){
    for (let i = 0; i < tareas.length; i++) {
    
        let {fechaCreacion,fechaFinalizacion,estaTachada,estaBorrada} = tareas[i];
        tiempoDeRealizacion = fechaFinalizacion - fechaCreacion;
        if(!estaBorrada & (tiempoDeRealizacion < masCorto || masCorto==null) & estaTachada){
            {
            masCorto = tiempoDeRealizacion;
            idTareaMarCorta = i+1;
            }
        }
    }
}

function mostrarTareaMasRapida(){
    calcularTareaMasRapida();
    tareasMasRapida = document.querySelector("#tareasMasRapida");
    
    if(idTareaMarCorta==0){
        tareasMasRapida.innerHTML = `<p>No hay tareas realizadas</p>`;
    }else{
        tareasMasRapida.innerHTML = `<p>La tarea mas rapida en realizarse fue "${tareas[idTareaMarCorta-1].contenido}"</p>`;
    }

}

