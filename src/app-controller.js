import { fetchSession, fetchMessage, fetchUserList } from "./services.js";
import state, { updateState } from "./state.js";
import { eventListeners } from "./listeners.js";
import { startPolling, stopPolling } from "./polling.js";

export function control() {
    updateState({ isInitializing: true });

    fetchSession()
        .then((sessionData) => {
            updateState({ username: sessionData.username });
            return fetchMessage();
        })
        .then((messageData) => {
            updateState({ message: messageData.message });
            return fetchUserList();
        })
        .then((userListData) => {
            updateState({ userList: userListData.userList, isInitializing: false });

            if (state.username) {
                startPolling();
            }
        })
        .catch(() => {
            updateState({ username: "", isInitializing: false });
        });

    const appEl = document.querySelector("#app");
    eventListeners(appEl, { startPolling, stopPolling });
}
