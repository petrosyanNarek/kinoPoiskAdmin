import { useDispatch, useSelector } from "react-redux";
import { Navigate, useParams } from "react-router-dom";
import {
  getCountryById,
  newCountries,
  selectCountriesError,
  selectCountriesLoading,
  updateCountries,
} from "../../../features/countriesSlice";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { MySpinnerLoader } from "../../UI/spinnerLoader/MySpinnerLoader";
import { useEffect } from "react";
import { alertAdded } from "../../../hooks/alertAdded";
import { alertEdited } from "../../../hooks/alertEdited";
import { anySchema } from "../../../valiadtion/anyTablesValidation";
import { ToastContainer } from "react-toastify";
import { toestyError, toestySuccess } from "../../UI/toasty/toastyCreater";
import { regexp } from "../../../valiadtion/regexpValidation";
export const AddAndEditCountries = () => {
  const dispatch = useDispatch();
  const countryId = +useParams().id;
  const countriesLoading = useSelector(selectCountriesLoading);
  const countriesError = useSelector(selectCountriesError);
  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors, touchedFields },
    reset,
  } = useForm({
    resolver: yupResolver(
      anySchema("Country", 2, 10, {
        test: regexp.country.reg,
        message: regexp.country.message,
      })
    ),
  });
  useEffect(() => {
    if (countryId) {
      dispatch(getCountryById(countryId))
        .unwrap()
        .then((r) => {
          setValue("name", r.name);
        })
        .catch((e) => console.log(e));
    } else {
      reset();
    }
  }, [dispatch, countryId, setValue, reset]);
  const onSubmitHandler = (country) => {
    if (!countryId) {
      dispatch(newCountries(country))
        .unwrap()
        .then((res) => {
          alertAdded("Country", () => {
            toestySuccess(res);
          });
        })
        .catch((e) => {
          alertAdded("Country", () => {
            toestyError(e.data ? e.data : "Network Error");
          });
        });
      reset();
    } else {
      alertEdited("Country", () =>
        dispatch(updateCountries({ country, id: countryId }))
          .unwrap()
          .then((res) => {
            toestySuccess(res);
          })
          .catch((e) => {
            toestyError(e.data ? e.data : "Network Error");
          })
      );
    }
  };
  return (
    <>
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
      {countriesLoading ? (
        <MySpinnerLoader loading={countriesLoading} />
      ) : countriesError ? (
        <Navigate to="/error500" replace={true} />
      ) : (
        <div className="new-film">
          <h2 className="text-center">
            {countryId ? "Edit Country" : "Add Country"}
          </h2>
          <form onSubmit={handleSubmit(onSubmitHandler)}>
            <div className="group">
              <div className="w-75  text-primary">
                <label htmlFor="" className=" fw-bold m-3">
                  Name
                </label>
                <input
                  {...register("name")}
                  placeholder="Name..."
                  name="name"
                  className="input"
                />
                {touchedFields.name && errors.name?.message && (
                  <div className="errors">{errors.name?.message}</div>
                )}
              </div>
            </div>
            <div className="group mt-5">
              <div className="w-75 text-center text-primary">
                <button
                  type="submit"
                  className="w-100 fw-bold rounded-pill btn btn-primery serach-btn"
                >
                  Submit
                </button>
              </div>
            </div>
          </form>
        </div>
      )}
    </>
  );
};
