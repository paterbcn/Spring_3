//El código adjunto lee un fichero situado en un directorio inbox y escribe su 
//contenido invertido en otro fichero en el directorio outbox. 
//Reestructura y simpldique el código existente para evitar el denominado Callback Hell.

const { error } = require("node:console")
const { readdir, readFile , writeFile}= require("node:fs/promises")
const {join}=require("node:path")


const inbox = join(__dirname,"inbox")
const outbox = join(__dirname,"outbox")

const reverseText = str => str.split(" ").reverse().join(" ")
let files , text , promise


try {
  files = await readdir(inbox);
} catch (err) {
  return console.log("Error: Folder inaccessible");
}
try {
  for (const file of files) {
    text = await readFile(join(inbox, file), { encoding: "utf8" });
    try {
      promise = writeFile(join(outbox, file), reverseText(text));
      await promise;
      console.log(`${file} was successfully saved in the outbox!`)
    } catch (err) {
      return console.log("Error: File could not be saved!");
    }
  }
} catch (err) {
  return console.log("Error: File error");
}
