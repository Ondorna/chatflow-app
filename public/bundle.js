/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/app-controller.js":
/*!*******************************!*\
  !*** ./src/app-controller.js ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   control: () => (/* binding */ control)
/* harmony export */ });
/* harmony import */ var _services_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./services.js */ "./src/services.js");
/* harmony import */ var _state_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./state.js */ "./src/state.js");
/* harmony import */ var _listeners_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./listeners.js */ "./src/listeners.js");
/* harmony import */ var _polling_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./polling.js */ "./src/polling.js");




function control() {
  (0,_state_js__WEBPACK_IMPORTED_MODULE_1__.updateState)({
    isInitializing: true
  });
  (0,_services_js__WEBPACK_IMPORTED_MODULE_0__.fetchSession)().then(function (sessionData) {
    (0,_state_js__WEBPACK_IMPORTED_MODULE_1__.updateState)({
      username: sessionData.username
    });
    return (0,_services_js__WEBPACK_IMPORTED_MODULE_0__.fetchMessage)();
  }).then(function (messageData) {
    (0,_state_js__WEBPACK_IMPORTED_MODULE_1__.updateState)({
      message: messageData.message
    });
    return (0,_services_js__WEBPACK_IMPORTED_MODULE_0__.fetchUserList)();
  }).then(function (userListData) {
    (0,_state_js__WEBPACK_IMPORTED_MODULE_1__.updateState)({
      userList: userListData.userList,
      isInitializing: false
    });
    if (_state_js__WEBPACK_IMPORTED_MODULE_1__["default"].username) {
      (0,_polling_js__WEBPACK_IMPORTED_MODULE_3__.startPolling)();
    }
  })["catch"](function () {
    (0,_state_js__WEBPACK_IMPORTED_MODULE_1__.updateState)({
      username: "",
      isInitializing: false
    });
  });
  var appEl = document.querySelector("#app");
  (0,_listeners_js__WEBPACK_IMPORTED_MODULE_2__.eventListeners)(appEl, {
    startPolling: _polling_js__WEBPACK_IMPORTED_MODULE_3__.startPolling,
    stopPolling: _polling_js__WEBPACK_IMPORTED_MODULE_3__.stopPolling
  });
}

/***/ }),

/***/ "./src/constants.js":
/*!**************************!*\
  !*** ./src/constants.js ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ERROR_MESSAGES: () => (/* binding */ ERROR_MESSAGES)
/* harmony export */ });
var ERROR_MESSAGES = {
  "default": "Something went wrong, please try again",
  "auth-missing": "",
  "required-username": "The username can only contain letters, numbers and underscores",
  "auth-insufficient": "Please enter a valid username",
  "empty-username": "Username cannot be empty",
  "username-length": "Username should be up to 20 characters",
  "required-message": "Unable to send blank message",
  "network-error": "Server unavailable, please try again"
};

/***/ }),

/***/ "./src/listeners.js":
/*!**************************!*\
  !*** ./src/listeners.js ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   eventListeners: () => (/* binding */ eventListeners)
/* harmony export */ });
/* harmony import */ var _state_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./state.js */ "./src/state.js");
/* harmony import */ var _services_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./services.js */ "./src/services.js");
/* harmony import */ var _constants_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./constants.js */ "./src/constants.js");



