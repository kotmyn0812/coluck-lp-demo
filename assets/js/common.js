document.addEventListener('DOMContentLoaded', () => {
	// header,footer読み込み
	const header = document.querySelector('.l-header');
	const footer = document.querySelector('.l-footer');

	Promise.all([
		fetch('/assets/parts/header.html')
			.then((response) => response.text())
			.then((htmlContent) => {
				header.outerHTML = htmlContent;
			}),
		fetch('/assets/parts/footer.html')
			.then((response) => response.text())
			.then((htmlContent) => {
				footer.outerHTML = htmlContent;
			}),
	])
		.then(() => processing())
		.catch((error) => {
			console.error(error);
		});

	const processing = () => {
		// jsの記述
	};
});
