/*--------------------------------------------------------------------------
------------------ Hantera om användaren redan är inloggad -----------------
--------------------------------------------------------------------------*/

import sessionVue from './sessionVue';
import { socket } from '../socket';
import type { User } from '../models/userModel';

// const CheckUserInlog = JSON.parse(localStorage.getItem('userData') || '');
export const checkUser = () => {
  const loggedInUser = localStorage.getItem('userData');
  const CheckUserInlog = loggedInUser ? JSON.parse(loggedInUser) : null;
  if (CheckUserInlog != null) {
    socket.emit('localStorageUser', CheckUserInlog);
    sessionVue();
    // Kopplas vidare till Planning - Poker
    ('test if');
  } else {
    /*--------------------------------------------------------------------------
  ------------------- Add user -----------------------------------------------
  --------------------------------------------------------------------------*/
    //console.log(('test else'));

    createAndLoginUser();
  }
};

function createAndLoginUser() {
  const userAndLoginRoot = document.getElementById('app');
  const newUserDiv = document.createElement('div');
  newUserDiv.id = 'newUserDiv';
  newUserDiv.className = 'newUserDiv';

  const newUserSpan = document.createElement('span');
  newUserSpan.id = 'newUserSpan';
  newUserSpan.className = 'newUserSpan';
  newUserSpan.innerText = 'Lägg till ny användare';

  const newUserInput = document.createElement('input');
  newUserInput.setAttribute('type', 'text');
  newUserInput.id = 'newUserInput';
  newUserInput.className = 'newUserInput';
  newUserInput.placeholder = 'Namn';

  const newUserPassword = document.createElement('input');
  newUserPassword.setAttribute('type', 'text');
  newUserPassword.id = 'newUserPassword';
  newUserPassword.className = 'newUserPassword';
  newUserPassword.placeholder = 'Lösenord';

  const serverMassage = document.createElement('p');
  serverMassage.id = 'serverMassage';
  serverMassage.className = 'serverMassage';

  const addNewUserBtn = document.createElement('button');
  addNewUserBtn.className = 'UserLoginBtns'
  addNewUserBtn.innerHTML = 'Lägg till och logga in';

  newUserDiv?.append(newUserSpan, newUserInput, newUserPassword, addNewUserBtn, serverMassage);
  userAndLoginRoot?.appendChild(newUserDiv)

  addNewUserBtn.addEventListener('click', (event) => {
    serverMassage.innerHTML = '';

    event.preventDefault();
    const user = { username: newUserInput.value, password: newUserPassword.value };
    let storedUser: User | null = null;

    try {
      fetch('http://localhost:5050/api/users/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(user),
      })
        .then((res) => {
          if (!res.ok) {
            serverMassage.innerHTML = 'Error! Användaren finns redan';
            serverMassage.style.color = 'red';
            return;
          }
          newUserInput.value = '';
          newUserPassword.value = '';
          return res.json();
        })

        .then((data) => {
          storedUser = { _id: data._id, username: data.username, admin: data.admin };
          localStorage.setItem('userData', JSON.stringify(storedUser));
          socket.emit('sendUser', storedUser);
          sessionVue();
        });
    } catch {
      () => {
        serverMassage.innerHTML = 'Error! Något gick fel. Försök igen senare.';
        serverMassage.style.color = 'red';
      };
    }
  });

  /*------------------------------------------------------------------
  ------------------------------ Login -------------------------------
  ------------------------------------------------------------------*/
  
  const userDiv = document.createElement('div');
  userDiv.id = 'userDiv';
  userDiv.className = 'userDiv';

  const UserSpan = document.createElement('span');
  UserSpan.id = 'UserSpan';
  UserSpan.className = 'UserSpan';
  UserSpan.innerText = 'Delta i Planning-poker';

  const UserInput = document.createElement('input');
  UserInput.setAttribute('type', 'text');
  UserInput.id = 'UserInput';
  UserInput.className = 'UserInput';
  UserInput.placeholder = 'Namn';

  const UserPassword = document.createElement('input');
  UserPassword.setAttribute('type', 'text');
  UserPassword.id = 'UserPassword';
  UserPassword.className = 'UserPassword';
  UserPassword.placeholder = 'Lösenord';

  const LoginBtn = document.createElement('button');
  LoginBtn.className = 'UserLoginBtns'
  LoginBtn.innerHTML = 'Logga in';

  userDiv?.append(UserSpan, UserInput, UserPassword, LoginBtn);
  userAndLoginRoot?.appendChild(userDiv);

  LoginBtn.addEventListener('click', (event) => {
    serverMassage.innerHTML = '';

    event.preventDefault();
    const user = { username: UserInput.value, password: UserPassword.value };
    let storedUser: User | null = null;

    try {
      fetch('http://localhost:5050/api/users/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(user),
      })
        .then((res) => {
          if (!res.ok) {
            serverMassage.innerHTML = 'Error! Fel användare eller lösenord.';
            serverMassage.style.color = 'red';
            return;
          }
          newUserInput.value = '';
          newUserPassword.value = '';
          return res.json();
        })

        .then((data) => {
          storedUser = { _id: data._id, username: data.username, admin: data.admin };
          localStorage.setItem('userData', JSON.stringify(storedUser));
          socket.emit('sendUser', storedUser);
          sessionVue();
        });
    } catch {
      () => {
        serverMassage.innerHTML = 'Error! Något gick fel. Försök igen senare.';
        serverMassage.style.color = 'red';
      };
    }
  });
}
