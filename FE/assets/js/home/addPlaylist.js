//Handle show Modal

$('#myModal').on('shown.bs.modal', function () {
    $('#myInput').trigger('focus')
})

function showModal() {
    $('#exampleModal').modal('show');
}  

function deleteCookie() {
    document.cookie = "userId=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    window.location.href = "sign.html";
}

showAddPlayList(idCookie);

async function showAddPlayList(idCookie) {
    try {
        const res = await axios.get(`http://localhost:3000/playlists/`);
        let data = res.data;
        let lastId = data[data.length - 1].id;
            str = `
                      <div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel"
                    aria-hidden="true">
                    <div class="modal-dialog" role="document">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h5 class="modal-title" id="exampleModalLabel">Thêm Playlist :</h5>
                                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div class="modal-body">
                                <form>
                                    <input type="text" id="id" value="${lastId + 1}" hidden>
                                    <input type="text" id="userId" value="${idCookie}" hidden>
                                    <div class="form-group">
                                        <label for="recipient-name" class="col-form-label">Tên :</label>
                                        <input type="text" class="form-control" id="name">
                                    </div>
                                    <div class="form-group">
                                        <label for="recipient-name" class="col-form-label">Mô tả :</label>
                                        <input type="text" class="form-control" id="description">
                                    </div>
                                    <div class="form-group mb-avatar">
                                        <label for="formFile" class="form-label inputcode"><span></span></label>
                                        <input type="file" id="image-upload" onchange="uploadImage(event)" hidden>
                                        <label for="image-upload" class="file-upload-button">Chọn ảnh :</label>
                                        <span id="file-name" style="font-size: 0px;"></span>
                                        <div class="info-progress">
                                            <div class="progress">
                                                <div id="upload-progress"
                                                    class="progress-bar progress-bar-striped progress-bar-animated"
                                                    role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100"
                                                    style="width: 0; min-width: 2em;" hidden="">0%
                                                </div>
                                            </div>
                                            <div class="image-url" hidden>
                                                <img src="" alt="" id="image-url">
                                            </div>
                                        </div>
                                        <input id="image" class="form-control" type="text" name="avatar"
                                            required hidden>
                                    </div>
                                </form>
                            </div>
                            <div class="modal-footer">
                                <button type="button" class="btn btn-secondary" data-dismiss="modal">Đóng</button>
                                <button type="button" class="btn btn-primary" onclick="addPlayList()">Thêm</button>
                            </div>
                        </div>
                    </div>
                </div>
            `;
   
        document.getElementById('modal-edit').innerHTML = str;
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

