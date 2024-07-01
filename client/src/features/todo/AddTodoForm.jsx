import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { addTodo } from "../../services/apiTodo";

import Button from "../../ui/Button";
import { useEditTask } from "./useEditTask";

function AddTodoForm({ todo = {} }) {
  const queryClient = useQueryClient();
  const { id, task_title, task_content, time_frame, date_applied } = todo;
  let editingSession = false;

  const modifyTask = useEditTask();

  const defaultDate = date_applied ? new Date(date_applied) : new Date();
  const year = defaultDate.getFullYear();
  const month = String(defaultDate.getMonth() + 1).padStart(2, "0");
  const day = String(defaultDate.getDate()).padStart(2, "0");
  const formattedDate = `${year}-${month}-${day}`;

  const { register, handleSubmit, reset } = useForm({
    defaultValues: {
      taskTitle: task_title,
      taskContent: task_content,
      timeFrame: time_frame,
      dateApplied: formattedDate,
    },
  });

  const { mutate } = useMutation({
    mutationFn: addTodo,
    onSuccess: () => {
      queryClient.invalidateQueries(["todos"]);
      reset();
    },
  });

  if (id) {
    editingSession = true;
  }

  const onSubmit = (data) => {
    if (editingSession) {
      modifyTask({ id, task: data });
    } else {
      mutate(data);
    }
  };

  return (
    <form className="flex flex-col gap-4 p-2" onSubmit={handleSubmit(onSubmit)}>
      <div className="relative z-0 w-full mb-5 group">
        <input
          type="text"
          name="taskTitle"
          id="taskTitle"
          className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
          placeholder=" "
          {...register("taskTitle", {
            required: "Please enter the job title.",
          })}
        />
        <label
          htmlFor="taskTitle"
          className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
        >
          Task Title
        </label>
      </div>

      <div className="relative z-0 w-full mb-5 group">
        <input
          type="text"
          name="taskContent"
          id="taskContent"
          className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
          placeholder=" "
          {...register("taskContent", {
            required: "Please enter where the company is located.",
          })}
        />
        <label
          htmlFor="taskContent"
          className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
        >
          Task Content
        </label>
      </div>

      <div className="relative z-0 w-full mb-5 group">
        <select
          name="timeFrame"
          id="timeFrame"
          className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
          placeholder=" "
          {...register("timeFrame", {
            required: "Please enter when this task should be completed.",
          })}
        >
          <option value="Today">Today</option>
          <option value="This Week">This Week</option>
          <option value="Next Week">Next Week</option>
          <option value="This Month">This Month</option>
        </select>
        <label
          htmlFor="timeFrame"
          className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
        >
          Time Frame
        </label>
      </div>

      <div className="relative z-0 w-full mb-5 group">
        <input
          type="date"
          name="dateApplied"
          id="dateApplied"
          className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
          placeholder=" "
          {...register("dateApplied")}
        />
        <label
          htmlFor="companyLocation"
          className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
        >
          Date Applied
        </label>
      </div>

      <input
        type="hidden"
        name="status"
        id="status"
        value="pending"
        {...register("status")}
      />
      <Button type="primary">
        {editingSession ? `Edit Todo` : `Add New Task`}
      </Button>
    </form>
  );
}

export default AddTodoForm;
