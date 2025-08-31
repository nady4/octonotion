import express from "express";
import createNotionTask from "./controller.js";

const app = express();

app.use(express.json());

app.post("/github-webhook", async (req, res) => {
  const event = req.headers["x-github-event"];

  if (event === "issues" && req.body.action === "opened") {
    const repo = req.body.url;
    const issue = req.body.issue;

    await createNotionTask(repo, issue);
  }

  res.status(200).send("ok");
});

app.listen(3000, () => {
  console.log("🐙 Bot escuchando en http://localhost:3000");
});
