// import { io } from 'socket.io-client';
// const socket = io('http://localhost:5000');

const VOTE_URL = 'http://localhost:5000/api/vote';

const setupVoteButtonTest = (element: HTMLButtonElement, select: HTMLSelectElement) => {
  element.addEventListener('click', async () => {
    console.log('Vote button pressed, waiting for server response', select.value);

    const response = await fetch(`${VOTE_URL}`, {
      method: 'POST',
      body: JSON.stringify({ userId: '123abc', score: select.value }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    console.log(await response.json());

    // socket.emit('vote', { userId: '123abc', score: select.value });
  });
};

export default setupVoteButtonTest;
