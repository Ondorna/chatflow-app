"use strict";

const sessions = require("../models/sessions");
const chatHistory = require("../models/chat-history");
const users = require("../models/users");

exports.getUserList = (req, res) => {
    const sid = req.cookies.sid;
    const username = sid ? sessions.getSessionUser(sid) : "";

    if (!sid || !username) {
        res.status(401).json({error: "auth-missing"});
        return;
    }

    res.json({username, userList: users.onlineUsers});
};

exports.getHistory = (req, res) => {
    const sid = req.cookies.sid;
    const username = sid ? sessions.getSessionUser(sid) : "";

    if (!sid || !username) {
        res.status(401).json({error: "auth-missing"});
        return;
    }

    const type = req.query.type || "group";
    const otherUser = req.query.user;

    let messages;

    if (type === "private" && otherUser) {
        messages = chatHistory.getFilteredMessages(username, otherUser);
    } else {
        messages = chatHistory.getFilteredMessages(username);
    }

    res.json({username, message: messages});
};

exports.updateChatHistory = (req, res) => {
    const sid = req.cookies.sid;
    const username = sid ? sessions.getSessionUser(sid) : "";

    if (!sid || !username) {
        res.status(401).json({error: "auth-missing"});
        return;
    }

    const message = req.body.message;
    const recipient = req.body.recipient || null;

    if (!message || message.trim() === "") {
        res.status(400).json({error: "required-message"});
        return;
    }

    chatHistory.updateHistory(username, message, recipient);

    let messages;
    if (recipient) {
        messages = chatHistory.getFilteredMessages(username, recipient);
    } else {
        messages = chatHistory.getFilteredMessages(username);
    }

    res.json({username, message: messages});
};
