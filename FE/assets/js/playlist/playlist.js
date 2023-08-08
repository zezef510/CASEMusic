document.addEventListener('DOMContentLoaded', () => {
    if (id !== null) {
        showPlayListCover(id);
        showPlayListInfo(id);
        showPlayUser(idCookie);
    } else {
        showPlayListCoverByCookie(idCookie);
        showPlayUser(idCookie);
    }
});

console.log("param", id);
console.log("playList", idCookie);

async function showPlayListCoverByCookie(idCookie) {
    try {
        const res = await axios.get(`http://localhost:3000/?id=${idCookie}`);
        let data = res.data;

        data.map(item => {
            str1 = `
            <img src="${item.imgUrl}">
            `;
        });

        data.map(item => {
            str2 = `
            <div class="playlist-public">Nhạc của :</div>
            <div class="playlist-title">${item.username}</div>
            <div style="height: 10px;"></div>
            <div class="playlist-stats">
                <img src="../assets/images/spotify-logo.png" width="24px" height="24px" alt="">
            </div>
            `;
        });

        document.getElementById('playlist-cover').innerHTML = str1;
        document.getElementById('playlist-info').innerHTML = str2;

    } catch (error) {
        console.error(error);
    }
}

async function showPlayListCover(id) {
    try {
        const res = await axios.get(`http://localhost:3000/playlists/?id=${id}`);
        let data = res.data;

        let str1 = ''
        str1 = `
            <img src="${data.imgUrl}">
            `;

        let str2 = `<i onclick="clickRemove('${data.name}')" class="bi bi-trash3"></i>`
            
        document.getElementById('playlist-cover').innerHTML = str1;
        document.getElementById('removePlaylist').innerHTML = str2;
    } catch (error) {
        console.error(error);
    }
}

async function showPlayListInfo(id) {
    try {
        const res = await axios.get(`http://localhost:3000/playlists/?id=${id}`);
        let data = res.data;
        let str = ''

        str = `
            <div class="playlist-public">Danh sách phát</div>
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

async function showPlayUser(idCookie) {
    try {
        const res = await axios.get(`http://localhost:3000/?id=${idCookie}`);
        let data = res.data[0];
        str = `
            <img src="${data.imgUrl}">
            `;

        document.getElementById('user').innerHTML = str;
    } catch (error) {
        console.error(error);
    }
}

function clickRemove(name){
    $('#remove-playlist').html(name);
    $('#playlist-confirm-remove').html(name);
    $('#modalDelete').modal('show');
}

function removePlaylistByName(){
    let name = $('#playlist-confirm-remove').html();
    $('#modalDelete').modal('hide');
    // alert(`Xóa Playlist ${name} thành công!`)
    removePlaylist(id);
}

async function removePlaylist(id) {
    try {
        const res = await axios.delete(`http://localhost:3000/playlists/${id}`);
        console.log(res);
        window.location.href = './home.html';
    } catch (error) {
        console.error(error);
    }
} 


