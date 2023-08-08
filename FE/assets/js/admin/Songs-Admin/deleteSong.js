function confirmDeleteSong(id) {
  let text = "Bạn có chắc muốn xóa bài hát?";
  if (window.confirm(text)) {
    deleteSong(id);
  } else {
    console.log("Không thực hiện xóa bài hát");
  }
}

async function deleteSong(id) {
    try {
        await axios.delete(`http://localhost:3000/songs/${id}`);
        loadHome();
    } catch (error) {
        console.log("Lỗi khi xóa bài hát hoặc tải lại trang:", error);
    }

}