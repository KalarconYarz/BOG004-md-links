//node methods filesystem - path
const fs = require("fs");
const path = require("path");
const chalk = require('chalk');

//<<<<Se importa Fetch para realizar la petición HTTP>>>>
const fetch = require("node-fetch");


//<<<<Función que  Resuelve y normaliza la ruta dada>>>>
const converterPath = (pathToConvert) => {
  let converterPathResult;
  const pathAbsolute = path.isAbsolute(pathToConvert);
  pathAbsolute
    ? (converterPathResult = pathToConvert)
    : (converterPathResult = path.resolve(pathToConvert).normalize());
  return converterPathResult;
};

//<<<< <<<<Función para verifica si existe la ruta>>>>
const validatePath = (path) => fs.existsSync(path);

//<<<<Función recursiva para leer el contedido de un directorio>>>>
/**
 * 
 * @param {*} arrayPaths 
 * @param {*} fileAbsolutePath 
 * @returns 
 */
const fileSearch = (arrayPaths, fileAbsolutePath) => {
  const isDirResult = fs.statSync(fileAbsolutePath).isDirectory();
  if (isDirResult) {
    const dirFileRes = fs.readdirSync(fileAbsolutePath); //recorrer el contenido de un directorio
    dirFileRes.forEach((file) => {
      const dirAbsolutepath = path.join(fileAbsolutePath, file);
      if (dirFileRes) fileSearch(arrayPaths, dirAbsolutepath);
    });
  } else {
    const fileExtensionRes = path.extname(fileAbsolutePath); //obtine .md
    if (fileExtensionRes === ".md") {
      arrayPaths.push(fileAbsolutePath);
    }
  }
  return arrayPaths;
};

