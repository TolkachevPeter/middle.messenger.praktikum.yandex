import { GenericObject } from '../types/types';

export default function getFormData(form: HTMLFormElement) {
	console.log('form inside', form);
	const formData: FormData = new FormData(form);
	const formDataToDisplay = [...formData.entries()].reduce((prev: GenericObject, [k, v]) => {
		prev[k] = v;
		return prev;
	}, {});
	console.log('formDataToDisplay',formDataToDisplay);
	return formDataToDisplay;
}