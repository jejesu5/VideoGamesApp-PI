import './App.css';
import Home from './Components/Home/Home';
import LandingPage from './Components/LandingPage/LandingPage';
import { Route, Switch } from 'react-router-dom';
import Searchvideogame from './Components/SearchVideogames/Searchvideogame';
import VideogameDetail from './Components/VideogameDetail/VideogameDetail';
import CreateVideogame from './Components/CreateVideogame/CreateVideogame';
import ScrollToTop from './Components/ToolComponents/ScrollToTop';
import PathNotFound from './Components/ToolComponents/PathNotFound';

function App() {
  return (
    <div className="App">
        <ScrollToTop/>
        <Switch>
        <Route exact path='/' component={LandingPage} />
        <Route path='/results/:name' component={Searchvideogame} />
        <Route path="/videogames/create" component={CreateVideogame}/>
        <Route path='/videogame/:id' component={VideogameDetail} />
        <Route exact path='/videogames' component={Home}/>
        <Route path='/*' component={PathNotFound} />
        </Switch>
    </div>
  );
}

export default App;
