const chalk = require('chalk');

//Funcion que muestra los linls encontrados
const arrayTemplate = (arrayLinks) => {
    console.log(chalk.yellowBright.bold(`⋆⌘⋆------ LINKS ENCONTRADOS ------ ⋆⌘⋆ :`));
    arrayLinks.forEach(link => {
        console.log(chalk.blueBright.bold(`href:  ${chalk.cyan(link.href)} text:  ${chalk.yellowBright(link.text)}  fileName: ${chalk.white(link.file)} \n ---- `));
    })
};
// Funcion para mostrar el estado de los links
const statusTemplate = (arrayLinks) => {
    console.log(chalk.yellowBright.bold(`⋆⌘⋆------  ESTADO DE LOS LINKS ------ ⋆⌘⋆ :`));
    arrayLinks.forEach(link => {
        if (link.status === 200) {
            console.log(chalk.greenBright.bold(`href: ${chalk.cyan(link.href)}  status: ${chalk.cyanBright.bold(link.status)}  ok: ${chalk.magentaBright.bold(link.ok)}\n ---`));
        } else {
            console.log(chalk.greenBright.bold(` href: ${chalk.cyan(link.href)}  status: ${chalk.cyanBright.bold(link.status)}  fail: ${chalk.redBright.bold(link.ok)}\n --- \n`));
        }
    })
};
// Funcion para obtener el total de los links
const totalLinks = (arraylinks) => {
    const totalArray = arraylinks.map(link => link.href);
    const uniqueLinks = [...new Set(totalArray)];   //permite almacenar valores únicos de cualquier tipo
    return `${chalk.yellowBright.bold(` 
    ⋆⌘⋆------  STATS ------ ⋆⌘⋆ :
    `)}
    ${chalk.greenBright.bold(`\t▷ Total:${totalArray.length} \n\t▷ Unique:${uniqueLinks.length}`)}
    `
};

const totalLinksBroken = (arraylinks) => {
    const totalArray = arraylinks.map(link => link.href);
    const uniqueLinks = [...new Set(totalArray)];
    const brokenLinks = arraylinks.filter(link => link.status != 200)
    return `${chalk.yellowBright.bold(` 
    ⋆⌘⋆------  STATS WITH VALIDATE------ ⋆⌘⋆ :
    `)}
    ${chalk.greenBright.bold(`\t▷ Total:${totalArray.length} \n\t▷ Unique:${uniqueLinks.length}`, chalk.blueBright(`\n\t▷ Broken:${brokenLinks.length} `) )}
    `
};

module.exports = {
    arrayTemplate,
    statusTemplate,
    totalLinks,
    totalLinksBroken  
}