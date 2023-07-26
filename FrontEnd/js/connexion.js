async function getConnexion(email, mdp) {
    let myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("accept", "application/json");
  
    var raw = JSON.stringify({
      "email": email,
      "password": mdp,
    });
  
    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    };
    try {
      const response = await fetch("http://localhost:5678/api/users/login", requestOptions)
      const res = await response.json()
      return res
    } catch (error) {
      console.error("error getConnexion", error);
    }
  
  console.log(response);
  }
  
  
  
  
  
  async function submitForm(event) {
    event.preventDefault() 
  
    
    const previousError = document.querySelector('.alert')
    console.log(previousError);
  
    if (previousError) {
      previousError.remove()
    }
  
    const inputLogin = event.target.querySelector(`[name="login"]`)
    const inputMdp = event.target.querySelector(`[name="mdp"]`)
  
    const connexion = await getConnexion(inputLogin.value, inputMdp.value)
    console.log(connexion);
    if (connexion.token) {
  
      window.localStorage.setItem("user", JSON.stringify(connexion))
      window.location.href = 'http://127.0.0.1:5500/FrontEnd/'
    }
    if (connexion.error) {
      const messageError = document.createElement("div")
      messageError.innerText = "Mot de passe incorrect"
      messageError.className = 'alert'
      inputMdp.after(messageError)
    }
    if (connexion.message) {
      const messageError = document.createElement("div")
      messageError.innerText = 'E-mail icorrect'
      messageError.className = 'alert'
      inputLogin.after(messageError)
    }
  
  }
  const form = document.querySelector("form")
  form.addEventListener("submit", submitForm);