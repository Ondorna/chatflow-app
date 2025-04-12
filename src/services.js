import state from "./state.js";

function fetchData(url, options = {}) {
    return fetch(url, options)
        .catch(() => Promise.reject({error: "network-error"}))
        .then(response => {
            if (!response.ok) {
                return response.json().then(err => Promise.reject(err));
            }
            return response.json();
        });
}

export function fetchLogin(username) {
    return fetchData("/api/v1/sessions/", {
        method: "POST",
        headers: {
            "content-Type": "application/json",
        },
        body: JSON.stringify({username}),
    });
}

export function fetchSession() {
    return fetchData("/api/v1/sessions")
}

export function fetchUserList() {
    return fetchData("/api/v1/users")
        .then(data => {
            return data;
        });
}

export function fetchLogout() {
    return fetchData("/api/v1/sessions", {
        method: "DELETE",
    });
}

export function fetchMessage() {
    if (state.currentChat === "group") {
        return fetchData("/api/v1/messages?type=group");
    } else {
        return fetchData(`/api/v1/messages?type=private&user=${state.currentChat}`);
    }
}

export function fetchUpdateMessage(message) {
    return fetchData("/api/v1/messages", {
        method: "POST",
        headers: {"content-Type": "application/json"},
        body: JSON.stringify({
            message,
            recipient: state.currentChat === "group" ? null : state.currentChat
        }),
    });
}
