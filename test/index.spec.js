const mdLinks = require('../src/index.js');
const chalk = require("chalk")
const path = 'test/test-pruebas';

const rutaInvalida ='test/test-pruebas/pru.md';
const rutaArchivoMd ='test/test-pruebas/prueba.md';
// const rutaArchivoMd = 'test/test-pruebas/prueba-test.md';

const arrObjLinks= [
  {
        href: 'https://es-la.facebook.com/',
        text: 'facebook',
        file: 'C:\\Users\\User\\Desktop\\PROYECTO LABORATORIA\\MD Links\\BOG004-md-links\\test\\test-pruebas\\prueba-test.md',
        status: 200, 
        ok: 'OK',
    },
      {
        href: 'https://es-la.facebook.co/',
        text: 'facebook ROTO',
        file: 'C:\\Users\\User\\Desktop\\PROYECTO LABORATORIA\\MD Links\\BOG004-md-links\\test\\test-pruebas\\prueba-test.md',
        status: 404,
        ok: 'fail',
      }
  ];


describe('mdLinks', () => {
	it('should be a function', () => {
		expect(typeof mdLinks).toBe('function');
	});
  it('Debe retornar una promesa', () =>{
    expect(mdLinks(path)instanceof Promise).toBeTruthy()
  });
  it('Debe retornar un arreglo de objetos de links validados',() => 
  mdLinks(path, { validate: true }).then((e) =>
    expect(e).toEqual(arrObjLinks)));
    
 it('Debe retornar un mensaje de error si la ruta no es válida', async () => {
     try {
      return await mdLinks(rutaInvalida, {validate:true});
     } catch(e) {
          return expect(e).toMatch(chalk.redBright(
         `❌  Ruta invalida ❌`));
        };
  });

 it('Debe retornar un mensaje de que el archivo no contiene links', () => {
   return mdLinks(rutaArchivoMd).catch(e => expect(e).toMatch(chalk.redBright(
  `📕El archivo no contiene Links`)));
    });
})