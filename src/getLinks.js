// // Librerías

// // marked: Packete que actúa como compilador de bajo nivel para analizar markdowns
// // sin almacenar en caché o bloquear durante largos períodos de tiempo. Funciona
// // en un navegador, en un servidor o desde una interfaz de línea de comandos (CLI)
// const { marked } = require('marked');
// // jsdom: Permite recrear un DOM dentro de un entorno en el que no contamos con un
// // navegador. Este DOM podemos tanto tomarlo de un fichero externo como crearlo
// // desde cero mediante los métodos que este script proporciona.
// const jsdom = require('jsdom');
// // node-fetch: Módulo que permite realizar peticiones http mediante el uso de promesas
// // implementando el API Fetch.
// const fetch = require('node-fetch');
// // Para usar jsdom, utilizará principalmente el constructor JSDOM. Pase al constructor
// // una cadena y obtendrá un objeto JSDOM.
// const { JSDOM } = jsdom; // Destructuración

// const onelink = {
//   href: "",
//   text: "",
//   file: "",
// };
// // Funcion para obtener los links de un archivo .md
// let arrayLinks = [];
// const getLinks = (data, file) => {
//   console.log('hay algo',getLinks)
//   let html = marked(data);
//   const dom = new JSDOM(html);
//   const document = dom.window.document;
//   const links = document.querySelectorAll("a");
//   if (links.length === 0) return console.log("No hay links en el archivo " + file);
//   else {
//   links.forEach((link) => {
//     if(link.href.includes("http")){
//     let newLink = Object.create(onelink);
//     newLink.href = link.href;
//     newLink.text = link.text;
//     newLink.file = file;
//     arrayLinks.push(newLink);
//     }
//   });
//   return console.log(arrayLinks);
// }
// };

// module.exports = getLinks;