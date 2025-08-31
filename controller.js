export default async function createNotionTask(projectId, issue) {
  const url = "https://api.notion.com/v1/pages";

  await fetch(url, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.NOTION_TOKEN}`,
      "Content-Type": "application/json",
      "Notion-Version": "2022-06-28",
    },
    body: JSON.stringify({
      parent: { database_id: process.env.NOTION_DB_ID },
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
