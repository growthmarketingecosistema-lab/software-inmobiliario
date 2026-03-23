const mongoose = require('mongoose');

const uri = "mongodb+srv://Ecosistema:Ecosistema@cluster0.llkyqyr.mongodb.net/growth_system?retryWrites=true&w=majority&appName=Cluster0";

console.log("Probando nueva conexion con Mongoose...");
mongoose.connect(uri)
  .then(() => {
    console.log("CONEXION_EXITOSA con Ecosistema:Ecosistema");
    process.exit(0);
  })
  .catch((err) => {
    console.error("ERROR_CONEXION", err.message);
    process.exit(1);
  });
