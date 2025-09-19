const audio = document.getElementById('audio');
const playBtn = document.getElementById('play');
const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');
const title = document.getElementById('title');
const progress = document.getElementById('progress');
const volume = document.getElementById('volume');

// Songs array
const songs = [
    {name: "Yedhedho Penne", file: "songs/yedhedho_penne.mp3"},
    {name: "Usuraya Tholachan", file: "songs/usuraya_tholachan.mp3"},
    {name: "Para Para (Male Version)", file: "songs/para_para_male.mp3"}
];

let currentSong = 0;

// Load a song
function loadSong(index) {
    audio.src = songs[index].file;
    title.textContent = songs[index].name;
    audio.load();
}

// Play / Pause
playBtn.addEventListener('click', () => {
    if(audio.paused){
        audio.play();
        playBtn.textContent = "❚❚";
    } else {
        audio.pause();
        playBtn.textContent = "►";
    }
});

// Next song
nextBtn.addEventListener('click', () => {
    currentSong = (currentSong + 1) % songs.length;
    loadSong(currentSong);
    audio.play();
    playBtn.textContent = "❚❚";
});

// Previous song
prevBtn.addEventListener('click', () => {
    currentSong = (currentSong - 1 + songs.length) % songs.length;
    loadSong(currentSong);
    audio.play();
    playBtn.textContent = "❚❚";
});

// Set progress max after audio metadata is loaded
audio.addEventListener('loadedmetadata', () => {
    progress.max = audio.duration;
});

// Update progress value safely
audio.addEventListener('timeupdate', () => {
    if (!isNaN(audio.duration)) {
        progress.value = audio.currentTime;
    }
});

// Seek in song
progress.addEventListener('input', () => {
    audio.currentTime = progress.value;
});

// Volume control
volume.addEventListener('input', () => {
    audio.volume = volume.value;
});

// Initialize first song
loadSong(currentSong);
