import loginPage from '../pages/'



const pageRouter: PageRouter = {
    loginPage: new LoginPage(),
    registrationPage: new RegistrationPage(),
    chatsPage: new ChatsPage(),
    profilePage: new ProfilePage(),
    page404: new ErrorPage({
        errorCode: 404,
        desc: "Sorry, but this page does not exist",
    }),
    page500: new ErrorPage({
        errorCode: 500,
        desc: "We are working to fix the problem!",
    }),
};

export function navTo(pageToNavigate: string) {
    let root = document.querySelector("#chat");

	if(!root){
		const newDiv = document.createElement("div");
        newDiv.id = "chat";
		root = newDiv;
	}


    if (root && pageToNavigate) {
        root.innerHTML = "";
        root.appendChild(pageRouter[pageToNavigate].getElement());
    }
}