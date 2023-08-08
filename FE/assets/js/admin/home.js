function loadHome() {
    let tableBody = document.querySelector('.table__body');
    tableBody.style.width = "";
    const evenRowColor = '#f9f9f9'; // Màu sắc cho hàng chẵn
    const oddRowColor = '#e1e1e1'; // Màu sắc cho hàng lẻ
    let table_rows = document.querySelectorAll('tbody tr');

    table_rows.forEach((row, i) => {
        row.style.setProperty('--delay', i / 25 + 's');
    });
    // const token = localStorage.getItem('token')
    // axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
    axios.get("http://localhost:3000/songs/id").then((res) => {
        let data = res.data
        let str = `  <thead>
   <tbody ><tr class="table-row">
        <th> Id <span class="icon-arrow"></span></th>
        <th> Tên bài hát <span class="icon-arrow"></span></th>
        <th> Ca sĩ <span class="icon-arrow"></span></th>
        <th> Nhạc sĩ<span class="icon-arrow"></span></th>
        <th> Album<span class="icon-arrow"></span></th>
        <th> Phát <span class="icon-arrow"></span></th>
        <th> Sửa <span class="icon-arrow"></span></th>
        <th> Xóa <span class="icon-arrow"></span></th>
<!--        <th><button onclick="showFromSave()"> Add Music</button></th>-->
      </tr>
         </tbody>
      </thead>`
        data.map((item, index) => {
            const rowColor = index % 2 === 0 ? evenRowColor : oddRowColor;
            str += ` <tbody> 
        <tr  id="songs" style="background-color: ${rowColor};">
        <td> ${item.id} </td>
        <td> <img src="${item.imageUrl}" alt="">${item.name}</td>
        <td>${item.singer} </td>
        <td> ${item.musician}</td>
        <td><strong>${item.album.name}</strong>
          
        </td>
        <td> <strong> $128.90 </strong></td>
        <td> <strong><button onclick="showEditSong(${item.id})" class="custom-btn btn-12 " ><span style="background:background: rgb(0,172,238);background: linear-gradient(0deg, rgba(0,172,238,1) 0%, rgba(2,126,251,1) 100%)">Click!</span>
        <span style="background: rgb(0,172,238);background: linear-gradient(0deg, rgba(0,172,238,1) 0%, rgba(2,126,251,1) 100%)" >Sửa</span></button></strong></td>
        <td> <strong> <button onclick="confirmDeleteSong(${item.id})" class="custom-btn btn-12 "><span>Chọn!</span><span>Xóa</span></button></strong></td>
      </tr>
      </tbody>`
        })




        document.getElementById("display").innerHTML = str

    })
}
const search = document.querySelector('.input-group input');
const tableBody = document.getElementById('display');

search.addEventListener('input', searchTable);

function searchTable() {
    const searchTerm = search.value.toLowerCase();

    if (searchTerm.trim() !== '') {
        axios.get('http://localhost:3000/songs/id').then((res) => {
            let data = res.data;

            let filteredData = data.filter((item) => {

                return (
                    item.name.toLowerCase().includes(searchTerm) ||
                    item.singer.toLowerCase().includes(searchTerm) ||
                    item.musician.toLowerCase().includes(searchTerm)
                );
            });
            displayData(filteredData);


        });
    } else {
        // Xử lý trường hợp ô tìm kiếm rỗng
        loadHome();
    }
}

function displayData(data) {
    tableBody.innerHTML = '';
    let headerRow = document.createElement('tr');
    headerRow.innerHTML = `
    <th> Id <span class="icon-arrow"></span></th>
    <th> Tên bài hát <span class="icon-arrow"></span></th>
    <th> Ca sĩ <span class="icon-arrow"></span></th>
    <th> Nhạc sĩ<span class="icon-arrow"></span></th>
    <th> Bài hát<span class="icon-arrow"></span></th>
    <th> Album<span class="icon-arrow"></span></th>
    <th> Play <span class="icon-arrow"></span></th>
   
  `;
    tableBody.appendChild(headerRow)

    data.forEach((item) => {
        let row = document.createElement('tr');
        row.innerHTML = `

    <tbody><tr>
      <td>${item.id}</td>
       <td> <img src="${item.imageUrl}" alt="">${item.name}</td>
      <td>${item.singer}</td>
      <td>${item.musician}</td>
      <td>${item.songUrl}</td>
      <td>${item.album.name}</td>
      <td> <strong> $128.90 </strong></td>

      </tr></tbody>
    `;
        tableBody.appendChild(row);
    });
}
function applyDisplayAndBackgroundColor() {
    console.log(1)
    let table_rows = document.querySelectorAll('tbody tr');

    table_rows.forEach((row, i) => {
        row.style.setProperty('--delay', i / 25 + 's');
    });

}