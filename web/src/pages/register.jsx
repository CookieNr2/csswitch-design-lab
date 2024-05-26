import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { createUser } from "../services/api.services";
import { useAlert } from "../contexts/alert.context";

function Register() {
  const navigate = useNavigate();
  const { showAlert } = useAlert();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  async function onSubmit(data) {
    try {
      await createUser({
        ...data,
      });

      navigate("/login");
    } catch (err) {
      showAlert("error. review form data");
    }
  }

  return (
    <div className="container">
      <div className="row">
        <div className="col-sm-12 col-md-12 col-lg-12 d-flex justify-content-center align-self-center">
          <div className="card shadow-lg border-0 mt-5">
            <div className="card-body p-5">
              <h1 className="text-light mb-3">Register</h1>
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="mb-3">
                  <label
                    htmlFor="firstName"
                    className="form-label text-white-50"
                  >
                    First Name
                  </label>
                  <input
                    required
                    id="firstName"
                    type="text"
                    className={`form-control ${
                      errors.name ? "is-invalid" : ""
                    } bg-transparent border-0 rounded-0`}
                    {...register("firstName")}
                  />
                </div>
                <div className="mb-3">
                  <label
                    htmlFor="lastName"
                    className="form-label text-white-50"
                  >
                    Last Name
                  </label>
                  <input
                    required
                    id="lastName"
                    type="text"
                    className={`form-control ${
                      errors.name ? "is-invalid" : ""
                    } bg-transparent border-0 rounded-0`}
                    {...register("lastName")}
                  />
                </div>
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
                    {...register("password", {
                      required: "Password is required",
                      pattern: {
                        value: /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#]).{8,}$/,
                        message:
                          "Password must include at least one uppercase letter, one number, and one special character.",
                      },
                    })}
                  />
                </div>
                <p className="text-white-50 mt-2">
                  <small>
                    Your password must include at least 1 upper case, numeric,
                    and special character.
                  </small>
                </p>
                <button
                  type="submit"
                  className="btn btn btn-primary btn-lg rounded-0 my-3"
                >
                  Register
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;
