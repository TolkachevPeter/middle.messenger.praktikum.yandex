import { GenericObject } from '../types/types';

export default function getFormData(form: HTMLFormElement) {
	const formData: FormData = new FormData(form);
	const formDataToDisplay = [...formData.entries()].reduce((prev: GenericObject, [k, v]) => {
		prev[k] = v;
		return prev;
	}, {});
	return formDataToDisplay;
}

