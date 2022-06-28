import './App.css';
import Home from './Components/Home';
import LandingPage from './Components/LandingPage';
import { Route, Switch } from 'react-router-dom';
import Searchvideogame from './Components/Searchvideogame';
import VideogameDetail from './Components/VideogameDetail';

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
        <Route path='/results/:name' component={Searchvideogame} />
        <Route path='/videogame/:id' component={VideogameDetail} />
      </Switch>
    </div>
  );
}

export default App;
