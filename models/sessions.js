"use strict";

const uuid = require("crypto").randomUUID;
const users = require("./users");

const sessions = {};
const userSessions = {};

function addSession(username) {
    const sid = uuid();
    sessions[sid] = { username };

    userSessions[username] = (userSessions[username] || 0) + 1;

    if (userSessions[username] === 1) {
        users.addToOnlineUsers(username);
    }

    return sid;
}

function getSessionUser(sid) {
    if (!sid || !sessions) {
        return null;
    }

    return sessions[sid]?.username || null;
}

function deleteSession(sid) {
    const username = getSessionUser(sid);
    if (username) {
        userSessions[username]--;

        if (userSessions[username] <= 0) {
            delete userSessions[username];
            users.removeFromOnlineUsers(username);
        }
    }
    delete sessions[sid];
}

module.exports = {
    addSession,
    deleteSession,
    getSessionUser,
};
