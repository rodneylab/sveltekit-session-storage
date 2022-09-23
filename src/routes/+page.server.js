import { error } from '@sveltejs/kit';
import { validEmail } from '$lib/utilities/form';
import { invalid } from '@sveltejs/kit';

export const actions = {
	default: async ({ request }) => {
		try {
			const form = await request.formData();
			const name = form.get('contact-name');
			const email = form.get('contact-email');
			const message = form.get('contact-message');

			const errors = { ...validEmail(email) };

			if (!errors.email) {
				console.log({ name, email, message });
				return { success: true };
			}

			return invalid(400, { 'contact-email': email, error: errors.email });
		} catch (err) {
			const message = `Error in /login form: ${err}`;
			console.error(message);
			return error(500, message);
		}
	},
};
