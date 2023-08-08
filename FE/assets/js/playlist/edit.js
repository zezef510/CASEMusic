async function showEditPlayList(id) {
    try {
        const res = await axios.get(`http://localhost:3000/playlists/?id=${id}`);
        let data = res.data;
        str = `
                      <div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel"
                    aria-hidden="true">
                    <div class="modal-dialog" role="document">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h5 class="modal-title" id="exampleModalLabel">Sửa playlist :</h5>
                                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div class="modal-body">
                                <form>
                                    <input type="text" id="id" value="${data.id}" hidden>
                                    <div class="form-group">
                                        <label for="recipient-name" class="col-form-label">Tên :</label>
                                        <input type="text" class="form-control" id="name" value="${data.name}">
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
                                        <input value="${data.imgUrl}" id="image" class="form-control" type="text" name="avatar"
                                            required hidden>
                                    </div>
                                </form>
                            </div>
                            <div class="modal-footer">
                                <button type="button" class="btn btn-secondary" data-dismiss="modal">Đóng</button>
                                <button type="button" class="btn btn-primary" onclick="editPlayList()">Lưu</button>
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

function showModal() {
    $('#exampleModal').modal('show');
}

if (id !== null) {
    showEditPlayList(id);
}

async function editPlayList() {
    let data = {
        id: document.getElementById('id').value,
        name: document.getElementById('name').value,
        imgUrl: document.getElementById('image').value,
    };

    console.log(data);

    try {
        const res = await axios.put(`http://localhost:3000/playlists/${id}`, data);
        console.log(res);
        $('#exampleModal').modal('hide');
        location.reload()
    } catch (error) {
        console.error(error);
    }
}