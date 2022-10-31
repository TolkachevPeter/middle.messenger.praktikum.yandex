// eslint-disable-next-line no-undef
export interface Form extends HTMLCollectionOf<HTMLFormElement> {
    loginForm: HTMLFormElement;
    registrationForm: HTMLFormElement;
    userForm: HTMLFormElement;
    messageForm: HTMLFormElement;
}

export type signInRequest = {
	login: string,
	password: string,
}

export type GenericObject<T = unknown> = {
    // eslint-disable-next-line no-unused-vars
    [key in string]: T
  }