import "dotenv/config";
import express from "express";
import crypto from "node:crypto";
import createNotionTask from "./controller.js";

const app = express();

app.use(
  express.json({
    limit: "1mb",
    verify: (req, _res, buf) => {
      req.rawBody = buf;
    },
  })
);

function verifySignature(rawBody, sig) {
  if (!sig) return false;
  const expected =
    "sha256=" +
    crypto
      .createHmac("sha256", process.env.GITHUB_SECRET)
      .update(rawBody)
      .digest("hex");
  const a = Buffer.from(sig);
  const b = Buffer.from(expected);
  if (a.length !== b.length) return false;
  return crypto.timingSafeEqual(a, b);
}

app.post("/github-webhook", async (req, res) => {
  if (!verifySignature(req.rawBody, req.headers["x-hub-signature-256"])) {
    return res.status(401).send("bad signature");
  }

  const event = req.headers["x-github-event"];

  if (event === "issues" && req.body.action === "opened") {
    try {
      const result = await createNotionTask(req.body.repository, req.body.issue);
      if (!result.ok) {
        console.error("Notion API error:", result.status, result.body);
        return res.status(502).send("notion error");
      }
    } catch (err) {
      console.error("handler error:", err);
      return res.status(500).send("internal");
    }
  }

  res.status(200).send("ok");
});

app.listen(3000, () => {
  console.log("🐙 Bot listening on http://localhost:3000");
});
