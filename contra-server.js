#!/usr/bin/env node

const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 3000;
const HTML_FILE = path.join(__dirname, 'contra-game.html');

const server = http.createServer((req, res) => {
    console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);
    
    if (req.url === '/' || req.url === '/index.html') {
        fs.readFile(HTML_FILE, (err, data) => {
            if (err) {
                res.writeHead(500);
                res.end('Error loading game');
                return;
            }
            res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
            res.end(data);
        });
    } else {
        res.writeHead(404);
        res.end('Not Found');
    }
});

server.listen(PORT, '0.0.0.0', () => {
    console.log(`🎮 魂斗罗游戏服务器已启动！`);
    console.log(`📊 本地访问: http://localhost:${PORT}`);
    console.log(`🌐 公网访问: http://43.128.68.78:${PORT}`);
    console.log(``);
    console.log(`按 Ctrl+C 停止服务器`);
});

process.on('SIGINT', () => {
    console.log('\n👋 正在关闭服务器...');
    server.close(() => {
        console.log('✅ 服务器已关闭');
        process.exit(0);
    });
});
