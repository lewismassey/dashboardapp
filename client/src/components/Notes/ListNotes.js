import React, { Fragment, useState, useEffect } from "react";
import EditNote from "./EditNote";

const ListNotes = () => {
  const [notes, setNotes] = useState([]);

  //delete note function
  async function deleteNote(id) {
    try {
      await fetch(`/notes/${id}`, {
        method: "DELETE",
      });

      setNotes(notes.filter((note) => note.note_id !== id));
    } catch (err) {
      console.error(err.message);
    }
  }

  async function getNotes() {
    const response = await fetch("/notes");
    const notesArray = await response.json();
    setNotes(notesArray);
  }

  useEffect(() => {
    getNotes();
  }, []
)

return (
  <Fragment>
    {" "}
    <table className="table mt-5">
      <thead>
        <tr>
          <th>Description</th>
          <th>Category</th>
          <th>Edit</th>
          <th>Delete</th>
        </tr>
      </thead>
      <tbody>
        {notes.map((note) => (
          <tr key={note.note_id}>
            <td>{note.description}</td>
            <td>{note.category}</td>
            <td>
              <EditNote note={note} />
            </td>
            <td>
              <button
                className="btn btn-danger"
                onClick={() => deleteNote(note.note_id)}
              >
                Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </Fragment>
);

}

export default ListNotes;
