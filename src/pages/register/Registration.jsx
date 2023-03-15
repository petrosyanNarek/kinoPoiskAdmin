import { Link } from "react-router-dom"
import { RegisterFormik } from "../../components/registration/RegisterFormik"

export const Registration = () => {
    return (

        <section className="gradient-custom">
            <div className="container py-5 h-100">
                <div className="row d-flex justify-content-center align-items-center h-100">
                    <div className="col-12 col-md-8 col-lg-6 col-xl-5">
                        <div className="card bg-dark text-white">
                            <div className="card-body p-5 text-center">
                                <div className="mb-md-5 mt-md-4 pb-5">
                                    <h2 className="fw-bold mb-2 text-uppercase">Sing Up</h2>
                                    <RegisterFormik />
                                </div>
                                <div>
                                    <p className="mb-0">You have a account? <Link to="/signIn" className="text-white-50 fw-bold">Sign In</Link>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>




    )
}