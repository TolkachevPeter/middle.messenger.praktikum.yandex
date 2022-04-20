const Handlebars = require("handlebars");
const template = Handlebars.compile("Name: {{name}}");

const chat = document.getElementById("chat");
chat.textContent = "Chat project is starting";
