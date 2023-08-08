// Check URL
function getParameterByName(name) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(name);
}

const songName = getParameterByName('songName');

let current_audio = new Audio('../assets/music/3.mp3');
let itemIdStorage = [];

if (songName == null) {
    document.addEventListener('DOMContentLoaded', () => {
        listMusic();
    });
} else {
    document.addEventListener('DOMContentLoaded', () => {
        listMusicSearch(songName);
    });
    async function listMusicSearch(songName) {
        try {
            const res = await axios.get(`http://localhost:3000/songs/name/?song=${songName}`);
            let data = res.data;
            if (data.length == 0) {
                let str = `
                <tr>
                    <th>#</th>
                    <th>Title</th>
                    <th>Album</th>
                    <th>Date Added</th>
                    <th>Duration</th>
                </tr>

                <tr>
                    <td colspan="5" style="text-align: center; font-size: 20px; color: #f04141; font-weight: 600">Không có bài hát nào có tên ${songName}</td>
                </tr>`;

                document.getElementById('songItem').innerHTML = str;
            } else {
                let str = `
                <tr>
                    <th>#</th>
                    <th>Tên bài hát</th>
                    <th>Album</th>
                    <th>Ngày thêm</th>
                    <th>
                    <!-- <img src="../assets/images/Duration.svg" alt=""> -->
                    </th>
                </tr>
                `;

                data.map((item , i)=> {
                    str += `
                <tr class="songItem">
                    <td>${i + 1}</td>
                    <td class="song-title">
                        <div class="song-image">
                            <img src="${item.imageUrl}">
                        </div>
                        <div class="song-name-album">
                            <h5 class="song-name">${item.name}</h5>
                            <div class="subtitle">${item.singer}</div>
                        </div>
                    </td>
                    <td class="song-album">${item.album.name}</td>
                    <td class="song-date-added">08/07/2023</td>
                    <td class="song">
                        <i onclick="listenMusic(${item.id})" class="bi playListPlay bi-play-circle-fill" id="${item.id}"></i>
                    </td>
                </tr>
                
                `;
                });

                document.getElementById('songItem').innerHTML = str;
            }
        } catch (error) {
            console.error(error);
        }
    }
}

async function listMusic() {
    try {
        const res = await axios.get('http://localhost:3000/songs/id');
        let data = res.data;
        let str = `
            <tr>
                <th>#</th>
                <th>Tên bài hát</th>
                <th>Album</th>
                <th>Ngày thêm</th>
                <th>
                    <!-- <img src="../assets/images/Duration.svg" alt=""> -->
                </th>
            </tr>
        `;

        data.map(item => {
            str += `
                <tr class="songItem">
                    <td>${item.id}</td>
                    <td class="song-title">
                        <div class="song-image">
                            <img src="${item.imageUrl}">
                        </div>
                        <h5 class="song-name-album">
                            <div class="song-name">${item.name}</div>
                            <div class="subtitle">${item.singer}</div>
                        </h5>
                    </td>
                    <td class="song-album">${item.album.name}</td>
                    <td class="song-date-added">08/07/2023</td>
                    <td class="song">
                        <i onclick="listenMusic(${item.id})" class="bi playListPlay bi-play-circle-fill" id="${item.id}"></i>
                    </td>
                </tr>
            `;
        });

        document.getElementById('songItem').innerHTML = str;

    } catch (error) {
        console.error(error);
    }
}

// Music
const makeAllContinue = () => {
    const playListPlays = Array.from(document.getElementsByClassName('playListPlay'));
    if (playListPlays[index - 1]) {
        playListPlays[index - 1].classList.remove('bi-play-circle-fill');
        playListPlays[index - 1].classList.add('bi-pause-circle-fill');
    }
};

const makeAllStops = () => {
    Array.from(document.getElementsByClassName('playListPlay')).forEach((element) => {
        element.classList.remove('bi-pause-circle-fill');
        element.classList.add('bi-play-circle-fill');
    })
}

