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

document.addEventListener('DOMContentLoaded', () => {
    showAlbum();
    showUser(idCookie);
    playLists(idCookie);
});

async function sortPlaylistByDesc() {
    try {
        const res = await axios.get(`http://localhost:3000/playlists/?userId=${idCookie}&desc`);
        let data = res.data;
        let str = ''

        data.map(item => {
            str += `
            <li class="song-Item" onclick="formPlayLists(${item.id})">
            <img src="${item.imgUrl}">
            <h5>
                ${item.name}
                <div class="subtitle">${item.description}</div>
            </h5>
        </li>
            `;
        });

        document.getElementById('playList').innerHTML = str;
    } catch (error) {
        console.error(error);
    }
}

async function sortPlaylistByAsc() {
    try {
        const res = await axios.get(`http://localhost:3000/playlists/?userId=${idCookie}&asc`);
        let data = res.data;
        let str = ''

        data.map(item => {
            str += `
            <li class="song-Item" onclick="formPlayLists(${item.id})">
            <img src="${item.imgUrl}">
            <h5>
                ${item.name}
                <div class="subtitle">${item.description}</div>
            </h5>
        </li>
            `;
        });

        document.getElementById('playList').innerHTML = str;
    } catch (error) {
        console.error(error);
    }
}

async function playLists() {
    try {
        const res = await axios.get(`http://localhost:3000/playlists/?userId=${idCookie}`);
        let data = res.data;
        let str = ''

        data.map(item => {
            str += `
            <li class="song-Item" onclick="formPlayLists(${item.id})">
            <img src="${item.imgUrl}">
            <h5>
                ${item.name}
                <div class="subtitle">${item.description}</div>
            </h5>
        </li>
            `;
        });

        document.getElementById('playList').innerHTML = str;
    } catch (error) {
        console.error(error);
    }
}

async function showAlbum() {
    try {
        const res = await axios.get(`http://localhost:3000/albums`);
        let data = res.data;
        let str = ''

        data.map(item => {
            str += `
            <li class="songAlbum">
                <div class="img_play">
                    <img src="${item.imgUrl}" alt="">
                    <i class="bi bi-play-circle-fill" onclick="formAlbums(${item.id})"></i>
                </div>
                <h5>${item.name} <br>
                    <div class="subtitle">${item.singer}</div>
                </h5>
            </li>
            `;
        });

        document.getElementById('albums').innerHTML = str;
    } catch (error) {
        console.error(error);
    }
}

async function showUser(id) {
    try {
        const res = await axios.get(`http://localhost:3000/?id=${id}`);
        let data = res.data;

        data.map(item => {
            str = `
            <img src="${item.imgUrl}" class="profileUser" >
            <ol class="profile-menu" style="display: none">
              <li>Thông tin</li>
              <li data-toggle="modal" data-target="#myModal">Đăng xuất</li>
            </ol>
            `;
        });

        document.getElementById('user').innerHTML = str;

        $('.profileUser').on('click', function () {
            $(this).next('.profile-menu').toggle();
        });
        
    } catch (error) {
        console.error(error);
    }
}


function formPlayLists(id) {
    window.location.href = `playlist.html?id=${id}`;
}

function formAlbums(id) {
    window.location.href = `album.html?id=${id}`;
}

document.getElementById("search-input").addEventListener("keyup", function (event) {
    if (event.key === "Enter") {
        formSearch();
    }
});

function formSearch() {
    let songName = document.getElementById("search-input").value
    console.log(songName);
    window.location.href = `home.html?songName=${songName}`;
}


function goHomePage() {
    window.location.href = "home.html";
}

