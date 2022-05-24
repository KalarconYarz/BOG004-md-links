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
  it('Debería retornar un arreglo de objetos de links validados',
        async () => {
            const e = await mdLinks(path, { validate: false });
          expect(e).toMatch('arrObjLinks');
              }, 5000)


    
 it('Debe retornar un mensaje de error si la ruta no es válida', async () => {
    
      return mdLinks(rutaInvalida, {validate:true})
      .then(e => {
          expect(e).toMatch(chalk.redBright(
         `❌  Ruta invalida ❌`));
        })
        .catch((error) => {
          return error;
  });
})})