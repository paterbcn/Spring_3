//El código adjunto lee un fichero situado en un directorio inbox y escribe su 
//contenido invertido en otro fichero en el directorio outbox. 
//Reestructura y simpldique el código existente para evitar el denominado Callback Hell.

const { readdir, readFile , writeFile}= require("node:fs/promises")
const {join}=require("node:path")


const inbox = join(__dirname,"inbox")
const outbox = join(__dirname,"outbox")

const reverseText = str => str.split(" ").reverse().join(" ")


try{
const files = await readdir(inbox)
}catch(Err){throw}
for (const file of files){
const text = await readFile(join(inbox,file),{encoding:"utf8"})
const promise = writeFile (join(outbox,file),reverseText(text))
await promise
}




