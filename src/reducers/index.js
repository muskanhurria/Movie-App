import { combineReducers } from "redux";
import { ADD_MOVIES, 
    ADD_SEARCH_RESULT, 
    ADD_TO_FAVOURITE, 
    ADD_MOVIE_TO_LIST,
    REMOVE_FROM_FAVOURITES, 
    SET_SHOW_FAVOURITES 
    }from "../actions";

const initialMovieState ={
    list: [],
    favourites: [],
    showFavourites: false
};
export function movies(state = initialMovieState, action) {
    // if(action.type === ADD_MOVIES){        //we do not modify existing state instead pass a new state which merges with old one in the store
    //     return {
    //         ...state,
    //         list: action.movies
    //     }
    // }
    // return state;
    console.log('action movie line 23', action.movie);
    switch (action.type) {
        case ADD_MOVIES:
            return {
                ...state,
                list: action.movies
            }

        case ADD_TO_FAVOURITE:
            return{
                ...state,
                favourites: [action.movie, ...state.favourites]
            }

        case REMOVE_FROM_FAVOURITES: 
            const filteredArray = state.favourites.filter(
                movie => movie.Title !== action.movie.Title
            );

            return {
                ...state,
                favourites: filteredArray
            }

        case SET_SHOW_FAVOURITES: 
            return {
                ...state,
                showFavourites: action.val
            }

        case ADD_MOVIE_TO_LIST:
            console.log('action.movie----', action.movie);
            return {
                ...state,
                list: [action.movie, ...state.list]
            }

        default:
            return state;
    }
}

const initialSearchState = {
    result: {},
    showSearchResults: false
};

export function search (state = initialSearchState, action){
    switch (action.type) {
        case ADD_SEARCH_RESULT:
            return {
                ...state,
                result: action.movie,
                showSearchResults: true
            }

        case ADD_MOVIE_TO_LIST:
            return {
                ...state,
                showSearchResults: false
            }

        default:
            return state;
    }
}

const initialRootState = {
    movies: initialMovieState,
    search: initialSearchState
}

// export default function rootReducer (state= initialRootState, action){
//     return {
//         movies: movies(state.movies, action),
//         search: search(state.search, action)
//     }
// }

export default combineReducers({    //this works same as rootReducer function defined above just all the calls are made automatically by redux(pre-defined function)
    movies,         
    search
});