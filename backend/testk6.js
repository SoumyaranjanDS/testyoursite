const os = require('os');
const path = require('path');
const fs = require('fs');
const { execSync } = require('child_process');

const targetUrl = 'https://httpbin.org/get';
const method = 'GET';
const virtualUsers = 1;
const durationSec = 3;
const parsedHeaders = {};
const body = '';

const scriptContent = `
import http from 'k6/http';
import { check, sleep } from 'k6';

export let options = {
  vus: ${virtualUsers},
  duration: '${durationSec}s',
};

export default function () {
  const url = '${targetUrl}';
  const payload = ${method !== 'GET' && method !== 'HEAD' ? (body ? `JSON.stringify(${JSON.stringify(body)})` : 'null') : 'null'};
  
  const params = {
    headers: ${JSON.stringify(parsedHeaders)},
  };

  let res;
  switch('${method}') {
    case 'POST':
      res = http.post(url, payload, params);
      break;
    case 'PUT':
      res = http.put(url, payload, params);
      break;
    case 'PATCH':
      res = http.patch(url, payload, params);
      break;
    case 'DELETE':
      res = http.del(url, payload, params);
      break;
    default:
      res = http.get(url, params);
      break;
  }
  
  check(res, {
    'status is 2XX': (r) => r.status >= 200 && r.status < 300,
  });
  
  sleep(0.1);
}
`;

const scriptPath = path.join(os.tmpdir(), 'test-k6.js');
const resultFile = path.join(os.tmpdir(), 'test-k6-out.json');

fs.writeFileSync(scriptPath, scriptContent);
try {
  execSync(`k6 run --summary-export="${resultFile}" "${scriptPath}"`, {stdio: 'inherit'});
  const out = fs.readFileSync(resultFile, 'utf8');
  console.log(JSON.parse(out).metrics);
} catch (e) {
  console.error(e.message);
}
