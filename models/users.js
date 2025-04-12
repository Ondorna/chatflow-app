"use strict";

const userList = [];
const onlineUsers = [];

function isValidUsername(username) {
    let isValid = true;
    isValid = isValid && username.trim();
    isValid = isValid && username.match(/^[A-Za-z0-9_]+$/);
    return isValid;
}

function updateUserList(username ) {
    const isValid = isValidUsername(username);
    if (isValid && !userList.includes(username) && username.length <= 20) {
        userList.push(username);
    }
}

function addToOnlineUsers(username) {
    if (!onlineUsers.includes(username)) {
        onlineUsers.push(username);
    }
}

function removeFromOnlineUsers(username) {
    const index = onlineUsers.indexOf(username);
    if (index !== -1) {
        onlineUsers.splice(index, 1);
    }
}

module.exports={
    isValidUsername,
    updateUserList,
    userList,
    onlineUsers,
    addToOnlineUsers,
    removeFromOnlineUsers
};