const makeAllPlays = () => {
    Array.from(document.getElementsByClassName('playListPlay')).forEach((element) => {
        element.classList.add('bi-play-circle-fill');
        element.classList.remove('bi-pause-circle-fill');
    })
}

const makeAllBackgrounds = () => {
    Array.from(document.getElementsByClassName('songItem')).forEach((element) => {
        element.style.background = "rgb(105, 105, 170, 0)";
    })
}


let masterPlay = document.getElementById('masterPlay');
let masterPlayImg = document.getElementById('btn-image');
let wave = document.getElementsByClassName('wave')[0];

let isMusicPlaying = false; // Biến để theo dõi trạng thái của âm nhạc

function setPlayButtonStatus(bStop) {
    if (!bStop) {
        masterPlay.classList.add('bi-play-fill');
        masterPlay.classList.remove('bi-pause-fill');
        wave.classList.remove('active2');
    } else {
        masterPlay.classList.remove('bi-play-fill');
        masterPlay.classList.add('bi-pause-fill');
        wave.classList.add('active2');
        vol_bar.style.width = `100%`;
        vol_dot.style.left = `100%`;
    }
}

function setSongButtonStatus(element) {
    element.classList.remove('bi-play-circle-fill');
    element.classList.add('bi-pause-fill');
}

function setBackGround(element) {
    element.style.background = "rgb(105, 105, 170, .1)";
}

async function listenMusic(id) {
    try {
        // pause audio
        current_audio.pause();
        makeAllStops();

        // load new audio data
        const res = await axios.get(`http://localhost:3000/songs/id/?id=${id}`);
        let data = res.data[0];
        // let songData = data.songUrl;
        let imgData = data.imageUrl

        let title = document.getElementById('title');
        let poster_master_play = document.getElementById('poster_master_play');

        poster_master_play.src = `${imgData}`;
        title.innerHTML = `${data.name} <br><div class="subtitle">${data.singer}</div>`;

        if (itemIdStorage.length === 0) {
            itemIdStorage.push(id);
        } else {
            itemIdStorage[0] = id;
        }

        //  try to play new song
        current_audio.src = data.songUrl;
        current_audio.load();
        current_audio.play();
        makeAllBackgrounds();

        setPlayButtonStatus(true);

        let songId = document.getElementById(`${id}`);
        setSongButtonStatus(songId);
        let songIdParent = songId.parentNode.parentElement;
        setBackGround(songIdParent);

        // add Id storage
        console.log('idStorage,', itemIdStorage[0]);

    } catch (error) {
        console.error(error);
    }

}

masterPlay.addEventListener('click', () => {
    if (isNaN(itemIdStorage[0])) {
        if (current_audio.paused || current_audio.currentTime <= 0) {
            current_audio.play();
            setPlayButtonStatus(true);
            makeAllContinue();
        } else {
            current_audio.pause();
            masterPlay.classList.add('bi-play-fill');
            masterPlay.classList.remove('bi-pause-fill');
            wave.classList.remove('active2');
            makeAllStops();
        }
    } else {
        if (current_audio.paused || current_audio.currentTime <= 0) {
            current_audio.play();
            setPlayButtonStatus(true);
            let songIndex = document.getElementById(`${itemIdStorage[0]}`)
            console.log(songIndex);
            setSongButtonStatus(songIndex);
        } else {
            current_audio.pause();
            masterPlay.classList.add('bi-play-fill');
            masterPlay.classList.remove('bi-pause-fill');
            wave.classList.remove('active2');
            makeAllStops();
        }
    }

})

let currentStart = document.getElementById('currentStart');
let currentEnd = document.getElementById('currentEnd');
let seek = document.getElementById('seek');
let bar2 = document.getElementById('bar2');
let dot = document.getElementsByClassName('dot')[0];

