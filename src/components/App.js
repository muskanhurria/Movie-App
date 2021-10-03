import React from "react";
import { data } from '../data';
import Navbar from './NavBar';
import MovieCard from './MovieCard';
import { addMovies, setShowFavourites } from '../actions';
import { connect } from '../index'; 


class App extends React.Component {
  componentDidMount(){
    // //usually here we make api call for data and dispatch an action
    // this.props.subscribe(() => {       //subscribe function(callback) is called just after the dispatch
    //   console.log('UPDATED');
    //   this.forceUpdate();        //forcefully updates application by re-rendering
    // })

    this.props.dispatch(addMovies(data));
    console.log("state:", this.props);
  }

  isMovieFavourite = (movie) => {
    const { movies } = this.props;
    const index = movies.favourites.indexOf(movie);

    if(index !== -1){
      //found the movie
      return true;
    }
    return false;
  }

  onChangeTab = (val) => {
    this.props.dispatch(setShowFavourites(val))
  }

  render() {
  const { movies, search } = this.props;
  const { list, favourites, showFavourites } = movies;
  console.log('render', this.props.store.getState());
  const displayMovies = showFavourites ? favourites : list;
    

  return (
    <div className="App">
      <Navbar search={search} />
      <div className="main">
        <div className="tabs">
          <div className={`tab ${showFavourites ? '' : 'active-tabs'}`} onClick={() => this.onChangeTab(false)}> Movies </div>
          <div className={`tab ${showFavourites ? 'active-tabs' : ''}`} onClick={() => this.onChangeTab(true)}> Favourites </div>
        </div>

        <div className="list">
          {displayMovies.map((movie, index) =>(                  //here movie is a parameter each value in data can be accessed by movie and index is value of each item in the array by default provided
            <MovieCard 
              movie={movie} 
              key={`movies-${index}`} 
              dispatch={this.props.dispatch}
              isFavourite={this.isMovieFavourite(movie)} 
            />
          ))}
        </div>
        {displayMovies.length === 0 ? <div className="no-movies"> No Movies To Display! </div> : null}
      </div>
    </div>
  );
  }
}

// class AppWrapper extends React.Component {
//   render() {
//     return (
//       <StoreContext.Consumer>
//         {(store) => <App store={store} />}
//       </StoreContext.Consumer>
//     );
//   }
// }

function mapStateToProps (state) {
  return{
    movies: state.movies,
    search: state.movies
  }
};

const connectedAppComponent = connect(mapStateToProps)(App);

export default connectedAppComponent;
