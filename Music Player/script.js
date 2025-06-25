const songs = [
  {
    name: "ALL-CONQUERING-MASTER-AND-SAVIOR-BY-VASHUAN-.mp3",
    title: "All Conquering Master And Saviour",
    artist: "Vashuan & Loveworld Singers"
  },
  {
    name: "ALL-TIME-WONDER-BY-OBI-SHINE.mp3",
    title: "All Time Wonder",
    artist: "Obi Shine & Loveworld Singers"
  },
  {
    name: "Eternal-Immortal-God-Pastor-Saki.mp3",
    title: "Eternal Immortal God",
    artist: "Pastor Saki & Loveworld Singers"
  },
   {
    name: "FOR-YOUR-NAME-IS-GREATLY-TO-BE-PRAISED.mp3",
    title: "For Your Name Is Greatly To Be Praised",
    artist: "Loveworld Singers"
  },
   {
    name: "GODS-ROYAL-PRIESTHOOD-MAYA.mp3",
    title: "God's Royal Priesthood",
    artist: "Maya & Loveworld Singers"
  },
   {
    name: "GREAT-LORD-AND-MASTER-By-LoveWorld-Singers.mp3",
    title: "Great Lord And Master",
    artist: "Loveworld Singers"
  },
];

const audio = document.getElementById('audio');
const title = document.getElementById('title');
const artist = document.getElementById('artist');
const playBtn = document.getElementById('play');
const nextBtn = document.getElementById('next');
const prevBtn = document.getElementById('prev');
const progress = document.getElementById('progress');
const currentTime = document.getElementById('current-time');
const durationTime = document.getElementById('duration');
const volume = document.getElementById('volume');
const playlist = document.getElementById('playlist');

let isPlaying = false;
let songIndex = 0;

function loadSong(song) {
  title.textContent = song.title;
  artist.textContent = song.artist;
  audio.src = `music/${song.name}`;
}

function playSong() {
  isPlaying = true;
  audio.play();
  playBtn.textContent = '⏸️';
}

function pauseSong() {
  isPlaying = false;
  audio.pause();
  playBtn.textContent = '▶️';
}

playBtn.addEventListener('click', () => {
  isPlaying ? pauseSong() : playSong();
});

function nextSong() {
  songIndex = (songIndex + 1) % songs.length;
  loadSong(songs[songIndex]);
  playSong();
  highlightPlaying();
}

function prevSong() {
  songIndex = (songIndex - 1 + songs.length) % songs.length;
  loadSong(songs[songIndex]);
  playSong();
  highlightPlaying();
}

nextBtn.addEventListener('click', nextSong);
prevBtn.addEventListener('click', prevSong);

audio.addEventListener('timeupdate', () => {
  const { currentTime: c, duration: d } = audio;
  progress.value = (c / d) * 100 || 0;

  currentTime.textContent = formatTime(c);
  durationTime.textContent = formatTime(d);
});

progress.addEventListener('input', () => {
  audio.currentTime = (progress.value * audio.duration) / 100;
});

volume.addEventListener('input', () => {
  audio.volume = volume.value;
});

audio.addEventListener('ended', nextSong);

function formatTime(time) {
  const minutes = Math.floor(time / 60) || 0;
  const seconds = Math.floor(time % 60) || 0;
  return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
}

// Playlist
songs.forEach((song, index) => {
  const songDiv = document.createElement('div');
  songDiv.textContent = `${song.title} - ${song.artist}`;
  songDiv.addEventListener('click', () => {
    songIndex = index;
    loadSong(song);
    playSong();
    highlightPlaying();
  });
  playlist.appendChild(songDiv);
});

function highlightPlaying() {
  const children = playlist.children;
  for (let i = 0; i < children.length; i++) {
    children[i].classList.remove('active');
  }
  children[songIndex].classList.add('active');
}

// Initialize
loadSong(songs[songIndex]);
highlightPlaying();