current_audio.addEventListener('timeupdate', () => {
    let music_curr = current_audio.currentTime;
    let music_dur = current_audio.duration;

    let min = Math.floor(music_dur / 60);
    let sec = Math.floor(music_dur % 60);
    if (sec < 10) {
        sec = `0${sec}`
    }

    currentEnd.innerText = `${min}:${sec}`;

    if (currentEnd.innerText == `NaN:NaN`) {
        currentEnd.innerText = `0:00`;
    }


    let min1 = Math.floor(music_curr / 60);
    let sec1 = Math.floor(music_curr % 60);
    if (sec1 < 10) {
        sec1 = `0${sec1}`
    }

    currentStart.innerText = `${min1}:${sec1}`;

    let progressbar = parseInt((current_audio.currentTime / current_audio.duration) * 100);
    seek.value = progressbar;
    let seekbar = seek.value;
    bar2.style.width = `${seekbar}%`;
    dot.style.left = `${seekbar}%`;
})

seek.addEventListener('change', () => {
    current_audio.currentTime = seek.value * current_audio.duration / 100;
})

let index = 0;
let poster_master_play = document.getElementById('poster_master_play');
let title = document.getElementById('title');

// Auto change music 
current_audio.addEventListener('ended', async () => {
    if ((itemIdStorage.length == 0)) {
        index -= 0;
        index += 1;
        if (index > Array.from(document.getElementsByClassName('songItem')).length) {
            index = 1;
        }
        const res = await axios.get(`http://localhost:3000/songs/id/?id=${index}`);
        masterPlay.classList.add('bi-play-fill');
        wave.classList.add('active2');
        let data = res.data[0];
        let songData = data.songUrl;
        let imgData = data.imageUrl
        current_audio.src = `${songData}`;
        poster_master_play.src = `${imgData}`;
        current_audio.play();
        let imageUrl = data.imageUrl
        poster_master_play.src = `${imageUrl}`;

        title.innerHTML = `${data.name} <br>
        <div class="subtitle">${data.singer}</div>`

        let biIndex = document.getElementById(`${index}`);
        if (biIndex) {
            let biIndex1 = document.getElementById(`${index - 1}`);
            biIndex.classList.remove('bi-play-circle-fill');
            biIndex.classList.add('bi-pause-fill');
            vol_bar.style.width = `100%`;
            vol_dot.style.left = `100%`;

            if (biIndex1) {
                biIndex1.classList.add('bi-play-circle-fill');
                biIndex1.classList.remove('bi-pause-fill');
            }

            makeAllBackgrounds();
            const songItem = Array.from(document.getElementsByClassName('songItem'))[`${index - 1}`];
            if (songItem) {
                songItem.style.background = "rgb(105, 105, 170, .1)";
            }
        }

        setPlayButtonStatus(true);

    } else {
        itemIdStorage[0]++;
        const res = await axios.get(`http://localhost:3000/songs/id/?id=${itemIdStorage[0]}`);
        console.log('getMusic', itemIdStorage);
        masterPlay.classList.add('bi-play-fill');
        wave.classList.add('active2');
        let data = res.data[0];
        let songData = data.songUrl;
        let imgData = data.imageUrl
        current_audio.src = `${songData}`;
        poster_master_play.src = `${imgData}`;
        current_audio.play();
        let imageUrl = data.imageUrl
        poster_master_play.src = `${imageUrl}`;

        title.innerHTML = `${data.name} <br><div class="subtitle">${data.singer}</div>`

        let biIndex = document.getElementById(`${itemIdStorage[0]}`);
        if (biIndex) {
            let biIndex1 = document.getElementById(`${itemIdStorage[0] - 1}`);
            biIndex.classList.remove('bi-play-circle-fill');
            biIndex.classList.add('bi-pause-fill');
            vol_bar.style.width = `100%`;
            vol_dot.style.left = `100%`;

            if (biIndex1) {
                biIndex1.classList.add('bi-play-circle-fill');
                biIndex1.classList.remove('bi-pause-fill');
            }

            makeAllBackgrounds();
            const songItem = Array.from(document.getElementsByClassName('songItem'))[`${itemIdStorage[0] - 1}`];
            if (songItem) {
                songItem.style.background = "rgb(105, 105, 170, .1)";
            }
        }

        setPlayButtonStatus(true);
    }
})

