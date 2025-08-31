# octonotion
🐙 Lightweight integration between GitHub and Notion. Each issue opened in a repository results in an organized task in Notion.

This project is a **Node.js bot** that connects the **GitHub API** with the **Notion API**.  
Whenever an **issue is opened in GitHub**, the bot automatically creates a **task in Notion**,  
linking it to the corresponding project.  

Its goal is to streamline the organization of **open source projects** in a mixed environment,  
where GitHub serves as a public collaboration platform and Notion as an internal management dashboard.  

---

## 🚀 Features

- Escapes to \`issues.opened\` events from a GitHub Webhook.  
- Creates tasks in a Notion database (\`Projects\`).  
- Automatically links the issue to the corresponding repository.  
- Allows configuring properties such as \`Name\`, \`Status\`, \`Repo\` and \`Tasks\`.  

---

## ⚙️ Installation

1. Clone the repository:
   \`\`\`bash
   git clone https://github.com/YOUR_USERNAME/github-notion-bot.git
   cd github-notion-bot
   \`\`\`

2. Install dependencies:
   \`\`\`bash
   npm install
   \`\`\`

3. Configure environment variables in \`.env\`:
   \`\`\`bash
   NOTION_TOKEN=your_secret_token
   NOTION_DB_ID=your_projects_db_id
   GITHUB_SECRET=webhook_key
   \`\`\`

4. Run the server:
   \`\`\`bash
   node index.js
   \`\`\`

---

## 🔗 GitHub Setup

1. Go to \`Settings > Webhooks\` in your repository.  
2. Create a Webhook with:
   - **Payload URL**: \`http://your-server/github-webhook\`
   - **Content type**: \`application/json\`
   - **Events**: select \`issues\`  

---

## 📝 Usage

- When someone creates an **issue in GitHub**,  
  the bot will automatically generate a new task in the Notion database linked to the project.  

---

## 👩‍💻 Contribution

1. Fork the repo.  
2. Create a branch for your feature:  
   \`\`\`bash
   git checkout -b feature/new-feature
   \`\`\`
3. Commit your changes:  
   \`\`\`bash
   git commit -m "Add new feature"
   \`\`\`
4. Push your branch and open a Pull Request.  

---

## 🚀 Workplace

- 📂 **GitHub Repository**: [Octonotion GitHub](https://github.com/nady4/octonotion)  
- 📋 **Notion Dashboard**: [Octonotion Notion](https://www.notion.so/)  

Both platforms in the workplace are integrated by the same project we use them for.

---

## 📄 License

This project is open source under the [APACHE 2.0](LICENSE) license.
