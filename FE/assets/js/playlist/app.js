// Check URL
function getParameterByName(name) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(name);
}

const id = getParameterByName('id');
console.log("id param", id);

// Check Cookies
function getCookieValue(cookieName) {
    const cookies = document.cookie.split(';');

    for (let i = 0; i < cookies.length; i++) {
        const cookie = cookies[i].trim();

        if (cookie.startsWith(`${cookieName}=`)) {
            return cookie.substring(cookieName.length + 1, cookie.length);
        }
    }

    return null;
}

const idCookie = getCookieValue('userId');
console.log("id Cookie", idCookie);

document.addEventListener('DOMContentLoaded', () => {
    if (id == null) {
        listAllMusic(idCookie);
    } else {
        listMusic(id);
    }
});

let itemIdStorage = []; // Biến ngoài để lưu trữ itemId

async function listMusic(id) {
    try {
        const res = await axios.get(`http://localhost:3000/playlistSongs/id/?idPlaylist=${id}`);
        let data = res.data;

        if (Array.isArray(data) && data.length > 0) {
            // console.log(data[0].song);
            let str = `
                <tr>
                    <th>#</th>
                    <th>Tên bài hát</th>
                    <th>Album</th>
                    <th>Ngày thêm</th>
                    <th>
                        Phát
                    </th>
                    <th>Xóa</th>
                </tr>
            `;

            data.forEach((item, i) => {
                str += `
                    <tr class="songItem">
                        <td>${i + 1}</td>
                        <td class="song-title">
                            <div class="song-image">
                                <img src="${item.song.imageUrl}">
                            </div>
                            <h5 class="song-name-album">
                                <div class="song-name">${item.song.name}</div>
                                <div class="subtitle">${item.song.singer}</div>
                            </h5>
                        </td>
                        <td class="song-album">${item.song.album.name}</td>
                        <td class="song-date-added">07/08/2023</td>
                        <td class="song">
                            <i class="bi playListPlay bi-play-circle-fill" id="${item.song.id}" onclick="listenMusic(${item.song.id})"></i>
                        </td>
                        <td class="song">
                            <button onclick="removeSong(${item.id})" type="button" class="btn btn-dark">-</button>
                        </td>
                    </tr>
                `;

                // Lưu trữ itemId vào biến ngoài
                itemIdStorage.push(item.id);
            });

            document.getElementById('songItem').innerHTML = str;
        }
    } catch (error) {
        console.error(error);
    }
}

async function removeSong(songId) {
    try {
        const res = await axios.delete(`http://localhost:3000/playlistSongs/${songId}`);
        console.log(res);
        location.reload()
    } catch (error) {
        console.error(error);
    }
}

async function listAllMusic(idCookie) {
    try {
        const res = await axios.get(`http://localhost:3000/playlistSongs/id/?userId=${idCookie}`);
        let data = res.data;

        if (Array.isArray(data) && data.length > 0) {
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

            data.forEach((item, i) => {
                str += `
                    <tr class="songItem">
                        <td>${i + 1}</td>
                        <td class="song-title">
                            <div class="song-image">
                                <img src="${item.song.imageUrl}">
                            </div>
                            <h5 class="song-name-album">
                                <div class="song-name">${item.song.name}</div>
                                <div class="subtitle">${item.song.singer}</div>
                            </h5>
                        </td>
                        <td class="song-album">${item.song.album.name}</td>
                        <td class="song-date-added">07/08/2023</td>
                        <td class="song">
                            <i class="bi playListPlay bi-play-circle-fill" id="${item.song.id}" onclick="listenMusic(${item.song.id})"></i>
                        </td>
                    </tr>
                `;

                // Lưu trữ itemId vào biến ngoài
                itemIdStorage.push(item.id);
            });

            document.getElementById('songItem').innerHTML = str;
        }
    } catch (error) {
        console.error(error);
    }
}

let masterPlay = document.getElementById('masterPlay');
let masterPlayImg = document.getElementById('btn-image');
let wave = document.getElementsByClassName('wave')[0];

let isMusicPlaying = false; // Biến để theo dõi trạng thái của âm nhạc

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
//                 masterPlayImg.src = '../assets/images/Pause.svg';
//                 makeAllContinue();
//             } else {
//                 music.pause();
//                 masterPlay.classList.add('bi-play-fill');
//                 masterPlay.classList.remove('bi-pause-fill');
//                 wave.classList.remove('active2');
//                 masterPlayImg.src = '../assets/images/play.png';
//                 makeAllStops();
//             }
//         })
//         const res = await axios.get(`http://localhost:3000/songs/${id}`);
//         let newData = res.data[0];
//         let songUrl = newData.songUrl;
//         const music = new Audio(songUrl);
//         music.play();
//         // Lắng nghe sự kiện kết thúc của âm nhạc
//         music.addEventListener('ended', () => {
//             isMusicPlaying = false;
//         });


//         isMusicPlaying = true; // Đánh dấu rằng âm nhạc đang chạy

//         var element = document.getElementById(id);
//         element.classList.remove('bi-play-circle-fill');
//         element.classList.add('bi-pause-circle-fill');

//         masterPlay.classList.remove('bi-play-fill');
//         masterPlay.classList.add('bi-pause-fill');
//         wave.classList.add('active2');
//         makeAllBackgrounds();

