const previous = document.querySelector(".previous");
const next = document.querySelector(".next");
const play = document.querySelector(".play");
const audio = document.querySelector(".audio");
const trackName = document.querySelector(".track-name");
const currTime = document.querySelector(".progress-bar > span:nth-child(1)");
const bar = document.querySelector(".bar");
const barPlaying = document.querySelector(".bar-playing");
const trackTime = document.querySelector(".progress-bar > span:nth-child(3)");
const albums = document.querySelector(".player-window-image");


let currentTrack = 0;
timeTracking();

play.addEventListener("click", isPlay);

next.addEventListener("click", (e) => {
  changeTrack(e.target.alt);
})

previous.addEventListener("click", (e) => {
  changeTrack(e.target.alt);
})

audio.addEventListener("loadeddata", timeTracking);
audio.addEventListener("timeupdate", currentTimeTrack);
audio.addEventListener("ended", endTrack);

bar.addEventListener("click", setBar);


const artists = [
  "Neverlove - Без лифака", 
  "Космонавтов нет - Из космоса с любовью",
  "Svmmy Well - Оставленные",
  "The Veronicas - 4ever",
  "3OH3 - Don't Trust Me"
] 

const tracks = [
  "assets/audio/neverlove_bez_lifaka.mp3", 
  "assets/audio/kosmonavtov_net_iz_kosmosa_s_lyubovyu.mp3",
  "assets/audio/svmmy_well_ostavlennye.mp3",
  "assets/audio/the_veronicas_4ever.mp3",
  "assets/audio/3OH3_dont_trust_me.mp3"
];

const labels = [
  "url(assets/labels/bez_lifaka.jpg)",
  "url(assets/labels/iz_kosmosa_s_lyubovyu.jpg)",
  "url(assets/labels/ostavlennye.jpg)",
  "url(assets/labels/4ever.jpg)",
  "url(assets/labels/dont_trust_me.jpg)"
];

function isPlay() {
  if (audio.paused) {
    audio.play();
    play.src = "assets/buttons/pause.png";
  } else {
    audio.pause();
    play.src = "assets/buttons/play.png";
  }
}

function timeTracking() {
  trackTime.innerHTML = `${(Math.floor(audio.duration) - Math.floor(audio.duration) % 60) / 60}:${Math.floor(audio.duration) % 60}`;
}

function currentTimeTrack() {
  const timing = Math.floor(audio.currentTime);
  const trackingWidth = timing / audio.duration * 100
  barPlaying.style.width = `${trackingWidth}%`;
  const mins = (timing - timing % 60) / 60;
  const seconds = `${`${timing % 60}`.padStart(2, '0')}`;
  currTime.innerHTML = `${mins}:${seconds}`;
}



function changeTrack(direction) {
  if (direction === "next") {
    currentTrack = (currentTrack + 1) % tracks.length;
    audio.src = tracks[currentTrack];
    albums.style.backgroundImage = labels[currentTrack];
    trackName.innerHTML = artists[currentTrack];
    isPlay();
  } else {
    currentTrack === 0 ? currentTrack = tracks.length - 1 
    : currentTrack -= 1;
    audio.src = tracks[currentTrack];
    albums.style.backgroundImage = labels[currentTrack];
    trackName.innerHTML = artists[currentTrack];
    isPlay();
  }
}

function setBar(e) {
  const width = this.clientWidth;
  const target = e.offsetX;
  const duration = audio.duration;
  const res = Math.floor((target / width) * duration)
  audio.currentTime = res;
}

function endTrack() {
  changeTrack("next");
}