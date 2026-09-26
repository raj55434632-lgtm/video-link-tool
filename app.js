const form = document.getElementById("form");
const input = document.getElementById("url");
const result = document.getElementById("result");
const player = document.getElementById("player");
const download = document.getElementById("download");
const message = document.getElementById("message");

form.addEventListener("submit", (e) => {
  e.preventDefault();

  let url;
  try {
    url = new URL(input.value.trim());
    if (!["http:", "https:"].includes(url.protocol)) throw new Error();
  } catch {
    message.textContent = "Please enter a valid http/https URL.";
    result.classList.remove("hidden");
    return;
  }

  result.classList.remove("hidden");
  player.src = url.href;
  download.href = url.href;
  message.textContent = "Loading preview...";

  player.onloadedmetadata = () => {
    message.textContent = "Video ready.";
  };

  player.onerror = () => {
    message.textContent =
      "This link is not a directly playable video, or the server blocks browser playback/download.";
  };
});
