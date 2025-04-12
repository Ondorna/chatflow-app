import {render,updateMessagesOnly,updateUserListOnly} from "./view.js";

const state = {
    username:"",
    currentChat: "group",
    userList:[],
    message: [],
    error: "",
    messageError: "",
    isLoading: false,
    isInitializing: false,
    isSendingMessage: false,
};

export function updateState(newMessage) {
    Object.assign(state, newMessage);
        render();
}

export function updateMessage(newMessage) {
    Object.assign(state,{ message: newMessage });
    updateMessagesOnly(newMessage);
}

export function updateUserList(newUserList) {
    Object.assign(state, { userList: newUserList });
    updateUserListOnly(newUserList);
}

export default state;
