

/*--------------------------------------------------------------------------
------------------- Add user -----------------------------------------------
--------------------------------------------------------------------------*/

const userAndLoginRoot = document.getElementById('app'); 

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
addNewUserBtn.innerHTML = 'Lägg till och logga in';

userAndLoginRoot?.append(newUserSpan, newUserInput, newUserPassword, addNewUserBtn, serverMassage);

addNewUserBtn.addEventListener('click', (event) => {
  serverMassage.innerHTML = ""

  event.preventDefault();
  const user = {username: newUserInput.value, password:newUserPassword.value};

  try {
    fetch("http://localhost:5050/api/users/add", {    
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body:JSON.stringify(user)
    })
      .then(res => {
        if (!res.ok) {
          serverMassage.innerHTML = ("Error! Användaren finns redan");
          serverMassage.style.color = "red";
          return
        }
        newUserInput.value = "";
        newUserPassword.value = "";
        return res.json()

      })
      
      .then(data => {
        localStorage.setItem("userData", JSON.stringify({username:data.username,_id:data._id, admin:data.admin}));
      });
  } catch { (() => {
    serverMassage.innerHTML = ("Error! Något gick fel. Försök igen senare.");
    serverMassage.style.color = "red";
  })
  }    
})