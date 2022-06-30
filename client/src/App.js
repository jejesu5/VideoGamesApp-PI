import './App.css';
import Home from './Components/Home';
import LandingPage from './Components/LandingPage';
import { Route, Switch } from 'react-router-dom';
import Searchvideogame from './Components/Searchvideogame';
import VideogameDetail from './Components/VideogameDetail';
import CreateVideogame from './Components/CreateVideogame/CreateVideogame';
import NavBar from './Components/NavBar';

function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path='/'>
          <LandingPage />
        </Route>
        <Route path="/videogames/create" component={CreateVideogame}/>
        <Route path='/videogames'>
          <Home />
        </Route>
        <Route path='/results/:name' component={Searchvideogame} />
        <Route path='/videogame/:id' component={VideogameDetail} />
        <Route path='/nav' component={NavBar} />
      </Switch>
    </div>
  );
}

export default App;
