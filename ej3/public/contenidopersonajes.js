lista();
function lista() {
    fetch("./personas").then(function(respuesta){
        return respuesta.json()
    }).then(function (datos){
        let parrafo ="";
        for (let i = 0; i < datos.length; i++) {
            parrafo += `<tr><td>${datos[i].nombre}</td><td>${datos[i].apellido}</td><td>${datos[i].edad}</td></tr>`
        }
        document.getElementById("lista").innerHTML = `<table>${parrafo}</table>`
    })
}


function enviarInfo(){
    let nombre = document.getElementById("nombre").value;
    let apellido = document.getElementById("apellido").value;
    let edad = document.getElementById("edad").value;
    let paqueteFDX={
        nombre, //para no tener que darles una clave valor puedes usar el nombre de la variable si se llaman igual
        apellido,
        edad,
    }

    fetch("/personas",{
        method: "POST",
        headers:{
            "Content-Type" : "application/json",
        },
        body: JSON.stringify(paqueteFDX)
    }).then(function(respuesta){
        return respuesta.json()
    }).then(function(datos){
        //document.getElementById("nuevo").innerHTML =`<h2>Usuario agregado:</h2><br/><table><tr><td>${datos.nombre}</td><td>${datos.apellido}</td>${datos.edad}<td></td></tr></table>`
        lista()
    })
}


function modificarInfo() {
    let nombre = document.getElementById("nombre").value;
    let apellido = document.getElementById("apellido").value;
    let edad = document.getElementById("edad").value;
    let paqueteFDX={
        nombre:document.getElementById("nombre").value,//para no tener que darles una clave valor puedes usar el nombre de la variable si se llaman igual
        apellido:document.getElementById("apellido").value, 
        edad:document.getElementById("edad").value
    }
    fetch("/persona", {
        method: "PUT",
        headers: {
            'Content:Type' : 'application/json',
        },
        body: JSON.stringify(paqueteFDX)
    }).then(function (respuesta) {
        return respuesta.json()
    }).then(function(datos){
        document.getElementById("nuevo").innerHTML =`<h3>${datos.mensaje}</h3>`, lista()
    })
}

function borrar() {
    let nombre = document.getElementById("nombre").value

    fetch("/personas", {
        method: "DELETE",
        headers:{
            "Content-Type" : "application/json"
        },
        body: JSON.stringify(nombre)
    }).then(function (respuesta) {
        return respuesta.json()
    }).then(function(datos){
        document.getElementById("feedback").innerHTML =`<h3>${datos.mensaje}</h3>`, lista()
    })
}