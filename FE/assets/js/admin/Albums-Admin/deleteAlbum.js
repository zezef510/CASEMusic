function confirmDeleteAlbum(id) {
    let text = "Bạn có chắc muốn xóa album?";
    if (window.confirm(text)) {
        deleteAlbum(id);
    } else {
        console.log("Không thực hiện xóa album");
    }
}

async function deleteAlbum(id) {
    try {
        await axios.delete(`${apiUrlAlbums}/${id}`);
        alert('Xóa thành công !')
        loadHome();
    } catch (error) {
        console.log("Lỗi khi xóa bài hát hoặc tải lại trang:", error);
    }

}