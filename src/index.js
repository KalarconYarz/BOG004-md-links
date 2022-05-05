// Se importa modulo para traer la funcion mdlinks
const mdlinks = require('./md-links.js');

// node methods process
const process = require('process');
const chalk = require('chalk');

// captura argumentos de la terminal
const arguments = process.argv;

// se invoca la funcion mdlinks
mdlinks(arguments).then(links => console.log(
    ` ◁ㅤㅤ❚❚ㅤㅤ▷ Links Encontrados ✎`
 ,links));
