import { generateChatPage } from "../pages/chats";
import { generateErrorPage } from "../pages/errors";
import {generateLoginModule} from "../pages/login";
import { generateRegistrationModule } from "../pages/registration";
import { generateUserPage } from "../pages/user";



const pageRouter = {
    loginPage: new generateLoginModule(),
    registrationPage: new generateRegistrationModule(),
    chatPage: new generateChatPage(),
    profilePage: new generateUserPage(),
    page404: generateErrorPage(404, "Sorry, but this page does not exist"),
    page500: generateErrorPage(500, "We are working to fix the problem!"),
};

export function navTo(pageToNavigate: string) {
    let root = document.querySelector("#chat");

	if(!root){
		const newDiv = document.createElement("div");
        newDiv.id = "chat";
		root = newDiv;
	}
		console.log(pageToNavigate);


    if (root && pageToNavigate) {
        root.innerHTML = "";
        root.appendChild(pageRouter[pageToNavigate].getElement());
    }
}