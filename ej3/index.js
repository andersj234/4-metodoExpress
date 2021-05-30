const express = require("express");
const app = express();
const personas = require("./personas");


 app.use(express.urlencoded({extended: false}));
 app.use(express.static("public"));
 app.use(express.json());
 
 app.get("/personas",function (req, res) {
    res.send(personas)
})

app.post("/personas", function(req,res){
    let personaNueva ={
        nombre:req.body.nombre,
        apellido:req.body.apellido,
        edad: parseInt(req.body.edad)
    }
    personas.push(personaNueva)
    /*personas.push({
        nombre:req.body.nombre,
        apellido:req.body.apellido,
        edad:req.body.edad,
    })*/ // esta es la forma mas corta ahorrandonos el paso de crear la variable
    res.send(personaNueva)
});

app.put("/persona", function(req,res) {
    let personaEditar={
        nombre:req.body.nombre,
        apellido:req.body.apellido,
        edad: parseInt(req.body.edad)
    }
    let found;
    for (let i = 0; i < personas.length && !found; i++) {
        found= false
        if(personas[i].nombre === req.body.nombre){ // cuando found sea true detendra el bucle al encontrar 1
            found= true
            personas[i].apellido = req.body.apellido 
            personas[i].edad = req.body.edad
        }
        
    }
    found
    ? res.send({mensaje: "Modificado correctamente"})
    : res.send({mensaje: "no se ha encontrado"})
})

app.delete("/personas",  function (req,res) {
    req.body.nombre;
let found = false
    for (let i = 0; i < personas.length && !found; i++) {
        if(personas[i].nombre === req.body.nombre){
            found = true
            personas.splice(i,1)
        }else{

        }
        
    }
    found
    ? res.send({mensaje: "Borrado  correctamente"})
    : res.send({mensaje: "no se ha encontrado"})
})
 app.listen(3000);