function eventListeners(appEl, _ref) {
  var startPolling = _ref.startPolling,
    stopPolling = _ref.stopPolling;
  appEl.addEventListener("submit", function (e) {
    e.preventDefault();
    if (e.target.classList.contains("login-form")) {
      var usernameInput = e.target.querySelector(".username-input");
      var username = usernameInput.value.trim();
      if (!username) {
        (0,_state_js__WEBPACK_IMPORTED_MODULE_0__.updateState)({
          error: _constants_js__WEBPACK_IMPORTED_MODULE_2__.ERROR_MESSAGES["empty-username"] || _constants_js__WEBPACK_IMPORTED_MODULE_2__.ERROR_MESSAGES["default"]
        });
        return;
      }
      (0,_state_js__WEBPACK_IMPORTED_MODULE_0__.updateState)({
        isLoading: true
      });
      (0,_services_js__WEBPACK_IMPORTED_MODULE_1__.fetchLogin)(username).then(function (loginData) {
        (0,_state_js__WEBPACK_IMPORTED_MODULE_0__.updateState)({
          username: loginData.username,
          currentChat: "group",
          error: "",
          messageError: ""
        });
        return (0,_services_js__WEBPACK_IMPORTED_MODULE_1__.fetchMessage)();
      }).then(function (messageData) {
        (0,_state_js__WEBPACK_IMPORTED_MODULE_0__.updateState)({
          message: messageData.message
        });
        return (0,_services_js__WEBPACK_IMPORTED_MODULE_1__.fetchUserList)();
      }).then(function (userListData) {
        (0,_state_js__WEBPACK_IMPORTED_MODULE_0__.updateState)({
          userList: userListData.userList,
          isLoading: false,
          messageError: ""
        });
        startPolling();
      })["catch"](function (loginError) {
        var error = _constants_js__WEBPACK_IMPORTED_MODULE_2__.ERROR_MESSAGES[loginError.error] || _constants_js__WEBPACK_IMPORTED_MODULE_2__.ERROR_MESSAGES["default"];
        (0,_state_js__WEBPACK_IMPORTED_MODULE_0__.updateState)({
          error: error,
          isLoading: false
        });
      });
    }
    if (e.target.classList.contains("message-form")) {
      var messageInput = e.target.querySelector(".message-input");
      var message = messageInput.value;
      (0,_state_js__WEBPACK_IMPORTED_MODULE_0__.updateState)({
        isSendingMessage: true,
        messageError: ""
      });
      (0,_services_js__WEBPACK_IMPORTED_MODULE_1__.fetchUpdateMessage)(message).then(function () {
        messageInput.value = "";
        return (0,_services_js__WEBPACK_IMPORTED_MODULE_1__.fetchMessage)();
      }).then(function (messageData) {
        (0,_state_js__WEBPACK_IMPORTED_MODULE_0__.updateState)({
          message: messageData.message
        });
        return (0,_services_js__WEBPACK_IMPORTED_MODULE_1__.fetchUserList)();
      }).then(function (userListData) {
        (0,_state_js__WEBPACK_IMPORTED_MODULE_0__.updateState)({
          userList: userListData.userList,
          messageError: "",
          isSendingMessage: false
        });
      })["catch"](function (updateTextError) {
        if (updateTextError.error === "auth-missing") {
          (0,_state_js__WEBPACK_IMPORTED_MODULE_0__.updateState)({
            username: "",
            error: "",
            messageError: "",
            isSendingMessage: false
          });
          stopPolling();
          return;
        } else if (updateTextError.error === "required-message") {
          var _messageError = _constants_js__WEBPACK_IMPORTED_MODULE_2__.ERROR_MESSAGES[updateTextError.error] || _constants_js__WEBPACK_IMPORTED_MODULE_2__.ERROR_MESSAGES["default"];
          (0,_state_js__WEBPACK_IMPORTED_MODULE_0__.updateState)({
            messageError: _messageError,
            isSendingMessage: false
          });
          return;
        }
        var messageError = _constants_js__WEBPACK_IMPORTED_MODULE_2__.ERROR_MESSAGES[updateTextError.error] || _constants_js__WEBPACK_IMPORTED_MODULE_2__.ERROR_MESSAGES["default"];
        (0,_state_js__WEBPACK_IMPORTED_MODULE_0__.updateState)({
          messageError: messageError,
          isSendingMessage: false
        });
      });
    }
  });
  appEl.addEventListener("click", function (e) {
    if (e.target.classList.contains("logout-button")) {
      (0,_state_js__WEBPACK_IMPORTED_MODULE_0__.updateState)({
        isLoading: true
      });
      (0,_services_js__WEBPACK_IMPORTED_MODULE_1__.fetchLogout)().then(function () {
        stopPolling();
        (0,_state_js__WEBPACK_IMPORTED_MODULE_0__.updateState)({
          username: "",
          error: "",
          messageError: "",
          isLoading: false
        });
      })["catch"](function (logoutError) {
        var error = _constants_js__WEBPACK_IMPORTED_MODULE_2__.ERROR_MESSAGES[logoutError.error] || _constants_js__WEBPACK_IMPORTED_MODULE_2__.ERROR_MESSAGES["default"];
        (0,_state_js__WEBPACK_IMPORTED_MODULE_0__.updateState)({
          error: error,
          isLoading: false
        });
      });
    }
    if (e.target.classList.contains("private-chat-button")) {
      var username = e.target.dataset.username;
      (0,_state_js__WEBPACK_IMPORTED_MODULE_0__.updateState)({
        currentChat: username
      });
      (0,_services_js__WEBPACK_IMPORTED_MODULE_1__.fetchMessage)().then(function (messageData) {
        (0,_state_js__WEBPACK_IMPORTED_MODULE_0__.updateState)({
          message: messageData.message
        });
      })["catch"](function (error) {
        (0,_state_js__WEBPACK_IMPORTED_MODULE_0__.updateState)({
          messageError: _constants_js__WEBPACK_IMPORTED_MODULE_2__.ERROR_MESSAGES[error.error] || _constants_js__WEBPACK_IMPORTED_MODULE_2__.ERROR_MESSAGES["default"]
        });
      });
    }
    if (e.target.classList.contains("group-chat-button") && e.target.dataset.chat === "group") {
      (0,_state_js__WEBPACK_IMPORTED_MODULE_0__.updateState)({
        currentChat: "group"
      });
      (0,_services_js__WEBPACK_IMPORTED_MODULE_1__.fetchMessage)().then(function (messageData) {
        (0,_state_js__WEBPACK_IMPORTED_MODULE_0__.updateState)({
          message: messageData.message
        });
      })["catch"](function (error) {
        (0,_state_js__WEBPACK_IMPORTED_MODULE_0__.updateState)({
          messageError: _constants_js__WEBPACK_IMPORTED_MODULE_2__.ERROR_MESSAGES[error.error] || _constants_js__WEBPACK_IMPORTED_MODULE_2__.ERROR_MESSAGES["default"]
        });
      });
    }
  });
}

