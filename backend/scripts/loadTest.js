import http from 'k6/http';
import { check, sleep } from 'k6';

// Read parameters from environment variables
const TARGET_URL = __ENV.TARGET_URL || 'http://localhost';

export default function () {
  const res = http.get(TARGET_URL);
  check(res, {
    'status is 200': (r) => r.status === 200,
  });
  // Minimal sleep to avoid overwhelming local network excessively without bound
  sleep(0.1);
}
