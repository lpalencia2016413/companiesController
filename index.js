const mongoose =  require("mongoose")
const app = require("./app")
var empresaControlador = require("./src/controladores/empresas.controlador");

mongoose.Promise = global.Promise
mongoose.connect('mongodb+srv://admin:admin@companiescontrollerdb.r3wft.mongodb.net/myFirstDatabase?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true }).then(()=>{
    console.log('Se encuentra conectado a la base de datos');
    app.listen(process.env.PORT || 3000, function () {
        console.log("Servidor corriendo en el puerto 3000");
        empresaControlador.admin();
    })
}).catch(err => console.log(err))
