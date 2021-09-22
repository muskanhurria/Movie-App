export default function movies(state = [], axction) {
    if(action === "ADD_MOVIES"){
        return action.movies;
    }
    return state;
}                               //we do not modify existing state instead pass a new state which merges with old one in the store
