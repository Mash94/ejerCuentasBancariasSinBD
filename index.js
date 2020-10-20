
/*  Paquetes instalados: -g nodemon, express, express-handlebars, body-parser, mysql2
    Agregado al archivo "package.json" la línea --> "start": "nodemon index"
*/
//Cargo librerías instaladas y necesarias
const express = require('express'); //Para el manejo del servidor Web
const exphbs  = require('express-handlebars'); //Para el manejo de los HTML
const bodyParser = require('body-parser'); //Para el manejo de los strings JSON

const app = express(); //Inicializo express para el manejo de las peticiones

app.use(express.static('public')); //Expongo al lado cliente la carpeta "public"

app.use(bodyParser.urlencoded({ extended: false })); //Inicializo el parser JSON
app.use(bodyParser.json());

app.engine('handlebars', exphbs({defaultLayout: 'main'})); //Inicializo Handlebars. Utilizo como base el layout "Main".
app.set('view engine', 'handlebars'); //Inicializo Handlebars

const Listen_Port = 3001; //Puerto por el que estoy ejecutando la página Web

app.listen(Listen_Port, function() {
    console.log('Servidor NodeJS corriendo en http://localhost:' + Listen_Port + '/');
});

/*
    A PARTIR DE ESTE PUNTO GENERAREMOS NUESTRO CÓDIGO (PARA RECIBIR PETICIONES, MANEJO DB, ETC.)
    A PARTIR DE ESTE PUNTO GENERAREMOS NUESTRO CÓDIGO (PARA RECIBIR PETICIONES, MANEJO DB, ETC.)
    A PARTIR DE ESTE PUNTO GENERAREMOS NUESTRO CÓDIGO (PARA RECIBIR PETICIONES, MANEJO DB, ETC.)
    A PARTIR DE ESTE PUNTO GENERAREMOS NUESTRO CÓDIGO (PARA RECIBIR PETICIONES, MANEJO DB, ETC.)
    A PARTIR DE ESTE PUNTO GENERAREMOS NUESTRO CÓDIGO (PARA RECIBIR PETICIONES, MANEJO DB, ETC.)
    A PARTIR DE ESTE PUNTO GENERAREMOS NUESTRO CÓDIGO (PARA RECIBIR PETICIONES, MANEJO DB, ETC.)
*/

//FUNCIÓN DE EJEMPLO PETICIÓN GET

app.get('/', function(req, res)
{   //Petición GET con URL = "/", lease, página principal.
    console.log(' + El navegador pidió la pag principal..'); 
    res.render('nada', null); //Renderizo página "nada" porque la pagina principal está formada solo por los partials
});

app.post('/obtenerMayor', function(req, res)
{
    console.log(' + El cliente pidió el saldo mayor..'); 
    let saldoMayor = Math.max.apply(null, clientes.map(x => x.saldo));
    let mayor = clientes.find(x => {  //busca en un array aquel elemento que compla la condición
       if(x.saldo==saldoMayor){
        return x;
       }
    });
    let objetoTemp = {
        mayorNombre:mayor.nombre, 
        mayorApellido:mayor.apellido
    }
    console.log('   Le mandamos esto:',objetoTemp); 
    res.render('obtenerMayor', objetoTemp); //Renderizo página "home" sin pasar ningún objeto a Handlebars
});

app.post('/obtenerMenor', function(req, res)
{
    console.log(' + El cliente pidió el saldo menor..'); 
    let saldoMinimo = Math.min.apply(null, clientes.map(x => x.saldo));
    let minimo = clientes.find(x => {
        if(x.saldo==saldoMinimo){
            return x;
        }
    });
    let objetoTemp = {
        minimoNombre:minimo.nombre, 
        minimoApellido:minimo.apellido
    }
    console.log('   Le mandamos esto:',objetoTemp); 
    res.render('obtenerMinimo', objetoTemp); //Renderizo página "home" sin pasar ningún objeto a Handlebars
});

app.post('/buscar', function(req, res)
{
    console.log(' + El cliente pidió buscan en la lista de clientes a: ', req.body.nombreBuscar); 
    let objetoTemp;
    let isExist = false;
    let busqueda = clientes.find(x => {
        if(x.nombre==req.body.nombreBuscar){
            isExist = true;
            return x;
        }
    });
    if(isExist){
        console.log("    Found..");
        objetoTemp = {
            buscadoNombre:busqueda.nombre, 
            buscadoApellido:busqueda.apellido
        }
    }else{
        console.log("    Not found..");
        objetoTemp = {
            buscadoNombre:req.body.nombreBuscar, 
            buscadoApellido:'no es cliente del Banco'
        }
    }
    console.log('   Le mandamos esto:',objetoTemp); 
    res.render('clienteBuscado', objetoTemp); //Renderizo página "home" sin pasar ningún objeto a Handlebars
});

app.post('/listarClientes', function(req, res)
{
    console.log(' + El cliente pidió la lista de clientes..'); 
    console.log('   Le mandamos esto:',clientes); 
    res.render('listarClientes', {clientes: clientes}); //Renderizo página "home" sin pasar ningún objeto a Handlebars
});

app.post('/listarMorosos', function(req, res)
{
    let morosos = []; 
    clientes.forEach(x => {
        if(x.saldo < 0){
            morosos.push(x)
        }
    });
    res.render('listarMorosos', {clientes: morosos} );
});

app.post('/home', function(req, res)
{
    console.log(' + El cliente pidió volver a la página principal..'); 
    res.render('nada', null); //Renderizo página "home" sin pasar ningún objeto a Handlebars
});

app.post('/cargarCliente', function(req, res)
{
    console.log(' + El cliente mandó los datos del cliente nuevo para cargar..',req.body); 
    let objetoCliente = {
        saldo: parseInt(req.body.saldo),
        apellido: req.body.apellido,
        nombre: req.body.nombre
    }
    clientes.push(objetoCliente)
    console.log('   Carga exitosa, vuelve a la página principal');
    res.render('nada', null); //Renderizo página "home" sin pasar ningún objeto a Handlebars
});

app.post('/signin', function(req, res)
{
    //Petición post con URL = "/singin"
    console.log(' + El cliente pidió un formulario para cargar clientes nuevos..'); 
    res.render('signin', null); //Renderizo página "singin" sin pasar ningún objeto a Handlebars
});

var clientes = [
    {
        saldo: 24500,
        nombre: "Juan",
        apellido: "Pérez"
    },
    {
        saldo: 489712,
        nombre: "Ricardo",
        apellido: "Rubén"
    },
    {
        saldo: 1234567,
        nombre: "Esteban",
        apellido: "Quito"
    },
    {
        saldo: 14000,
        nombre: "Armando",
        apellido: "Paredes"
    },
    {
        saldo: -56000,
        nombre: "Juan",
        apellido: "Topo"
    },
    {
        saldo: 1200000,
        nombre: "Elsa",
        apellido: "Pato"
    },
    {
        saldo: -96,
        nombre: "Marcia",
        apellido: "Ana"
    },
    {
        saldo: 65535,
        nombre: "Susana",
        apellido: "Oria"
    }
];