import { Field, Form, Formik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import {
  registration,
  selectRegisterValid,
} from "../../features/registrationSlice";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { registerSchema } from "../../valiadtion/registrationValidation";

export const RegisterFormik = () => {
  const initialValues = {
    name: "",
    surname: "",
    email: "",
    password: "",
    confirmPassword: "",
  };
  const dispatch = useDispatch();
  const registred = useSelector(selectRegisterValid);
  const navigate = useNavigate();
  useEffect(() => {
    if (localStorage.getItem("id")) {
      navigate("/");
    }
  }, [navigate]);
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={registerSchema}
      onSubmit={async (values, { resetForm }) => {
        await dispatch(registration(values)).unwrap();
        resetForm({
          values: initialValues,
        });
        navigate("/signIn");
      }}
    >
      {({ errors, touched }) => (
        <Form className="mt-6">
          <div className="form-outline form-white mb-4">
            <Field className="form-control form-control-lg" name="name" />
            <label className="form-label">First Name</label>
            {touched.name && errors.name && (
              <div className="text-danger fw-bold">{errors.name}</div>
            )}
          </div>
          <div className="form-outline form-white mb-4">
            <Field className="form-control form-control-lg" name="surname" />
            <label className="form-label">Last Name</label>
            {touched.surname && errors.surname && (
              <div className="text-danger fw-bold">{errors.surname}</div>
            )}
          </div>
          <div className="form-outline form-white mb-4">
            <Field className="form-control form-control-lg" name="email" />
            <label className="form-label">Email</label>
            {touched.email && errors.email && (
              <div className="text-danger fw-bold">{errors.email}</div>
            )}
          </div>
          <div className="form-outline form-white mb-4">
            <Field
              type="password"
              className="form-control form-control-lg"
              name="password"
            />
            {touched.password && errors.password && (
              <div className="text-danger fw-bold">{errors.password}</div>
            )}
            <label className="form-label" htmfor="typePasswordX">
              Password
            </label>
          </div>
          <div className="form-outline form-white mb-4">
            <Field
              type="password"
              className="form-control form-control-lg"
              name="confirmPassword"
            />
            {touched.confirmPassword && errors.confirmPassword && (
              <div className="text-danger fw-bold">
                {errors.confirmPassword}
              </div>
            )}
            <label className="form-label"> Confirm Password</label>
            {!registred && !touched.name && (
              <div className="text-danger fw-bold mt-2">Email is found</div>
            )}
          </div>
          <button className="btn btn-outline-light btn-lg px-5" type="submit">
            Sign Up
          </button>
        </Form>
      )}
    </Formik>
  );
};
