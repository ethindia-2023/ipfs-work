const express = require("express");

const activeVisitorsRouter = require("./routers/active-visitors.js");
const dataIndexingRouter = require("./routers/data-indexing.js");
const identifierRouter = require("./routers/identifier.js");
const database = require("./utils/db");
const identifierController = require("./controllers/identifier");

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
database.connect();
// const temp = async (database) => {
//   await database.connect();
//   identifierController.deleteOldLogsOfDataIndexing();
//   identifierController.deleteOldLogsOfActiveVisitors();
// };
// temp(database);
app.post("/data", (req, res) => {
  res.send("Data received");
});

app.use("/activevisitors", activeVisitorsRouter);
app.use("/dataindexing", dataIndexingRouter);
app.use("/identifier", identifierRouter);

// cron job to delete old logs and store uid linked with timeline

app.listen(3000, () => console.log("Server running on port 3000"));
