import { Field, Form, Formik } from "formik";
import { useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { loginUser } from "../../features/userSlice";
import { loginSchema } from "../../valiadtion/loginValidation";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const LoginFormik = ({ setLoading }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [error, setError] = useState("");
  useEffect(() => {
    if (localStorage.getItem("id")) {
      navigate("/");
    }
  }, [navigate]);
  return (
    <>
      <Formik
        initialValues={{
          email: "",
          password: "",
        }}
        validationSchema={loginSchema}
        onSubmit={async (values, { resetForm }) => {
          setLoading(true);
          await dispatch(loginUser(values))
            .unwrap()
            .then((r) => {
              setLoading(false);
              if (r.verify) {
                navigate("/");
                localStorage.setItem("id", r.user.id);
              } else {
                setError(r.error);
              }
            })
            .catch((e) => {
              setLoading(false);
              toast.error(e.message, {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
              });
            });
          resetForm({
            values: {
              email: values.email,
              password: values.password,
            },
          });
        }}
      >
        {({ errors, touched }) => (
          <Form className="mt-6">
            <div className="form-outline form-white mb-4">
              <Field className="form-control form-control-lg" name="email" />
              <label className="form-label" htmfor="typeEmailX">
                Email
              </label>
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
              {error && !touched.password && !touched.email && (
                <div className="text-danger fw-bold">{error}</div>
              )}
            </div>

            <button
              className="btn btn-outline-light btn-lg px-5"
              type="submit"
              disabled={
                touched.password || touched.email || !error ? false : true
              }
            >
              Sign In
            </button>
          </Form>
        )}
      </Formik>
      <div>
        <ToastContainer />
      </div>
    </>
  );
};
