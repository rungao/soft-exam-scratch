// Vercel Serverless Function
const https = require('https');

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
        const encodedStage = encodeURIComponent(stage);

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

        return new Promise((resolve, reject) => {
            const proxyReq = https.request(options, (proxyRes) => {
                let data = '';

                proxyRes.on('data', (chunk) => {
                    data += chunk;
                });

                proxyRes.on('end', () => {
                    res.status(200).json(JSON.parse(data));
                    resolve();
                });
            });

            proxyReq.on('error', (error) => {
                res.status(500).json({ error: error.message });
                reject(error);
            });

            proxyReq.write(`stage=${encodedStage}&jym=`);
            proxyReq.end();
        });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

