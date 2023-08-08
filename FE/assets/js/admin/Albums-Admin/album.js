function loadAlbum() {
    let tableBody = document.querySelector('.table__body');
    tableBody.style.width = "";
    axios.get("http://localhost:3000/albums").then((res) => {
        let data = res.data;
        let str =
            ` <h1>Album</h1>
<div class="body-card" >`
        data.map(item=>{
        str += `
     <div class="card" style="width: 18%;background: none">
      <img style="height: 224px" src="${item.imgUrl}" class="card-img-top" alt="...">
      <div class="card-body" style="background: none">
        <h5 class="card-title">${item.name}</h5>
        <button style="border: none; background: #D8D4D8; font-weight: bold;" onclick="showSongsInAlbum('${item.name}')" >Chi tiết</button>
        <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
        <div class="submit-button">
        <button class="btn btn-primary" onclick="editButtonAlbum(${item.id})">Sửa</button>
        <button class="btn btn-danger" onclick="confirmDeleteAlbum(${item.id})">Xóa</button>
        </div>
      </div>
    </div>
`
    })
        str+= `</div>`


        document.getElementById("display").innerHTML = str
    })
}











function showSongsInAlbum(name){
    axios.get(`http://localhost:3000/songs/name/?album=${name}`).then((res) => {
        let data = res.data
        let str = `  <thead>
   <tbody ><tr>
        <th> Id <span class="icon-arrow"></span></th>
        <th> Name Music <span class="icon-arrow"></span></th>
        <th> Singer <span class="icon-arrow"></span></th>
        <th> Musical<span class="icon-arrow"></span></th>
        <th> Album<span class="icon-arrow"></span></th>
        <th> Play <span class="icon-arrow"></span></th>
        <th> Edit <span class="icon-arrow"></span></th>
        <th> Delete <span class="icon-arrow"></span></th>
        <th><button onclick="showFromSave()"> Add Music</button></th>
      </tr>
         </tbody>
      </thead>`
        data.map(item=>{
            str += `  <tr id="songs">
        <td> ${item.id} </td>
        <td> <img src="https://www.oca.edu.vn/uploads/images/info/am-nhac-trong-tieng-trung-la-gi.png" alt="">${item.name}</td>
        <td>${item.singer} </td>
        <td> ${item.musician}</td>
        <td><strong>${item.album.name}</strong>
          
        </td>
        <td> <strong> $128.90 </strong></td>
        <td> <strong><button onclick="showEditSong(${item.id})"  class="custom-btn btn-12 "><span style="background:background: rgb(0,172,238);background: linear-gradient(0deg, rgba(0,172,238,1) 0%, rgba(2,126,251,1) 100%)">Click!</span>
        <span style="background: rgb(0,172,238);background: linear-gradient(0deg, rgba(0,172,238,1) 0%, rgba(2,126,251,1) 100%)">Edit</span></button></strong></td>
        <td> <strong> <button onclick="deleteSong(${item.id})" class="custom-btn btn-12 "><span>Click!</span><span>Delete</span></button></strong></td>
        <td><strong><span></span></strong></td>
      </tr>`
        })
        document.getElementById("display").innerHTML = str
    })
}