let vol_icon = document.getElementById('vol_icon');
let vol = document.getElementById('vol');
let vol_dot = document.getElementById('vol_dot');
let vol_bar = document.getElementsByClassName('vol_bar')[0];

vol.addEventListener('change', () => {
    if (vol.value == 0) {
        vol_icon.classList.remove('bi-volume-down-fill');
        vol_icon.classList.add('bi-volume-mute-fill');
        vol_icon.classList.remove('bi-volume-up-fill');
    }
    if (vol.value > 0) {
        vol_icon.classList.add('bi-volume-down-fill');
        vol_icon.classList.remove('bi-volume-mute-fill');
        vol_icon.classList.remove('bi-volume-up-fill');
    }
    if (vol.value > 50) {
        vol_icon.classList.remove('bi-volume-down-fill');
        vol_icon.classList.remove('bi-volume-mute-fill');
        vol_icon.classList.add('bi-volume-up-fill');
    }

    let vol_a = vol.value;
    vol_bar.style.width = `${vol_a}%`;
    vol_dot.style.left = `${vol_a}%`;
    current_audio.volume = vol_a / 100;
})

let back = document.getElementById('back');
let next = document.getElementById('next');

back.addEventListener('click', async () => {
    if (isNaN(itemIdStorage[0])) {
        index -= 1;
        if (index < 1) {
            index = Array.from(document.getElementsByClassName('songItem')).length;
        }

        const res = await axios.get(`http://localhost:3000/songs/id/?id=${index}`);
        let data = res.data[0];
        let songData = data.songUrl;
        let imgData = data.imageUrl

        current_audio.src = `${songData}`;
        poster_master_play.src = `${imgData}`;
        current_audio.play();

        let imageUrl = data.imageUrl
        poster_master_play.src = `${imageUrl}`;

        title.innerHTML = `${data.name} <br><div class="subtitle">${data.singer}</div>`

        makeAllPlays();

        let biIndex = document.getElementById(`${index}`)
        if (biIndex) {
            let biIndex1 = document.getElementById(`${index + 1}`)
            biIndex.classList.remove('bi-play-circle-fill');
            biIndex.classList.add('bi-pause-fill');
            vol_bar.style.width = `100%`;
            vol_dot.style.left = `100%`;

            if (biIndex1) {
                biIndex1.classList.add('bi-play-circle-fill');
                biIndex1.classList.remove('bi-pause-fill');
            }

            makeAllBackgrounds();
            const songItem = Array.from(document.getElementsByClassName('songItem'))[`${index - 1}`];
            if (songItem) {
                songItem.style.background = "rgb(105, 105, 170, .1)";
            }
        }
        setPlayButtonStatus(true);

    } else {
        itemIdStorage[0]--
        const res = await axios.get(`http://localhost:3000/songs/id/?id=${itemIdStorage[0]}`);
        let data = res.data[0];
        let songData = data.songUrl;
        let imgData = data.imageUrl

        current_audio.src = `${songData}`;
        poster_master_play.src = `${imgData}`;
        current_audio.play();

        let imageUrl = data.imageUrl
        poster_master_play.src = `${imageUrl}`;

        title.innerHTML = `${data.name} <br><div class="subtitle">${data.singer}</div>`

        makeAllPlays();

        let biIndex = document.getElementById(`${itemIdStorage[0]}`)
        if (biIndex) {
            let biIndex1 = document.getElementById(`${itemIdStorage[0] + 1}`)
            biIndex.classList.remove('bi-play-circle-fill');
            biIndex.classList.add('bi-pause-fill');
            vol_bar.style.width = `100%`;
            vol_dot.style.left = `100%`;

            if (biIndex1) {
                biIndex1.classList.add('bi-play-circle-fill');
                biIndex1.classList.remove('bi-pause-fill');
            }

            makeAllBackgrounds();
            const songItem = Array.from(document.getElementsByClassName('songItem'))[`${itemIdStorage[0] - 1}`];
            if (songItem) {
                songItem.style.background = "rgb(105, 105, 170, .1)";
            }
        }
        setPlayButtonStatus(true);
    }

})

