async function showEditSong(id) {

    try {

        const res = await axios.get(`http://localhost:3000/songs/id?id=${id}`);
        let data = res.data[0];

        let tableBody = document.querySelector('.table__body');
        tableBody.style.width = "50%";

        let main = `
           <form>
            <table>
            <tr>
                    <th colspan="2" style="font-size: 20px">Sửa bài hát </th>
                </tr>
                <tr>
                    <th><input type="text" id="idSong" value="${data.id}" hidden></th>
                </tr>
                <tr>
                    <th style="width: 200px"><label for="name" style="font-size: 20px">Tên bài hát :</label></th>
                    <th><input type="text"  id="nameSong" value="${data.name}" required  class="input-text"></th>
                </tr>
                <tr>
                    <th><label for="singer" style="font-size: 20px">Ca sĩ :</label></th>
                    <th><input type="text" id="singerSong" value="${data.singer}"  class="input-text" required></th>
                </tr>
                <tr>
                    <th><label for="musician" style="font-size: 20px">Nhạc sĩ :</label></th>
                    <th><input type="text"  class="input-text" id="musicianSong" value="${data.musician}" required></th>
                </tr>
                <tr>
                    <th><label for="songUrl" style="font-size: 20px">Bài hát </label></th>
                    <th><input type="text" id="songUrlSong"  class="input-text" value="${data.songUrl}" required></th>
                </tr>
                <tr>
                    <th><label for="imageUrl" style="font-size: 20px">Ảnh :</label></th>
                    <th><input type="text" id="imageUrlSong" class="input-text" value="${data.imageUrl}" required></th>
                </tr>
                <tr>
                    <th><label for="albumId" style="font-size: 20px">Album :</label></th>
                    <th>
                        <select id="albumId" required>
                            
                        </select>
                    </th>
                </tr>
                <tr>
                    <th colspan="2"><button type="button" class="btn btn-primary btn-lg btn-block" onclick="editButtonSong()">Lưu</button></th>
                </tr>
            </form>
           
        `
        const album = await axios.get('http://localhost:3000/albums');
        let albumData = album.data;
        let optionAlbum = `<option value="${data.album.id}">${data.album.name}</option>`
        // let optionAlbum =""
        for (const item of albumData) {
            if (item.id !== data.album.id) {
                optionAlbum += `<option id="idAlbum" value="${item.id}">${item.name}</option>`;
            }
        }
        document.getElementById(`display`).innerHTML = main;
        document.getElementById(`albumId`).innerHTML = optionAlbum;


    }
    catch (error) {
        console.error(error);
    }


}

async function editButtonSong() {
    let id = document.getElementById('idSong').value
    let data = {
        name: document.getElementById('nameSong').value,
        singer: document.getElementById('singerSong').value,
        musician: document.getElementById('musicianSong').value,
        songUrl: document.getElementById('songUrlSong').value,
        imageUrl: document.getElementById('imageUrlSong').value,
        album: {
            id: document.getElementById('albumId').value,
        }
    };

    try {
        // const token = localStorage.getItem('token')
        // axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
         await axios.put(`http://localhost:3000/songs/${id}`, data);

        loadHome();
    } catch (error) {
        console.error(error);
    }
}
