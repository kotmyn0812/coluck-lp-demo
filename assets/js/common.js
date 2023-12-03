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
		(function () {
			const video = document.querySelector("#mainv");
			const button = document.querySelector("[data-play]");
			const buttonImg = document.querySelector("[data-btnimg]");

			button.addEventListener("click", function () {
				if (this.classList.contains("stop")) {
					this.classList.remove("stop");
					video.play();
					buttonImg.setAttribute('src','/assets/img/stop.svg')
					buttonImg.setAttribute('alt','stop')
				} else {
					this.classList.add("stop");
					video.pause();
					buttonImg.setAttribute('src','/assets/img/start.svg')
					buttonImg.setAttribute('alt','play')
				}
			});
		}());

	};
});
