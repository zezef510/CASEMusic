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

document.addEventListener('DOMContentLoaded', () => {
    showAlbumCover(id);
    showAlbumInfo(id);
    showAlbumUser(idCookie);
});

async function showAlbumCover(id) {
    try {
        const res = await axios.get(`http://localhost:3000/albums/?id=${id}`);
        let data = res.data;
        let str = ''


        str = `
            <img src="${data.imgUrl}">
            `;


        document.getElementById('playlist-cover').innerHTML = str;
    } catch (error) {
        console.error(error);
    }
}

async function showAlbumInfo(id) {
    try {
        const res = await axios.get(`http://localhost:3000/albums/?id=${id}`);
        let data = res.data;
        let str = ''

            str = `
            <div class="playlist-public">Album</div>
            <div class="playlist-title">${data.name}</div>
            <div style="height: 10px;"></div>
            <div class="playlist-stats">
                <img src="../assets/images/spotify-logo.png" width="24px" height="24px" alt="">
            </div>
            `;

        document.getElementById('playlist-info').innerHTML = str;
    } catch (error) {
        console.error(error);
    }
}

async function showAlbumUser(idCookie) {
    try {
        const res = await axios.get(`http://localhost:3000/?id=${idCookie}`);
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

