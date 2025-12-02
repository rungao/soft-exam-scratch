const http = require('http');
const https = require('https');
const fs = require('fs');
const path = require('path');
const url = require('url');

const PORT = process.env.PORT || 3000;

// 处理代理请求的函数
function handleProxy(req, res) {
    let body = '';
    
    req.on('data', chunk => {
        body += chunk.toString();
    });

    req.on('end', () => {
        try {
            const { cookie, stage } = JSON.parse(body);
            const encodedStage = encodeURIComponent(stage);

            // 转发请求到软考官网
            const options = {
                hostname: 'bm.ruankao.org.cn',
                path: '/query/score/result',
                method: 'POST',
                headers: {
                    'accept': '*/*',
                    'accept-language': 'zh-CN,zh;q=0.9,en;q=0.8',
                    'cache-control': 'no-cache',
                    'content-type': 'application/x-www-form-urlencoded; charset=UTF-8',
                    'cookie': cookie,
                    'dnt': '1',
                    'origin': 'https://bm.ruankao.org.cn',
                    'pragma': 'no-cache',
                    'referer': 'https://bm.ruankao.org.cn/query/score/main',
                    'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/142.0.0.0 Safari/537.36',
                    'x-requested-with': 'XMLHttpRequest'
                }
            };

            const proxyReq = https.request(options, (proxyRes) => {
                let data = '';

                proxyRes.on('data', (chunk) => {
                    data += chunk;
                });

                proxyRes.on('end', () => {
                    res.writeHead(200, {
                        'Content-Type': 'application/json',
                        'Access-Control-Allow-Origin': '*'
                    });
                    res.end(data);
                });
            });

            proxyReq.on('error', (error) => {
                res.writeHead(500, {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                });
                res.end(JSON.stringify({ error: error.message }));
            });

            proxyReq.write(`stage=${encodedStage}&jym=`);
            proxyReq.end();

        } catch (error) {
            res.writeHead(400, {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            });
            res.end(JSON.stringify({ error: error.message }));
        }
    });
}

// 获取文件MIME类型
function getMimeType(filePath) {
    const ext = path.extname(filePath).toLowerCase();
    const mimeTypes = {
        '.html': 'text/html',
        '.js': 'text/javascript',
        '.css': 'text/css',
        '.json': 'application/json',
        '.png': 'image/png',
        '.jpg': 'image/jpeg',
        '.jpeg': 'image/jpeg',
        '.gif': 'image/gif',
        '.svg': 'image/svg+xml',
        '.ico': 'image/x-icon',
        '.woff': 'font/woff',
        '.woff2': 'font/woff2',
        '.ttf': 'font/ttf',
        '.eot': 'application/vnd.ms-fontobject'
    };
    return mimeTypes[ext] || 'application/octet-stream';
}

// 处理静态文件
function handleStaticFile(req, res) {
    const parsedUrl = url.parse(req.url);
    let filePath = path.join(__dirname, parsedUrl.pathname);
    
    // 安全检查：确保文件在项目目录内
    const projectRoot = path.resolve(__dirname);
    if (!filePath.startsWith(projectRoot)) {
        res.writeHead(403);
        res.end('Forbidden');
        return;
    }
    
    fs.readFile(filePath, (err, data) => {
        if (err) {
            res.writeHead(404);
            res.end('File not found');
        } else {
            const mimeType = getMimeType(filePath);
            res.writeHead(200, { 
                'Content-Type': mimeType,
                'Cache-Control': 'public, max-age=3600'
            });
            res.end(data);
        }
    });
}

// 创建服务器
const server = http.createServer((req, res) => {
    // 处理CORS预检请求
    if (req.method === 'OPTIONS') {
        res.writeHead(200, {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
            'Access-Control-Allow-Headers': 'Content-Type, Cookie, Accept, Origin, Referer, User-Agent, X-Requested-With',
            'Access-Control-Max-Age': '86400'
        });
        res.end();
        return;
    }

    // 处理 /proxy 路径的请求
    if (req.url === '/proxy' && req.method === 'POST') {
        handleProxy(req, res);
    } else if (req.url.startsWith('/images/') || req.url.startsWith('/api/')) {
        // 处理静态资源文件（images目录）和API路由
        handleStaticFile(req, res);
    } else if (req.url === '/' || req.url === '/index.html') {
        // 返回HTML页面
        const filePath = path.join(__dirname, 'index.html');
        
        fs.readFile(filePath, (err, data) => {
            if (err) {
                res.writeHead(500);
                res.end('Error loading page');
            } else {
                res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
                res.end(data);
            }
        });
    } else {
        // 其他路径也尝试作为静态文件处理
        handleStaticFile(req, res);
    }
});

// 本地开发时启动服务器
if (require.main === module) {
    server.listen(PORT, () => {
        console.log(`\n🚀 代理服务器已启动！`);
        console.log(`📱 请在浏览器中访问: http://localhost:${PORT}\n`);
    });
}

// 导出供Vercel等平台使用
module.exports = server;
