import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import Button from "../../ui/Button";
import { addJob } from "../../services/apiJobs";
import { useEditJob } from "./useEditJob";

function AddJobsForm({ job = {} }) {
  const {
    id,
    job_title,
    comp_location,
    job_status,
    comp_name,
    date_applied,
    job_desc,
    link,
  } = job;

  const defaultDate = date_applied ? new Date(date_applied) : new Date();
  const year = defaultDate.getFullYear();
  const month = String(defaultDate.getMonth() + 1).padStart(2, "0");
  const day = String(defaultDate.getDate()).padStart(2, "0");
  const formattedDate = `${year}-${month}-${day}`;

  const { editJobMutation, isEditing } = useEditJob();
  let edittingSession = false;
  if (id) {
    edittingSession = true;
  }

  const { register, handleSubmit, reset } = useForm({
    defaultValues: {
      dateApplied: formattedDate,
      jobTitle: job_title,
      jobDesc: job_desc,
      companyName: comp_name,
      companyLocation: comp_location,
      link: link,
      status: job_status,
    },
  });

  const queryClient = useQueryClient();
  const { mutate } = useMutation({
    mutationFn: addJob,
    onSuccess: () => {
      queryClient.invalidateQueries(["jobs"]);
      reset();
    },
  });

  const onSubmit = (data) => {
    if (edittingSession) {
      editJobMutation({ id, job: data });
    } else {
      mutate(data);
    }
  };

  return (
    <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
      <div className="relative z-0 w-full mb-5 group">
        <input
          type="text"
          name="jobTitle"
          id="jobTitle"
          className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
          placeholder=" "
          {...register("jobTitle", {
            required: "Please enter the job title.",
          })}
        />
        <label
          htmlFor="jobTitle"
          className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
        >
          Job Title
        </label>
      </div>

      <div className="relative z-0 w-full mb-5 group">
        <input
          type="text"
          name="jobDesc"
          id="jobDesc"
          className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
          placeholder=" "
          {...register("jobDesc", {
            required: "Please enter the job description.",
          })}
        />
        <label
          htmlFor="jobDesc"
          className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
        >
          Job Description
        </label>
      </div>

      <div className="relative z-0 w-full mb-5 group">
        <input
          type="text"
          name="companyName"
          id="companyName"
          className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
          placeholder=" "
          {...register("companyName", {
            required: "Please enter the company you applied for.",
          })}
        />
        <label
          htmlFor="companyName"
          className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
        >
          Company Name
        </label>
      </div>

      <div className="relative z-0 w-full mb-5 group">
        <input
          type="text"
          name="companyLocation"
          id="companyLocation"
          className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
          placeholder=" "
          {...register("companyLocation", {
            required: "Please enter where the company is located.",
          })}
        />
        <label
          htmlFor="companyLocation"
          className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
        >
          Company Location
        </label>
      </div>

      <div className="relative z-0 w-full mb-5 group">
        <input
          type="text"
          name="link"
          id="link"
          className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
          placeholder=" "
          {...register("link", {
            required: "Please enter where the company is located.",
          })}
        />
        <label
          htmlFor="link"
          className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
        >
          Link
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
        {edittingSession ? "Edit Job" : "Submit New Job"}
      </Button>
    </form>
  );
}

export default AddJobsForm;