next.addEventListener('click', async () => {
    if (isNaN(itemIdStorage[0])) {
        index -= 0;
        index += 1;
        if (index > Array.from(document.getElementsByClassName('songItem')).length) {
            index = 1;
        }

        const res = await axios.get(`http://localhost:3000/songs/id/?id=${index}`);
        let data = res.data[0];
        let songData = data.songUrl;
        let imgData = data.imageUrl

        current_audio.src = `${songData}`;
        poster_master_play.src = `${imgData}`;
        current_audio.play();

        let imageUrl = data.imageUrl
        poster_master_play.src = `${imageUrl}`;

        title.innerHTML = `${data.name} <br><div class="subtitle">${data.singer}</div>`
        makeAllPlays();

        let biIndex = document.getElementById(`${index}`);
        if (biIndex) {
            let biIndex1 = document.getElementById(`${index - 1}`);
            biIndex.classList.remove('bi-play-circle-fill');
            biIndex.classList.add('bi-pause-fill');
            vol_bar.style.width = `100%`;
            vol_dot.style.left = `100%`;

            if (biIndex1) {
                biIndex1.classList.add('bi-play-circle-fill');
                biIndex1.classList.remove('bi-pause-fill');
            }

            makeAllBackgrounds();
            const songItem = Array.from(document.getElementsByClassName('songItem'))[`${index - 1}`];
            if (songItem) {
                songItem.style.background = "rgb(105, 105, 170, .1)";
            }
        }

        setPlayButtonStatus(true);

    } else {
        itemIdStorage[0]++
        const res = await axios.get(`http://localhost:3000/songs/id/?id=${itemIdStorage[0]}`);
        let data = res.data[0];
        let songData = data.songUrl;
        let imgData = data.imageUrl

        current_audio.src = `${songData}`;
        poster_master_play.src = `${imgData}`;
        current_audio.play();

        let imageUrl = data.imageUrl
        poster_master_play.src = `${imageUrl}`;

        title.innerHTML = `${data.name} <br> <div class="subtitle">${data.singer}</div>`
        makeAllPlays();

        let biIndex = document.getElementById(`${itemIdStorage[0]}`);
        if (biIndex) {
            let biIndex1 = document.getElementById(`${itemIdStorage[0] - 1}`);
            biIndex.classList.remove('bi-play-circle-fill');
            biIndex.classList.add('bi-pause-fill');
            vol_bar.style.width = `100%`;
            vol_dot.style.left = `100%`;

            if (biIndex1) {
                biIndex1.classList.add('bi-play-circle-fill');
                biIndex1.classList.remove('bi-pause-fill');
            }

            makeAllBackgrounds();
            const songItem = Array.from(document.getElementsByClassName('songItem'))[`${itemIdStorage[0] - 1}`];
            if (songItem) {
                songItem.style.background = "rgb(105, 105, 170, .1)";
            }
        }

        setPlayButtonStatus(true);

    }
})

let left_scroll = document.getElementById('left_scroll');
let right_scrool = document.getElementById('right_scroll');
let pop_song = document.getElementsByClassName('pop_song')[0];

left_scroll.addEventListener('click', () => {
    pop_song.scrollLeft -= 330;
})

right_scrool.addEventListener('click', () => {
    pop_song.scrollLeft += 330;
})

