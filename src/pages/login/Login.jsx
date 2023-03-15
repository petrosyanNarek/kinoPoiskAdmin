import { useState } from "react"
import { Link } from "react-router-dom"
import { LoginFormik } from "../../components/login/LoginFormik"
import { MySpinnerLoader } from "../../components/UI/spinnerLoader/MySpinnerLoader"
export const Login = () => {
    const [loading, setLoading] = useState(false)

    return (
        <>
            <section className="gradient-custom position-relative h-100 min-vh-100">
                {loading && <MySpinnerLoader loading={loading} />}
                <div className="container py-5 h-100">
                    <div className="row d-flex justify-content-center align-items-center h-100">
                        <div className="col-12 col-md-8 col-lg-6 col-xl-5">
                            <div className="card bg-dark text-white">
                                <div className="card-body p-5 text-center">

                                    <div className="mb-md-5 mt-md-4 pb-5">

                                        <h2 className="fw-bold mb-2 text-uppercase">Login</h2>
                                        <p className="text-white-50 mb-5">Please enter your login and password!</p>
                                        <LoginFormik setLoading={setLoading} />

                                    </div>
                                    <div>
                                        <p className="mb-0">Don't have an account? <Link to="/signUp" className="text-white-50 fw-bold">Sign Up</Link>
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>

    )
}