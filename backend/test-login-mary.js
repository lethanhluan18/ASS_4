const http = require('http');

async function test(username, password) {
  return new Promise((resolve) => {
    const data = JSON.stringify({ username, password });
    const req = http.request(
      {
        hostname: 'localhost',
        port: 3001,
        path: '/api/auth/login',
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Content-Length': Buffer.byteLength(data),
        },
      },
      (res) => {
        let body = '';
        res.on('data', (c) => (body += c));
        res.on('end', () => resolve({ status: res.statusCode, body }));
      }
    );
    req.write(data);
    req.end();
  });
}

async function run() {
  console.log('Testing Mary / 123:');
  const r1 = await test('Mary', '123');
  console.log('R1:', r1.status, r1.body);

  console.log('Testing mary (lowercase) / 123:');
  const r2 = await test('mary', '123');
  console.log('R2:', r2.status, r2.body);

  console.log('Testing John / 123:');
  const r3 = await test('John', '123');
  console.log('R3:', r3.status, r3.body);

  console.log('Testing admin1 (from SimpleQuiz) / 123:');
  const r4 = await test('admin1', '123');
  console.log('R4:', r4.status, r4.body);
}

run();

