const app = require("express")();
const mergeDBs = require("./mergeDB");

mergeDBs("waGrpsAuto1", "waGrpsAuto"); // Add source & destination db here

app.listen(3000, () => console.log("Server running on port 3000"));
