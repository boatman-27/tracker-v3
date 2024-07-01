import express from "express";
import cors from "cors";
import pg from "pg";
import env from "dotenv";
import bodyParser from "body-parser";
env.config();

const app = express();
const port = process.env.PORT;

app.use(express.json());
app.use(bodyParser.json());

app.use(
  cors({
    origin: ["http://localhost:5173", process.env.DOMAIN],
  })
);

const db = new pg.Client({
  connectionString: process.env.POSTGRES_URL,
});
db.connect();

app.get("/getJobs", async (req, res) => {
  try {
    const result = await db.query("SELECT * FROM jobs");
    res.send(result.rows);
  } catch (error) {
    console.error("Error fetching jobs:", error);
    res.status(500).send("Error fetching jobs");
  }
});

app.post("/addJobs", (req, res) => {
  const {
    dateApplied,
    jobTitle,
    jobDesc,
    companyName,
    companyLocation,
    link,
    status,
  } = req.body;
  try {
    db.query(
      "INSERT INTO jobs (job_title, job_desc, comp_name, comp_location, link, job_status, date_applied) VALUES ($1, $2, $3, $4, $5, $6, $7)",
      [
        jobTitle,
        jobDesc,
        companyName,
        companyLocation,
        link,
        status,
        dateApplied,
      ],
      (err, result) => {
        if (err) {
          console.error("Error adding job:", err);
          res.status(500).send("Error adding job");
        } else {
          res.send(result.rows);
        }
      }
    );
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Error adding job");
  }
});

app.get("/jobs/:id", (req, res) => {
  const id = req.params.id;
  try {
    if (!id) {
      throw new Error("Please provide an id");
    }
    const job = db.query("SELECT * FROM jobs WHERE id = $1", [id]);
    if (!job.rowCount) {
      throw new Error("Job not found");
    }
    res.send(job.rows);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Error fetching job");
  }
});

app.delete("/deleteJob/:id", (req, res) => {
  const id = req.params.id;
  if (!id) {
    throw new Error("Provided ID is invalid");
  }
  try {
    db.query("DELETE FROM jobs WHERE id = $1", [id], (err, result) => {
      if (err) {
        console.error("Error deleting job:", err);
        res.status(500).send("Error deleting job");
      } else {
        res.send(result.rows);
      }
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Error deleting job");
  }
});

app.patch("/modifyStatus/:id", (req, res) => {
  const { status } = req.body;
  const id = req.params.id;
  try {
    if (!id) {
      throw new Error("Please provide an id");
    }
    db.query(
      "UPDATE jobs SET job_status = ($1) WHERE id = ($2)",
      [status, id],
      (err, result) => {
        if (err) {
          console.error("Error updating status:", err);
          res.status(500).send("Error updating status");
        } else {
          res.send(result.rows);
        }
      }
    );
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Error updating status");
  }
});

app.patch("/editJob/:id", (req, res) => {
  const id = req.params.id;
  const {
    dateApplied,
    jobTitle,
    jobDesc,
    companyName,
    companyLocation,
    link,
    status,
  } = req.body;

  try {
    if (!id) {
      throw new Error("Provided ID is invalid");
    }
    db.query(
      "UPDATE jobs SET job_title = ($1), job_desc = ($2), comp_name = ($3), comp_location = ($4), link = ($5), job_status = ($6), date_applied = ($7) WHERE id = ($8)",
      [
        jobTitle,
        jobDesc,
        companyName,
        companyLocation,
        link,
        status,
        dateApplied,
        id,
      ],
      (err, result) => {
        if (err) {
          console.error("Error updating job:", err);
          res.status(500).send("Error updating job");
        } else {
          res.send(result.rows);
        }
      }
    );
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Error updating status");
  }
});

app.get("/getTodos", async (req, res) => {
  try {
    const result = await db.query("SELECT * FROM todos");
    res.send(result.rows);
  } catch (error) {
    console.error("Error fetching todos:", error);
    res.status(500).send("Error fetching todos");
  }
});

app.post("/addTodos", (req, res) => {
  const { taskTitle, taskContent, timeFrame, dateApplied, status } = req.body;
  try {
    db.query(
      "INSERT INTO todos (task_title, task_content, time_frame, date_applied, status) VALUES ($1, $2, $3, $4, $5)",
      [taskTitle, taskContent, timeFrame, dateApplied, status],
      (err, result) => {
        if (err) {
          console.error("Error adding todo:", err);
          res.status(500).send("Error adding todo");
        } else {
          res.send(result.rows);
        }
      }
    );
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Error adding todo");
  }
});

app.delete("/deleteTodo/:id", async (req, res) => {
  const id = req.params.id;
  if (!id) {
    throw new Error("Provided ID is invalid");
  }
  try {
    db.query("DELETE FROM todos WHERE id = $1", [id], (err, result) => {
      if (err) {
        console.error("Error deleting todo:", err);
        res.status(500).send("Error deleting todo");
      } else {
        res.send(result.rows);
      }
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).send(`Error deleting todo with ${id}`);
  }
});

app.patch("/completeTodo/:id", async (req, res) => {
  const id = req.params.id;
  if (!id) {
    throw new Error("Provided ID is invalid");
  }
  try {
    db.query(
      "UPDATE todos SET status = 'Completed' WHERE id = $1",
      [id],
      (err, result) => {
        if (err) {
          console.error("Error updating todo status:", err);
          res.status(500).send("Error updating todo status");
        } else {
          res.send(result.rows);
        }
      }
    );
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Error updating todo status");
  }
});

app.patch("/delayTodo/:id", async (req, res) => {
  const id = req.params.id;
  const newTimeFrame = req.body.delay;
  if (!id) {
    throw new Error("Provided ID is invalid");
  }
  try {
    db.query(
      "UPDATE todos SET time_frame = $1 WHERE id = $2",
      [newTimeFrame, id],
      (err, result) => {
        if (err) {
          console.error("Error updating todo time frame:", err);
          res.status(500).send("Error updating todo time frame");
        } else {
          res.send(result.rows);
        }
      }
    );
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Error delaying todo");
  }
});

app.patch("/editTodo/:id", async (req, res) => {
  const id = req.params.id;
  console.log(req.body);
  const { taskTitle, taskContent, timeFrame, dateApplied, status } = req.body;
  try {
    db.query(
      "UPDATE todos SET task_title = ($1), task_content = ($2), time_frame = ($3), date_applied = ($4), status = ($5) WHERE id = ($6)",
      [taskTitle, taskContent, timeFrame, dateApplied, status, id],
      (err, result) => {
        if (err) {
          console.error("Error updating todo:", err);
          res.status(500).send("Error updating todo");
        } else {
          res.send(result.rows);
        }
      }
    );
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Error updating todo");
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
