// Trong file main.js
const { ipcMain } = require('electron');
const { execFile } = require('child_process');

ipcMain.on('launch-apps', (event, appPaths) => {
  if (appPaths && appPaths.length > 0) {
    console.log('Đang khởi chạy các ứng dụng:', appPaths);
    appPaths.forEach(path => {
      // execFile an toàn hơn exec khi đường dẫn có thể chứa dấu cách
      execFile(path, (error) => {
        if (error) {
          console.error(`Lỗi khi chạy ${path}:`, error);
          // Có thể gửi thông báo lỗi về lại cho UI
        }
      });
    });
  }
});
