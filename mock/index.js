import fs from "fs";
import jsonServer from "json-server";
import fetch from "node-fetch";

const SERVER_PORT = 3000;
const PROFILE_PHOTO_URL = "https://ga.de/imgs/93/5/9/5/9/4/3/2/5/tok_7eb36f92d4b23cc7dfe601d953746972/w1512_h2177_x756_y1088_8aaef0de7b52583f.jpg";
const CV_URL = "https://www.overleaf.com/latex/templates/bubblecv/bcynnjktwqsx.pdf";

const server = jsonServer.create();
const router = jsonServer.router("./config/db.json");
const middlewares = jsonServer.defaults();

const profilePhoto = await (await fetch(PROFILE_PHOTO_URL)).arrayBuffer();
const cv = await (await fetch(CV_URL)).arrayBuffer();

server
  .use(middlewares)
  .get("/profile/photo", (req, res) => {
    res.contentType("image/jpeg").send(Buffer.from(profilePhoto));
  })
  .get("/profile/cv", (req, res) => {
    res.contentType("application/pdf").send(Buffer.from(cv));
  });
server
  .get("/messaging/:channelId/messages", (req, res) => {
    const { channelId } = req.params;
    const messages = router.db.get("messages").filter({ channelId }).value();
    res.json(messages);
  })
  .use(jsonServer.bodyParser)
  .use(jsonServer.rewriter(JSON.parse(fs.readFileSync("./config/routes.json", { encoding: "utf8" }))))
  .use(router)
  .listen(SERVER_PORT, () => {
    console.log(`JSON Server is listening on http://localhost:${SERVER_PORT}`);
  });
