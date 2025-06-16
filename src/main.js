// Trong file preload.js hoặc main.js
const { dialog } = require('electron');

// Hàm để gọi từ React UI
async function handleFileOpen() {
  const { canceled, filePaths } = await dialog.showOpenDialog({
    properties: ['openFile'],
    filters: [
      { name: 'Applications', extensions: ['exe', 'lnk'] }
    ]
  });
  if (!canceled) {
    return filePaths[0]; // Trả về đường dẫn file đã chọn
  }
}
