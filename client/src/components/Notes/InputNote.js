import React, { Fragment, useState } from "react";

const InputNote = () => {
  const [description, setDescription] = useState("");

  const onSubmitForm = async () => {

    try {
      const body = { description };
      await fetch("/notes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      window.location = "/";
    } catch (err) {
      console.error(err.message);
    }
  }

  return (
    <Fragment>
      <button
        type="button"
        className="btn btn-warning"
        data-toggle="modal"
        data-target="#newLink"
      >
        Edit
      </button>
      <div
        className="modal"
        id="newLink"
        onClick={() => setDescription("")}
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h4 className="modal-title">Edit Todo</h4>
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                onClick={() => setDescription("")}
              >
                &times;
              </button>
            </div>

            <div className="modal-body">
              <input
                type="text"
                className="form-control"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>

            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-warning"
                data-dismiss="modal"
                onClick={() => onSubmitForm()}
              >
                Edit
              </button>
              <button
                type="button"
                className="btn btn-danger"
                data-dismiss="modal"
                onClick={() => setDescription("")}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </Fragment>

  )
}

export default InputNote;
