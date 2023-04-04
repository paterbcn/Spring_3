//El código adjunto lee un fichero situado en un directorio inbox y escribe su 
//contenido invertido en otro fichero en el directorio outbox. 
//Reestructura y simpldique el código existente para evitar el denominado Callback Hell.

const { error } = require("node:console")
const { readdir, readFile , writeFile}= require("node:fs/promises")
const {join}=require("node:path")


const inbox = join(__dirname,"inbox")
const outbox = join(__dirname,"outbox")

const reverseText = str => str.split(" ").reverse().join(" ")
const handleErrors = async (promise) => {
  try {
    const data = await promise;
    return [data, undefined];
  } catch (err) {
    return [undefined, err];
  }
};

const [files, errFolder] = await handleErrors(readdir(inbox));
if (errFolder) {
  throw error("Error: Folder inaccessible");
}
for (const file of files) {
  const [text, errFile] = await handleErrors(
    readFile(join(inbox, file), { encoding: "utf8" })
  );
  if (errFile) {
    throw error("Error: File error");
  }
  const [result, errWrite] = await handleErrors(
    writeFile(join(outbox, file), reverseText(text))
  );
  if (errWrite) {
    throw error("Error: File could not be saved!");
  }
  console.log(`${file} was successfully saved in the outbox!`);
}

