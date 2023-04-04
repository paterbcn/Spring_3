const {readdir,readFile}= require("node:fs/promises")
const {join}= require("node:path")


const dirfile =join(__dirname,"files","test.txt")
const dir = join(__dirname,"files")

const str = str => str.split(" ").reverse().join(" ")


readdir(dir, (err, files) => {
  for(const file of files){
    readFile(join(__dirname,"files",file),(err,data)=>console.log(str(data.toString("utf8"))))
  }
});

async function test(){
    const files = await readdir(dir)
    console.log(files)

}

test()