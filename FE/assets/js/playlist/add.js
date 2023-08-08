document.addEventListener('DOMContentLoaded', () => {
    if (id == null) {
        return;
    } else {
        showAddMusicToPlayList(id)
    }
});

async function showAddMusicToPlayList(id) {
    try {
        const res = await axios.get(`http://localhost:3000/songs/notId/${id}`);
        let data = res.data
        console.log(data);

        if (Array.isArray(data) && data.length > 0) {
            let str = `
                <tr>
                    <th>#</th>
                    <th>Tên bài hát</th>
                    <th>Album</th>
                    <th>Phát</th>   
                    <th>Thêm</th>
                </tr>
        `;

            data.forEach((item, i) => {
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
                    <td class="song">
                        <i class="bi playListPlay bi-play-circle-fill" id="${item.id}"></i>
                    </td>
                    <td class="song">
                        <button onclick="addSong(${item.id},${id})" type="button" class="btn btn-dark">+</button>
                    </td>
                </tr>
            `;

                // Lưu trữ itemId vào biến ngoài
                itemIdStorage.push(item.id);
            });

            document.getElementById('songAddPlayList').innerHTML = str;

        }
    } catch (error) {
        console.error(error);
    }
}

async function addPlayList() {
    let data = {
        id: document.getElementById('id').value,
        name: document.getElementById('name').value,
        imgUrl: document.getElementById('image').value,
        user: {
            id: document.getElementById('userId').value
        },
        description: document.getElementById('description').value,
    };
    console.log(data);

    try {
        const res = await axios.post(`http://localhost:3000/playlists`, data);
        $('#exampleModal').modal('hide');
        location.reload()
    } catch (error) {
        console.error(error);
    }
}

async function addSong(songId, playlistId) {
    let data = {
        song: {
            id: songId
        },
        playlist: {
            id: playlistId
        },
    };
    console.log(data);

    try {
        const res = await axios.post(`http://localhost:3000/playlistSongs`, data);
        console.log(res);
        location.reload()
    } catch (error) {
        console.error(error);
    }
}

