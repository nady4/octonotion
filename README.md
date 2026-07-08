# 🐙 octonotion

Lightweight integration between GitHub and Notion. Each issue opened in a repository results in an organized task in Notion.

This project is a **Node.js bot** that connects the **GitHub API** with the **Notion API**.  
Whenever an **issue is opened in GitHub**, the bot automatically creates a **task in Notion**,  
linking it to the corresponding project.

Its goal is to streamline the organization of **open source projects** in a mixed environment,  
where GitHub serves as a public collaboration platform and Notion as an internal management dashboard.

<br>

## 🚀 Features

- Escapes to `issues.opened` events from a GitHub Webhook.
- Creates tasks in a Notion database (`Tasks`).
- Automatically links the issue to the corresponding repository.
- Allows configuring properties such as `Name`, `Status`, `Repo` and `Issue`.

<br>

## ⚙️ Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/YOUR_USERNAME/github-notion-bot.git
   cd github-notion-bot
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Configure environment variables in `.env`:

   ```bash
   NOTION_TOKEN=your_secret_token
   NOTION_DB_ID=your_projects_db_id
   GITHUB_SECRET=your_webhook_secret
   ```

   Generate a strong secret with:

   ```bash
   node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
   ```

4. Run the server:
   ```bash
   node index.js
   ```

<br>

## 🔗 GitHub Setup

1. Go to `Settings > Webhooks` in your repository.
2. Create a Webhook with:
   - **Payload URL**: `https://your-domain/github-webhook` (see [Exposing the bot](#-exposing-the-bot) below)
   - **Content type**: `application/json`
   - **Secret**: the same value you put in `GITHUB_SECRET`
   - **SSL verification**: Enabled (only available for `https://` URLs)
   - **Events**: *Let me select individual events* → tick **Issues** only

> Don't pick *"Send me everything"* — the bot only handles `issues.opened` and will silently ignore the rest.

<br>

## 📒 Notion Setup

1. Create an internal integration at [notion.so/my-integrations](https://www.notion.so/my-integrations) and copy its **Internal Token** into `NOTION_TOKEN`.
2. Create a new database (e.g. `Octonotion`) and add these properties — names and types must match exactly:

   | Property | Type        | Notes                                       |
   | -------- | ----------- | ------------------------------------------- |
   | `Name`   | Title       | Holds the issue title                       |
   | `Status` | Status      | Workflow groups: `Not started`, `In progress`, `Done` |
   | `Repo`   | URL         | Holds the repository URL                    |
   | `Issue`  | Rich text   | Holds the issue URL                         |

3. Open the database, click `•••` → **Connections** → add your integration so it can read/write.
4. Copy the database ID from the URL (`notion.so/<workspace>/<DATABASE_ID>?v=...`) into `NOTION_DB_ID`.

> Extra unused properties are fine — the bot only touches the four above.

<br>

## 🌐 Exposing the bot

GitHub can't reach `localhost`, so the Payload URL has to be publicly reachable on HTTPS.

**Local development** — use a tunnel:

```bash
ngrok http 3000
```

Use the `https://…ngrok…` URL it prints as your Payload URL.

**Production** — put the bot behind a reverse proxy that terminates TLS and forwards to `127.0.0.1:3000`. Minimal Caddyfile:

```caddy
your-domain.com {
    reverse_proxy 127.0.0.1:3000
}
```

Then your Payload URL is `https://your-domain.com/github-webhook` and SSL verification stays enabled.

<br>

## 📝 Usage

- When someone creates an **issue in GitHub**,  
  the bot will automatically generate a new task in the Notion database linked to the project.

<br>

## 👩‍💻 Contribution

1. Fork the repo.
2. Create a branch for your feature:
   ```bash
   git checkout -b feature/new-feature
   ```
3. Commit your changes:
   ```bash
   git commit -m "Add new feature"
   ```
4. Push your branch and open a Pull Request.

<br>

## 🚀 Workplace

- 📂 [GitHub Repository](https://github.com/nady4/octonotion)
- 📋 [Notion Dashboard](https://www.notion.so/)

Both platforms in the workplace are integrated by the same project we use them for.

<br>

## 📄 License

This project is open source under the [APACHE 2.0](LICENSE) license.
