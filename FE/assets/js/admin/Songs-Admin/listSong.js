// function  getAll() {
//     // const token = localStorage.getItem('token')
//     // axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
//     axios.get(apiUrl).then((res) => {
//         let str = '<table style="; border: 1px solid; width: 100%; height: 500px>';
//         str += `<button onclick="showFromSave()">Add</button>`
//         let data = res.data;
//         console.log(data)
//         str += ` <tr>
//                     <td>Stt</td>
//                     <td>Art</td>
//                     <td>Name</td>
//                     <td>Singer</td>
//                     <td>Musician</td>
//                     <td>Song</td>
//                     <td>AlbumName</td>
//                 </tr>
//         `
//         data.map(item => {
//             str += `<tr>
//              <td>${item.name}</td>
//             <td>${item.singer}</td>
//              <td>${item.musician}</td>
//             <td>${item.songUrl}</td>
//             <td><i class="bi bi-play-circle-fill"></i></td>

//             <td>${item.imageUrl}</td>
//             <td>${item.album.name}</td>

//            <td><button id="del" onclick="xoa(${item.id})">Delete</button></td>
//            <td><button id="Edit" onclick="#">Edit</button></td>
//             </tr>`
//         })
//         str += '</table>'
//         document.getElementById('display').innerHTML = str
//     })

// }