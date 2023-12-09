import { express } from "express";

const app = new express();
app.urlencoded({ extended: true });

app.post("/data", (req, res) => {
  console.log(req.body);
  res.send("Data received");
});
app.listen(3000, () => console.log("Server running on port 3000"));
