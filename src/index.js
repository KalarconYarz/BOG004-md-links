// Se importa la funcion mdlinks
const mdlinks = require('./md-links.js');

// node methods process
const process = require('process');
const terminalArgs = process.argv;

// se invoca la funcion mdlinks
mdlinks(terminalArgs);