/***/ }),

/***/ "./src/polling.js":
/*!************************!*\
  !*** ./src/polling.js ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   startPolling: () => (/* binding */ startPolling),
/* harmony export */   stopPolling: () => (/* binding */ stopPolling)
/* harmony export */ });
/* harmony import */ var _services_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./services.js */ "./src/services.js");
/* harmony import */ var _state_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./state.js */ "./src/state.js");
function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }


var POLLING_INTERVAL = 5000;
var pollingInterval = null;
function pollForUpdates() {
  if (!_state_js__WEBPACK_IMPORTED_MODULE_1__["default"].username) {
    stopPolling();
    return;
  }
  Promise.all([(0,_services_js__WEBPACK_IMPORTED_MODULE_0__.fetchMessage)(), (0,_services_js__WEBPACK_IMPORTED_MODULE_0__.fetchUserList)()]).then(function (_ref) {
    var _ref2 = _slicedToArray(_ref, 2),
      messageData = _ref2[0],
      userListData = _ref2[1];
    var messagesChanged = JSON.stringify(_state_js__WEBPACK_IMPORTED_MODULE_1__["default"].message) !== JSON.stringify(messageData.message);
    var usersChanged = JSON.stringify(_state_js__WEBPACK_IMPORTED_MODULE_1__["default"].userList) !== JSON.stringify(userListData.userList);
    if (messagesChanged) {
      (0,_state_js__WEBPACK_IMPORTED_MODULE_1__.updateMessage)(messageData.message);
    }
    if (usersChanged) {
      (0,_state_js__WEBPACK_IMPORTED_MODULE_1__.updateUserList)(userListData.userList);
    }
  })["catch"](function (error) {
    if (error.error === "auth-missing") {
      (0,_state_js__WEBPACK_IMPORTED_MODULE_1__.updateState)({
        username: ""
      });
      stopPolling();
    }
  });
}
function startPolling() {
  if (pollingInterval) {
    stopPolling();
  }
  pollForUpdates();
  pollingInterval = setInterval(pollForUpdates, POLLING_INTERVAL);
}
function stopPolling() {
  if (pollingInterval) {
    clearInterval(pollingInterval);
    pollingInterval = null;
  }
}

/***/ }),

/***/ "./src/services.js":
/*!*************************!*\
  !*** ./src/services.js ***!
  \*************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   fetchLogin: () => (/* binding */ fetchLogin),
