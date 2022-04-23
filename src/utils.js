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
const api = {
  createNew: 'https://6x0en74zod.execute-api.us-east-2.amazonaws.com/poll',
  getPoll: 'https://6x0en74zod.execute-api.us-east-2.amazonaws.com/poll/',
  vote: 'https://6x0en74zod.execute-api.us-east-2.amazonaws.com/option/',
  getVotes: 'https://6x0en74zod.execute-api.us-east-2.amazonaws.com/votes/',
}
export { api }
