"use strict";

const sessions = require("../models/sessions");
const validation = require("../models/users");

exports.getSession = (req, res) => {
    const sid = req.cookies.sid;
    const username = sid ? sessions.getSessionUser(sid) : "";

    if (!sid || !username) {
        res.status(401).json({error: "auth-missing"});
        return;
    }

    res.json({username});
};

exports.createSession = (req, res) => {
    const {username} = req.body;

    if (username.length > 20) {
        res.status(400).json({error: "username-length"});
        return
    }

    if (!validation.isValidUsername(username)) {
        res.status(400).json({error: "required-username"});
        return;
    }

    if (username.toLowerCase() === "dog") {
        res.status(403).json({error: "auth-insufficient"});
        return;
    }

    const sid = sessions.addSession(username);
    validation.updateUserList(username);
    res.cookie("sid", sid);

    res.status(201).json({username});
};

exports.deleteSession = (req, res) => {
    const sid = req.cookies.sid;
    const username = sid ? sessions.getSessionUser(sid) : "";

    if (sid) {
        res.clearCookie("sid");
    }

    if (username) {
        sessions.deleteSession(sid);
    }

    res.json({wasLoggedIn: !!username});
};
