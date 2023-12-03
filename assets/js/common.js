document.addEventListener("DOMContentLoaded", () => {
  // header,footer読み込み
  const header = document.querySelector(".l-header");
  const footer = document.querySelector(".l-footer");

  Promise.all([
    fetch("/assets/parts/header.html")
      .then((response) => response.text())
      .then((htmlContent) => {
        header.outerHTML = htmlContent;
      }),
    fetch("/assets/parts/footer.html")
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
		let pageTopPosition = document
			.querySelector(".page-top")
			.getBoundingClientRect().top;
		const pageTopBtn = document.querySelector(".page-top");
		const scrollPosition = window.scrollY; //現在地
		const footHeight = document.querySelector(".l-footer").clientHeight; //footerの高さ
		let abjustPosY = 5;
    if (document.querySelector("#top")) {
      let targetAreaPosition = document
        .querySelector(".video-wrapper")
        .getBoundingClientRect().bottom;
      document.querySelector(".l-header").classList.remove("sticky-top");
      document.querySelector(".l-header").classList.add("fixed-top");
      if (pageTopPosition >= targetAreaPosition) {
        pageTopBtn.classList.remove("is-hide"); // エリアを離れたらクラスを削除
      } else {
        pageTopBtn.classList.add("is-hide"); // 新しいクラスを付与
      }
      stopBtn();
			const stopBtn = function () {
				const video = document.querySelector("#mainv");
				const button = document.querySelector("[data-play]");
				const buttonImg = document.querySelector("[data-btnimg]");

				button.addEventListener("click", function () {
					if (this.classList.contains("stop")) {
						this.classList.remove("stop");
						video.play();
						buttonImg.setAttribute("src", "/assets/img/stop.svg");
						buttonImg.setAttribute("alt", "stop");
					} else {
						this.classList.add("stop");
						video.pause();
						buttonImg.setAttribute("src", "/assets/img/start.svg");
						buttonImg.setAttribute("alt", "play");
					}
				});
			};
    }

    const pageTopfunc = () => {
      const scrollHeight = Math.max(
        document.body.scrollHeight,
        document.documentElement.scrollHeight,
        document.body.offsetHeight,
        document.documentElement.offsetHeight,
        document.body.clientHeight,
        document.documentElement.clientHeight
      );

      const windowHeight = window.innerHeight;

      const bottomPosition = scrollHeight - windowHeight; //スクロール一番下の値

      if (bottomPosition - footHeight + 20 <= scrollPosition) {
        pageTopBtn.style.position = "absolute";
        pageTopBtn.style.bottom = abjustPosY + "px";
      } else {
        pageTopBtn.style.position = "fixed";
        pageTopBtn.style.bottom = abjustPosY + "px";
      }
    };

    window.addEventListener("load", function () {
      pageTopfunc();
    });
    window.addEventListener("scroll", function () {
      pageTopfunc();
    });
  };
});
