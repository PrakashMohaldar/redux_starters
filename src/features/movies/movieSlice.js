// thunk middleware
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import movieApi from '../../common/apis/MovieApi'
import {APIKEY} from '../../common/apis/MovieApiKey'


export const fetchAsyncMovies = createAsyncThunk('movies/fetchAsyncMovies', async (term)=>{
        // async action creator
        const response = await movieApi
                .get(`?apiKey=${APIKEY}&s=${term}&type=movie`)
                .catch((err)=>{
                    console.log(err)
                })
        console.log("The response from API", response)
        return response.data
})
export const fetchAsyncShows = createAsyncThunk('movies/fetchAsyncShows', async (term)=>{
    // async action creator
    const response = await movieApi
    .get(`?apiKey=${APIKEY}&s=${term}&type=series`)
            .catch((err)=>{
                console.log(err)
            })
            console.log("The response from API", response)
            return response.data
})
export const fetchAsyncMovieOrShowDetail = createAsyncThunk('/movies/fetchMovieOrShowDetail', async(id)=>{
    // async action creator
    const response = await movieApi
    .get(`?apiKey=${APIKEY}&i=${id}&Plot=full`)
    .catch(err => console.log(err))

    return response.data;
})
        
        const initialState = {
            movies:{},
            shows:{},
            selectMovieOrShow:{},
            moviesPending: false,
            seriesPending: false
        }
                
        // creating reducers
        const movieSlice = createSlice({
            name:"movies",
            initialState,
            reducers:{
                // action
                addMovies: (state, {payload})=>{
                    state.movies = payload;
                    // {...state, payload}
                },
                removeSelectedMovieOrShow: (state) =>{
                    state.selectMovieOrShow = {};
                }
            },
            extraReducers: {

        [fetchAsyncMovies.pending]: (state) =>{
            console.log("pending"); 
            return {...state, moviesPending:true}
        },
        [fetchAsyncMovies.fulfilled]: (state, {payload})=>{
            console.log("Fetched Successfully")
            return {...state, movies:payload, moviesPending:false}
        },
        [fetchAsyncMovies.rejected]: ()=>{
            console.log("Rejected")
        },
        [fetchAsyncShows.pending]: (state) =>{
            return {...state, seriesPending:true}
        },
        [fetchAsyncShows.fulfilled]: (state, {payload})=>{
            console.log("Fetched Successfully")
            return {...state, shows:payload, seriesPending:false}
        },
        [fetchAsyncMovieOrShowDetail.fulfilled]:(state, {payload})=>{
            console.log("Fetched Successfully")
            return {...state, selectMovieOrShow: payload}
        }
    }
})

export const {addMovies, removeSelectedMovieOrShow} = movieSlice.actions;
export const getAllMovies = (state) =>{
    return state.movies.movies
} 
export const getAllShows = (state)=>{
    return state.movies.shows
}
export const getMovieOrShowDetail = (state)=>{
    return state.movies.selectMovieOrShow
}
export const checkMoviePending = (state) =>{
    return state.movies.moviesPending
}
export const checkSerisPending = (state) =>{
    return state.movies.seriesPending
}
export default movieSlice.reducer;