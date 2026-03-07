import express from "express";

const app = express();
const PORT = 3001;

app.get("/", (req, res) => {
  res.status(200).json({ message: "Test Route" });
});

app.listen(PORT, () => {
  console.log("sever is running on port 3001");
});
