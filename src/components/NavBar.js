import React from "react";
import {data} from "../data";
import {addMovieToList, handleMovieSearch} from '../actions';

class Navbar extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            showSearchResults: true,
            searchText:  ''
        };
    }

    hanleAddToMovies = (movie) => {
        console.log('14', movie);
        this.props.dispatch(addMovieToList(movie));
        this.setState({
            showSearchResults: false
        });
    }

    handleSearch = () => {
        //storing the searched data in the store
        const { searchText } = this.state;

        this.props.dispatch(handleMovieSearch(searchText));
    }

    handleChange = (e) => {
        this.setState({
            searchText: e.target.value
        });
    }

    render() {
    const { result, showSearchResults } = this.props.search;
    // console.log("data", data);
    return (
        <div className="nav">
            <div className="search-container">
                <input onChange={this.handleChange} />
                <button id="search-btn" onClick={this.handleSearch}>Search</button>
            
                {showSearchResults &&
                    <div className="search-results">
                        <div className="search-result">
                            <img src={result.Poster} alt="search-pic" />

                            <div className="movie-info">
                                <span>{result.Title}</span>
                                <button onClick={ () => this.hanleAddToMovies(result)}>  
                                    Add To Movies
                                </button> 
                            </div>
                        </div>
                    </div>
                }
            </div>
        </div>
    );
    }
}

export default Navbar;
