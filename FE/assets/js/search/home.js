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

const id = getCookieValue('userId');

document.addEventListener('DOMContentLoaded', () => {
    showAlbum();
    showUser(id);
    playLists(id);
});

async function playLists() {
    try {
        const res = await axios.get(`http://localhost:3000/playlists/?userId=${id}`);
        let data = res.data;
        let str = ''

        data.map(item => {
            str += `
            <li class="song-Item" onclick="formPlayLists(${item.id})">
            <img src="${item.imgUrl}">
            <h5>
                ${item.name}
                <div class="subtitle">${item.name}</div>
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
        const res = await axios.get(`http://localhost:3000/${id}`);
        let data = res.data;

        data.map(item => {
            str = `
            <img src="${item.imgUrl}">
            `;
        });

        document.getElementById('user').innerHTML = str;
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



