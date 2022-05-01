import { useEffect, useRef } from 'react';

export const useInterval = (callback, delay) => {

  const savedCallback = useRef();

  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);


  useEffect(() => {
    function tick() {
      savedCallback.current();
    }
    if (delay !== null) {
      const id = setInterval(tick, delay);
      return () => clearInterval(id);
    }
  }, [delay]);
}

// api endpiont strings, hidden away to make the rest of the code cleaner
let baseURL = 'https://6x0en74zod.execute-api.us-east-2.amazonaws.com/'
const api = {
  createNew: baseURL + 'poll',
  getPoll: baseURL + 'poll/',
  vote: baseURL + 'option/',
  getVotes: baseURL + 'votes/',
}
export { api }