//<<<< Función para Extraer Links de archivos .md >>>>
  const getLinks = (fileContent, pathMdList) => new Promise((resolve)=>{//convertirlo en promesa
    const regxLink = new RegExp(/\[([\w\s\d.()]+)\]\(((?:\/|https?:\/\/)[\w\d./?=#&_%~,.:-]+)\)/gm);
    const regxUrl = /\(((?:\/|https?:\/\/)[\w\d./?=#&_%~,.:-]+)\)/gm;
    const regxText = /\[[\w\s\d.()]+\]/;
    const content = fileContent;
    const contentLinks = content.match(regxLink);
    if (contentLinks) {
      const objLinks = contentLinks.map((links) => {
        const linkHref = links.match(regxUrl).join().slice(1, -1);
        const linkText = links.match(regxText).join().slice(1, -1);
        return {
          href: linkHref,
          text: linkText.substring(0, 50),
          file: pathMdList,
        };
      });
      resolve(objLinks);
    } else if (contentLinks === null) {
      resolve([])
    }
  });

// <<<<Función para leer los archivos Con Promesa>>>>
const readFileContent = (pathMdList) => new Promise((resolve) => {
    const arrMds = [];
      pathMdList.map((element) => {
        fs.readFile(element, "utf8", function (err, data) {
        if (err) {
          const errorMessage = "😓 No se puede leer el contenido del archivo";
          console.log(errorMessage);
        } else {
        getLinks(data, element)
        .then((resArray)=>{
            arrMds.push(resArray)
            if (arrMds.length === pathMdList.length) {
              resolve(arrMds.flat());
            }
          })
        }
      });
    });
  });

 //<<<<Función para hacer la petición HTTP:>>>>
  const httpPetitionStatus = (arrObjLinks) => {
    // console.log('que pasa wey?',arrObjLinks);
    const arrPromise = arrObjLinks.map((obj) => fetch(obj.href)
        .then((res) => ({
        href: obj.href,
        text: obj.text,
        file: obj.file,
        status: res.status,
        ok: res.ok ? 'OK' : 'fail'
        }))
        .catch(() => ({
        href: obj.href,
        text: obj.text,
        file: obj.file,
        status: 404,
        ok: 'fail'
        })));
    return Promise.all(arrPromise);
};

// funcion output sin options
// const outputWithoutVS = (linksObjArr) => {
//   linksObjArr.forEach((link) => {
//     console.log(
//       chalk.white('href:'),
//       chalk.yellowBright(`${link.href}`),
//       chalk.white('text:'),
//       chalk.blueBright(`${link.text}`),
//       chalk.white('fileName:'),
//       chalk.cyan(`${link.fileName}`),
//     );
//   });
// };
// funcion output con --validate
// const outputWithV = (arrObjLinks) => {
//   arrObjLinks.forEach((link) => {
//     if (link.value.status === 200) {
//       console.log(
//         chalk.white('href:'),
//         chalk.yellowBright(`${link.value.href}`),
//         chalk.white('text:'),
//         chalk.blueBright(`${link.value.text}`),
//         chalk.white('fileName:'),
//         chalk.cyan(`${link.value.fileName}`),
//         chalk.white('status:'),
//         chalk.green(`${link.value.status}`),
//         chalk.white('statusText:'),
//         chalk.green(`${link.value.statusText}`),
//       );
//     } else {
//       console.log(
//         chalk.white('href:'),
//         chalk.red(`${link.value.href}`),
//         chalk.white('text:'),
//         chalk.blueBright(`${link.value.text}`),
//         chalk.white('fileName:'),
//         chalk.cyan(`${link.value.fileName}`),
//         chalk.white('status:'),
//         chalk.red(`${link.value.status}`),
//         chalk.white('statusText:'),
//         chalk.red(`${link.value.statusText}`),
//       );
//     }
//   });
// };
// funcion output con --stats
const outputWithS = (arrObjLinks) => {
  const totalLinks = arrObjLinks.length;
  const unique = [...new Set(arrObjLinks.map((link) => link.href))];
  const uniqueLinks = unique.length;
  const brokenLinks = arrObjLinks.filter(link => link.status != 200)
  const totalBroken = brokenLinks.length
  console.table({ TOTAL: totalLinks, UNIQUE: uniqueLinks, BROKEN: totalBroken});
};

// funcion output con --validate y --stats
// const outputWithVS = (arrObjLinks) => {
//   outputWithV(arrObjLinks);
//   const totalLinks = arrObjLinks.length;
//   const unique = [...new Set(arrObjLinks.map((link) => link.value.href))];
//   const uniqueLinks = unique.length;
//   const broken = arrObjLinks.filter((link) => link.value.statusText !== 'ok');
//   const brokenLinks = broken.length;
//   console.table({ TOTAL: totalLinks, UNIQUE: uniqueLinks, BROKEN: brokenLinks });
// };
// funcion primer output sin options
// const finalOutput = (args, arrObjLinks) => {
//   const argsStr = args.length.toString();
//   if (typeof arrObjLinks === 'string') {
//     console.log(chalk.redBright.bold(arrObjLinks));
//   } else if (arrObjLinks.length === 0) {
//     console.log(chalk.redBright.bold('Archivo no contiene links'));
//   } else if (argsStr === '1') {
//     console.log(chalk.magentaBright.bold('✦──✦──LINKS ENCONTRADOS──✦──✦'));
//     outputWithoutVS(arrObjLinks);
//   } else if (args.includes('--validate') && !args.includes('--stats')) {
//     console.log(chalk.magentaBright.bold('✦──✦──VALIDACION DE LINKS ENCONTRADOS──✦──✦'));
//     outputWithV(arrObjLinks);
//   } else if (!args.includes('--validate') && args.includes('--stats')) {
//     console.log(chalk.magentaBright.bold('✦──✦──STATS DE LINKS ENCONTRADOS──✦──✦'));
//     outputWithS(arrObjLinks);
//   } else if (args.includes('--validate') && args.includes('--stats')) {
//     console.log(chalk.magentaBright.bold('✦──✦──VALIDACION Y STATS DE LINKS ENCONTRADOS──✦──✦'));
//     outputWithVS(arrObjLinks);
//   } else {
//     console.log(chalk.redBright.bold('Confirmar argumentos'));
//   }
// };
module.exports = {
  converterPath,
  validatePath,
  fileSearch,
  readFileContent,
  httpPetitionStatus,
  outputWithS,
};