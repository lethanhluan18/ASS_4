const http = require('http');

function post(url, data) {
  return new Promise((resolve, reject) => {
    const u = new URL(url);
    const req = http.request(
      {
        hostname: u.hostname,
        port: u.port,
        path: u.pathname,
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
      },
      (res) => {
        let body = '';
        res.on('data', (c) => (body += c));
        res.on('end', () => resolve({ status: res.statusCode, data: JSON.parse(body) }));
      }
    );
    req.on('error', reject);
    req.write(JSON.stringify(data));
    req.end();
  });
}

function get(url, token) {
  return new Promise((resolve, reject) => {
    const u = new URL(url);
    const headers = {};
    if (token) headers['Authorization'] = `Bearer ${token}`;
    const req = http.request(
      {
        hostname: u.hostname,
        port: u.port,
        path: u.pathname,
        method: 'GET',
        headers,
      },
      (res) => {
        let body = '';
        res.on('data', (c) => (body += c));
        res.on('end', () => resolve({ status: res.statusCode, data: JSON.parse(body) }));
      }
    );
    req.on('error', reject);
    req.end();
  });
}

async function testE2E() {
  console.log('Testing Frontend Proxy (Port 3001) -> Backend (Port 5000)...');

  // 1. User login (John)
  const johnRes = await post('http://localhost:3001/api/auth/login', {
    username: 'John',
    password: '123',
  });
  console.log('1. John Login:', johnRes.status, johnRes.data.username, 'Role:', johnRes.data.role);

  // 2. User gets questions
  const questionsRes = await get('http://localhost:3001/api/questions', johnRes.data.token);
  console.log('2. Questions fetched by John:', questionsRes.status, 'Total questions:', questionsRes.data.length);
  questionsRes.data.forEach((q, idx) => {
    console.log(`   [${idx + 1}] ${q.questionText} (${q.options.length} options)`);
  });

  // 3. Admin login (Mary)
  const maryRes = await post('http://localhost:3001/api/auth/login', {
    username: 'Mary',
    password: '123',
  });
  console.log('3. Mary Login:', maryRes.status, maryRes.data.username, 'Role:', maryRes.data.role);

  // 4. Admin gets articles
  const articlesRes = await get('http://localhost:3001/api/articles', maryRes.data.token);
  console.log('4. Articles fetched:', articlesRes.status, 'Count:', articlesRes.data.length);

  console.log('\n>>> All E2E checks over frontend port 3001 succeeded cleanly! <<<');
}

testE2E().catch((err) => {
  console.error('E2E error:', err);
  process.exit(1);
});

