import { validEmail } from '$lib/utilities/form';
import { error as svelteKitError, fail } from '@sveltejs/kit';

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

			return fail(400, { 'contact-email': email, error: errors.email });
		} catch (error) {
			const message = `Error in /login form: ${error}`;
			console.error(message);
			return svelteKitError(500, message);
		}
	},
};
