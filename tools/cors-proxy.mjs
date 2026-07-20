// 本地 CORS 转发代理（零依赖，Node 18+）：
// 解决部分 API 端点（如 https://api.kimi.com/coding）不支持浏览器跨域的问题。
// 浏览器 → http://127.0.0.1:<port>/<path>  →  <target>/<path>，响应补上跨域头。
// 只监听 127.0.0.1，仅转发到命令行指定的单一目标，不作为开放代理。
// 用法：node tools/cors-proxy.mjs [端口] [目标地址]   默认 8966 https://api.kimi.com/coding

import http from 'node:http';
import https from 'node:https';

const port = Number(process.argv[2]) || 8966;
const target = new URL(process.argv[3] || 'https://api.kimi.com/coding');
const transport = target.protocol === 'http:' ? http : https;

const CORS_HEADERS = {
  'access-control-allow-origin': '*',
  'access-control-allow-methods': 'GET, POST, OPTIONS',
  'access-control-allow-headers': 'authorization, content-type, x-api-key, anthropic-version',
  'access-control-max-age': '600',
};

http
  .createServer((req, res) => {
    if (req.method === 'OPTIONS') {
      res.writeHead(204, CORS_HEADERS);
      res.end();
      return;
    }
    // 只放行 http(s) 方法，目标路径 = target 路径 + 请求路径（防重复拼接）
    const basePath = target.pathname.replace(/\/+$/, '');
    const upstream = new URL(basePath + req.url, target);
    const headers = { ...req.headers, host: upstream.host };
    delete headers.origin;
    delete headers.referer;

    const proxyReq = transport.request(
      upstream,
      { method: req.method, headers },
      (proxyRes) => {
        res.writeHead(proxyRes.statusCode || 502, { ...proxyRes.headers, ...CORS_HEADERS });
        proxyRes.pipe(res); // SSE / 流式响应直接透传
      }
    );
    proxyReq.on('error', (err) => {
      res.writeHead(502, { 'content-type': 'application/json; charset=utf-8', ...CORS_HEADERS });
      res.end(JSON.stringify({ error: { message: `代理转发失败：${err.message}` } }));
    });
    req.pipe(proxyReq);
  })
  .listen(port, '127.0.0.1', () => {
    console.log(`CORS 代理已启动：http://127.0.0.1:${port} → ${target.origin}${target.pathname}`);
  });
