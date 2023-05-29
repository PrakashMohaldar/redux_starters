import React from 'react'
import { useSelector } from 'react-redux'
import { checkMoviePending,checkSerisPending, getAllMovies, getAllShows } from '../../features/movies/movieSlice'
import settings from '../../common/settings'
import MovieCard from '../MovieCard/MovieCard.js'
import Slider from 'react-slick'
import './MovieListing.scss'

function MovieListing() {
  // to extract data from store
   const movies = useSelector(getAllMovies);
   const shows = useSelector(getAllShows);
   const moviePendingStatus = useSelector(checkMoviePending);
   const seriesPendingStatus = useSelector(checkSerisPending);

   let renderMovies = movies.Response === "True" ? movies.Search.map((elem, index)=>{
    return <MovieCard key={index} data={elem}/>
   }) : (
    <div className='movies-eror'>
      <h2>{movies.Error}</h2>
    </div>
   )

   let renderShows = shows.Response === "True" ? shows.Search.map((elem, index)=>{
    return <MovieCard key={index} data={elem}/>
   }):(
    <div className='movies-eror'>
      <h2>{shows.Error}</h2>
    </div>
   )

    let loader = <div className='loader'><h4>Loading...</h4></div>

    let contentMovies;
    if(!moviePendingStatus){
        contentMovies = (
          <div className='movie-container'>
            <Slider {...settings}>{renderMovies}</Slider>
          </div>
        );
    }
    else{
      contentMovies = loader;
    }

    let contentSeries;
    if(!seriesPendingStatus){
      contentSeries = (
        <div className='movie-container'>
          <Slider {...settings}>{renderShows}</Slider>
        </div>
      );
    }
    else{
      contentSeries = loader;
    }



  return (

    <div className='movies-wrapper'>
      <div className='movie-list'>
        <h2>Movies</h2>
        {contentMovies}
      </div>
      <div className='show-list'>
        <h2>Shows</h2>
        {contentSeries}
      </div>
    </div>
  )
}

export default MovieListing