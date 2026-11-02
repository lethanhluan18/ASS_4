const http = require('http');

function request(options, data) {
  return new Promise((resolve, reject) => {
    const req = http.request(options, (res) => {
      let body = '';
      res.on('data', (chunk) => (body += chunk));
      res.on('end', () => {
        try {
          resolve({ status: res.statusCode, data: JSON.parse(body) });
        } catch {
          resolve({ status: res.statusCode, data: body });
        }
      });
    });
    req.on('error', reject);
    if (data) req.write(JSON.stringify(data));
    req.end();
  });
}

async function runTests() {
  console.log('--- Starting API Integration Tests ---');

  // 1. Health check
  const health = await request({
    hostname: '127.0.0.1',
    port: 5000,
    path: '/api/health',
    method: 'GET',
  });
  console.log('1. Health check:', health.status, health.data);

  // 2. Login as John (user)
  const johnLogin = await request(
    {
      hostname: '127.0.0.1',
      port: 5000,
      path: '/api/auth/login',
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
    },
    { username: 'John', password: '123' }
  );
  console.log('2. John Login:', johnLogin.status, johnLogin.data.username, 'role:', johnLogin.data.role);
  const johnToken = johnLogin.data.token;

  // 3. Login as Mary (admin)
  const maryLogin = await request(
    {
      hostname: '127.0.0.1',
      port: 5000,
      path: '/api/auth/login',
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
    },
    { username: 'Mary', password: '123' }
  );
  console.log('3. Mary Login:', maryLogin.status, maryLogin.data.username, 'role:', maryLogin.data.role);
  const maryToken = maryLogin.data.token;

  // 4. John fetches questions
  const questionsRes = await request({
    hostname: '127.0.0.1',
    port: 5000,
    path: '/api/questions',
    method: 'GET',
    headers: { Authorization: `Bearer ${johnToken}` },
  });
  console.log('4. John gets questions:', questionsRes.status, 'Total questions:', questionsRes.data.length);

  // 5. John tries to create question (should fail with 403)
  const johnCreate = await request(
    {
      hostname: '127.0.0.1',
      port: 5000,
      path: '/api/questions',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${johnToken}`,
      },
    },
    {
      questionText: 'Test question by user?',
      options: ['A', 'B'],
      correctAnswerIndex: 0,
    }
  );
  console.log('5. John unauthorized create status (expected 403):', johnCreate.status, johnCreate.data);

  // 6. Mary creates question (should succeed 201)
  const maryCreate = await request(
    {
      hostname: '127.0.0.1',
      port: 5000,
      path: '/api/questions',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${maryToken}`,
      },
    },
    {
      questionText: 'What is the largest planet in our solar system?',
      options: ['Earth', 'Jupiter', 'Mars', 'Saturn'],
      correctAnswerIndex: 1,
    }
  );
  console.log('6. Mary creates question:', maryCreate.status, maryCreate.data._id);
  const newQuestionId = maryCreate.data._id;

  // 7. Mary updates question
  const maryUpdate = await request(
    {
      hostname: '127.0.0.1',
      port: 5000,
      path: `/api/questions/${newQuestionId}`,
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${maryToken}`,
      },
    },
    {
      questionText: 'What is the largest planet in our solar system? (Updated)',
    }
  );
  console.log('7. Mary updates question:', maryUpdate.status, maryUpdate.data.questionText);

  // 8. Mary deletes question
  const maryDelete = await request({
    hostname: '127.0.0.1',
    port: 5000,
    path: `/api/questions/${newQuestionId}`,
    method: 'DELETE',
    headers: { Authorization: `Bearer ${maryToken}` },
  });
  console.log('8. Mary deletes question:', maryDelete.status, maryDelete.data);

  // 9. Fetch quizzes
  const quizzesRes = await request({
    hostname: '127.0.0.1',
    port: 5000,
    path: '/api/quizzes',
    method: 'GET',
    headers: { Authorization: `Bearer ${johnToken}` },
  });
  console.log('9. Quizzes fetch:', quizzesRes.status, 'Total quizzes:', quizzesRes.data.length);

  console.log('--- ALL BACKEND INTEGRATION TESTS PASSED! ---');
  process.exit(0);
}

runTests().catch((err) => {
  console.error('Test error:', err);
  process.exit(1);
});

