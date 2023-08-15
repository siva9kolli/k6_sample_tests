import http from 'k6/http';
import { check, group, sleep } from 'k6';
export const options = {
  stages: [
    { duration: '1m', target: 100 }, // simulate ramp-up of traffic from 1 to 100 users over 1 minute.
    { duration: '1m', target: 200 }, // stay at 200 users for 1 minute
    { duration: '1m', target: 0 }, // ramp-down to 0 users
  ],
 thresholds: {
    http_req_duration: ['p(90)<1500'], // 90% of requests must complete below 1.5s
  },
};
export default () => {
  const res = http.get(`https://test-api.k6.io/public/crocodiles/`, {
  });           //call the api and set the response to res
check(res, {
    'is status 200': (r) => r.status===200,
'response body contains Bert': (r)=>
 r.body.includes('Bert'),
'response body contains Justin':(r)=>
 r.body.includes('Justin Ba')
  });
};