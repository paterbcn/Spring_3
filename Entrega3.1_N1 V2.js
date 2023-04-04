//El código adjunto lee un fichero situado en un directorio inbox y escribe su 
//contenido invertido en otro fichero en el directorio outbox. 
//Reestructura y simpldique el código existente para evitar el denominado Callback Hell.

const { error } = require("node:console")
const { readdir, readFile , writeFile}= require("node:fs/promises")
const {join}=require("node:path")


const inbox = join(__dirname,"inbox")
const outbox = join(__dirname,"outbox")

const reverseText = str => str.split(" ").reverse().join(" ")


files = await readdir(inbox).catch((err) => {
  throw error("Error: Folder inaccessible")
});
for (const file of files) {
  text = await readFile(join(inbox, file), { encoding: "utf8" }).catch(
    (err) => {
      throw error("Error: File error");
    }
  );
  promise = writeFile(join(outbox, file), reverseText(text));
  await promise.catch((err) => {
    throw error("Error: File could not be saved!");
  });
  console.log(`${file} was successfully saved in the outbox!`)
}


