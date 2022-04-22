const mdLinks = (args) => {
    console.log('llego a md', args);
 
// Modulos de NODE
const fs = require('fs'); // fail system modulo utilizado de node
const path = require('path'); //captura la ruta

// captura de ruta a partir de arry de args
const terminalPath = args[2];

// Conversion de ruta relativa a absoluta
const pathAbsolute = path.resolve(terminalPath).normalize();
console.log('Ruta convertida Absoluta', pathAbsolute);
// captura de argumentos desde la terminal  
//const args = process.argv; // arg nos captura kis argumentos y el valor de la informacion
// console.log(args); 

// Pregunta si es un argumento
fs.stat(pathAbsolute, (err, stats) => {
  if (err) throw err;
  // console.log(`stats: ${JSON.stringify(stats)}`);
  console.log('Soy un directorio',stats.isDirectory());

});
}
module.exports = mdLinks;


// const process = require ('process'); // Provee la informacion sobre el proceso de Node.Js
// console.log('number of arguments is '+ args.length + ' index 2 ' +args[2]);
// const pathArgument = path.resolve(args[2]) //resolve convierte la ruta en absoluto 
// console.log(path.normalize(pathArgument)) // normaliza la ruta dada
// // Lee el contenido del archivo
// fs.readFile(path.normalize(pathArgument), 'utf8', function(err, data) {
//   if (err) throw err;
//   console.log(data);
// });
// Extrae el nombre de la extension del archivo
// const extension = path.extname('prueba.md');
// console.log('es un archivo md' + extension);
// Obtiene la ruta absoluta del directorio y el archivo actual
// const dirName = path.dirname(__dirname); //dirname obtiene la ruta 
// const filename= path.dirname(__filename); //filename es el archivo actual
// // console.log('directory-name', dirName);


// });
