import { BrowserRouter, Route, Routes } from "react-router-dom";
import { CategoriesTable } from "../components/tables/categoriesTable/CategoriesTable";
import { GenresTable } from "../components/tables/genresTable/GenresTable";
import { Profile } from "../pages/profile/Profile";
import { FilmTable } from "./../components/tables/filmTable/FilmTable";
import { CountriesTable } from "./../components/tables/countriesTable/CountriesTable";
import { ActorsTable } from "./../components/tables/actorsTable/ActorsTable";
import { AuthorsTable } from "../components/tables/authorsTable/AuthorsTable";
import { Login } from "../pages/login/Login";
import { Registration } from "../pages/register/Registration";
import { Admin } from "../HOC/Admin";
import { SeriesTable } from "../components/tables/seriesTable/SeriesTable";
import { AddAndEditFilm } from "../components/tables/filmTable/AddAndEditNewFilm";
import { AddAndEditCategories } from "./../components/tables/categoriesTable/AddAndEditCategories";
import { Error500 } from "../components/eror500/Error500";
import { AddAndEditActors } from "../components/tables/actorsTable/AddAndEditActors";
import { AddAndEditAuthors } from "../components/tables/authorsTable/AddAndEditAuthors";
import { AddAndEditSeries } from "../components/tables/seriesTable/AddAndEditSeries";
import { AddAndEditGenres } from "../components/tables/genresTable/AddAndEditGenres";
import { AddAndEditCountries } from "../components/tables/countriesTable/AddAndEditCountries";

export const Routering = () => {
  const routers = [
    { path: "/signIn", element: <Login /> },
    { path: "/signUp", element: <Registration /> },
    {
      path: "/",
      element: <Admin />,
      nestedRoute: [
        {
          path: "/",
          element: <Profile />,
          nestedRoute: [
            { path: "films", element: <FilmTable /> },
            { path: "films/add", element: <AddAndEditFilm /> },
            { path: "films/eddit/:id", element: <AddAndEditFilm /> },
            { path: "categories", element: <CategoriesTable /> },
            { path: "categories/add", element: <AddAndEditCategories /> },
            { path: "categories/eddit/:id", element: <AddAndEditCategories /> },
            { path: "genres", element: <GenresTable /> },
            { path: "genres/add", element: <AddAndEditGenres /> },
            { path: "genres/eddit/:id", element: <AddAndEditGenres /> },
            { path: "countries", element: <CountriesTable /> },
            { path: "countries/add", element: <AddAndEditCountries /> },
            { path: "countries/eddit/:id", element: <AddAndEditCountries /> },
            { path: "actors", element: <ActorsTable /> },
            { path: "actors/add", element: <AddAndEditActors /> },
            { path: "actors/eddit/:id", element: <AddAndEditActors /> },
            { path: "authors", element: <AuthorsTable /> },
            { path: "authors/add", element: <AddAndEditAuthors /> },
            { path: "authors/eddit/:id", element: <AddAndEditAuthors /> },
            { path: "series", element: <SeriesTable /> },
            { path: "series/add", element: <AddAndEditSeries /> },
            { path: "series/eddit/:id", element: <AddAndEditSeries /> },
          ],
        },
      ],
    },
    { path: "error500", element: <Error500 /> },
    { path: "*", element: <h2>Not Found</h2> },
  ];
  return (
    <BrowserRouter>
      <Routes>
        {routers.map((route) => {
          if (route.nestedRoute) {
            return (
              <Route path={route.path} element={route.element} key={Date.now()}>
                {route.nestedRoute.map((nestRoute) => {
                  if (nestRoute.nestedRoute) {
                    return (
                      <Route
                        path={nestRoute.path}
                        element={nestRoute.element}
                        key={Date.now()}
                      >
                        {nestRoute.nestedRoute.map((nesNesttRoute) => {
                          return (
                            <Route
                              key={Date.now()}
                              path={nesNesttRoute.path}
                              element={nesNesttRoute.element}
                            />
                          );
                        })}
                      </Route>
                    );
                  }
                  return (
                    <Route
                      path={nestRoute.path}
                      element={nestRoute.element}
                      key={Date.now()}
                    />
                  );
                })}
              </Route>
            );
          }
          return (
            <Route path={route.path} element={route.element} key={Date.now()} />
          );
        })}
      </Routes>
    </BrowserRouter>
  );
};
