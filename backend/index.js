const express = require("express");
const cors = require("cors");

const app = express();
const PORT = 5000;

const { index, create, update, drop } = require("./controllers/TaskController");

app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

app.get("/", (req, res) => {
  res.status(200);
  res.send("Welcome to root URL of Server");
});

app.get("/task", index);
app.post("/task", create);
app.put("/task", update);
app.delete("/task", drop);

app.listen(PORT, (error) => {
  if (!error) {
    console.log(
      "Server is Successfully Running, and App is listening on port " + PORT
    );
  } else {
    console.log("Error occurred, server can't start", error);
  }
});