/* harmony export */   fetchLogout: () => (/* binding */ fetchLogout),
/* harmony export */   fetchMessage: () => (/* binding */ fetchMessage),
/* harmony export */   fetchSession: () => (/* binding */ fetchSession),
/* harmony export */   fetchUpdateMessage: () => (/* binding */ fetchUpdateMessage),
/* harmony export */   fetchUserList: () => (/* binding */ fetchUserList)
/* harmony export */ });
/* harmony import */ var _state_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./state.js */ "./src/state.js");

function fetchData(url) {
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  return fetch(url, options)["catch"](function () {
    return Promise.reject({
      error: "network-error"
    });
  }).then(function (response) {
    if (!response.ok) {
      return response.json().then(function (err) {
        return Promise.reject(err);
      });
    }
    return response.json();
  });
}
function fetchLogin(username) {
  return fetchData("/api/v1/sessions/", {
    method: "POST",
    headers: {
      "content-Type": "application/json"
    },
    body: JSON.stringify({
      username: username
    })
  });
}
function fetchSession() {
  return fetchData("/api/v1/sessions");
}
function fetchUserList() {
  return fetchData("/api/v1/users").then(function (data) {
    return data;
  });
}
function fetchLogout() {
  return fetchData("/api/v1/sessions", {
    method: "DELETE"
  });
}
function fetchMessage() {
  if (_state_js__WEBPACK_IMPORTED_MODULE_0__["default"].currentChat === "group") {
    return fetchData("/api/v1/messages?type=group");
  } else {
    return fetchData("/api/v1/messages?type=private&user=".concat(_state_js__WEBPACK_IMPORTED_MODULE_0__["default"].currentChat));
  }
}
function fetchUpdateMessage(message) {
  return fetchData("/api/v1/messages", {
    method: "POST",
    headers: {
      "content-Type": "application/json"
    },
    body: JSON.stringify({
      message: message,
      recipient: _state_js__WEBPACK_IMPORTED_MODULE_0__["default"].currentChat === "group" ? null : _state_js__WEBPACK_IMPORTED_MODULE_0__["default"].currentChat
    })
  });
}

/***/ }),

/***/ "./src/state.js":
/*!**********************!*\
  !*** ./src/state.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   updateMessage: () => (/* binding */ updateMessage),
/* harmony export */   updateState: () => (/* binding */ updateState),
/* harmony export */   updateUserList: () => (/* binding */ updateUserList)
/* harmony export */ });
/* harmony import */ var _view_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./view.js */ "./src/view.js");

var state = {
  username: "",
  currentChat: "group",
  userList: [],
  message: [],
  error: "",
  messageError: "",
  isLoading: false,
  isInitializing: false,
  isSendingMessage: false
};
function updateState(newMessage) {
  Object.assign(state, newMessage);
  (0,_view_js__WEBPACK_IMPORTED_MODULE_0__.render)();
}
function updateMessage(newMessage) {
  Object.assign(state, {
    message: newMessage
  });
  (0,_view_js__WEBPACK_IMPORTED_MODULE_0__.updateMessagesOnly)(newMessage);
}
function updateUserList(newUserList) {
  Object.assign(state, {
    userList: newUserList
  });
  (0,_view_js__WEBPACK_IMPORTED_MODULE_0__.updateUserListOnly)(newUserList);
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (state);

/***/ }),

/***/ "./src/view.js":
/*!*********************!*\
  !*** ./src/view.js ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   render: () => (/* binding */ render),
/* harmony export */   updateMessagesOnly: () => (/* binding */ updateMessagesOnly),
/* harmony export */   updateUserListOnly: () => (/* binding */ updateUserListOnly)
/* harmony export */ });
/* harmony import */ var _state_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./state.js */ "./src/state.js");

