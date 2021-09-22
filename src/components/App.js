import React from "react";
import { data } from '../data';
import Navbar from './NavBar';
import MovieCard from './MovieCard';

class App extends React.Component {
  componentDidMount(){
    //usually here we make api call for data and dispatch an action
    const { store } = this.props;
    store.subscribe(() => {       //subscribe function(callback) is called just after the dispatch
      console.log('UPDATED');
      this.forceUpdate();        //forcefully updates application by re-rendering
    })

    store.dispatch({
      type: 'ADD_MOVIES',
      movies: data
    });
  }
  render() {
  const movies = this.props.store.getState();
    return (
      <div className="App">
        <Navbar />
        <div className="main">
          <div className="tabs">
            <div className="tab"> Movies </div>
            <div className="tab"> Favourites </div>
          </div>

          <div className="list">
            {movies.map((movie, index) =>(                  //here movie is a parameter each value in data can be accessed by movie and index is value of each item in the array by default provided
              <MovieCard movie={movie} key={`movies-${index}`} />
            ))}
          </div>
        </div>
      </div>
    );
  }
}

export default App;
