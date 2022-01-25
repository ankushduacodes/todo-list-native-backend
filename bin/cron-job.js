import isReachable from 'is-reachable';

console.log(await isReachable('http://localhost:8000/api/v1/ping/'));
