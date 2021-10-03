//action types
export const ADD_MOVIES = 'ADD_MOVIES';  //used in reducers index.js
export const ADD_TO_FAVOURITE = 'ADD_TO_FAVOURITE';
export const ADD_MOVIE_TO_LIST = 'ADD_MOVIE_TO_LIST';
export const REMOVE_FROM_FAVOURITES ='REMOVE_FROM_FAVOURITES';
export const SET_SHOW_FAVOURITES = 'SET_SHOW_FAVOURITES';
export const ADD_SEARCH_RESULT = 'ADD_SEARCH_RESULT';


//action creators
export function addMovies (movies) {
    return{
        type: ADD_MOVIES,
        movies   //same as movies: movies
      }
}

export function addFavourite (movie) {
  return{
    type: ADD_TO_FAVOURITE,
    movie
  }
}

export function removeFromFavourites(movie){
  return {
    type: REMOVE_FROM_FAVOURITES,
    movie
  }
}

export function setShowFavourites(val){
  return {
    type: SET_SHOW_FAVOURITES,
    val
  }
}

export function addMovieToList(movie) {
  return {
    type: ADD_MOVIE_TO_LIST,
    movie
  };
}
//batata hu
export function addMovieSearchResult (movie) {
  return { 
    type: ADD_SEARCH_RESULT, 
    movie 
  };
}

export function handleMovieSearch (movie) {
  const url = ` http://www.omdbapi.com/?i=tt3896198&apikey=add18289&t=${movie}`;

  return function (dispatch){
    fetch(url) 
    .then(response => response.json())   //this will convert response to json object and return a promise
    .then(movie => {

      // dispatch an action
      dispatch(addMovieSearchResult(movie));
    })
  }
}
 
