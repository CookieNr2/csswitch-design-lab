import LoginForm from "../components/forms/LoginForm";

function LoginPage() {
  return (
    <div className="container">
      <div className="row">
        <div className="col-sm-12 col-md-12 col-lg-12 d-flex justify-content-center align-self-center">
          <div className="card shadow-lg border-0 mt-5">
            <LoginForm />
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
