import { useContext } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import AuthContext from "../contexts/auth.context";
import { useAlert } from "../contexts/alert.context";

function Login() {
  const navigate = useNavigate();
  const { showAlert } = useAlert();
  const { doLogin } = useContext(AuthContext);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  async function onSubmit(data) {
    try {
      await doLogin(data);

      navigate("/");
    } catch (err) {
      showAlert("invalid credentials");
    }
  }

  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col-sm-12 col-md-12 col-lg-12 d-flex justify-content-center align-self-center">
            <div className="card shadow-lg border-0 mt-5">
              <div className="card-body p-5">
                <h1 className="text-light mb-3">Login</h1>
                <form onSubmit={handleSubmit(onSubmit)}>
                  <div className="mb-3">
                    <label htmlFor="email" className="form-label text-white-50">
                      Email address
                    </label>
                    <input
                      required
                      id="email"
                      type="email"
                      className={`form-control ${
                        errors.email ? "is-invalid" : ""
                      } bg-transparent border-0 rounded-0`}
                      {...register("email")}
                    />
                  </div>

                  <div className="mb-3">
                    <label
                      htmlFor="password"
                      className="form-label text-white-50"
                    >
                      Password
                    </label>
                    <input
                      required
                      id="password"
                      type="password"
                      className={`form-control ${
                        errors.password ? "is-invalid" : ""
                      } bg-transparent border-0 rounded-0`}
                      {...register("password")}
                    />
                  </div>

                  <button
                    type="submit"
                    className="btn btn-primary btn-lg rounded-0 my-3"
                  >
                    Login
                  </button>
                </form>
                <p className="text-white-50 mt-2">
                  <small>
                    Not a member?{" "}
                    <a className="link-light" href="/register">
                      Create an Account
                    </a>
                  </small>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;
