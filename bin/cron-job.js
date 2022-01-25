import ping from 'ping';

const host = 'https://todo-list-app-bknd.herokuapp.com/';
const res = await ping.promise.probe(host);

console.log(res);
