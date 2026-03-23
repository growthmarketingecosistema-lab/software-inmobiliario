const mongoose = require('mongoose');

const passwordsToTry = [
  'Ecosistema',
  'ecosistema',
  'ECOSISTEMA',
  'password',
  'admin',
  '123456',
  '%3Cdb_password%3E'
];

async function testPasswords() {
  for (const pwd of passwordsToTry) {
    try {
      const uri = `mongodb+srv://Ecosistema:${pwd}@cluster0.llkyqyr.mongodb.net/growth_system?retryWrites=true&w=majority&appName=Cluster0`;
      console.log(`Buscando con: ${pwd}`);
      await mongoose.connect(uri, { serverSelectionTimeoutMS: 5000 });
      console.log("CONEXION EXITOSA CON:", pwd);
      process.exit(0);
    } catch (err) {
      console.log("Fallo:", pwd);
    }
  }
}

testPasswords().then(() => {
  console.log("Ni uno funcionó.");
  process.exit(1);
});
