import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

import { getTodos } from "../../services/apiTodo";

import Loader from "../../ui/Loader";
import Error from "../../ui/Error";
import TodoTable from "./TodoTable";
import Button from "../../ui/Button";
import AddTodoForm from "./AddTodoForm";

function Todo() {
  const [isOpen, setIsOpen] = useState(true);
  const {
    isPending,
    error,
    data: todos,
  } = useQuery({
    queryKey: ["todos"],
    queryFn: getTodos,
  });
  if (error) return <Error message={error?.message} />;
  if (isPending) return <Loader />;
  if (todos.length === 0)
    return (
      <div className="flex flex-col gap-4 p-3 max-w-screen-2xl mx-auto">
        <h1 className="text-center p-3 font-semibold text-3xl text-yellow-400">
          You have nothing to do 🥳
        </h1>
        <Button
          type="primary"
          className="my-5"
          onClick={() => setIsOpen(!isOpen)}
        >
          Add Task
        </Button>
        {isOpen && <AddTodoForm />}
      </div>
    );
  return (
    <div className="flex flex-col gap-4 p-3 max-w-screen-2xl mx-auto">
      <h1 className="text-center p-3 font-semibold text-3xl text-yellow-400">
        Tasks I need to do
      </h1>
      <TodoTable todos={todos} />
      <Button
        type="primary"
        className="my-5"
        onClick={() => setIsOpen(!isOpen)}
      >
        Add Task
      </Button>
      {!isOpen && <AddTodoForm />}
    </div>
  );
}

export default Todo;
