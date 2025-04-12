"use strict";

const express = require("express");
const cookieParser = require("cookie-parser");
const sessionController = require("./controllers/session-controller");
const chatController = require("./controllers/chat-controller");

const app = express();
const PORT = 3000;

app.use(cookieParser());
app.use(express.static("./public"));
app.use(express.json());

app.get("/api/v1/sessions", sessionController.getSession);
app.post("/api/v1/sessions", sessionController.createSession);
app.delete("/api/v1/sessions", sessionController.deleteSession);

app.get("/api/v1/messages", chatController.getHistory);
app.get("/api/v1/users", chatController.getUserList);
app.post("/api/v1/messages", chatController.updateChatHistory);

app.listen(PORT, () => console.log(`http://localhost:${PORT}`));
