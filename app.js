import { express } from "express";

import { activeVisitorsRouter } from "./routers/activevisitors.js";
import { dataIndexingRouter } from "./routers/data-indexing.js";
import { identifierRouter } from "./routers/identifier.js";

const app = new express();
app.urlencoded({ extended: true });

app.post("/data", (req, res) => {
  console.log(req.body);
  res.send("Data received");
});

app.use("/activevisitors", activeVisitorsRouter);
app.use("/dataindexing", dataIndexingRouter);
app.use("/identifier", identifierRouter);

app.listen(3000, () => console.log("Server running on port 3000"));
