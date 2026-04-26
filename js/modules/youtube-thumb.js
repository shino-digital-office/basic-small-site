export function initYoutubeThumb() {
  const buttons = document.querySelectorAll(".js-youtube-thumb");

  if (!buttons.length) return;

  buttons.forEach((button) => {
    button.addEventListener("click", () => {
      const videoId = button.dataset.youtubeId;

      if (!videoId) return;

      const iframe = document.createElement("iframe");

      iframe.src = `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`;
      iframe.title = "YouTube video player";
      iframe.allow =
        "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share";
      iframe.allowFullscreen = true;

      iframe.classList.add("work-card__iframe");

      button.innerHTML = "";
      button.appendChild(iframe);
      button.classList.add("is-playing");
    });
  });
}