//         let imageUrl = newData.imageUrl
//         poster_master_play.src = `${imageUrl}`;

//         title.innerHTML = `${newData.name} <br>
//         <div class="subtitle">${newData.singer}</div>`

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
        masterPlayImg.src = '../assets/images/Pause.svg';
        makeAllContinue();
    } else {
        music.pause();
        masterPlay.classList.add('bi-play-fill');
        masterPlay.classList.remove('bi-pause-fill');
        wave.classList.remove('active2');
        masterPlayImg.src = '../assets/images/play.png';
        makeAllStops();
    }
})

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

let index = 0;
let poster_master_play = document.getElementById('poster_master_play');
let title = document.getElementById('title');

// Array.from(document.getElementsByClassName('playListPlay')).forEach((element) => {
//     element.addEventListener('click', async (e) => {
//         index = e.target.id;
//         makeAllPlays();
//         e.target.classList.remove('bi-play-circle-fill');
//         e.target.classList.add('bi-pause-circle-fill');

//         const res = await axios.get(`http://localhost:3000/songs/?id=${index}`);
//         let data = res.data[0];
//         console.log(data);
//         let songData = data.songUrl;
//         let imgData = data.imageUrl
//         music.src = `../assets/music/${index}.mp3`;
//         poster_master_play.src = `../assets/images/${index}.jpg`;
//         music.play();

//         let song_title = songs.filter((ele) => {
//             return ele.id == index;
//         })

//         song_title.forEach(ele => {
//             let { songName } = ele;
//             title.innerHTML = songName;
//         })

//         masterPlay.classList.remove('bi-play-fill');
//         masterPlay.classList.add('bi-pause-fill');
//         wave.classList.add('active2');

//         makeAllBackgrounds();
//         Array.from(document.getElementsByClassName('songItem'))[`${index - 1}`].style.background = "rgb(105, 105, 170, .1)";
//     })
// })

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
let currentIndex = 0; // Khởi tạo biến lưu chỉ mục hiện tại
let songItemIndex = 0; // Khởi tạo biến lưu chỉ mục của songItem

next.addEventListener('click', async () => {
    if (currentIndex < itemIdStorage.length) {
        const id = itemIdStorage[currentIndex];
        // console.log(id);

        const res = await axios.get(`http://localhost:3000/songs/id/?id=${id}`);
        let data = res.data[0];
        let songData = data.songUrl;
        let imgData = data.imageUrl;

        music.src = songData;
        poster_master_play.src = imgData;
        music.play();

        let imageUrl = data.imageUrl;
        poster_master_play.src = imageUrl;

        title.innerHTML = `${data.name} <br>
        <div class="subtitle">${data.singer}</div>`;

        makeAllPlays();
        let biIndex = document.getElementById(`${id}`);
        if (biIndex) {
            let biIndex1 = document.getElementById(`${index - 1}`);
            biIndex.classList.remove('bi-play-circle-fill');
            biIndex.classList.add('bi-pause-fill');
            wave.classList.add('active2');

            if (biIndex1) {
                biIndex1.classList.add('bi-play-circle-fill');
                biIndex1.classList.remove('bi-pause-fill');
            }
            masterPlayImg.src = '../assets/images/Pause.svg';
            makeAllBackgrounds();
            const songItems = Array.from(document.getElementsByClassName('songItem'));
            if (songItems[songItemIndex]) {
                songItems[songItemIndex].style.background = "rgb(105, 105, 170, .1)";
                songItemIndex++;
            }
        }

        masterPlay.classList.remove('bi-play-fill');
        masterPlay.classList.add('bi-pause-fill');
        currentIndex++; // Tăng chỉ mục sau khi đã sử dụng id hiện tại
    }
});


back.addEventListener('click', async () => {
    if (currentIndex <= itemIdStorage.length) {
        const id = itemIdStorage[currentIndex-2];
        // console.log(id);

        const res = await axios.get(`http://localhost:3000/songs/id/?id=${id}`);
        let data = res.data[0];
        let songData = data.songUrl;
        let imgData = data.imageUrl;

        music.src = songData;
        poster_master_play.src = imgData;
        music.play();

        let imageUrl = data.imageUrl;
        poster_master_play.src = imageUrl;

        title.innerHTML = `${data.name} <br>
        <div class="subtitle">${data.singer}</div>`;

        makeAllPlays();
        let biIndex = document.getElementById(`${id}`);
        if (biIndex) {
            let biIndex1 = document.getElementById(`${index + 1}`);
            biIndex.classList.remove('bi-play-circle-fill');
            biIndex.classList.add('bi-pause-fill');

            if (biIndex1) {
                biIndex1.classList.add('bi-play-circle-fill');
                biIndex1.classList.remove('bi-pause-fill');
            }
            masterPlayImg.src = '../assets/images/Pause.svg';
            makeAllBackgrounds();
            const songItems = Array.from(document.getElementsByClassName('songItem'));
            console.log(songItems[songItemIndex-2]);
            if (songItems[songItemIndex-2]) {
                songItems[songItemIndex-2].style.background = "rgb(105, 105, 170, .1)";
                songItemIndex--;
            }
        }

        masterPlay.classList.remove('bi-play-fill');
        masterPlay.classList.add('bi-pause-fill');
        currentIndex--;
    }
});

$('#myModal').on('shown.bs.modal', function () {
    $('#myInput').trigger('focus')
})

