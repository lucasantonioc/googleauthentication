import { useEffect, useState } from 'react';
import jwt_decode from "jwt-decode";
import './App.css';

function App() {

  const [ user, setUser ] = useState({});
 
  function handleCallbackResponse(response) {
    console.log("encoded JWT ID token: " + response.credential);
    var userObject = jwt_decode(response.credential);
    console.log(userObject);
    setUser(userObject);
    document.getElementById("signInDiv").hidden = true;
  }

  function handleSignOut(event) {
    setUser({});
    document.getElementById("signInDiv").hidden = false;
  }

  useEffect(() => {
    /* global google */
    google.accounts.id.initialize({
      client_id: "TODO: your-client-id-token",
      callback: handleCallbackResponse
    });

    google.accounts.id.renderButton(
      document.getElementById("signInDiv"),
      { theme: "outline", size: "large"}
    );

    //google.accounts.id.prompt();

  }, []);

// If we have no user: sign in button
// If we have a user: show the log out button

  return (
    <div className="App">
      <div id="signInDiv"></div>

      { Object.keys(user).length != 0 &&
        <button onClick={ (e) => handleSignOut(e)}>Sign Out</button>
      }

      { user && 
        <div>
          <img src={user.picture}></img>
          <h3>{user.name}</h3>
        </div>
      }
    </div>
  );
}

export default App;
