const https = require('https');

https.get('https://ass-4-lethanhluan141004-1243.vercel.app/api/health', (res) => {
  let b = '';
  res.on('data', c => b += c);
  res.on('end', () => console.log('STATUS:', res.statusCode, 'BODY:', b));
}).on('error', console.error);

