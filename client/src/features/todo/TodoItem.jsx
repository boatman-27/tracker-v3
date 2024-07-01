import { useMutation, useQueryClient } from "@tanstack/react-query";

import { deleteTask } from "../../services/apiTodo";
import { useMarkComplete } from "./useMarkComplete";
import { useDelayTask } from "./useDelayTask";

import formatDate from "../../helpers/helpers";
import Button from "../../ui/Button";
import { useState } from "react";
import AddTodoForm from "./AddTodoForm";

function TodoItem({ task }) {
  const markComplete = useMarkComplete();
  const delayTaskTime = useDelayTask();
  const [isOpen, setIsOpen] = useState(false);

  const { id, task_title, task_content, time_frame, status, date_applied } =
    task;
  const timeFrame = ["Today", "This Week", "Next Week", "This Month"];
  const currentTimeFrameIndex = timeFrame.indexOf(time_frame);

  let nextTimeFrame = "";
  const canDelay = currentTimeFrameIndex < timeFrame.length - 1;

  if (currentTimeFrameIndex < timeFrame.length - 1) {
    nextTimeFrame = timeFrame[currentTimeFrameIndex + 1];
  } else {
    nextTimeFrame = null;
  }
  const queryClient = useQueryClient();
  const { mutate } = useMutation({
    mutationFn: (id) => {
      deleteTask(id);
    },
    mutationKey: id,
    onSuccess: () => {
      queryClient.invalidateQueries(["todos"]);
    },
  });

  const handleDelete = (id) => {
    mutate(id);
    queryClient.invalidateQueries(["todos"]);
  };

  return (
    <>
      <tr>
        <td className="px-4 py-2 text-yellow-300">{task_title}</td>
        <td className="px-4 py-2 text-yellow-300">{task_content}</td>
        <td className="px-4 py-2 text-yellow-300">{time_frame}</td>
        <td className="px-4 py-2 text-yellow-300">{status}</td>
        <td className="px-4 py-2 text-yellow-300">
          {formatDate(date_applied)}
        </td>
        <td className="px-4 py-2 text-center flex gap-2 justify-center">
          <Button type="round">View</Button>
          <Button
            type="round"
            onClick={() => setIsOpen(!isOpen)}
            disabled={status === "Completed"}
          >
            Edit
          </Button>
          <Button type="round" onClick={() => handleDelete(id)}>
            Delete
          </Button>
          <Button
            type="accept"
            onClick={() => markComplete(id)}
            disabled={status === "Completed"}
          >
            {status === "Completed" ? "Already Completed 🎉" : "Mark Complete"}
          </Button>
          <Button
            type="reject"
            disabled={!canDelay || status === "Completed"}
            onClick={() => {
              delayTaskTime({ id, delay: nextTimeFrame });
            }}
          >
            {status === "Completed"
              ? "Already Completed 🎉"
              : nextTimeFrame
              ? `Delay to ${nextTimeFrame} ⏳`
              : "Cannot Delay Again 😭"}
          </Button>
        </td>
      </tr>
      {isOpen && (
        <tr>
          <td colSpan={5}>
            <AddTodoForm todo={task} setIsOpen={setIsOpen} />
          </td>
        </tr>
      )}
    </>
  );
}

export default TodoItem;
