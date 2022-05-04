// Librerías //

// marked: Packete que actúa como compilador de bajo nivel para analizar markdowns
// sin almacenar en caché o bloquear durante largos períodos de tiempo. Funciona
// en un navegador, en un servidor o desde una interfaz de línea de comandos (CLI)
const { marked } = require("marked");
// jsdom: Permite recrear un DOM dentro de un entorno en el que no contamos con un
// navegador. Este DOM podemos tanto tomarlo de un fichero externo como crearlo
// desde cero mediante los métodos que este script proporciona.
const jsdom = require("jsdom");
// node-fetch: Módulo que permite realizar peticiones http mediante el uso de promesas
// implementando el API Fetch.
const fetch = require("node-fetch");
// Para usar jsdom, utilizará principalmente el constructor JSDOM. Pase al constructor
// una cadena y obtendrá un objeto JSDOM.
const { JSDOM } = jsdom; // Destructuración
const path = require('path');
const process = require ('process')
const {validateLinks} = require ('./validate.js')
const chalk = require("chalk");

const structureLink = {
  href: "",
  text: "",
  file: "",
};
// Funcion para obtener los links de un archivo .md

const getLinks = (data, file, options) => {
  file = path.relative(process.cwd(), file); 
  // process.cwd Proporciona el directorio de trabajo actual del proceso Node.js
  file = ".\\" + file;
  let allLinksArray = [];
  // console.log("hay algo", getLinks);
  let html = marked(data);
  const dom = new JSDOM(html);
  const document = dom.window.document;
  const links = document.querySelectorAll("a");
  if (links.length === 0)
    return console.log(chalk.redBright.cyan(
      (allLinksArray = `
      ╔══════°❀•°✮°•❀°═════╗
      📰El archivo ${file}❌ no contiene links
       ╚══════°❀•°✮°•❀°═════╝`))
    );
  else {
    links.forEach((link) => {
      if (link.href.includes("http")) {
        link.text.length > 50
          ? (link.text = link.text.substring(0, 50) + "...") // truncado a 50 caracteres)
          : link.text;
        let onlyLink = Object.create(structureLink);
        onlyLink.href = link.href;
        onlyLink.text = link.text;
        onlyLink.file = file;
        allLinksArray.push(onlyLink);
      }
    });
    if (options === "--validate") {
      return Promise.all(
        arraylink.map((link) => {
          return validateLinks(link.href)
            .then((res) => {
              link.status = res.status;
              link.ok = "OK";
              return link;
            })
            .catch((err) => {
              link.status = err.response.status;
              link.ok = "FAIL";
              return link;
            });
        })
      ).then((links) => {
        return links;
      });
    } else {
      return allLinksArray.flat(); //Eliminar array entre array
    }
  }
};

module.exports = getLinks;
