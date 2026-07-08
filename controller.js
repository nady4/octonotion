export default async function createNotionTask(repository, issue) {
  const res = await fetch("https://api.notion.com/v1/pages", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.NOTION_TOKEN}`,
      "Content-Type": "application/json",
      "Notion-Version": "2022-06-28",
    },
    body: JSON.stringify({
      parent: { database_id: process.env.NOTION_DB_ID },
      properties: {
        Name: { title: [{ text: { content: issue.title } }] },
        Status: { select: { name: "Not started" } },
        Repo: { url: repository.html_url },
        Issue: {
          rich_text: [{ text: { content: issue.html_url } }],
        },
      },
    }),
  });

  return { ok: res.ok, status: res.status, body: await res.text() };
}
