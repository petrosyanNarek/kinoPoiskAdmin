import { configureStore } from '@reduxjs/toolkit';
import authorsSlice from '../features/authorsSlice';
import categoriesSlice from '../features/categoriesSlice';
import countriesSlice from '../features/countriesSlice';
import filmSlice from '../features/filmSlice';
import genresSlice from '../features/genresSlice';
import seriesSlice from '../features/seriesSlice';
import actorsSlice from './../features/actorsSlice';
import registrationSlice from './../features/registrationSlice';
import loginSlice from './../features/userSlice';

export const store = configureStore({
    reducer: {
        films: filmSlice,
        series: seriesSlice,
        categories: categoriesSlice,
        genres: genresSlice,
        countries: countriesSlice,
        actors: actorsSlice,
        authors: authorsSlice,
        registrValid: registrationSlice,
        login: loginSlice,


    }
})