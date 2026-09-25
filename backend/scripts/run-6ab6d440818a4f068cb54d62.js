
import http from 'k6/http';
import { check, sleep } from 'k6';

export let options = {
  vus: 10,
  duration: '10s',
};

export default function () {
  const url = 'http://localhost:5000/';
  const payload = null;
  
  const params = {
    headers: {"Content-Type":"application/json"},
  };

  let res;
  switch('GET') {
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
