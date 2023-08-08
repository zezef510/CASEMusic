function addSong() {
    let data = {
        id: document.getElementById("id").value,
        name: document.getElementById("name").value,
        singer: document.getElementById('singer').value,
        musician: document.getElementById('musician').value,
        songUrl: document.getElementById('songUrl').value,
        imageUrl: document.getElementById('imageUrl').value,

        album: {
            id: document.getElementById('albumId').value
        },

    }
    console.log(data)

    if (data.name === "" || data.singer === "" || data.musician === "" || data.songUrl === "" || data.imageUrl === "") {
        alert("Vui lòng nhập đủ trường")
    } else if (data.album.id === "") {
        alert("Vui lòng chọn Album")
    }
    else {
        axios.post('http://localhost:3000/songs', data).then(res => {
            loadHome()
        })
    }
}
async function showFromSave() {
    let tableBody = document.querySelector('.table__body');
    tableBody.style.width = "50%";

    const resSong = await axios.get('http://localhost:3000/songs/id');
    let data = resSong.data;
    console.log(data)
    let lastId = data[data.length - 1].id || 1
    console.log(lastId)
    let str = ``
    str = ` 
        <form>
            <table>
<!--            <h1 style="width: 200px">Tạo bài hát mới</h1>-->
                 <tr>
                    <th colspan="2" style="font-size: 20px">Tạo bài hát mới</th>
                </tr>
                <tr>
                    <th colspan="2"><input type="hidden" id="id" value="${lastId + 1}"></th>
                </tr>
                <tr>
                    <th style="width: 200px"><label for="name" style="font-size: 20px">Tên bài hát:</label></th>
                    <th>  <input type="text" class="input-text" id="name" required></th>
                </tr>
                <tr>
                    <th><label for="singer" style="font-size: 20px">Ca sĩ:</label></th>
                    <th><input type="text" class="input-text" id="singer" required></th>
                </tr>
                <tr>
                    <th><label for="musician" style="font-size: 20px">Nhạc sĩ:</label></th>
                    <th><input type="text" class="input-text" id="musician" required></th>
                </tr>
                <tr>
                    <th><label for="songUrl" style="font-size: 20px">Bài hát:</label></th>
                    <th> <input type="text" class="input-text" id="songUrl" required></th>
                </tr>
                <tr>
                    <th><label for="imageUrl" style="font-size: 20px">Ảnh:</label></th>
                    <th> <input type="text" class="input-text" id="imageUrl" required></th>
                </tr>
                <tr>
                    <th><label for="albumId" style="font-size: 20px">Album:</label></th>
                    <th>
                        <select id="albumId" required ></select>
                    </th>
                </tr>
                <tr>

                    <th colspan="2"><button type="submit" class="btn btn-primary btn-lg btn-block"   onclick="addSong()">Thêm</button></th>
                </tr>
               
                </table>
            </form>
    `

    const album = await axios.get('http://localhost:3000/albums');
    let albumData = album.data;

    let optionAlbum = `<option value="">Chọn Album</option>`
    for (const item of albumData) {
        optionAlbum += `    
                    <option value="${item.id}">${item.name}</option>
                     `
    }

    document.getElementById('display').innerHTML = str
    // document.getElementById(`playlistId`).innerHTML = optionClass;
    document.getElementById(`albumId`).innerHTML = optionAlbum;

}

