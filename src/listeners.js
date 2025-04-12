import { updateState } from "./state.js";
import { fetchLogin, fetchMessage, fetchUserList, fetchUpdateMessage, fetchLogout } from "./services.js";
import { ERROR_MESSAGES } from "./constants.js";

export function eventListeners(appEl, { startPolling, stopPolling }) {
    appEl.addEventListener("submit", (e) => {
        e.preventDefault();

        if (e.target.classList.contains("login-form")) {
            const usernameInput = e.target.querySelector(".username-input");
            const username = usernameInput.value.trim();

            if (!username) {
                updateState({error: ERROR_MESSAGES["empty-username"] || ERROR_MESSAGES["default"]});
                return;
            }

            updateState({ isLoading: true });

            fetchLogin(username)
                .then((loginData) => {
                    updateState({username: loginData.username, currentChat: "group", error: "", messageError: ""});
                    return fetchMessage();
                })
                .then((messageData) => {
                    updateState({message: messageData.message});
                    return fetchUserList();
                })
                .then((userListData) => {
                    updateState({userList: userListData.userList, isLoading: false, messageError: ""});
                    startPolling();
                })
                .catch((loginError) => {
                    const error = ERROR_MESSAGES[loginError.error] || ERROR_MESSAGES["default"];
                    updateState({error: error, isLoading: false});
                });
        }

        if (e.target.classList.contains("message-form")) {
            const messageInput = e.target.querySelector(".message-input");
            const message = messageInput.value;

            updateState({isSendingMessage: true, messageError: ""});

            fetchUpdateMessage(message)
                .then(() => {
                    messageInput.value = "";
                    return fetchMessage();
                })
                .then((messageData) => {
                    updateState({message: messageData.message});
                    return fetchUserList();
                })
                .then((userListData) => {
                    updateState({userList: userListData.userList, messageError: "", isSendingMessage: false});
                })
                .catch((updateTextError) => {
                    if (updateTextError.error === "auth-missing") {
                        updateState({username: "", error: "", messageError: "", isSendingMessage: false});
                        stopPolling();
                        return;
                    } else if (updateTextError.error === "required-message") {
                        const messageError = ERROR_MESSAGES[updateTextError.error] || ERROR_MESSAGES["default"];
                        updateState({messageError: messageError, isSendingMessage: false});
                        return;
                    }
                    const messageError = ERROR_MESSAGES[updateTextError.error] || ERROR_MESSAGES["default"];
                    updateState({messageError: messageError, isSendingMessage: false});
                })

        }
    });

    appEl.addEventListener("click", (e) => {

        if (e.target.classList.contains("logout-button")) {
            updateState({isLoading: true});
            fetchLogout()
                .then(() => {
                    stopPolling();
                    updateState({ username: "", error: "", messageError: "", isLoading: false });
                })
                .catch((logoutError) => {
                    const error = ERROR_MESSAGES[logoutError.error] || ERROR_MESSAGES["default"];
                    updateState({ error: error, isLoading: false });
                });
        }

        if (e.target.classList.contains("private-chat-button")) {
            const username = e.target.dataset.username;
            updateState({ currentChat: username });

            fetchMessage()
                .then(messageData => {
                    updateState({ message: messageData.message });
                })
                .catch(error => {
                    updateState({
                        messageError: ERROR_MESSAGES[error.error] || ERROR_MESSAGES["default"]
                    });
                });
        }

        if (e.target.classList.contains("group-chat-button") && e.target.dataset.chat === "group") {
            updateState({ currentChat: "group" });

            fetchMessage()
                .then(messageData => {
                    updateState({ message: messageData.message });
                })
                .catch(error => {
                    updateState({
                        messageError: ERROR_MESSAGES[error.error] || ERROR_MESSAGES["default"]
                    });
                });
        }
    });
}
