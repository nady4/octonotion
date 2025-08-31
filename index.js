import express from "express";
import fetch from "node-fetch";

const app = express();
app.use(express.json());

// Variables de entorno
const NOTION_TOKEN = process.env.NOTION_TOKEN;
const NOTION_DB_ID = process.env.NOTION_DB_ID; // ID de la DB de Proyectos
const GITHUB_SECRET = process.env.GITHUB_SECRET; // opcional para validar webhooks

// Crear una tarea en Notion
async function createNotionTask(projectId, issue) {
  const url = "https://api.notion.com/v1/pages";

  await fetch(url, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${NOTION_TOKEN}`,
      "Content-Type": "application/json",
      "Notion-Version": "2022-06-28",
    },
    body: JSON.stringify({
      parent: { database_id: NOTION_DB_ID },
      properties: {
        Nombre: { title: [{ text: { content: issue.title } }] },
        Status: { select: { name: "Not started" } },
        Repo: { url: issue.repository.html_url },
        Tareas: {
          rich_text: [{ text: { content: issue.html_url } }],
        },
      },
    }),
  });
}

// Webhook de GitHub
app.post("/github-webhook", async (req, res) => {
  const event = req.headers["x-github-event"];

  if (event === "issues" && req.body.action === "opened") {
    const issue = req.body.issue;
    const repo = req.body.repository.html_url;

    // Crea la tarea en Notion
    await createNotionTask(repo, issue);
  }

  res.status(200).send("ok");
});

app.listen(3000, () => {
  console.log("Bot escuchando en http://localhost:3000");
});
