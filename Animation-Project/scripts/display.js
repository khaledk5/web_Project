var videoSource = localStorage.getItem("videoSource");
if (videoSource) {
  var videoElement = document.getElementById("videoElement");
  videoElement.src = videoSource;
}
