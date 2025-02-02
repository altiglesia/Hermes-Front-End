import * as React from "react";
import { useState } from "react";
import "../App.css";
import NavBar from "./NavBar";
import Main from "./Main";

function App() {
  const [user, setUser] = useState(null);
  const [notifications, setNotifications] = useState(0);
  // const [counter, setCounter] = useState(0);

  const autoLogin = () => {
    fetch("/me").then((r) => {
      if (r.ok) {
        r.json().then(user => {
          setUser(user)
        });
      } else {
      }
    });
  }

  // useEffect(() => {
  //   const timerID = setInterval(() => {
  //     setCounter(counter => counter + 1)
  //   }, 500);
  //   return () => clearInterval(timerID)
  // }, [])

  // console.log("Counter is running, currently.. ", counter)

  return (
    <div>
      <NavBar user={user} setUser={setUser} notifications={notifications} />
      <Main user={user} setUser={setUser} autoLogin={autoLogin} setNotifications={setNotifications} />
    </div>
  );
}


export default App;
