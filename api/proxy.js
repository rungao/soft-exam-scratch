// Vercel Serverless Function
const https = require('https');

// 请求函数，带重试机制
async function makeRequest(options, postData, maxRetries = 3) {
    for (let attempt = 1; attempt <= maxRetries; attempt++) {
        try {
            return await new Promise((resolve, reject) => {
                const timeout = setTimeout(() => {
                    proxyReq.destroy();
                    reject(new Error(`Request timeout after ${options.timeout || 30000}ms`));
                }, options.timeout || 30000);

                const proxyReq = https.request(options, (proxyRes) => {
                    let data = '';

                    proxyRes.on('data', (chunk) => {
                        data += chunk;
                    });

                    proxyRes.on('end', () => {
                        clearTimeout(timeout);
                        try {
                            const result = JSON.parse(data);
                            resolve(result);
                        } catch (e) {
                            reject(new Error(`Failed to parse response: ${e.message}`));
                        }
                    });
                });

                proxyReq.on('error', (error) => {
                    clearTimeout(timeout);
                    reject(error);
                });

                proxyReq.on('timeout', () => {
                    proxyReq.destroy();
                    clearTimeout(timeout);
                    reject(new Error('Request timeout'));
                });

                if (postData) {
                    proxyReq.write(postData);
                }
                proxyReq.end();
            });
        } catch (error) {
            if (attempt === maxRetries) {
                throw error;
            }
            // 等待后重试
            await new Promise(resolve => setTimeout(resolve, 1000 * attempt));
        }
    }
}

module.exports = async (req, res) => {
    // 处理CORS
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') {
        res.status(200).end();
        return;
    }

    if (req.method !== 'POST') {
        res.status(405).json({ error: 'Method not allowed' });
        return;
    }

    try {
        const { cookie, stage } = req.body;
        
        if (!cookie || !stage) {
            res.status(400).json({ error: 'Missing cookie or stage parameter' });
            return;
        }

        const encodedStage = encodeURIComponent(stage);

        const options = {
            hostname: 'bm.ruankao.org.cn',
            path: '/query/score/result',
            method: 'POST',
            timeout: 30000, // 30秒超时
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
                'x-requested-with': 'XMLHttpRequest',
                'connection': 'keep-alive'
            }
        };

        const postData = `stage=${encodedStage}&jym=`;
        
        try {
            const result = await makeRequest(options, postData, 3);
            res.status(200).json(result);
        } catch (error) {
            console.error('Proxy error:', error);
            res.status(500).json({ 
                error: '无法连接到软考官网',
                message: error.message,
                hint: 'Vercel服务器可能无法访问国内网站，建议使用本地服务器或配置代理'
            });
        }
    } catch (error) {
        console.error('Request error:', error);
        res.status(400).json({ error: error.message });
    }
};

