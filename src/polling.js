import {fetchMessage, fetchUserList} from "./services.js";
import state, {updateState,updateMessage, updateUserList} from "./state.js";

const POLLING_INTERVAL = 5000;
let pollingInterval = null;

function pollForUpdates() {

    if (!state.username) {
        stopPolling();
        return;
    }

    Promise.all([fetchMessage(), fetchUserList()])
        .then(([messageData, userListData]) => {
            const messagesChanged = JSON.stringify(state.message) !== JSON.stringify(messageData.message);
            const usersChanged = JSON.stringify(state.userList) !== JSON.stringify(userListData.userList);

            if (messagesChanged) {
                updateMessage(messageData.message);
            }

            if (usersChanged) {
                updateUserList(userListData.userList);
            }
        })
        .catch(error => {
            if (error.error === "auth-missing") {
                updateState({username: ""});
                stopPolling();
            }
        });
}

export function startPolling() {
    if (pollingInterval) {
        stopPolling();
    }
    pollForUpdates();
    pollingInterval = setInterval(pollForUpdates, POLLING_INTERVAL);
}

export function stopPolling() {
    if (pollingInterval) {
        clearInterval(pollingInterval);
        pollingInterval = null;
    }
}
