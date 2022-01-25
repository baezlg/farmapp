import express from "express";

const app = express();

app.get("/", (req, res) => {
  res.send("<h2>FARM APP</h2>");
});

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log("server running");
});
