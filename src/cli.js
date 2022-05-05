#!/usr/bin/env node
/* 
  La linea anterior es una instancia de una línea shebang: 
  la primera línea en un archivo ejecutable de texto sin formato en plataformas tipo Unix 
  que le dice al sistema a qué intérprete pasar ese archivo para su ejecución, 
  a través del comando línea siguiendo el prefijo máfico #! (llamado shebang).
  En Windows no admite líneas shebang, por lo que se ignoran allí; 
  en Windows, es únicamente la extensión del nombre de archivo de un archivo determinado 
  lo que determina qué ejecutable lo interpretará. 
  Sin embargo, aún los necesita en el contexto de npm.
*/

const mdLinks = require('./md-links.js');
const process = require('process');

//Captura argumentos desde la Terminal
const terminalArg = process.argv;

const funtionCli = () => {
    mdLinks(terminalArg)
    .then((result) => {
        console.log(result)
    })
    .catch((error) => {
        console.log(error);
    })
}

funtionCli();