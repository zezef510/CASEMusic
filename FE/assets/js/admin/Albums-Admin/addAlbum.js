function addAlbum(){
    let data = {
        id  : document.getElementById("id").value,
        name : document.getElementById("name").value,
        imgUrl : document.getElementById('imageUrl').value,
        singer : document.getElementById('singer').value

    }
    if (data.name === "" || data.singer === "" ||  data.imgUrl === "" ){
        alert("Vui lòng nhập đủ trường")
    }else {
        axios.post(apiUrlAlbums,data).then(res => {
            axios.get(apiUrlAlbums).then((res)=>{
                loadAlbum()
            })
        })
    }
}
async function showFromAddAlbum(){
    let tableBody = document.querySelector('.table__body');
    tableBody.style.width = "50%";
    const resSong = await axios.get('http://localhost:3000/albums');
    let data = resSong.data;
    console.log(data)
    let lastId = data[data.length - 1].id || 1
    console.log(lastId)
    let str = ``
    str = ` 
        <form>
            <table>
                 <tr>
                    <th colspan="2" style="font-size: 20px">Tạo Album mới</th>
                </tr>
                <tr>
                    <th colspan="2"><input class="input-text" type="hidden" id="id" value="${lastId + 1}"></th>
                </tr>
                <tr>
                    <th style="width: 200px"><label for="name" style="font-size: 20px">Tên Album:</label></th>
                    <th>  <input class="input-text" type="text" id="name" required></th>
                </tr>
                  <tr>
                    <th><label for="imageUrl" style="font-size: 20px">Ảnh:</label></th>
                    <th> <input class="input-text" type="text" id="imageUrl" required></th>
                </tr>
                 <tr>
                    <th><label for="singer" style="font-size: 20px">Ca sĩ:</label></th>
                    <th><input type="text" class="input-text" id="singer" required></th>
                </tr>
               
                <tr>
                    <th colspan="2"><button type="button" class="btn btn-primary btn-lg btn-block" onclick="addAlbum()">Tạo Album</button></th>
                </tr>
            </form>
    `



    document.getElementById('display').innerHTML = str



}