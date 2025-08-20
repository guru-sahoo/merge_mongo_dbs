const express = require("express");
const app = express();

const mergeDBs = require("./mergeDB");

mergeDBs("waGrpAuto1", "waGrpAuto");

app.listen(3000, () => console.log("Server running on port 3000"));
