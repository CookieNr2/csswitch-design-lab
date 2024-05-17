import "./modal.css";

function Modal({ children }) {
  return (
    <div
      className="modal rounded-0 fade"
      id="modal"
      tabIndex="-1"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog" data-bs-theme="dark">
        <div className="modal-content rounded-0">
          <div className="modal-body p-0">
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Modal;
