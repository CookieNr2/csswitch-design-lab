import Link from "next/link";

const NotFound = () => (
  <div className="container py-5">
    <div className="card shadow-lg border-0 mt-5">
      <div className="card-body p-5">
        <h1 className="text-light mb-3">Page not found</h1>
        <p className="text-white-50">
          That page does not exist. The configurator is a good place to start.
        </p>
        <Link className="btn btn-primary btn-lg rounded-0 my-3" href="/configurator">
          Create Your Design
        </Link>
      </div>
    </div>
  </div>
);

export default NotFound;
