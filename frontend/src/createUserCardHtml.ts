import { socket } from "./socket";
export default function createUserCards () {
  socket.on('userList', (userList) => {
    console.log(userList);
    const votingCardContainer : HTMLDivElement = document.querySelector('.voting-card-container') as HTMLDivElement;
    votingCardContainer.innerHTML = '';

    userList.map(user => {
      const votingCard : HTMLDivElement = document.createElement('div');
      votingCard.classList.add('voting-card-div');
      votingCard.innerText = 'Röstkort';
      votingCard.innerHTML = `<p>Mitt poäng</p>
  <select name="points" id="points">
    <option value=null>Välj</option>
    <option value=1>Tiny 1SP</option>
    <option value=3>Small 3SP</option>
    <option value=5>Medium 5SP</option>
    <option value=8>Large 8 SP</option>
  </select>`

      votingCardContainer.append(votingCard)
        
        
    })
    
  })
    
}