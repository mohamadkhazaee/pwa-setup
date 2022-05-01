// still main thread

//maybe some browsers doesn't support service workers!
if ("serviceWorker" in navigator) {
  navigator.serviceWorker.register("sw.js");
}
