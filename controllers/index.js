
const fs = require("node:fs")
const fsp= require("node:fs/promises");

let volumepath = "/vols/serveral/";

const cheesebag = async (req,res)=>{
    console.log("creete fill");
    // res.setHeader("Access-Control-Allow-Origin","*");
    // await fs.writeFile("./node/appdata", req.body, err => {
    //     if(err) {
    //         console.error(err);
    //     } else {
    //         res.send("File written sucessfully.")
    //     }
    // })
    console.log(req.query);
    await fsp.writeFile(volumepath+req.query.name,"This is a new file. You can write notes here, and even write code, if necessary.").catch((e)=>{
        console.log(e);
    }).then(()=>{
        res.send({msg:"File Written Successfully."})
    })

}

const getFiles = async (req,res)=>{
    res.setHeader("Access-Control-Allow-Origin","*");
    console.log("getFIels");

    // let files = await fs.readdir("./node/appdata")
    let filenames = [];
    // for (const file of files) {
    //     console.log(file);

    // }
    await fsp.readdir(volumepath,{}).then((f)=>{
        // console.log(f);
        filenames.push(f)
    })
    res.send({data:filenames})
}

const getFile = async (req,res)=>{
    res.setHeader("Access-Control-Allow-Origin","*");
    console.log("getFIel (singellar)");

    // let files = await fs.readdir("./node/appdata")
    let filenames;
    // for (const file of files) {
    //     console.log(file);

    // }
    await fsp.readFile(volumepath+req.query.file).then((f)=>{
        // console.log(f);
        res.send({data:String(f)})
    })
}

const editFile = async (req,res)=>{
    res.setHeader("Access-Control-Allow-Origin","*");
    console.log("edit fiel (singellar)");
    console.log(req);
    // let files = await fs.readdir("./node/appdata")
    let filenames;
    // for (const file of files) {
    //     console.log(file);

    // }
    await fsp.writeFile(volumepath+req.query.file,req.query.data).then((f)=>{
        // console.log(f);
        res.send({data:String(f)})
    })
}

const deleteFile = async (req,res)=> {
    res.setHeader("Access-Control-Allow-Origin","*");
    await fsp.writeFile(volumepath+req.query.file,req.query.data).then((f)=>{
        // console.log(f);
        res.send({data:String(f)})
    })
}

module.exports = { cheesebag, getFiles, getFile, editFile };