import {generateLoginModule} from "../pages/login";
import { generateRegistrationModule } from "../pages/registration";



const pageRouter = {
    loginPage: new generateLoginModule(),
    registrationPage: new generateRegistrationModule(),
    // chatsPage: new ChatsPage(),
    // profilePage: new ProfilePage(),
    // page404: new ErrorPage({
    //     errorCode: 404,
    //     desc: "Sorry, but this page does not exist",
    // }),
    // page500: new ErrorPage({
    //     errorCode: 500,
    //     desc: "We are working to fix the problem!",
    // }),
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