import './App.css'
import { getAuth } from './api'

function App() {

  let headerText;

  const onClick = () => {
    getAuth().then(res => {
      headerText = res;
      console.log(res);
    }).catch(error => {
      console.error(error);
    });
  };

  const ghLogin = () => {

  }

  const glLogin = () => {
    
  }


  return (
    <section>
      <h1>{headerText}</h1>
      <button onClick={onClick}>Click me</button>
      <button onClick={ghLogin}>GitHub Login</button>
      <button onClick={glLogin}>Google Login</button>
    </section>
  )
}

export default App
