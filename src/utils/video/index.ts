let music1: any = null;
let music2: any = null;
let music3: any = null;

function videoStart() {
  music1 = new Audio("/video1.mp3");
  music2 = new Audio("/video2.mp3");
  music3 = new Audio("/video3.mp3");

  music1.play();
  music1.addEventListener("ended", () => {
    music2.play();
  });
  music2.addEventListener("ended", () => {
    music3.play();
  });
  music3.addEventListener("ended", () => {
    music1.play();
  });
}

function videoStop() {
  music1.pause();
  music2.pause();
  music3.pause();
}

export { videoStart, videoStop };
