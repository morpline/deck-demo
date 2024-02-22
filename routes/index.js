const myController = require("../controllers");
const routes = require("express").Router();

// routes.get("/", myController.awe);
// routes.get("/ttech", myController.awee);
routes.get("/files", myController.getFiles)
routes.get("/file", myController.getFile).post("/file",myController.editFile)
routes.post("/create",myController.cheesebag);

module.exports = routes;