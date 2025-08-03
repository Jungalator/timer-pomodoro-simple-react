import { Howl } from "howler";
export const playSound = (soundSrc) => {
  var sound = new Howl({
    src: [soundSrc],
    onload: function () {
      sound.play();
    },
    onloaderror: function (id, error) {
      console.log("Error loading audio:", error);
    },
    onplayerror: function (id, error) {
      console.log("Error playing audio:", error);
    },
  });
};
