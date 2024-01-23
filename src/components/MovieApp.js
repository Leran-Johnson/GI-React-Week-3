// MovieSearch.js
import React, { useState } from 'react';
import axios from 'axios';

const APIKEY = '933470c5fbd8b3d12415a9a8866fb030';

const MovieSearch = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [loading, setLoading] = useState(false);

    const handleInputChange = (e) => {
        setSearchQuery(e.target.value);
    };

    const handleSearch = async () => {
        setLoading(true);

        try {
            const lookupResult = await moveieLookUp(searchQuery);
            const similarResult = await movieSimilar(lookupResult.movieID);

            setSearchResults(similarResult);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const moveieLookUp = async (moviename) => {
        const url = `https://api.themoviedb.org/3/search/movie?query=${moviename}&api_key=${APIKEY}`;

        try {
            const response = await axios.get(url);
            const movieID = response.data.results[0]?.id;

            if (!movieID) {
                throw new Error('No movie found');
            }

            return {
                movieID,
            };
        } catch (error) {
            throw new Error('Unable to connect');
        }
    };

    const movieSimilar = async (movieID) => {
        const url = `https://api.themoviedb.org/3/movie/${movieID}/similar?language=en-US&page=1&api_key=${APIKEY}`;

        try {
            const response = await axios.get(url);
            return response.data.results;
        } catch (error) {
            throw new Error('Unable to load');
        }
    };

    return (
        <div>
            <h1>Movie Search App</h1>
            <input type="text" value={searchQuery} onChange={handleInputChange} />
            <button onClick={handleSearch} disabled={loading}>
                {loading ? 'Searching...' : 'Search'}
            </button>

            {loading ? (
                <p>Loading...</p>
            ) : (
                <ul>
                    {searchResults.map((movie) => (
                        <li key={movie.id}>{movie.title}</li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default MovieSearch;
