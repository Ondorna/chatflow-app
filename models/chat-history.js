"use strict";

const history = [];

function updateHistory(username, newMessage, recipient = null) {
    const now = new Date();
    const formattedTime = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}-${String(now.getDate()).padStart(2, "0")} ${String(now.getHours()).padStart(2, "0")}:${String(now.getMinutes()).padStart(2, "0")}:${String(now.getSeconds()).padStart(2, "0")}`;

    const message = {
        id: Date.now().toString(),
        sender: username,
        message: newMessage,
        timeStamp: formattedTime,
        recipient: recipient,
        type: recipient ? "private" : "group",
    };
    history.push(message);
}

function getFilteredMessages(username, recipient = null) {
    if (!recipient) {
        return history.filter(msg => !msg.recipient);
    }

    return history.filter(msg =>
        (msg.sender === username && msg.recipient === recipient) || (msg.sender === recipient && msg.recipient === username)
    );
}

module.exports = {
    updateHistory,
    history,
    getFilteredMessages,
};
