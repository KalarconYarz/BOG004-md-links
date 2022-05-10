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

const mdLinks = require('./index');
const process = require('process');
const chalk = require('chalk');
const { arrayTemplate, statusTemplate, totalLinks } = require('./stats.js');

const arguments = process.argv.slice(2);

//<<<<se importa librería Figlet para dar estilo al nombre md-links>>>>
let figlet = require('figlet');
const { url } = require('inspector');
const { text } = require('figlet');
  figlet('md-Links', function(err, data) {
      if (err) {
          console.log('Something went wrong...');
          console.dir(err);
          return;
    }
      console.log(data)
});


switch (arguments.length) {
  case 0:
    console.log(chalk.redBright.bold('⋆⌘⋆Por favor Ingresa una Ruta ___⋆⌘⋆'));
    break;
  case 1:
    mdLinks(arguments[0], { validate: false })
      .then((response) => {
        console.log(`${arrayTemplate(response)}`);
      })
      .catch((err) => console.log(chalk.redBright.bold(err)));
    break;
  case 2:
    //console.log('argumento[1]', arguments[1]);
    if (arguments[1] === '--validate') {
      // console.log('argumento[0]', arguments[0]);
      mdLinks(arguments[0], { validate: true })
        .then((response) => {
          console.log(`${statusTemplate(response)}`);
        })
        .catch((err) => console.log(chalk.redBright.bold(err)));
    } else if (arguments[1] === '--stats') {
      mdLinks(arguments[0], { validate: true })
        .then((response) => {
          console.log(`${totalLinks(response)}`);
        })
        .catch((err) => console.log(chalk.redBright.bold(err)));
    }
    // else if (argumentos[1] === '--help') {
    //   console.log(chalk.cyan.bold(help));
    // }
    else console.log(chalk.redBright.bold(' ☹️ Opción Inválida '));
    break;
  case 3:
    if (
      (arguments[1] === '--validate' && arguments[2] === '--stats') ||
      (arguments[1] === '--stats' && arguments[2] === '--validate')
    ) {
      mdLinks(arguments[0], { validate: true })
        .then((response) => {
          console.log(`${totalLinks(response)}`);
          console.log(`${statusTemplate(response)}`);
        })
        .catch((err) => console.log(chalk.redBright.bold(err)));
    } else console.log(chalk.redBright.bold(' ☹️ Opción Inválida '));
    break;
  default:
    console.log(chalk.redBright.bold('🧑‍💻 Datos Incorrectos'));
}