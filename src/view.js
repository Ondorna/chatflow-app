import state, { updateState } from "./state.js";

function renderLoginView() {
    return `
        <section class="login-view">
            <h1>Let's Chat!</h1>
            <img class="login-view-picture" src="/images/login-view.png" alt="Login Picture" />
            ${state.isInitializing ? `
                <div class="login-spinner"></div>
                <p>Loading app...</p>
            ` : state.isLoading ? `
                <div class="login-spinner"></div>
                <p>Logging in...</p>
            ` : ""}
            <form class="login-form">
                <label for="username-input" class="login-form-label">Please input your username here:</label>
                <div class="login-input">
                    <input type="text" name="username" id="username-input" class="username-input"/>
                    <button type="submit" class="login-button">Login</button>
                </div>
                ${state.error ? `<p class="error-message">${state.error}</p>` : ""}
            </form>
        </section>
    `;
}

function renderWelcomeView() {
    return `
        <header class="welcome-view">
            <h1>Welcome, ${state.username}!</h1>
        </header>
    `;
}

function renderUserList() {
    return `
        <section class="user-list-container">
            <h2 class="users-list-title">Online Users</h2>
            <div class="chat-selector">
                <button class="group-chat-button ${state.currentChat === "group" ? "active" : ""}" 
                    data-chat="group">Group Chat</button>
            </div>
            <div class="user-list-view">
                <ul class="users-list">
                     ${state.userList.map(user => {
                         if (user === state.username){
                             return `
                              <li class="users-items">
                                <span class="users-username">${user} (you)</span>
                              </li>
                            `;} 
    
                             return `
                                  <li class="users-items">
                                    <span class="users-username">${user}</span>
                                    <button class="private-chat-button ${state.currentChat === user ? "active" : ""}" data-username="${user}">Message</button>  
                                  </li>
                                `;
                     }).join("")}
                 </ul>
            </div>
        </section>
    `;
}

function renderMessages() {
        return `
            <section class="message-container">
                <h2 class="message-title">Chat with <span class="private-chat-name"> ${state.currentChat}</span></h2>
                <div class="message-view">
                    ${state.message && state.message.length > 0 ? `
                        <ol class="messages-list">
                            ${state.message.map(message => {
                                const messageClass = message.sender === state.username ? "my-message" : "other-message";
                                return `
                                    <li class="${messageClass}">
                                        <div class="message">
                                            <div class="sender-info">
                                                <span class="sender-username">${message.sender}</span>
                                                <time class="time-stamp">${message.timeStamp}</time>
                                            </div>
                                            <p class="message-text">${message.message}</p>
                                        </div>
                                    </li>
                                `;
                            }).join("")}
                        </ol>
                    ` : "<div class=\"empty-message\">NO CHAT HISTORY, LET'S CHAT NOW</div>"}
                </div>
            </section>
        `;
}

function renderLogout() {
    return `
        <section class="logout-view">   
           <button class="logout-button">Logout</button>
           ${state.isLoading ? `
               <div class="logout-spinner"></div>
               <p>Logging out...</p>
           `: ""}
        </section>
    `;
}

function renderSendMessageForm() {
    return `
        <section class="message-form-container">
            <form class="message-form">
                <label for="message-input" class="send-form-label">
                    <span class="label-your">Your</span>
                    <span class="label-message">Message</span>
                </label>
                <div class="message-input-container">
                    <textarea name="message" id="message-input" class="message-input" ${state.isSendingMessage ? "disabled" : ""}></textarea>
                    <button type="submit" class="send-button" ${state.isSendingMessage ? "disabled" : ""}>
                        ${state.isSendingMessage ? "Sending..." : "Send"}
                    </button>
                </div>
                
                ${state.isSendingMessage ? `
                    <div class="message-spinner-container">
                        <div class="spinner"></div>
                    </div>
                ` : ""}
                
                ${state.messageError ? `
                    <div class="message-error-container">
                        <p class="error-message">${state.messageError}</p>
                    </div>
                ` : ""}
            </form>
        </section>
    `;
}

export function render() {
    const app = document.querySelector("#app");
    const currentPage = document.createElement("main");

    currentPage.classList.add("view-container");

    if (!state.username) {
        currentPage.classList.add("view-container-login");
        currentPage.innerHTML = renderLoginView();
    } else {
        currentPage.classList.add("view-container-chat");
        currentPage.innerHTML =
            renderLogout() +
            renderWelcomeView() +
            renderUserList() +
            renderMessages() +
            renderSendMessageForm();

        setTimeout(() => {
            scrollToBottom();
        }, 0);
    }

    const previousPage = app.firstChild;

    if (previousPage) {
        app.replaceChild(currentPage, previousPage);
    } else {
        app.appendChild(currentPage);
    }
}

export function updateMessagesOnly() {
    const messageContainer = document.querySelector(".message-container");
    if (!messageContainer) return;

    const oldMessageCount = state.message ? state.message.length : 0;

    const messageDiv = document.createElement("div");
    messageDiv.innerHTML = renderMessages();

    const newContainer = messageDiv.querySelector(".message-container");

    const messageView = document.querySelector(".message-view");
    const wasAtBottom = messageView &&
        (messageView.scrollHeight - messageView.scrollTop - messageView.clientHeight < 20);

    if (newContainer && messageContainer.parentNode) {
        messageContainer.parentNode.replaceChild(newContainer, messageContainer);

        const updatedMessageView = document.querySelector(".message-view");
        if (updatedMessageView) {
            const newMessageCount = state.message ? state.message.length : 0;
            const hasNewMessages = newMessageCount > oldMessageCount;

            if (wasAtBottom || hasNewMessages) {
                updatedMessageView.scrollTop = updatedMessageView.scrollHeight;
            }
        }
    }
}

export function updateUserListOnly() {
    const userListContainer = document.querySelector(".user-list-container");
    if (!userListContainer) return;

    const userDiv = document.createElement("div");
    userDiv.innerHTML = renderUserList();

    const newContainer = userDiv.querySelector(".user-list-container");

    if (newContainer && userListContainer.parentNode) {
        userListContainer.parentNode.replaceChild(newContainer, userListContainer);
    }
}

function scrollToBottom() {
    const messageView = document.querySelector(".message-view");
    if (messageView) {
        messageView.scrollTop = messageView.scrollHeight;
    }
}
