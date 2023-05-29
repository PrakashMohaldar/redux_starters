import React, { useEffect } from 'react'
import MovieListing from '../MovieListing/MovieListing'
import { useDispatch } from 'react-redux'
import {fetchAsyncMovies, fetchAsyncShows} from '../../features/movies/movieSlice'

function Home() {

    const dispatch = useDispatch(); 
    const movieText = "Harry";
    const seriesText = "Money"
    useEffect(()=>{
        dispatch(fetchAsyncMovies(movieText))
        dispatch(fetchAsyncShows(seriesText))
    },[dispatch])
  return (
    <div>
        <div className='banner-img'></div>
        <MovieListing/>
    </div>
    
  )
}

export default Home