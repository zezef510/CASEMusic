// Check URL
function getParameterByName(name) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(name);
}

const songName = getParameterByName('songName');

document.addEventListener('DOMContentLoaded', () => {
    listMusicSearch(songName);
});

async function listMusicSearch(songName) {
    try {
        const res = await axios.get(`http://localhost:3000/songs/?songName=${songName}`);
        let data = res.data;
        let str = `
            <tr>
                <th>#</th>
                <th>Title</th>
                <th>Album</th>
                <th>Date Added</th>
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
                    <td class="song-date-added">May 31, 2022</td>
                    <td class="song">
                        <i class="bi playListPlay bi-play-circle-fill" id="${item.id}"></i>
                    </td>
                </tr>
            `;
        });

        document.getElementById('songItem').innerHTML = str;
    } catch (error) {
        console.error(error);
    }
}

// onclick="listenMusic(${item.id})"
// Music
const makeAllContinue = () => {
    const playListPlays = Array.from(document.getElementsByClassName('playListPlay'));
    if (playListPlays[index - 1]) {
        playListPlays[index - 1].classList.remove('bi-play-circle-fill');
        playListPlays[index - 1].classList.add('bi-pause-circle-fill');
    }
};

const makePlays = () => {
    Array.from(document.getElementsByClassName('playListPlay')).forEach((element) => {
        element.classList.remove('bi-play-circle-fill');
        element.classList.add('bi-pause-circle-fill');
    })
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

// let isMusicPlaying = false; // Biến để theo dõi trạng thái của âm nhạc

// async function listenMusic(id) {
//     try {
//         if (isMusicPlaying) {
//             return; // Nếu âm nhạc đang chạy, không cho phép chạy bài hát mới
//         }

//         masterPlay.addEventListener('click', () => {
//             if (music.paused || music.currentTime <= 0) {
//                 music.play();
//                 masterPlay.classList.remove('bi-play-fill');
//                 masterPlay.classList.add('bi-pause-fill');
//                 wave.classList.add('active2');
//             } else {
//                 music.pause();
//                 masterPlay.classList.add('bi-play-fill');
//                 masterPlay.classList.remove('bi-pause-fill');
//                 wave.classList.remove('active2');
//                 makeAllStops();
//             }
//         })
//         const res = await axios.get(`http://localhost:3000/songs/?id=${id}`);

//         let data = res.data[0];

//         let songData = data.songUrl;
//         let imgData = data.imageUrl

//         let title = document.getElementById('title');
//         let poster_master_play = document.getElementById('poster_master_play');

//         poster_master_play.src = `${imgData}`;
//         title.innerHTML = `${data.name} <br>
//         <div class="subtitle">${data.singer}</div>`
//         const music = new Audio(songData);

//         music.play();



//         // Lắng nghe sự kiện kết thúc của âm nhạc
//         music.addEventListener('ended', () => {
//             isMusicPlaying = false;
//         });


//         isMusicPlaying = true; // Đánh dấu rằng âm nhạc đang chạy


//         // Time Music
//         music.addEventListener('timeupdate', () => {
//             let music_curr = music.currentTime;
//             let music_dur = music.duration;

//             let min = Math.floor(music_dur / 60);
//             let sec = Math.floor(music_dur % 60);
//             if (sec < 10) {
//                 sec = `0${sec}`
//             }

//             currentEnd.innerText = `${min}:${sec}`;

//             let min1 = Math.floor(music_curr / 60);
//             let sec1 = Math.floor(music_curr % 60);
//             if (sec1 < 10) {
//                 sec1 = `0${sec1}`
//             }

//             currentStart.innerText = `${min1}:${sec1}`;

//             let progressbar = parseInt((music.currentTime / music.duration) * 100);
//             seek.value = progressbar;
//             let seekbar = seek.value;
//             bar2.style.width = `${seekbar}%`;
//             dot.style.left = `${seekbar}%`;
//         })

//         var element = document.getElementById(id);
//         element.classList.remove('bi-play-circle-fill');
//         element.classList.add('bi-pause-circle-fill');

//         masterPlay.classList.remove('bi-play-fill');
//         masterPlay.classList.add('bi-pause-fill');
//         wave.classList.add('active2');
//         makeAllBackgrounds();

//     } catch (error) {
//         console.error(error);
//     }
// }

const music = new Audio('../assets/music/3.mp3')

masterPlay.addEventListener('click', () => {
    if (music.paused || music.currentTime <= 0) {
        music.play();
        masterPlay.classList.remove('bi-play-fill');
        masterPlay.classList.add('bi-pause-fill');
        wave.classList.add('active2');
        vol_bar.style.width = `100%`;
        vol_dot.style.left = `100%`;
        makeAllContinue();
    } else {
        music.pause();
        masterPlay.classList.add('bi-play-fill');
        masterPlay.classList.remove('bi-pause-fill');
        wave.classList.remove('active2');
        makeAllStops();
    }
})

let currentStart = document.getElementById('currentStart');
let currentEnd = document.getElementById('currentEnd');
let seek = document.getElementById('seek');
let bar2 = document.getElementById('bar2');
let dot = document.getElementsByClassName('dot')[0];

music.addEventListener('timeupdate', () => {
    let music_curr = music.currentTime;
    let music_dur = music.duration;

    let min = Math.floor(music_dur / 60);
    let sec = Math.floor(music_dur % 60);
    if (sec < 10) {
        sec = `0${sec}`
    }

    currentEnd.innerText = `${min}:${sec}`;

    let min1 = Math.floor(music_curr / 60);
    let sec1 = Math.floor(music_curr % 60);
    if (sec1 < 10) {
        sec1 = `0${sec1}`
    }

    currentStart.innerText = `${min1}:${sec1}`;

    let progressbar = parseInt((music.currentTime / music.duration) * 100);
    seek.value = progressbar;
    let seekbar = seek.value;
    bar2.style.width = `${seekbar}%`;
    dot.style.left = `${seekbar}%`;
})

seek.addEventListener('change', () => {
    music.currentTime = seek.value * music.duration / 100;
})

let index = 0;
let poster_master_play = document.getElementById('poster_master_play');
let title = document.getElementById('title');


Array.from(document.getElementsByClassName('playListPlay')).forEach((element) => {
    element.addEventListener('click', async (e) => {
        index = e.target.id;
        makeAllPlays();
        e.target.classList.remove('bi-play-circle-fill');
        e.target.classList.add('bi-pause-circle-fill');

        const res = await axios.get(`http://localhost:3000/songs/?id=${index}`);
        let data = res.data[0];
        console.log(data);
        let songData = data.songUrl;
        let imgData = data.imageUrl

        music.src = `${songData}`;
        poster_master_play.src = `${imgData}`;
        music.play();

        let song_title = songs.filter((ele) => {
            return ele.id == index;
        })

        song_title.forEach(ele => {
            let { songName } = ele;
            title.innerHTML = songName;
        })

        masterPlay.classList.remove('bi-play-fill');
        masterPlay.classList.add('bi-pause-fill');
        wave.classList.add('active2');

        makeAllBackgrounds();
        Array.from(document.getElementsByClassName('songItem'))[`${index - 1}`].style.background = "rgb(105, 105, 170, .1)";
    })
})

// Auto change music 

music.addEventListener('ended', () => {
    masterPlay.classList.add('bi-play-fill');
    wave.classList.add('active2');
    index++;
    music.src = `../assets/music/${index}.mp3`;
    poster_master_play.src = `../assets/images/${index}.jpg`;
    music.play();
    let song_title = songs.filter((ele) => {
        return ele.id == index;
    })

    song_title.forEach(ele => {
        let { songName } = ele;
        title.innerHTML = songName
    })

    makeAllBackgrounds();

    Array.from(document.getElementsByClassName('songItem'))[`${index - 1}`].style.background = "rgb(105, 105, 170, .1)";
    makeAllPlays();

    document.getElementsByClassName('playListPlay')[index - 1].classList.remove('bi-play-circle-fill');
    document.getElementsByClassName('playListPlay')[index - 1].classList.add('bi-pause-circle-fill');

    masterPlay.classList.remove('bi-play-fill');
    masterPlay.classList.add('bi-pause-fill');

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
    music.volume = vol_a / 100;
})

let back = document.getElementById('back');
let next = document.getElementById('next');

back.addEventListener('click', async () => {
    index -= 1;
    if (index < 1) {
        index = Array.from(document.getElementsByClassName('songItem')).length;
    }

    const res = await axios.get(`http://localhost:3000/songs/?id=${index}`);
    let data = res.data[0];
    let songData = data.songUrl;
    let imgData = data.imageUrl

    music.src = `${songData}`;
    poster_master_play.src = `${imgData}`;
    music.play();

    let imageUrl = data.imageUrl
    poster_master_play.src = `${imageUrl}`;

    title.innerHTML = `${data.name} <br>
    <div class="subtitle">${data.singer}</div>`

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

    masterPlay.classList.remove('bi-play-fill');
    masterPlay.classList.add('bi-pause-fill');
    wave.classList.add('active2');
})

next.addEventListener('click', async () => {
    index -= 0;
    index += 1;
    if (index > Array.from(document.getElementsByClassName('songItem')).length) {
        index = 1;
    }

    const res = await axios.get(`http://localhost:3000/songs/?id=${index}`);
    let data = res.data[0];
    let songData = data.songUrl;
    let imgData = data.imageUrl

    music.src = `${songData}`;
    poster_master_play.src = `${imgData}`;
    music.play();

    let imageUrl = data.imageUrl
    poster_master_play.src = `${imageUrl}`;

    title.innerHTML = `${data.name} <br>
    <div class="subtitle">${data.singer}</div>`
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

    masterPlay.classList.remove('bi-play-fill');
    masterPlay.classList.add('bi-pause-fill');
    wave.classList.add('active2');

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

