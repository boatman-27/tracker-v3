const BASE_URL = "<YOUR_SERVER_URL>";

export async function getTodos() {
  try {
    const res = await fetch(`${BASE_URL}/getTodos`);
    if (!res.ok) {
      throw new Error("Failed to fetch todos");
    }
    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Error fetching todos:", error);
    throw new Error("Error fetching todos: " + error.message);
  }
}

export async function addTodo(todo) {
  console.log(todo);
  try {
    const res = await fetch(`${BASE_URL}/addTodos`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(todo),
    });
    if (!res.ok) {
      throw new Error("Failed to add todo");
    }
    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Error adding todo:", error);
    throw new Error("Error adding todo: " + error.message);
  }
}

export async function deleteTask(id) {
  try {
    const res = await fetch(`${BASE_URL}/deleteTodo/${id}`, {
      method: "DELETE",
    });
    if (!res.ok) {
      throw new Error("Failed to delete todo");
    }
    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Error deleting todo:", error);
    throw new Error("Error deleting todo: " + error.message);
  }
}

export async function completeTask(id) {
  try {
    const res = await fetch(`${BASE_URL}/completeTodo/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!res.ok) {
      throw new Error("Failed to complete todo");
    }
    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Error completing todo:", error);
    throw new Error("Error completing todo: " + error.message);
  }
}

export async function delayTask(id, delay) {
  console.log(id, delay);
  try {
    const res = await fetch(`${BASE_URL}/delayTodo/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ delay }),
    });
    if (!res.ok) {
      throw new Error("Failed to delay todo");
    }
    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Error delaying todo:", error);
    throw new Error("Error delaying todo: " + error.message);
  }
}

export async function editTask(id, task) {
  try {
    const res = await fetch(`${BASE_URL}/editTodo/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(task),
    });
    if (!res.ok) {
      throw new Error("Failed to edit todo");
    }
    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Error editing todo:", error);
    throw new Error("Error editing todo: " + error.message);
  }
}
