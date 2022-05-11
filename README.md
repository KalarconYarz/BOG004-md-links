# Markdown Links

## Índice

* [1. Preámbulo](#1-preámbulo)
* [2. Resumen del proyecto](#2-resumen-del-proyecto)
* [3. Diagrama de Flujo](#3-Diagrama-de-flujo)
* [4. Instrcciones](#4-Instrucciones)


***

## 1. Preámbulo

```sh
                _       _     _       _        
  _ __ ___   __| |     | |   (_)_ __ | | _____ 
 | '_ ` _ \ / _` |_____| |   | | '_ \| |/ / __|
 | | | | | | (_| |_____| |___| | | | |   <\__ \
 |_| |_| |_|\__,_|     |_____|_|_| |_|_|\_\___/
```

Markdown es un lenguaje de marcado ligero muy popular entre developers. Es usado en muchísimas plataformas que
manejan texto plano (GitHub, foros, blogs, ...), y es muy común
encontrar varios archivos en ese formato en cualquier tipo de repositorio
(empezando por el tradicional `README.md`).

Estos archivos `Markdown` normalmente contienen _links_ (vínculos/ligas) que
muchas veces están rotos o ya no son válidos y eso perjudica mucho el valor de
la información que se quiere compartir.

Dentro de una comunidad de código abierto, nos han propuesto crear una
herramienta usando [Node.js](https://nodejs.org/), que lea y analice archivos
en formato `Markdown`, para verificar los links que contengan y reportar
algunas estadísticas.


## 2. Resumen del proyecto

MD-Links es una biblioteca creada para ofrecer al usuario una interfaz(API) que mediante los métodos de node permite que puedan leerse archivos con extensión .md, de igual manera extrae el contenido de los links para luego validarlos y mostrar las estadisticas de su validación mediante el CLI. 

## 3. Diagrama de flujo


![Diagrama de Flujo](Imagenes/MD-Links.png)

## 4. Insrucciones
### 1) JavaScript API

Se debe importar:
```js
const mdLinks = require("md-links_Ka");
```

El contenido del link se estructura:

* `href`: URL encontrada.
* `text`: Texto que aparecía dentro del link (`<a>`).
* `file`: Ruta del archivo donde se encontró el link.

Con la opcion --Validate:

* `href`: URL encontrada.
* `text`: Texto que aparecía dentro del link (`<a>`).
* `file`: Ruta del archivo donde se encontró el link.
* `status`: Código de respuesta HTTP.
* `ok`: Mensaje `fail` en caso de fallo u `ok` en caso de éxito.

#### Ejemplo (resultados como comentarios)

```js
const mdLinks = require("md-links");

mdLinks("./some/example.md")
  .then(links => {
    // => [{ href, text, file }, ...]
  })
  .catch(console.error);

mdLinks("./some/example.md", { validate: true })
  .then(links => {
    // => [{ href, text, file, status, ok }, ...]
  })
  .catch(console.error);

mdLinks("./some/dir")
  .then(links => {
    // => [{ href, text, file }, ...]
  })
  .catch(console.error);
```

### 2) CLI (Command Line Interface - Interfaz de Línea de Comando)

Para poder ejecutar la aplicación debe realizarse de la siguiente manera a través de la terminal:

`md-links <path-to-file> [options]`

Por ejemplo:

```sh
$ md-links ./some/example.md
./some/example.md http://algo.com/2/3/ Link a algo
./some/example.md https://otra-cosa.net/algun-doc.html algún doc
./some/example.md http://google.com/ Google
```

#### Options

##### `--validate`

Si pasamos la opción `--validate`, nos permitira averiguar si el link funciona o no. con un Ok o Fail

Por ejemplo:

```sh
$ md-links file-md/prueba.md --validate
                _       _     _       _        
  _ __ ___   __| |     | |   (_)_ __ | | _____ 
 | '_ ` _ \ / _` |_____| |   | | '_ \| |/ / __|
 | | | | | | (_| |_____| |___| | | | |   <\__ \
 |_| |_| |_|\__,_|     |_____|_|_| |_|_|\_\___/

⋆⌘⋆------  ESTADO DE LOS LINKS ------ ⋆⌘⋆ :
href: https://nodejs.org/es/  status: 200  ok: OK
 ---
href: https://developers.google.com/v8/  status: 200  ok: OK
 ---
href: https://es-la.facebook.com/  status: 200  ok: OK
 ---
 href: https://es-la.facebook.co/  status: 404  fail: fail
 ---
```

##### `--stats`

Si pasamos la opción `--stats` nos mostrara un texto con estadísticas sobre los links.


```sh
$ md-links file-md/prueba.md --stats
                _       _     _       _        
  _ __ ___   __| |     | |   (_)_ __ | | _____ 
 | '_ ` _ \ / _` |_____| |   | | '_ \| |/ / __|
 | | | | | | (_| |_____| |___| | | | |   <\__ \
 |_| |_| |_|\__,_|     |_____|_|_| |_|_|\_\___/

 
    ⋆⌘⋆------  STATS ------ ⋆⌘⋆ :
    
        ▷ Total:4 
        ▷ Unique:4
```

También podemos combinar `--stats` y `--validate` para obtener estadísticas que necesiten de los resultados de la validación.

```sh
$ md-links file-md/prueba.md --validate --stats
                _       _     _       _        
  _ __ ___   __| |     | |   (_)_ __ | | _____ 
 | '_ ` _ \ / _` |_____| |   | | '_ \| |/ / __|
 | | | | | | (_| |_____| |___| | | | |   <\__ \
 |_| |_| |_|\__,_|     |_____|_|_| |_|_|\_\___/

 
    ⋆⌘⋆------  STATS & VALIDATE------ ⋆⌘⋆ :
    
        ▷ Total:4 
        ▷ Unique:4 
        ▷ Broken:1 

⋆⌘⋆------  ESTADO DE LOS LINKS ------ ⋆⌘⋆ :
href: https://nodejs.org/es/  status: 200  ok: OK
 ---
href: https://developers.google.com/v8/  status: 200  ok: OK
 ---
href: https://es-la.facebook.com/  status: 200  ok: OK
 ---
 href: https://es-la.facebook.co/  status: 404  fail: fail
 ---
```


