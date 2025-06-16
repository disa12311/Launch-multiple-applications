// src/App.js

import React, { useState, useEffect } from 'react';
import './App.css'; // Chúng ta sẽ thêm CSS sau

// Dữ liệu giả để test giao diện
const MOCK_WORKSPACES = [
  {
    id: 'ws-1',
    name: '🚀 Làm việc',
    apps: [
      { name: 'Slack', path: 'C:\\path\\to\\slack.exe' },
      { name: 'VS Code', path: 'C:\\path\\to\\code.exe' },
      { name: 'Chrome', path: 'C:\\path\\to\\chrome.exe' },
    ]
  },
  {
    id: 'ws-2',
    name: '🎮 Giải trí',
    apps: [
      { name: 'Steam', path: 'C:\\path\\to\\steam.exe' },
      { name: 'Discord', path: 'C:\\path\\to\\discord.exe' }
    ]
  },
  {
    id: 'ws-3',
    name: '🎨 Thiết kế',
    apps: []
  }
];


function App() {
  const [workspaces, setWorkspaces] = useState([]);
  const [selectedWorkspaceId, setSelectedWorkspaceId] = useState(null);

  // Tải dữ liệu khi ứng dụng khởi động
  useEffect(() => {
    // Tạm thời dùng dữ liệu giả.
    // Sau này, chúng ta sẽ thay thế bằng việc đọc dữ liệu từ file JSON.
    setWorkspaces(MOCK_WORKSPACES);
    if (MOCK_WORKSPACES.length > 0) {
      setSelectedWorkspaceId(MOCK_WORKSPACES[0].id);
    }
  }, []);

  const handleLaunchWorkspace = () => {
    const workspace = workspaces.find(ws => ws.id === selectedWorkspaceId);
    if (workspace && workspace.apps.length > 0) {
      const appPaths = workspace.apps.map(app => app.path);
      console.log('Gửi yêu cầu khởi chạy các ứng dụng:', appPaths);
      // Gọi API của Electron để chạy app (sẽ làm ở bước sau)
      // window.electronAPI.launchApps(appPaths);
      alert(`Đang khởi chạy workspace "${workspace.name}"! (Chức năng thực tế sẽ được thêm ở bước sau)`);
    } else {
      alert('Không có ứng dụng nào trong workspace này để chạy.');
    }
  };

  const selectedWorkspace = workspaces.find(ws => ws.id === selectedWorkspaceId);

  return (
    <div className="app-container">
      {/* Cột bên trái: Danh sách Workspace */}
      <aside className="sidebar">
        <h2>Workspaces</h2>
        <ul>
          {workspaces.map(ws => (
            <li
              key={ws.id}
              className={ws.id === selectedWorkspaceId ? 'active' : ''}
              onClick={() => setSelectedWorkspaceId(ws.id)}
            >
              {ws.name}
            </li>
          ))}
        </ul>
        <button className="add-workspace-btn">+ Thêm Workspace</button>
      </aside>

      {/* Khu vực chính: Hiển thị ứng dụng của Workspace đã chọn */}
      <main className="main-content">
        {selectedWorkspace ? (
          <>
            <header className="main-header">
              <h1>{selectedWorkspace.name}</h1>
              <button className="launch-btn" onClick={handleLaunchWorkspace}>
                ▶️ Chạy tất cả
              </button>
            </header>
            <div className="app-grid">
              {selectedWorkspace.apps.length > 0 ? (
                selectedWorkspace.apps.map((app, index) => (
                  <div key={index} className="app-card">
                    <div className="app-icon">{app.name.charAt(0)}</div>
                    <p>{app.name}</p>
                  </div>
                ))
              ) : (
                <p>Chưa có ứng dụng nào. Hãy thêm một ứng dụng.</p>
              )}
                 <button className="add-app-card">+</button>
            </div>
          </>
        ) : (
          <p>Tạo một workspace để bắt đầu.</p>
        )}
      </main>
    </div>
  );
}

export default App;
