#!/usr/bin/env node
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