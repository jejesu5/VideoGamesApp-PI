import './App.css';
import Home from './Components/Home/Home';
import LandingPage from './Components/LandingPage/LandingPage';
import { Route, Switch } from 'react-router-dom';
import Searchvideogame from './Components/SearchVideogames/Searchvideogame';
import VideogameDetail from './Components/VideogameDetail/VideogameDetail';
import CreateVideogame from './Components/CreateVideogame/CreateVideogame';
import ScrollToTop from './Components/Home/ScrollToTop';

function App() {
  return (
    <div className="App">
        <ScrollToTop/>
        <Switch>
        <Route exact path='/' component={LandingPage} />
        <Route path="/videogames/create" component={CreateVideogame}/>
        <Route path='/videogames' component={Home}/>
        <Route exact path='/results/:name' component={Searchvideogame} />
        <Route path='/videogame/:id' component={VideogameDetail} />
        </Switch>
    </div>
  );
}

export default App;
