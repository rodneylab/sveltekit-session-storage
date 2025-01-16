<script>
	import { browser } from '$app/environment';
	import '$lib/styles/global.css';
	import '@fontsource/source-sans-pro';
	import { EmailInputField, TextArea, TextInputField } from '@rodneylab/sveltekit-components';

	let form = $props();

	let name = $state(browser ? (window.sessionStorage.getItem('name') ?? '') : '');
	let email = $state(browser ? (window.sessionStorage.getItem('email') ?? '') : '');
	let message = $state(browser ? (window.sessionStorage.getItem('message') ?? '') : '');

	function sessionStore(field, value) {
		if (browser) window.sessionStorage.setItem(field, value);
	}

	function clearForm() {
		if (browser) {
			sessionStorage.removeItem('name');
			sessionStorage.removeItem('email');
			sessionStorage.removeItem('message');
		}
		name = '';
		email = '';
		message = '';
	}

	if (form?.success) {
		clearForm();
	}
</script>

<main class="container">
	<div class="content">
		<h1>Write a message</h1>
		<form method="POST" class="form">
			<TextInputField
				value={name}
				id="contact-name"
				name="contact-name"
				placeholder="Blake Costa"
				title="Name"
				on:update={(event) => {
					sessionStore('name', event.detail);
					name = event.detail;
				}}
				style="padding-bottom:1.25rem;margin-right:1rem"
			/>
			<EmailInputField
				value={email}
				id="contact-email"
				name="contact-email"
				placeholder="blake@example.com"
				title="Email"
				error={form?.error}
				on:update={(event) => {
					sessionStore('email', event.detail);
					email = event.detail;
				}}
				style="padding-bottom:1.25rem;margin-right:1rem"
			/>
			<TextArea
				value={message}
				id="contact-message"
				name="contact-message"
				placeholder="Enter your message here"
				title="Message"
				on:update={(event) => {
					sessionStore('message', event.detail);
					message = event.detail;
				}}
				style="padding-bottom:1.25rem;margin-right:1rem"
			/>
			<div class="button-container">
				<button type="submit">Send your message</button>
			</div>
		</form>
	</div>
</main>

<style>
	form {
		margin-top: 1.5rem;
	}
	.button-container {
		display: flex;
		width: 100%;
	}

	button {
		cursor: pointer;
		color: #ffd791;
		background-color: #291720;
		border-style: none;
		border-radius: 1.5rem;
		font-size: 1.563rem;
		padding: 0.5rem 1.5rem;
		margin-top: 1.5rem;
		margin-left: auto;
	}
	@media (prefers-reduced-motion: no-preference) {
		button {
			transition:
				background-color 250ms,
				color 250ms;
		}
	}
	@media (prefers-reduced-motion: no-preference) {
		button {
			transition:
				background-color 2000ms,
				color 2000ms;
		}
	}

	button:hover {
		background-color: #686963;
		color: #fcfcff;
	}

	.container {
		display: flex;
		flex-direction: column;
	}

	.content {
		width: 60%;
		margin: 3rem auto;
	}
</style>