function renderLoginView() {
  return "\n        <section class=\"login-view\">\n            <h1>Let's Chat!</h1>\n            <img class=\"login-view-picture\" src=\"/images/login-view.png\" alt=\"Login Picture\" />\n            ".concat(_state_js__WEBPACK_IMPORTED_MODULE_0__["default"].isInitializing ? "\n                <div class=\"login-spinner\"></div>\n                <p>Loading app...</p>\n            " : _state_js__WEBPACK_IMPORTED_MODULE_0__["default"].isLoading ? "\n                <div class=\"login-spinner\"></div>\n                <p>Logging in...</p>\n            " : "", "\n            <form class=\"login-form\">\n                <label for=\"username-input\" class=\"login-form-label\">Please input your username here:</label>\n                <div class=\"login-input\">\n                    <input type=\"text\" name=\"username\" id=\"username-input\" class=\"username-input\"/>\n                    <button type=\"submit\" class=\"login-button\">Login</button>\n                </div>\n                ").concat(_state_js__WEBPACK_IMPORTED_MODULE_0__["default"].error ? "<p class=\"error-message\">".concat(_state_js__WEBPACK_IMPORTED_MODULE_0__["default"].error, "</p>") : "", "\n            </form>\n        </section>\n    ");
}
function renderWelcomeView() {
  return "\n        <header class=\"welcome-view\">\n            <h1>Welcome, ".concat(_state_js__WEBPACK_IMPORTED_MODULE_0__["default"].username, "!</h1>\n        </header>\n    ");
}
function renderUserList() {
  return "\n        <section class=\"user-list-container\">\n            <h2 class=\"users-list-title\">Online Users</h2>\n            <div class=\"chat-selector\">\n                <button class=\"group-chat-button ".concat(_state_js__WEBPACK_IMPORTED_MODULE_0__["default"].currentChat === "group" ? "active" : "", "\" \n                    data-chat=\"group\">Group Chat</button>\n            </div>\n            <div class=\"user-list-view\">\n                <ul class=\"users-list\">\n                     ").concat(_state_js__WEBPACK_IMPORTED_MODULE_0__["default"].userList.map(function (user) {
    if (user === _state_js__WEBPACK_IMPORTED_MODULE_0__["default"].username) {
      return "\n                              <li class=\"users-items\">\n                                <span class=\"users-username\">".concat(user, " (you)</span>\n                              </li>\n                            ");
    }
    return "\n                                  <li class=\"users-items\">\n                                    <span class=\"users-username\">".concat(user, "</span>\n                                    <button class=\"private-chat-button ").concat(_state_js__WEBPACK_IMPORTED_MODULE_0__["default"].currentChat === user ? "active" : "", "\" data-username=\"").concat(user, "\">Message</button>  \n                                  </li>\n                                ");
  }).join(""), "\n                 </ul>\n            </div>\n        </section>\n    ");
}
function renderMessages() {
  return "\n            <section class=\"message-container\">\n                <h2 class=\"message-title\">Chat with <span class=\"private-chat-name\"> ".concat(_state_js__WEBPACK_IMPORTED_MODULE_0__["default"].currentChat, "</span></h2>\n                <div class=\"message-view\">\n                    ").concat(_state_js__WEBPACK_IMPORTED_MODULE_0__["default"].message && _state_js__WEBPACK_IMPORTED_MODULE_0__["default"].message.length > 0 ? "\n                        <ol class=\"messages-list\">\n                            ".concat(_state_js__WEBPACK_IMPORTED_MODULE_0__["default"].message.map(function (message) {
    var messageClass = message.sender === _state_js__WEBPACK_IMPORTED_MODULE_0__["default"].username ? "my-message" : "other-message";
    return "\n                                    <li class=\"".concat(messageClass, "\">\n                                        <div class=\"message\">\n                                            <div class=\"sender-info\">\n                                                <span class=\"sender-username\">").concat(message.sender, "</span>\n                                                <time class=\"time-stamp\">").concat(message.timeStamp, "</time>\n                                            </div>\n                                            <p class=\"message-text\">").concat(message.message, "</p>\n                                        </div>\n                                    </li>\n                                ");
  }).join(""), "\n                        </ol>\n                    ") : "<div class=\"empty-message\">NO CHAT HISTORY, LET'S CHAT NOW</div>", "\n                </div>\n            </section>\n        ");
}
function renderLogout() {
  return "\n        <section class=\"logout-view\">   \n           <button class=\"logout-button\">Logout</button>\n           ".concat(_state_js__WEBPACK_IMPORTED_MODULE_0__["default"].isLoading ? "\n               <div class=\"logout-spinner\"></div>\n               <p>Logging out...</p>\n           " : "", "\n        </section>\n    ");
}
function renderSendMessageForm() {
  return "\n        <section class=\"message-form-container\">\n            <form class=\"message-form\">\n                <label for=\"message-input\" class=\"send-form-label\">\n                    <span class=\"label-your\">Your</span>\n                    <span class=\"label-message\">Message</span>\n                </label>\n                <div class=\"message-input-container\">\n                    <textarea name=\"message\" id=\"message-input\" class=\"message-input\" ".concat(_state_js__WEBPACK_IMPORTED_MODULE_0__["default"].isSendingMessage ? "disabled" : "", "></textarea>\n                    <button type=\"submit\" class=\"send-button\" ").concat(_state_js__WEBPACK_IMPORTED_MODULE_0__["default"].isSendingMessage ? "disabled" : "", ">\n                        ").concat(_state_js__WEBPACK_IMPORTED_MODULE_0__["default"].isSendingMessage ? "Sending..." : "Send", "\n                    </button>\n                </div>\n                \n                ").concat(_state_js__WEBPACK_IMPORTED_MODULE_0__["default"].isSendingMessage ? "\n                    <div class=\"message-spinner-container\">\n                        <div class=\"spinner\"></div>\n                    </div>\n                " : "", "\n                \n                ").concat(_state_js__WEBPACK_IMPORTED_MODULE_0__["default"].messageError ? "\n                    <div class=\"message-error-container\">\n                        <p class=\"error-message\">".concat(_state_js__WEBPACK_IMPORTED_MODULE_0__["default"].messageError, "</p>\n                    </div>\n                ") : "", "\n            </form>\n        </section>\n    ");
}
function render() {
  var app = document.querySelector("#app");
  var currentPage = document.createElement("main");
  currentPage.classList.add("view-container");
  if (!_state_js__WEBPACK_IMPORTED_MODULE_0__["default"].username) {
    currentPage.classList.add("view-container-login");
    currentPage.innerHTML = renderLoginView();
  } else {
    currentPage.classList.add("view-container-chat");
    currentPage.innerHTML = renderLogout() + renderWelcomeView() + renderUserList() + renderMessages() + renderSendMessageForm();
    setTimeout(function () {
      scrollToBottom();
    }, 0);
  }
  var previousPage = app.firstChild;
  if (previousPage) {
    app.replaceChild(currentPage, previousPage);
  } else {
    app.appendChild(currentPage);
  }
}
function updateMessagesOnly() {
  var messageContainer = document.querySelector(".message-container");
  if (!messageContainer) return;
  var oldMessageCount = _state_js__WEBPACK_IMPORTED_MODULE_0__["default"].message ? _state_js__WEBPACK_IMPORTED_MODULE_0__["default"].message.length : 0;
  var messageDiv = document.createElement("div");
  messageDiv.innerHTML = renderMessages();
  var newContainer = messageDiv.querySelector(".message-container");
  var messageView = document.querySelector(".message-view");
  var wasAtBottom = messageView && messageView.scrollHeight - messageView.scrollTop - messageView.clientHeight < 20;
  if (newContainer && messageContainer.parentNode) {
    messageContainer.parentNode.replaceChild(newContainer, messageContainer);
    var updatedMessageView = document.querySelector(".message-view");
    if (updatedMessageView) {
      var newMessageCount = _state_js__WEBPACK_IMPORTED_MODULE_0__["default"].message ? _state_js__WEBPACK_IMPORTED_MODULE_0__["default"].message.length : 0;
      var hasNewMessages = newMessageCount > oldMessageCount;
      if (wasAtBottom || hasNewMessages) {
        updatedMessageView.scrollTop = updatedMessageView.scrollHeight;
      }
    }
  }
}
function updateUserListOnly() {
  var userListContainer = document.querySelector(".user-list-container");
  if (!userListContainer) return;
  var userDiv = document.createElement("div");
  userDiv.innerHTML = renderUserList();
  var newContainer = userDiv.querySelector(".user-list-container");
  if (newContainer && userListContainer.parentNode) {
    userListContainer.parentNode.replaceChild(newContainer, userListContainer);
  }
}
function scrollToBottom() {
  var messageView = document.querySelector(".message-view");
  if (messageView) {
    messageView.scrollTop = messageView.scrollHeight;
  }
}

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry needs to be wrapped in an IIFE because it needs to be isolated against other modules in the chunk.
(() => {
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _app_controller_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./app-controller.js */ "./src/app-controller.js");

(0,_app_controller_js__WEBPACK_IMPORTED_MODULE_0__.control)();
})();

/******/ })()
;
//# sourceMappingURL=bundle.js.map