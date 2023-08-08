
async function editButtonAlbum(id) {
    let tableBody = document.querySelector('.table__body');
    tableBody.style.width = "50%";
    try {
        const res = await axios.get(`http://localhost:3000/albums/?id=${id}`);
        console.log(res)
        let data = res.data;
        console.log(data)

        let main = `
           <form class="contact-form row">
            <div class="form-field col x-50">
                <tr>
                    <th><input type="hidden" id="id" value="${data.id}" hidden ></th>
                </tr>
                <tr>
                    <th style="width: 200px"><label class="label" for="name" style="font-size: 20px">Tên Album</label></th>
                    <th><input type="text" class="input-text js-input" id="name" value="${data.name}" ></th>
                </tr>
                <tr>
                    <th><label for="musician" style="font-size: 20px">Ảnh</label></th>
                    <th><input type="text" class="input-text" id="imgUrl" value="${data.imgUrl}" ></th>
                </tr>
                <tr>
                    <th><label for="songUrl" style="font-size: 20px">Ca sĩ</label></th>
                    <th><input type="text"  class="input-text" id="singer" value="${data.singer}" ></th>
                </tr>
               
                <tr>
                    <th colspan="2"><button type="button" class="btn btn-primary btn-lg btn-block" onclick="editAlbum()">Lưu</button></th>
                </tr>
                </div>
            </form>
        `



        document.getElementById(`display`).innerHTML = main;

    }
    catch (error) {
        console.error(error);
    }
}

async function editAlbum() {
    let id = document.getElementById('id').value;
    let data = {
        name: document.getElementById('name').value,
        imgUrl: document.getElementById('imgUrl').value,
        singer: document.getElementById('singer').value,


    };

    try {

        const res = await axios.put(`http://localhost:3000/albums/${id}`, data);
        console.log(res);
        loadAlbum();
    } catch (error) {
        console.error(error);
    }
}
