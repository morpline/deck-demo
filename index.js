console.log("test");
const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;
const cors = require("cors")

app.use(cors())

app.use("/", require("./routes"));
app.use(express.static("./public"));

app.listen(PORT,()=>{
    console.log(`Test server running on port: ${PORT}`);
});