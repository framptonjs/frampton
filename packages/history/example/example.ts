import { pushState, setHash } from './src/methods';
import { path, history, hash } from './src/signals';
import { getHistory } from './src/utils';


path.onValue((val) => console.log('path: ', val));


hash.onValue((val) => console.log('hash: ', val));


history.onValue((val) => console.log('history: ', val));


setHash('test').run({
  reject(err: never) { console.log('err: ', err); },
  resolve() { console.log('done'); }
});