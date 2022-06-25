import './App.css';
import Home from './Components/Home';
import LandingPage from './Components/LandingPage';
import { Route, Switch } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path='/'>
          <LandingPage />
        </Route>
        <Route path='/videogames'>
          <Home />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
