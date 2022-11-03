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

export type singUpUserData = {
    first_name: string,
    second_name: string,
    login: string,
    email: string,
    password: string,
    phone: string
}

export type UserInfo = {
	id: number;
	first_name: string;
	second_name: string;
	display_name: string;
	login: string;
	email: string;
	phone: string;
	avatar: string;
}