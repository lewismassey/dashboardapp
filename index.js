const express = require("express");
const app = express();
const cors = require("cors");
const pool = require("./db");
const path = require("path");
const NewsAPI = require('newsapi');
const newsapi = new NewsAPI('3f8137d4b5474ecf8b8f0aebb0afb18e');
const PORT = process.env.PORT || 5000;

// process.env.NODE_ENV => production or undefined

// middleware
app.use(cors());
app.use(express.json()); // req.body

if (process.env.NODE_ENV === "production") {
  // service static content
  // npm run build
  app.use(express.static(path.join(__dirname, "client/build")));
}

// ROUTES

// get all links
app.get("/links", async (req, res) => {
  try {
    const allTodos = await pool.query("SELECT * from links");
    res.json(allTodos.rows);
  } catch (err) {
    console.error(err.message);
  }
});

// get a link
app.get("/links/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const todo = await pool.query("SELECT * FROM links WHERE links_id = $1", [
      id,
    ]);
    response.json(todo.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
});

// create a link
app.post("/links", async (req, res) => {
  try {
    console.log(req.body.description);
    const description = req.body.description;
    console.log(description);
    const category = req.body.category;
    console.log(category);
    const newTodo = await pool.query(
      "INSERT INTO links (link, category) VALUES($1, $2) RETURNING *",
      [description, category]
    );
    console.log(newTodo);

    res.json(newTodo.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
});

// update a link
app.put("/links/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { description } = req.body;
    const updateTodo = await pool.query(
      "UPDATE links SET link = $1 WHERE link_id = $2",
      [description, id]
    );

    // res.json('todo was updated', updateTodo);
  } catch (err) {
    console.error(err.message);
  }
});

// delete a link
app.delete("/links/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deleteTodo = await pool.query("DELETE FROM links WHERE link_id = $1", [
      id,
    ]);
  } catch (err) {
    console.error(err.message);
  }
});

// get all todos
app.get("/todos", async (req, res) => {
  try {
    const allTodos = await pool.query("SELECT * from todos");
    res.json(allTodos.rows);
  } catch (err) {
    console.error(err.message);
  }
});

// get a todo
app.get("/todos/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const todo = await pool.query("SELECT * FROM todos WHERE todo_id = $1", [
      id,
    ]);
    res.json(todo.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
});

// create a todo
app.post("/todos", async (req, res) => {
  try {
    console.log(req.body);
    const { description } = req.body.description;
    const { category } = req.body.category;
    console.log(description);
    const newTodo = await pool.query(
      "INSERT INTO todos (description,category) VALUES($1, $2) RETURNING *",
      [description, category]
    );

    res.json(newTodo.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
});

// update a todo
app.put("/todos/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { description } = req.body;
    const updateTodo = await pool.query(
      "UPDATE todos SET description = $1 WHERE todo_id = $2",
      [description, id]
    );

    // res.json('todo was updated', updateTodo);
  } catch (err) {
    console.error(err.message);
  }
});

// delete a todo
app.delete("/todos/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deleteTodo = await pool.query("DELETE FROM todos WHERE todo_id = $1", [
      id,
    ]);
  } catch (err) {
    console.error(err.message);
  }
});

app.get("/notes", async (req, res) => {
  try {
    const allNotes = await pool.query("SELECT * from notes");
    res.json(allNotes.rows);
  } catch (err) {
    console.error(err.message);
  }
});

app.get("/notes/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const note = await pool.query("SELECT * FROM notes WHERE note_id = $1", [
      id,
    ]);
    res.json(note.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
});

app.post("/notes", async (req, res) => {
  try {
    const { description } = req.body;
    console.log(req.body)
    const newNote = await pool.query(
      "INSERT INTO notes (description) VALUES($1) RETURNING *",
      [description]
    );

    res.json(newNote.rows[0]);
  } catch (err){
    console.error(err.message)
  }
})

app.put("/notes/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { description } = req.body;
    const updateNote = await pool.query(
      "UPDATE notes SET description = $1 WHERE note_id = $2",
      [description, id]
    );

    // res.json('todo was updated', updateTodo);
  } catch (err) {
    console.error(err.message);
  }
});

// delete a todo
app.delete("/notes/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deleteNote = await pool.query("DELETE FROM notes WHERE note_id = $1", [
      id,
    ]);
  } catch (err) {
    console.error(err.message);
  }
});



//get top headlines from newsapi
app.get("/news/topheadlines", async (req, res) => {

      const allNews = await newsapi.v2.topHeadlines({
        country: 'us',

      })
      res.json(allNews);
  })

  //get news with query

app.get("/news/:query", async (req, res) => {
  const { query } = req.params;
  const results = await newsapi.v2.everything({q: `${query}`})
  res.json(results);
})



app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "client/build/index.html"));
});

app.listen(PORT, () => {
  console.log(`Server is starting on port ${PORT}`);
});
