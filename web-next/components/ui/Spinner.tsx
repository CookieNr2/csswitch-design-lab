const Spinner = ({ label }: { label: string }) => (
  <div className="container py-5 d-flex align-items-center gap-3">
    <div className="spinner-border text-light" role="status" aria-hidden="true" />
    <span className="text-white-50">{label}</span>
  </div>
);

export default Spinner;
