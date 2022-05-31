export const emailCheck = {
	regex: /^([a-zA-Z0-9][-_]?)+@([a-zA-Z0-9][-_]?)+(\.[a-z]{1,})+/,
	validationMessage: 'Введите корректный e-mail',
};

export const passwordCheck = {
	regex: /^(?=.*[A-Z])(?=.*[0-9])[A-Za-z\d]{8,40}$/,
	validationMessage: 'Введите корректный пароль длиной от 8 до 40 символом как минимум с одной заглавной буквой и одной цифрой.',
};

export const nameOrSurnameCheck = {
	regex: /^(?=[\S])[A-Z]{1}[A-Za-z-]*$/,
	validationMessage:
        'Имя или фамилия должна начинаться с заглавной буквы, пробелы и цифры не допускаются',
};

export const loginCheck = {
	regex: /^(?=[\S]+)(?=.*[^0-9 ].*)[a-zA-Z0-9_-]{3,20}$/,
	validationMessage:
        'Логин должен быть от 3 до 20 символов и не включать специальные символы, за исключением _ или -',
};

export const phoneCheck = {
	regex: /^(\+?\d)\s?(\(\d{3}\)\s?\d{3})?(\d{3}-\d{3}|\d{10})?(-\d{2}-\d{2})?/,
	validationMessage: 'Введите корректный номер телефона',
};

export const noEmptyStringCheck = {
	regex: /^.*\S.*$$/,
	validationMessage: 'Сообщения не должно быть пустым',
};
